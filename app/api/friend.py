from flask import Blueprint, jsonify, session, request
from app.models import User, db, friends
from flask_login import current_user
from .validation_errors import validation_errors_to_error_messages
from flask_login import login_required
from sqlalchemy import and_, or_

friends_routes = Blueprint('friend', __name__)


@friends_routes.route('', methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def friend():
    data = request.get_json()
    requester_id = ""
    accepter_id = ""
    accepted = ""
    user_exist = ""
    ret_obj = {}

    if request.method != 'GET':
        requester_id = data['requester_id']
        accepter_id = data['accepter_id']
        if requester_id == accepter_id:
            return {'errors': ["Can't add self"]}
        if request.method != 'DELETE':
            accepted = data['accepted']
        user_exist = User.query.filter(User.id == accepter_id).first()
        ret_obj = {
            'accepted': False,
            'requester_id': requester_id,
            'accepter_id': accepter_id,
            'accepter_username': user_exist.username,
            'accepter_profileImage': user_exist.profileImage
        }

    if request.method == 'POST':
        try:
            fr_exist = db.session.query(friends).filter(
                or_(
                    and_(friends.c.requester_id == requester_id,
                         friends.c.accepter_id == accepter_id),
                    and_(friends.c.requester_id == accepter_id,
                         friends.c.accepter_id == requester_id)
                )).one()
            if fr_exist.accepted == True:
                return {'errors': ['Already friends']}
            else:
                return {'errors': ['Friend request still pending']}
        except:
            if user_exist:
                friend_request = friends.insert().values(
                    requester_id=requester_id,
                    accepter_id=accepter_id
                )

                db.session.execute(friend_request)
                db.session.commit()
                return ret_obj
            return {'errors': ['User does not exist']}

    elif request.method == 'PATCH':
        accept_friend = friends.update(). \
            where(and_(friends.c.requester_id == requester_id,
                       friends.c.accepter_id == accepter_id)). \
            values(
            accepted=True
        )
        requester = User.query.filter(User.id == requester_id).first()
        db.session.execute(accept_friend)
        db.session.commit()
        ret_obj['accepted'] = True
        ret_obj['accepter_username'] = requester.username
        ret_obj['accepter_profileImage'] = requester.profileImage
        return ret_obj
    elif request.method == 'DELETE':
        delete_friend = friends.delete(). \
            where(and_(friends.c.requester_id == requester_id,
                       friends.c.accepter_id == accepter_id))
        db.session.execute(delete_friend)
        db.session.commit()
        return ret_obj
    else:
        user = current_user
        friends_res = User.query.filter(User.id == current_user.id).first()
        return friends_res.to_dict_friends()
