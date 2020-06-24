import { authTypes } from "./../Actions/ActionTypes";
import { userTypes } from "./../Actions/ActionTypes";

const initialState = {
    firebase_id: null,
    email: null,
    first_name: null,
    last_name: null,
    address: null,
    city: null, 
    state: null,
    zip: null,
    phone: null,
    admin: false,
    agent: false,
    cart: [],
    total: 0.00,
    loading: false,
    loggedIn: false,
    error: false,
    authenticated: false,
};

export default (state = initialState, actions) => {

    switch (actions.type) {
        case authTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                // authenticated: true,
                firebase_id: actions.payload[0].firebase_id,
                email: actions.payload[0].email,
                first_name: actions.payload[0].first_name,
                last_name: actions.payload[0].last_name,
                address: actions.payload[0].address,
                city: actions.payload[0].city, 
                state: actions.payload[0].state,
                zip: actions.payload[0].zip,
                phone: actions.payload[0].phone,
                admin: actions.payload[0].admin,
                agent: actions.payload[0].agent,
                loggedIn: true,
                cart: actions.payload[2],
                total: actions.payload[3]
            }
            case authTypes.AUTH_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: actions.payload
                }
            case authTypes.LOGOUT_START:
                return {
                    ...state,
                    loading: true
                }
            case authTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    loggedIn: false,
                }
            case authTypes.LOGOUT_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: actions.payload
                }
                case authTypes.LOGIN_START:
                    return {
                        ...state,
                        loading: true
                    }
                case authTypes.LOGIN_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        loggedIn: actions.payload,
                    }
                case authTypes.LOGIN_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: actions.payload
                    }
                    case userTypes.GET_USER_START:
                        return {
                            ...state,
                            loading: true
                        }
                    case userTypes.GET_USER_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            // loggedIn: true,
                            firebase_id: actions.payload[0].firebase_id,
                            email: actions.payload[0].email,
                            first_name: actions.payload[0].first_name,
                            last_name: actions.payload[0].last_name,
                            address: actions.payload[0].address,
                            city: actions.payload[0].city, 
                            state: actions.payload[0].state,
                            zip: actions.payload[0].zip,
                            phone: actions.payload[0].phone,
                            admin: actions.payload[0].admin,
                            agent: actions.payload[0].agent,
                            cart: actions.payload[2],
                            total: actions.payload[3]
                        }
                        case userTypes.GET_USER_FAIL:
                            return {
                                ...state,
                                loading: false,
                                error: actions.payload
                            }
            default:
            return state;
    };
};