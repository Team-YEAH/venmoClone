// Constants
const ADD_COMMENT = "comments/ADD_COMMENT"

// action creators
const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload
})

// thunks

export const makeComment = (payload) => async (dispatch) => {
    const { comment, id} = payload
    const res = await fetch(`/api/comments/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment
        })
    })

    const data = await res.json();
    if (data.errors) {
        return data
    }
    dispatch(addComment(data))
}

// initial state
const initialState = {comments: null}

// reducer

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = {...state}
            newState.comments = action.payload
            return newState
        default:
            return state;
    }
}
