import { agentTypes } from "./../Actions/ActionTypes";

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
    agent: null,
    // cart: [],
    // total: 0.00,
    loading: false,
    loggedIn: false,
    error: null
};

export default (state = initialState, actions) => {

    switch (actions.type) {
        case agentTypes.ADD_AGENT_START:
            return {
                ...state,
                loading: true
            }
        case agentTypes.ADD_AGENT_SUCCESS:
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
            case agentTypes.ADD_AGENT_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: actions.payload
                }
            default:
            return state;
    };
};