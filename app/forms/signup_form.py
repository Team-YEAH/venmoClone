from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def user_exists(form, field):
    print("Checking if user exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        print('1')
        raise ValidationError("User is already registered.")

def email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        print('2')
        raise ValidationError("User is already registered.")

def check_user_length(form, field):
    print("checking now", field.data)
    username = field.data
    if len(username) < 3:
        print('3')
        raise ValidationError("Username length is too short. Minimum of 3 characters.")
    elif len(username) > 50:
        print('4')
        raise ValidationError("Username length is too long. Maximum of 50 characters.")

def validate_email(form, field):
    print("checking email exists", field.data)
    email = field.data
    if not bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email)):
        print('5')
        raise ValidationError("Email is not a valid email. Please provide a correct email.")

def check_phonenumber_length(form, field):
    print("checking phone number length", len(field.data))
    phonenumber = field.data
    print(phonenumber)
    if len(phonenumber) != 11 :
        raise ValidationError("Not a valid phone number. Phone number should be 11 digits.")

def validate_profileimage(form, field):
    print("checking profile image", field.data)
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    profileImage = field.data
    if not re.match(regex, profileImage) and profileImage:
        print('7')
        raise ValidationError("Not a valid URL.")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists, check_user_length])
    email = StringField('email', validators=[DataRequired(), email_exists, validate_email])
    password = StringField('password', validators=[DataRequired()])
    full_name = StringField('full_name', validators=[DataRequired()])
    phonenumber = StringField('phonenumber', validators=[check_phonenumber_length])
    profileImage = StringField('profileImage', validators=[validate_profileimage])
    balance = StringField('balance')
