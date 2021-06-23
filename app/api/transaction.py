from flask import Blueprint, jsonify, session, request
from app.models import User, db, Transaction
from app.forms import TransactionForm
from sqlalchemy import or_
from flask_login import current_user


transactions_routes=Blueprint('transaction',__name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


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
        new_balance=float(user.balance) + float(form.amount.data)
        user.balance=str(new_balance)

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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

        transactionRecord = Transaction(
            cost=form_cost,
            request=form_request,
            sender=form_sender,
            receiver=form_receiver
        )
        db.session.add(transactionRecord)
        db.session.commit()

        return transactionRecord.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
