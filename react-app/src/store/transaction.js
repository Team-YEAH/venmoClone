//constants
import { REMOVE_USER } from './session';

const ADD_TRANSACTION = "transaction/ADD_TRANSACTION"
export const GET_BALANCE = "transaction/GET_BALANCE"

// action creators
const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    payload: transaction
})

const getBalance=(balance)=>({
    type: GET_BALANCE,
    payload: balance
})

//thunks

export const getCurrentBalance=()=> async(dispatch) =>{
    const response = await fetch ('/api/transaction/get-balance')
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(getBalance(data))
    return{}
}

export const makePayment = (userName, amount, description) => async (dispatch) => {
    const response = await fetch('/api/transaction/transaction-form', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            amount,
            description
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    if(data.negativeValue === true){
        window.alert("Sending this payment results in a negative Doughmo balance, the difference will be taken out of your active payment method")
    }
    dispatch(addTransaction(data))
    return {}
}

export const updateBalance = (userName, amount) => async (dispatch) => {
    const response = await fetch('/api/transaction/update-balance', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            amount
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    if(data.negativeValue === true){
        window.alert("Sending this payment results in a negative Doughmo balance, the difference will be taken out of your active payment method")
    }
    dispatch(getBalance(data))
    return {}
}

//reducer
const initialState = {transactions: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_TRANSACTION:
            newState = {...state}
            newState.transactions = action.payload
            return newState
        case GET_BALANCE:
            newState = {...state}
            newState.transactions = action.payload.balance
            return newState
        case REMOVE_USER:
            return newState = {
                transactions : {}
            }
        default:
            return state;
    }
}
