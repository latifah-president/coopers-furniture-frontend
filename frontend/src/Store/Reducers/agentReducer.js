import { agentTypes } from "./../Actions/ActionTypes";

const initialState = {
    cash_app_name: null,
    commision: 0,
    agent: null,
    loading: false,
    loggedIn: false,
    error: null,
    agent_id: null
};

export default (state = initialState, action) => {

    switch (action.type) {
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
                agent_id: action.payload.firebase_id,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
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
                    error: action.payload
                }
                case agentTypes.GET_AGENT_BY_ID_START:
                    return {
                        ...state,
                        loading: true
                    }
                case agentTypes.GET_AGENT_BY_ID_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        commision: action.payload.commision,
                        cash_app_name: action.payload.cash_app_name,
                        agent_id: action.payload.agent_id,
                    }
                case agentTypes.GET_AGENT_BY_ID_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
            default:
            return state;
    };
};