from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class PaymentDetailForm(FlaskForm):
    debit_card = StringField('debit_card', validators=[DataRequired()])
    bank_number = StringField('bank_number')
    bank = StringField('bank')
    billing_address = StringField('billing_address')


class RemovePaymentDetail(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    payment_detail_id = IntegerField('payment_detail_id', validators=[DataRequired()])
