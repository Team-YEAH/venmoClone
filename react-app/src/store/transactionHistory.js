//constants
import { REMOVE_USER } from './session';

const SET_TRANSACTIONRECORD = "transactionHistory/SET_TRANSACTIONRECORD"
const GET_TRANSACTION_RECORDS = "transaction/GET_TRANSACTION_RECORDS"
const UPDATE_TRANSACTION_RECORDS = "transaction/UPDATE_TRANSACTION_RECORDS"
const DELETE_TRANSACTION_RECORD ="transaction/DELETE_TRANSACTION_RECORD"

//action creators
const setTransactionRecord = (recordData) => ({
    type: SET_TRANSACTIONRECORD,
    payload: recordData
})
const getTransactionRecords = (transactions)=>({
    type: GET_TRANSACTION_RECORDS,
    payload: transactions
})
const updateTransactionRecords = (transactions)=>({
    type: UPDATE_TRANSACTION_RECORDS,
    payload: transactions
})
const deleteTransactionRecords = (transactions)=>({
    type: DELETE_TRANSACTION_RECORD,
    payload: transactions
})



//thunks
export const deleteTransactionRecord = (transactionId) => async (dispatch) => {
    const response = await fetch('/api/transaction/delete-request', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transactionId
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(deleteTransactionRecords(data))
    return {}
}

export const updateTransactionRecord = (transactionId) => async (dispatch) => {
    const response = await fetch('/api/transaction/update-to-transaction', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transactionId
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(updateTransactionRecords(data))
    return {}
}

export const getTransactionsRecords = () => async(dispatch) =>{
    const response = await fetch('/api/transaction/get-transactions')
    const data = await response.json();
    if (data.errors){
        return data;
    }
    dispatch(getTransactionRecords(data))
    return {}
}

export const setNewTransactionRecord = (cost, request, sender, receiver, userName, amount, description) => async (dispatch) => {
    const response = await fetch('/api/transaction/transaction-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            amount,
            cost,
            request,
            sender,
            receiver,
            description
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setTransactionRecord(data))
    return {}
}


//reducer
const initialState = {transactionsHistory: {}}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_TRANSACTIONRECORD:
            newState = {...state}
            newState.transactionsHistory[action.payload.id] = action.payload
            return newState;
        case GET_TRANSACTION_RECORDS:
            newState={...state}
            action.payload.transactions.forEach((transaction) => {
                newState.transactionsHistory[transaction.id] = transaction
            });
            return newState;
        case UPDATE_TRANSACTION_RECORDS:
            newState = {...state}
            newState.transactionsHistory[action.payload.id] = action.payload
            return newState;
        case DELETE_TRANSACTION_RECORD:
            newState = {...state}
            delete newState.transactionsHistory[action.payload.id]
            return newState
        case REMOVE_USER:
            return newState = {
                transactionsHistory : {}
            }
        default:
            return state;
    }
}
