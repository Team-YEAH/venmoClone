// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const login = (auth, password) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (username, email, password, full_name, phonenumber, profileImage) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            full_name,
            phonenumber,
            profileImage
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}



const initialState = {user: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = {...state}
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = {...state}
            return newState.user = {}
        default:
            return state;
    }
}
