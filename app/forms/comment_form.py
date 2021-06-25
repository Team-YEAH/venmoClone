from flask_wtf import FlaskForm
from wtforms import TextField
from wtforms.validators import DataRequired
from app.models import User


class CommentForm(FlaskForm):
    comment=TextField('comment', validators=[DataRequired()])
