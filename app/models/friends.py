from .db import db
from sqlalchemy.schema import ForeignKey


class Friend(db.Model):
  __tablename__ = 'friends'

  id = db.Column(db.Integer, primary_key = True)
  requester = db.Column(db.Integer, ForeignKey('users.id'),  nullable=False)
  accepter = db.Column(db.Integer, ForeignKey('users.id'),  nullable=False)
  accepted = db.Column(db.Boolean, default=False, nullable=False)

  def to_dict(self):
      return {
        "id": self.id,
        "requester": self.requester,
        "accepter": self.accepter,
        "accepted": self.accepted,
      }
