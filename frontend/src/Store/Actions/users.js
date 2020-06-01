import {authTypes} from "./ActionTypes";
import {userTypes} from "./ActionTypes";
import axios from "./../../axiosinstance";

export const initAuth = (email, uid, idToken, idTokenResults) => dispatch => {
    dispatch ({
        type: authTypes.AUTH_START
    })
    if (uid) {
        axios.defaults.headers.common["Authorization"] = idToken;
        // axios.defaults.headers.common["IdTokenResults"] = idTokenResults;
        axios.get(`/user/${uid}`)
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: authTypes.AUTH_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: authTypes.AUTH_FAIL,
                payload: err
            })
        })
    } else {
        dispatch ({
            type: authTypes.AUTH_FAIL,
            payload: "No uid provided"
        })
    }
};

export const register = (userObj) =>  (dispatch) => {
    dispatch ({
        type: authTypes.REGISTER_START
    })

    axios.post("/user/register", { ...userObj }).then(res => {
    if (res.status === 201) {
        const data = {
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            email: userObj.email,
            firebase_id: userObj.firebase_id,
        }
        dispatch({
            type: authTypes.REGISTER_SUCCESS,
            payload: data
        })
    } else if (res.status === 400) {
        dispatch({
            type: authTypes.REGISTER_FAIL,
            payload: res.data
        })
    }
   }).catch( err => {
    dispatch({
        type: authTypes.REGISTER_FAIL,
        payload: err
    })
})
    
}

export const logOut = (msg) => (dispatch) => {
    dispatch ({
        type: authTypes.LOGOUT_START
    });
    if (msg) {
        dispatch ({
            type: authTypes.LOGOUT_SUCCESS,
            payload: false
        })
    } else {
        dispatch ({
            type: authTypes.LOGOUT_FAIL,
            payload: 'Failed to log user out'
        })
    }
};

export const logIn = (user) => (dispatch) => {
    dispatch ({
        type: authTypes.LOGIN_START
    })
    if (user) {
        dispatch ({
            type: authTypes.LOGIN_SUCCESS,
            payload: true
        })
    } else {
    
    dispatch ({
        type: authTypes.LOGIN_FAIL,
        payload: 'Failed to login user'
    })
}
};


export const getById = (firebase_id) => dispatch => {
    dispatch ({
        type: userTypes.GET_USER_START
    })
    if (firebase_id) {
        // axios.defaults.headers.common["IdTokenResults"] = idTokenResults;
        axios.get(`/user/${firebase_id}`)
        .then(res => {
            console.log("get user response", res)
            if (res.status === 200) {
                
                dispatch({
                    type: userTypes.GET_USER_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: userTypes.GET_USER_FAIL,
                payload: err
            })
        })
    } else {
        dispatch ({
            type: userTypes.GET_USER_FAIL,
            payload: "No uid provided"
        })
    }
};
export default {
    register,
    initAuth,
    logOut,
    logIn,
    getById,
}