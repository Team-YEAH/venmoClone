from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    # user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
      add_prefix_for_prod('users.id')), nullable=False)
    # transactions_id = db.Column(db.Integer, ForeignKey(
    #     'transactions.id'), nullable=False)
    transactions_id = db.Column(db.Integer, db.ForeignKey(
      add_prefix_for_prod('transactions.id')), nullable=False)
    user = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'transactions_id': self.transactions_id,
            'user': self.user.full_name
        }
