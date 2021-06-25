from flask import Blueprint, jsonify, session, request
from app.models import User, db, Transaction
from app.forms import TransactionForm
from sqlalchemy import or_
from flask_login import current_user
import re
from .validation_errors import validation_errors_to_error_messages

transactions_routes=Blueprint('transaction',__name__)

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f"{field} : {error}")
#     return errorMessages


@transactions_routes.route('/get-balance')
def get_balance():
    user=User.query.filter(User.id == current_user.id).first()
    balance = user.balance
    return {"balance": balance}


@transactions_routes.route('/get-transactions')
def get_records():
    user = current_user.id
    transactions = Transaction.query.filter(or_(Transaction.sender==user, Transaction.receiver==user)).all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}


@transactions_routes.route('/get-transaction/<int:id>')
def get_one_record(id):
    transaction = Transaction.query.filter_by(id=id).first()
    return transaction.to_dict()


@transactions_routes.route('/transaction-form', methods=['PATCH'])
def send_money():
    """
    User will send money to other specified user
    """
    form=TransactionForm()
    #Gets the csrf_token from the request cookie
    #Puts it in the form manually so we can use validate_on_submit
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        user=User.query.filter_by(username=form.userName.data).first()
        me=current_user.id
        currentuser = User.query.filter_by(id=me).first()
        currentuser_balance=float(currentuser.balance) - float(form.amount.data)
        new_balance=float(user.balance) + float(form.amount.data)
        user.balance="{:.2f}".format(new_balance)
        currentuser.balance="{:.2f}".format()

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

def check_cost_decimals(cost):
    if not bool(re.search(r"^(?:[0-9][0-9]{0,4}(?:\.\d{1,2})?|100000000|100000000.00)?(\.\d{1,2})?$",cost)):
        return {'errors': ["Not a valid amount, please enter value up to 2 decimal places and under 100000000.00"]}
    else:
        return True


@transactions_routes.route('/transaction-history', methods=['POST'])
def make_record():
    """
    Transction data will be recorded
    """
    form=TransactionForm()
    #Gets the csrf_token from the request cookie
    #Puts it in the form manually so we can use validate_on_submit
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        receiver_info=User.query.filter_by(username=form.userName.data).first()
        form_cost = form.amount.data
        form_request = False
        sender_info = User.query.filter_by(username=current_user.username).first()
        form_sender = sender_info.id
        form_receiver = receiver_info.id

        # try:
        if(check_cost_decimals(form_cost)):
            transactionRecord = Transaction(
                cost=form_cost,
                request=form_request,
                sender=form_sender,
                receiver=form_receiver,
                description=form.description.data,
                requester_username=receiver_info.username,
                sender_username=sender_info.username,
            )
            db.session.add(transactionRecord)
            db.session.commit()

            return transactionRecord.to_dict()
        # except ValueError as error:
        #     form.errors[error]=error
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
