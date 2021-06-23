//constants
const ADD_TRANSACTION = "transaction/ADD_TRANSACTION"

// action creators
const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    payload: transaction
})

//thunks
export const makePayment = (userName, amount) => async (dispatch) => {
    const response = await fetch('/api/transaction/transaction-form', {
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
    dispatch(addTransaction(data))
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
        default:
            return state;
    }
}
