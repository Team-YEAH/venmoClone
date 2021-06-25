//constants
const ADD_FRIEND = "friend/ADD_FRIEND"

//action creators
const addFriend = (friend) => ({
    type: ADD_FRIEND,
    payload: friend
})

//thunks
export const addNewFriend = (requester,accepter,accepted) => async(dispatch) => {
    const response = await fetch('/api/friend/add-friend', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requester,
            accepter,
            accepted
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(addFriend(data))
    return {}
}

const initialState = {friends: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_FRIEND:
            newState = {...state}
            newState.friends = action.payload
            return newState
        default:
            return state;
    }
}
