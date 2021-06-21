from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  full_name = db.Column(db.String(100), nullable = False)
  username = db.Column(db.String(50), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  email = db.Column(db.String(320), nullable = False, unique = True)
  phonenumber = db.Column(db.Integer)
  profileImage = db.Column(db.String(256))
  balance = db.Column(db.Float(precision=10,decimal_return_scale=2, asdecimal=True), default=0)


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
