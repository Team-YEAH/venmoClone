from .db import db
from sqlalchemy.schema import ForeignKey
import datetime

class Transaction(db.Model):
  __tablename__ = 'transactions'

  id = db.Column(db.Integer, primary_key = True)
  cost = db.Column(db.Float(precision=10,decimal_return_scale=2, asdecimal=True), nullable=False)
  request = db.Column(db.Boolean, default=False)
  sender = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  receiver = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  created_at=db.Column(db.DateTime, default=datetime.datetime.utcnow)
  description=db.Column(db.String(255))
  rel_comment = db.relationship('Comment', backref='trans_comm', lazy='dynamic', foreign_keys='Comment.transactions_id')


  def to_dict(self):
      return {
        "id": self.id,
        "cost": float(self.cost),
        "request": self.request,
        "sender": self.sender,
        "receiver": self.receiver,
        "created_at": self.created_at
      }
