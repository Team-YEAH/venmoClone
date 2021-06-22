//constants
const ADD_TRANSACTION = "transaction/ADD_USER"


// action creators
const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    payload = transaction
})

//thunks

export const makePayment = (userName, amount) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auth,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
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
