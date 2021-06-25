from flask import Blueprint, jsonify, session, request
from app.models import User, db, Friend
from app.forms import FriendForm
from flask_login import current_user
from .validation_errors import validation_errors_to_error_messages

friends_routes=Blueprint('friend',__name__)


@friends_routes.route('/add-friend', methods=['POST'])
def make_record():
    """
    Adds friend
    """
    form=FriendForm()
    #Gets the csrf_token from the request cookie
    #Puts it in the form manually so we can use validate_on_submit
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        accepter_info=User.query.filter_by(username=form.accepter.data).first()
        accepter_id= accepter_info.id

        newFriend = Friend(
            requester=form.requester.data,
            accepter=accepter_id,
            accepted=False,
        )
        db.session.add(newFriend)
        db.session.commit()

        return newFriend.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
