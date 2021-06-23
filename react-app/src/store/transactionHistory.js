//constants
const SET_TRANSACTIONRECORD = "transactionHistory/SET_TRANSACTIONRECORD"


//action creators
const setTransactionRecord = (recordData) => ({
    type: SET_TRANSACTIONRECORD,
    payload: recordData
})


//thunks
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
const initialState = {transactionsHistory: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_TRANSACTIONRECORD:
            newState = {...state}
            newState.transactionsHistory = action.payload
            return newState
        default:
            return state;
    }
}
