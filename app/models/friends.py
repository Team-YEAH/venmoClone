from .db import db
from sqlalchemy.schema import ForeignKey


class Friend(db.Model):
  __tablename__ = 'friends'

  id = db.Column(db.Integer, primary_key = True)
  requester = db.Column(db.Integer, ForeignKey('users.id'),  nullable=False)
  accepter = db.Column(db.Integer, ForeignKey('users.id'),  nullable=False)
