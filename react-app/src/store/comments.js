// Constants
const ADD_COMMENT = "comments/ADD_COMMENT"
const GET_COMMENTS = "comments/GET_COMMENTS"
// action creators
const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload
})

const getComments=(payload) =>({
    type: GET_COMMENTS,
    payload
})
// thunks
export const obtainComments=(id) =>async(dispatch) =>{
    const response = await fetch(`/api/comments/${id}`)
    const data = await response.json()
    if (data.errors) {
        return data;
    }

    dispatch(getComments(data.comments))

}

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
    console.log(data, "ASJKFHJASFHJKASFKHASKFHASHFJKASHFJKAS")
    dispatch(addComment(data))
}

// initial state
const initialState = []

// reducer

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = [...state]
            newState.push(action.payload)
            return newState
        case GET_COMMENTS:
            newState= {...state}
            newState=action.payload
            return newState
        default:
            return state;
    }
}
