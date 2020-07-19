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

export const logOut = () => (dispatch) => {
    dispatch ({
        type: authTypes.LOGOUT_START
    });
    // if (msg) {
        dispatch ({
            type: authTypes.LOGOUT_SUCCESS,
            payload: false
        })
    // } else {
        // dispatch ({
        //     type: authTypes.LOGOUT_FAIL,
        //     payload: 'Failed to log user out'
        // })
    // }
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
    console.log("getById action", firebase_id)
    dispatch ({
        type: userTypes.GET_USER_START
    })
    if (firebase_id) {
        // axios.defaults.headers.common["IdTokenResults"] = idTokenResults;
        axios.get(`/user/${firebase_id}`)
        .then(res => {
            // console.log("get user response", res)
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

// export const addToCart = (id, quantity, firebase_id, price) =>  (dispatch) => {
//     dispatch ({
//         type: userTypes.ADD_TO_CART_START
//     })
//     // console.log("price time qty", price*quantity)
   
//     axios.post(`/user/add-to-cart/${id}`, { products_id: id, quantity, firebase_id, price }).then(res => {
//     if (res.status === 201) {
//         // console.log("res from add to cart", res)
//         dispatch({
//             type: userTypes.ADD_TO_CART_SUCCESS,
//             payload: id
//         })
//     } else if (res.status === 400) {
//         dispatch({
//             type: userTypes.ADD_TO_CART_FAIL,
//             payload: res.data.message
//         })
//     }
//    }).catch( err => {
//     dispatch({
//         type: userTypes.ADD_TO_CART_FAIL,
//         payload: err
//     })
// })
    
// };

export const getCart = (id) =>  (dispatch) => {
    dispatch ({
        type: userTypes.GET_CART_START
    })
    axios.get(`/user/${id}/cart`).then(res => {
        console.log("res.data from add to cart", res.data)

    if (res.status === 200) {
        dispatch({
            type: userTypes.GET_CART_SUCCESS,
            payload: res.data
        })
    } else if (res.status === 400) {
        dispatch({
            type: userTypes.GET_CART_FAIL,
            payload: res.data.message
        })
    }
   }).catch( err => {
    dispatch({
        type: userTypes.GET_CART_FAIL,
        payload: err
    })
})
    
};

export const addToCart = (id, firebase_id, price, quantity, color, image) =>  (dispatch) => {
    dispatch ({
        type: userTypes.ADD_TO_CART_START
    })
   
    axios.post(`/user/add-to-cart/${firebase_id}`, { product_id: id, firebase_id, price,  color, image,  quantity }).then(res => {
    if (res.status === 201) {
        dispatch({
            type: userTypes.ADD_TO_CART_SUCCESS,
            payload: id
        })
    } else if (res.status === 400) {
        dispatch({
            type: userTypes.ADD_TO_CART_FAIL,
            payload: res.data.message
        })
    }
   }).catch( err => {
    dispatch({
        type: userTypes.ADD_TO_CART_FAIL,
        payload: err
    })
})
    
};



export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: userTypes.REMOVE_FROM_CART_START
    })
    if (id) {
        axios.delete(`/user/removefromcart/${id}`).then(res => {
            if (res.status === 201) {
                dispatch({
                    type: userTypes.REMOVE_FROM_CART_SUCCESS,
                    payload: id
                })
                // axios.get(`/user/${id}/cart`).then(res => {
                //     console.log("remove res", res.data)
                   
                // })
               
            } else if (res.status === 404) {
                dispatch({
                    type: userTypes.REMOVE_FROM_CART_FAIL,
                    payload: res.data.message
                })
            }
           
        })
        .catch(err => {
            dispatch({
                type: userTypes.REMOVE_FROM_CART_FAIL,
                payload: err.message
            })
        })
    } else {
        dispatch({
            type: userTypes.REMOVE_FROM_CART_FAIL,
            payload: `no id provided`
        })
    }
};

export const editCart = (id, updates) => (dispatch) => {
    dispatch({
        type: userTypes.UPDATE_CART_START
    })
    axios.put(`/user/update/${id}`, {updates}).then(res => {
        if (res.status === 404) {
            dispatch({
                type: userTypes.UPDATE_CART_FAIL,
                payload: res.data.message
            })
        } else if (res.status === 204) {
            dispatch({
                type: userTypes.UPDATE_CART_SUCCESS,
                payload: res.data.message
            })
        }
    })
};
export default {
    register,
    initAuth,
    logOut,
    logIn,
    getById,
    addToCart,
    getCart,
    removeFromCart,
    editCart,
}