from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import TransactionForm
from sqlalchemy import or_

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
    print("-------------We made it to Transaaction route---------")
    form=TransactionForm()
    #Gets the csrf_token from the request cookie
    #Puts it in the form manually so we can use validate_on_submit
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        user=User.query.filter_by(username=form.userName.data).first()
        print("USER ISSSSSSSSSSSSSSSSSSSSSS", user)
        new_balance=float(user.balance) + float(form.amount.data)
        user.balance=str(new_balance)

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
