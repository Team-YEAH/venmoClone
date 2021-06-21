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
        raise ValidationError("User is already registered.")

def email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")

def check_user_length(form, field):
    username = field.data
    if len(username) < 3:
        raise ValidationError("Username length is too short. Minimum of 3 characters.")
    elif len(username) > 50:
        raise ValidationError("Username length is too long. Maximum of 50 characters.")

def validate_email(form, field):
    email = field.data
    if not bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email)):
        raise ValidationError("Email is not a valid email. Please provide a correct email.")

def check_phonenumber_length(form, field):
    phonenumber = field.data
    if len(str(phonenumber)) < 11 or len(str(phonenumber)) > 11:
        raise ValidationError("Not a valid phone number. Phone number should be 11 digits.")

def validate_profileimage(form, field):
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    profileImage = field.data
    if not re.match(regex, profileImage) and profileImage:
        raise ValidationError("Not a valid URL.")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists, check_user_length])
    email = StringField('email', validators=[DataRequired(), email_exists, validate_email])
    password = StringField('password', validators=[DataRequired()])
    full_name = StringField('full_name', validators=[DataRequired()])
    phonenumber = StringField('phonenumber', validators=[check_phonenumber_length])
    profileImage = StringField('profileImage', validators=[validate_profileimage])
    balance = StringField('balance')
