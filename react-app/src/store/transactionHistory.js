//constants
const SET_TRANSACTIONRECORD = "transactionHistory/SET_TRANSACTIONRECORD"
const GET_TRANSACTION_RECORDS = "transaction/GET_TRANSACTION_RECORDS"

//action creators
const setTransactionRecord = (recordData) => ({
    type: SET_TRANSACTIONRECORD,
    payload: recordData
})
const getTransactionRecords = (transactions)=>({
    type: GET_TRANSACTION_RECORDS,
    payload: transactions
})




//thunks
export const getTransactionsRecords = () => async(dispatch) =>{
    const response = await fetch('/api/transaction/get-transactions')
    const data = await response.json();
    if (data.errors){
        return data;
    }
    dispatch(getTransactionRecords(data))
    return {}
}

export const setNewTransactionRecord = (cost, request, sender, receiver, userName, amount) => async (dispatch) => {
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
            receiver
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
        default:
            return state;
    }
}
