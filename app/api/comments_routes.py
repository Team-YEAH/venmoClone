from flask import Blueprint, jsonify, session, request
from sqlalchemy.sql.expression import null
from app.models import User, db, Transaction, Comment
from sqlalchemy import or_, and_
from app.forms import CommentForm
from flask_login import current_user, login_required
import re


comments_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@comments_routes.route('/<int:id>')
def get_comments(id):
    transaction = Transaction.query.filter_by(id=id).first()
    # if transaction does not exist, return to reducer nothing for comments
    if transaction == None:
        return {"comments": ""}
    comments = Comment.query.filter(
        Comment.transactions_id == transaction.id).all()
    return {"comments": [comment.to_dict() for comment in comments]}


@comments_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.id
        form_comment = form.comment.data
        # form_transactions_id = Transaction.query.filter_by(id=id).first()
        # print(form_transactions_id, 'HEYYY form transactions id')
        newComment = Comment(
            comment=form_comment,
            user_id=user,
            transactions_id=id
        )
        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comments_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    user = current_user.id
    deletethis = Comment.query.filter(Comment.id == id).first()
    db.session.delete(deletethis)
    if deletethis.user_id != user:
        return {'errors': 'You must own this comment to delete it.'}
    db.session.commit()
    return {'id': id}
