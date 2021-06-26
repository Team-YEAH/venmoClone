// Constants
const ADD_COMMENT = "comments/ADD_COMMENT"
const GET_COMMENTS = "comments/GET_COMMENTS"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"
// action creators
const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload
})

const getComments=(payload) =>({
    type: GET_COMMENTS,
    payload
})

const removeComment = (payload) => ({
    type: REMOVE_COMMENT,
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

export const deleteComment = (payload) => async (dispatch) => {
    const { comment, id } = payload
    // console.log("hey")
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
            id
        })
    });
    const data = await res.json();
    if (data.errors) {
        return data;
    }
    // console.log(data, 'HEYYYYY JIMMMYYYY ')
    dispatch(removeComment(data))
    return data
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
            newState= [...state]
            newState=action.payload
            return newState
        case REMOVE_COMMENT:
            newState = [...state]
            newState.forEach((obj, id) => {
               if (newState[id].id===action.payload.id) {
                    // delete newState[id]
                    newState.splice(id, 1)
               }
            })
            return newState
        default:
            return state;
    }
}
