from .db import db
from sqlalchemy.schema import ForeignKey


class PaymentDetail(db.Model):
  __tablename__ = 'paymentdetails'

  id = db.Column(db.Integer, primary_key = True)
  debit_card = db.Column(db.String(20))
  bank_number = db.Column(db.String(20))
  bank = db.Column(db.String(50))
  billing_address = db.Column(db.String(100))
  user_id = db.Column(db.Integer,ForeignKey('users.id'), nullable=False)
