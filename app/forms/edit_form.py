from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User
import re


class EditForm(FlaskForm):
    full_name = StringField('full_name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    phonenumber = StringField('phonenumber')
    image = StringField('image')


class PasswordForm(FlaskForm):
    confirm_password = StringField('confirm_password')
    new_password = StringField('new_password')
    confirm_new_password = StringField('confirm_new_password')


class BalanceForm(FlaskForm):
    balance = StringField('balance')
