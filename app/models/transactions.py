from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
import datetime


class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(
        db.Float(precision=10, decimal_return_scale=2, asdecimal=True), nullable=False)
    request = db.Column(db.Boolean, default=False)
    # sender = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    sender = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # receiver = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    receiver = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    description = db.Column(db.String(255))
    requester_username = db.Column(db.String(50), nullable=False)
    sender_username = db.Column(db.String(50), nullable=False)
    rel_comment = db.relationship(
        'Comment', backref='trans_comm', lazy='dynamic', foreign_keys='Comment.transactions_id')

    def to_dict(self):
        return {
            "id": self.id,
            "cost": float(self.cost),
            "request": self.request,
            "sender": self.sender,
            "receiver": self.receiver,
            "created_at": self.created_at,
            "description": self.description,
            'requester_username': self.requester_username,
            'sender_username': self.sender_username
        }
