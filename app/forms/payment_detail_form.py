from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PaymentDetailForm(FlaskForm):
    debit_card = StringField('debit_card', validators=[DataRequired()])
    bank_number = StringField('bank_number')
    bank = StringField('bank')
    billing_address = StringField('billing_address')
