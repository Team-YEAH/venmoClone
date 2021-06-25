from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class FriendForm(FlaskForm):
    accepter=StringField('accepter', validators=[DataRequired()])
    requester=IntegerField('requester', validators=[DataRequired()])
