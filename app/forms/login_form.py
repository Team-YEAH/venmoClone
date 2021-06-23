from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    authenticate = field.data
    user = User.query.filter((User.email == authenticate) | (User.username == authenticate)).first()
    if not user:
        raise ValidationError("Email/Username provided not found.")


def password_matches(form, field):
    password = field.data
    authenticate = form.data['auth']
    user = User.query.filter((User.email == authenticate) | (User.username == authenticate)).first()
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    auth = StringField('auth', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
