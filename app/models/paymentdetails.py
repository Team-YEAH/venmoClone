from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class PaymentDetail(db.Model):
    __tablename__ = 'paymentdetails'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    debit_card = db.Column(db.String(20))
    bank_number = db.Column(db.String(20))
    bank = db.Column(db.String(50))
    billing_address = db.Column(db.String(100))
    # user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
      add_prefix_for_prod('users.id'), nullable=False))
    default_payment = db.Column(db.Boolean, default=False, nullable=False)

    def to_dict(self):
        return {'id': self.id,
                'debit_card': self.debit_card,
                'bank_number': self.bank_number,
                'bank': self.bank,
                'billing_address': self.billing_address,
                'default_payment': self.default_payment}
