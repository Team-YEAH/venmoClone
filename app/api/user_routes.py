from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, PaymentDetail
from app.forms import EditForm, PaymentDetailForm
from .validation_errors import validation_errors_to_error_messages
import re


user_routes = Blueprint('users', __name__)

def user_exists(data, id):
    username = data
    username_exists = User.query.filter(User.username == username).first()
    user_exists = User.query.filter(User.id == id).first()
    if user_exists.username == username:
        return True
    elif username_exists:
        raise ValueError("User is already registered.")
    else:
        return True

def email_exists(data, id):
    email = data
    email_exists = User.query.filter(User.email == email).first()
    user_exists = User.query.filter(User.id == id).first()
    if user_exists.email == email:
       return True
    elif email_exists:
        raise ValueError("Email is already registered.")
    else:
        return True


def check_user_length(data):
    username = data
    if len(username) < 3:
        raise ValueError("Username length is too short. Minimum of 3 characters.")
    elif len(username) > 50:
        raise ValueError("Username length is too long. Maximum of 50 characters.")
    else:
        return True

def validate_email(data):
    email = data
    if not bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email)):
        raise ValueError("Email is not a valid email. Please provide a correct email.")
    else:
        return True

def check_phonenumber_length(data):
    phonenumber = data
    if len(phonenumber) != 11 :
        raise ValueError("Not a valid phone number. Phone number should be 11 digits.")
    else:
        return True

def validate_profileImage(data):
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    profileImage = data
    if not re.match(regex, profileImage) and profileImage:
        raise ValidationError("Not a valid URL.")
    else:
        return True


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
    form = EditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        full_name = data['full_name']
        username = data['username']
        email = data['email']
        phonenumber = data['phonenumber']
        profileImage = data['profileImage']
        if (user_exists(username, id), email_exists(email, id), check_user_length(username),
            validate_email(email), check_phonenumber_length(phonenumber), validate_profileImage(profileImage)):

            user.full_name = full_name
            user.username = username
            user.email = email
            user.phonenumber = phonenumber
            user.profileImage = profileImage
            db.session.commit()
            return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/add/paymentdetail/<int:id>', methods=['GET','POST'])
# @login_required
def add_payment(id):
    form = PaymentDetailForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'POST':
        print('form', form.data)
        print(form.validate_on_submit())
        if form.validate_on_submit():
            data = form.data
            del data['csrf_token']
            # debit_card = data['debit_card']
            # bank = data['bank']
            # billing_address = data['billing_address']
            # bank_number = data['bank_number']
            # db_data = {
            #     'debit_card': data['debit_card']
            # }
            user = User.query.filter(User.id == id).first()
            p1 = PaymentDetail(**data)
            user.Paymentdetails.append(p1)
            db.session.commit()
            return {'innermost': 'innermost'}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 200
    user = User.query.filter(User.id == id).first()
    user_payment_details = user.Paymentdetails.all()
    results = {}
    count = 0
    for i in user_payment_details:
        results[i] = {}
        for (key, value) in user_payment_details[count]:
            results[i][key] = value
        count +=1
    return results
