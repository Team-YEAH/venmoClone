from .db import db
from sqlalchemy.schema import ForeignKey


class Transaction(db.Model):
  __tablename__ = 'transactions'

  id = db.Column(db.Integer, primary_key = True)
  cost = db.Column(db.Float(precision=10,decimal_return_scale=2, asdecimal=True), nullable=False)
  request = db.Column(db.Boolean, default=False)
  sender = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  receiver = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

  rel_comment = db.relationship('Comment', backref='trans_comm', lazy='dynamic', foreign_keys='Comment.transactions_id')
