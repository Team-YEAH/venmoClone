from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friends = db.Table(
  "friends",
  db.Column('requester_id', db.Integer, db.ForeignKey("users.id")),
  db.Column('accepter_id', db.Integer, db.ForeignKey("users.id")),
  db.Column('accepted', db.Boolean, default=False)
  
)

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

  # Requester = db.relationship('Friend', backref='request', lazy='dynamic', foreign_keys='Friend.requester')
  # Accepter = db.relationship('Friend', backref='accept', lazy='dynamic', foreign_keys='Friend.accepter')

  Friends = db.relationship(
    "User",
    secondary=friends,
    primaryjoin=(friends.c.requester_id == id),
    secondaryjoin=(friends.c.accepter_id == id),
    backref=db.backref("friends", lazy='dynamic'),
    lazy="dynamic"
  )

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

  def to_dict_friends(self):
    pending_requests = self.Friends.filter(friends.c.accepted == False).all()
    list_of_friends = self.Friends.filter(friends.c.accepted == True).all()
    list_of_friends2 = self.friends.filter(friends.c.accepted == True).all()
    friend_requests = self.friends.filter(friends.c.accepted == False).all()

    results = {
      'pending_requests' : {},
      'list_of_friends' : {},
      'friend_requests' : {}
    }

    count = 0
    for i in pending_requests:
      obj_data = pending_requests[count]
      results['pending_requests'][obj_data.id] = {
        'requester_id' : self.id,
        'accepter_id' : obj_data.id,
        'username' : obj_data.username,
        'profileImage': obj_data.profileImage
      }
      count += 1

    count = 0
    for i in list_of_friends:
      obj_data = list_of_friends[count]
      results['list_of_friends'][obj_data.id] = {
        'requester_id' : self.id,
        'accepter_id' : obj_data.id,
        'username' : obj_data.username,
        'profileImage': obj_data.profileImage
      }
      count += 1

    count = 0
    for i in list_of_friends2:
      obj_data = list_of_friends2[count]
      results['list_of_friends'][obj_data.id] = {
        'requester_id' : obj_data.id,
        'accepter_id' : self.id,
        'username' : obj_data.username,
        'profileImage': obj_data.profileImage
      }
      count += 1

    count = 0
    for i in friend_requests:
      obj_data = friend_requests[count]
      results['friend_requests'][obj_data.id] = {
        'requester_id' : obj_data.id,
        'accepter_id' : self.id,
        'username' : obj_data.username,
        'profileImage': obj_data.profileImage
      }
      count += 1

    return results
