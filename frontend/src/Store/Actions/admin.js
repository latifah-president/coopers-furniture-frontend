import {adminTypes} from "./actionTypes";
import axios from "./../../axiosinstance";

export const registerAdmin = (userObj) =>  (dispatch) => {
    dispatch ({
        type: adminTypes.ADD_ADMIN_START
    })

    axios.post("/admin/addadmin", { ...userObj }).then(res => {
    if (res.status === 201) {
        const data = {
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            email: userObj.email,
            firebase_id: userObj.firebase_id,
        }
        dispatch({
            type: adminTypes.ADD_ADMIN_SUCCESS,
            payload: data
        })
    } else if (res.status === 400) {
        dispatch({
            type: adminTypes.ADD_ADMIN_FAIL,
            payload: res.data
        })
    }
   }).catch( err => {
    dispatch({
        type: adminTypes.ADD_ADMIN_FAIL,
        payload: err
    })
})  
};

export const getUsers = () => (dispatch) => {
    dispatch ({
        type: adminTypes.GET_USERS_START
    })
    axios.get("/admin/users").then(res => {
        if (res.status === 404) {
            dispatch ({
                type: adminTypes.GET_USERS_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: adminTypes.GET_USERS_SUCCESS,
                payload: res.data
            })
        }
        
    })
    .catch (err => {
        dispatch ({
            type: adminTypes.GET_USERS_FAIL,
            payload: err
        })
    })
}

export default  {
    registerAdmin,
}