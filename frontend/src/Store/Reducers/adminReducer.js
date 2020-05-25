import { adminTypes } from "./../Actions/actionTypes";

const initialState = {
    user: [],
    firebase_id: null,
    email: null,
    first_name: null,
    last_name: null,
    // address: null,
    // city: null, 
    // state: null,
    // zip: null,
    // phone: null,
    admin: null,
    // cart: [],
    // total: 0.00,
    loading: false,
    loggedIn: false,
    error: null
};

export default (state = initialState, actions) => {

    switch (actions.type) {
        case adminTypes.ADD_ADMIN_START:
            return {
                ...state,
                loading: true
            }
        case adminTypes.ADD_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                firebase_id: actions.payload.firebase_id,
                email: actions.payload.email,
                first_name: actions.payload.first_name,
                last_name: actions.payload.last_name,
                // address: actions.payload[0].address,
                // city: actions.payload[0].city, 
                // state: actions.payload[0].state,
                // zip: actions.payload[0].zip,
                // phone: actions.payload[0].phone,
            }
            case adminTypes.ADD_ADMIN_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: actions.payload
                }
            case adminTypes.GET_USERS_START:
                return {
                    ...state,
                    loading: true
                }
            case adminTypes.GET_USERS_SUCCESS:
                return {
                    ...state,
                    users: actions.payload
                }
            case adminTypes.GET_USERS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: actions.payload
                }
            default:
            return state;
    };
};