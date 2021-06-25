// Constants
const ADD_USER = "users/ADD_USER"

// action creators
const addUser = (payload) => ({
    type: ADD_USER,
    payload
})

// thunks

export const searchUser = (payload) => async (dispatch) => {
    const { username } = payload
    const res = await fetch(`/api/users/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    })

    const data = await res.json();
    if (data.errors) {
        return data
    }
    dispatch(addUser(data))
    return data
}

// initial state
const initialState = null

// reducer

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_USER:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
