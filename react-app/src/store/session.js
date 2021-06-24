// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"
const ADD_PAYMENT = "session/ADD_PAYMENT"
const SET_PAYMENT = "session/SET_PAYMENT"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

const addPayment = (payload) => ({
    type: ADD_PAYMENT,
    payload
})

const setPayment = (payload) => ({
    type: SET_PAYMENT,
    payload
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
    // const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username,
    //         email,
    //         password,
    //         full_name,
    //         phonenumber,
    //         profileImage
    //     }),
    // });
    const formData = new FormData();

    formData.append("full_name", full_name);
    formData.append("phonenumber", phonenumber);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // for single file
    if (profileImage) formData.append("image", profileImage);

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "enctype": "multipart/form-data",
        },
        body: formData,
    });

    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}

export const edit = payload => async (dispatch) => {
    const {id, username, email, full_name, phonenumber, profileImage} = payload
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("phonenumber", phonenumber);
    formData.append("username", username);
    formData.append("email", email);
    // for single file
    if (profileImage) formData.append("image", profileImage);
    const response = await fetch(`/api/users/edit/${id}`, {
        method: "PUT",
        headers: {
            "enctype": "multipart/form-data",
        },
        body: formData,
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
}

export const addPaymentDetail = payload => async (dispatch) => {
    const { id, debit_card, bank_number, bank, billing_address} = payload
    const response = await fetch(`/api/users/add/paymentdetail/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            debit_card,
            bank_number,
            bank,
            billing_address
        }),
    })
    const data = await response.json();
    if (data.errors) {
        return data
    }
    dispatch(addPayment(data))
}


export const getPaymentDetail = payload => async (dispatch) => {
    const { id } = payload
    const response = await fetch(`/api/users/add/paymentdetail/${id}`)
    const data = await response.json()
    if(data.errors) {
        return data;
    }
    dispatch(setPayment(data))
}

const initialState = {user: null,
                     paymentdetails: {}}

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
        case SET_PAYMENT:
            newState = {...state}
            newState.paymentdetails = action.payload
            return newState
        case ADD_PAYMENT:
            newState = {...state}
            newState.paymentdetails = {
                [action.payload.id]: action.payload
            }
            return newState
        default:
            return state;
    }
}
