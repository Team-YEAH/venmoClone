from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit(id):
    user = User.query.filter(User.id == id).first()
    form = SignUpForm()
    if user:
        data = form.data
        full_name = data['full_name']
        username = data['username']
        email = data['email']
        phonenumber = data['phonenumber']
        profileImage = data['profileImage']
        user.full_name = full_name
        user.username = username
        user.email = email
        user.phonenumber = phonenumber
        user.profileImage = profileImage
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
