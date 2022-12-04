import os  # Local packages
from werkzeug.utils import secure_filename

from flask import Blueprint, jsonify, session, request  # External files
from sqlalchemy import or_
from flask_login import current_user, login_user, logout_user, login_required

from app.models import User, db  # Local files
from app.forms import LoginForm
from app.forms import SignUpForm
from .validation_errors import validation_errors_to_error_messages
from app.helpers import *

auth_routes = Blueprint('auth', __name__)


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(
            or_(User.email == form.data['auth'], User.username == form.data['auth'])).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/login/demo', methods=['POST'])
def demo_login():
    user = User.query.filter(User.username == 'demo').first()
    login_user(user)
    return user.to_dict()


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """

    form = SignUpForm()
    output = ''
    form['csrf_token'].data = request.cookies['csrf_token']
    user_info = form.data['username']  # adds to file name to get user

    try:
        # checks to see if files has a key 'image' and places in file
        file = request.files['image']
    except:
        file = None

    # if the file exists, check the file type with our function
    if file and allowed_file(file.filename):
        # checks if file name is secure
        file.filename = secure_filename(file.filename)
        # output = upload_file_to_s3(file, app.config["S3_BUCKET"])
        output = upload_file_to_s3(
            file, os.environ.get("S3_BUCKET"), user_info)

    if form.validate_on_submit():
        user = User(
            full_name=form.data['full_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            phonenumber=form.data['phonenumber'],
            profileImage=str(output),
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
