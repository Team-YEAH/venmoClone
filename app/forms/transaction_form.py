from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class TransactionForm(FlaskForm):
    userName=StringField('userName', validators=[DataRequired()])
    amount=StringField('amount', validators=[DataRequired()])
    description=StringField('description', validators=[DataRequired()])
