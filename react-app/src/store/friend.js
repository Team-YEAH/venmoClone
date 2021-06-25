//constants
const ADD_FRIEND = "friend/ADD_FRIEND"
const SET_FRIENDS = "friend/GET_FRIENDS"
const SEND_FRIEND_REQUEST = "friend/SEND_FRIEND_REQUEST"
const DELETE_FRIEND = "friend/DELETE_FRIEND"

//action creators
const addFriend = (payload) => ({
    type: ADD_FRIEND,
    payload
})

const sendFriendRequest = (payload) => ({
    type: SEND_FRIEND_REQUEST,
    payload
})

const setFriends = (payload) => ({
    type: SET_FRIENDS,
    payload
})

const deleteFriend = (payload) => ({
    type: DELETE_FRIEND,
    payload
})

//thunks
export const getFriends = () => async (dispatch) => {
    const response = await fetch('/api/friend')
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setFriends(data))
    return data;
}

export const addNewFriend = (payload) => async(dispatch) => {
    const {requester_id, accepter_id, accepted} = payload
    const response = await fetch('/api/friend', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requester_id,
            accepter_id,
            accepted
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(sendFriendRequest(data))
    return data;
}

export const acceptFriendRequest = (payload) => async(dispatch) => {
    const {requester_id, accepter_id, accepted} = payload
    const response = await fetch('/api/friend', {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requester_id,
            accepter_id,
            accepted
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(addFriend(data))
    return data;
}

export const removeFriend = (payload) => async(dispatch) => {
    const {requester_id, accepter_id} = payload
    const response = await fetch('/api/friend',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requester_id,
            accepter_id,
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(deleteFriend(data))
    return data;
}

const initialState = {
            friends: null,
            friend_requests: null,
            pending_requests: null
        }

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_FRIENDS:
            newState = {
                friends: {
                    ...action.payload.list_of_friends
                },
                friend_requests: {
                    ...action.payload.friend_requests
                },
                pending_requests: {
                    ...action.payload.pending_requests
                }
            }
            return newState
        case SEND_FRIEND_REQUEST:
            newState = {friends:{...state.friends}, friend_requests:{...state.friend_requests}, pending_requests:{...state.pending_requests}}
            newState.pending_requests[action.payload.accepter_id] = {
                "requester_id": action.payload.requester_id,
                "accepter_id" : action.payload.accepter_id,
                "username": action.payload.accepter_username,
                "profileImage" : action.payload.accepter_profileImage
            }
            return newState
        case ADD_FRIEND:
            newState = {friends:{...state.friends}, friend_requests:{...state.friend_requests}, pending_requests:{...state.pending_requests}}
            newState.friends[action.payload.requester_id] = {
                "requester_id": action.payload.requester_id,
                "accepter_id" : action.payload.accepter_id,
                "username": action.payload.accepter_username,
                "profileImage" : action.payload.accepter_profileImage
            }
            if (newState.friend_requests[action.payload.requester_id]){
                delete newState.friend_requests[action.payload.requester_id]
                delete newState.friend_requests[action.payload.accepter_id]
            }
            return newState
        case DELETE_FRIEND:
            newState = {friends:{...state.friends}, friend_requests:{...state.friend_requests}, pending_requests:{...state.pending_requests}}

            delete newState.friends[action.payload.accepter_id]
            delete newState.friend_requests[action.payload.accepter_id]
            delete newState.pending_requests[action.payload.accepter_id]
            delete newState.friends[action.payload.requester_id]
            delete newState.friend_requests[action.payload.requester_id]
            delete newState.pending_requests[action.payload.requester_id]

            return newState
        default:
            return state;
    }
}
