from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  full_name = db.Column(db.String(100), nullable = False)
  username = db.Column(db.String(50), nullable = False, unique = True)
  hashed_password = db.Column(db.String(256), nullable = False)
  email = db.Column(db.String(320), nullable = False, unique = True)
  phonenumber = db.Column(db.String(11))
  profileImage = db.Column(db.String(256))
  balance = db.Column(db.String(11), default="0")

  Requester = db.relationship('Friend', backref='request', lazy='dynamic', foreign_keys='Friend.requester')
  Accepter = db.relationship('Friend', backref='accept', lazy='dynamic', foreign_keys='Friend.accepter')
  Sender = db.relationship('Transaction', backref='send', lazy='dynamic', foreign_keys='Transaction.sender')
  Receiver = db.relationship('Transaction', backref='receive', lazy='dynamic', foreign_keys='Transaction.receiver')

  Paymentdetails = db.relationship('PaymentDetail', backref='paymentdetails', lazy='dynamic', foreign_keys='PaymentDetail.user_id')
  rel_comment = db.relationship('Comment', backref='comm', lazy='dynamic', foreign_keys='Comment.user_id')


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    balance = 0 if not self.balance else self.balance
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "full_name": self.full_name,
      "phonenumber": self.phonenumber,
      "profileImage": self.profileImage,
      "balance": balance
    }
