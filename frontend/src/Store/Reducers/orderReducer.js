import {orderTypes, authTypes} from "./../Actions/ActionTypes";

const initialState = {
    order: [],
    total: null,
        // id: null,
        // product_id: null,
        // customer_id: null,
        // status: null,
        // order_total: null,
        // customer_email: null,
        // customer_first_name: null,
        // customer_last_name: null,
        // customer_address: null,
        // customer_city: null,
        // customer_state: null,
        // customer_zip: null,
        // customer_phone: null,
        // agent_commision: null,
        // agent_id: null,
        // created_at: null,
        // notes: null,
        error: false,
        loading: false,
        success: false,
        errMsg: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case orderTypes.ADD_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case orderTypes.ADD_ORDER_SUCCESS:
                    
            return {
                ...state,
                loading: false,
                order: action.payload,
                success: true,
            }
        case orderTypes.ADD_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
            case orderTypes.GET_ORDER_START:
                return {
                    ...state,
                    loading: true,
                }
            case orderTypes.GET_ORDER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    order: action.payload,
                }
            case orderTypes.GET_ORDER_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMsg: action.payload
                }
                case authTypes.RESET_START:
                    return {
                        ...state,
                        loading: true
                    }
            case authTypes.RESET_SUCCESS:
                    return {
                        ...state,
                        state: undefined,
                        order: [],
                        loading: false,
                    }
            case authTypes.RESET_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: true,
                        errorMsg: action.payload
                    }
            case orderTypes.GET_ORDER_BY_AGENT_ID_START:
                return {
                    ...state,
                    loading: true,
                }
            case orderTypes.GET_ORDER_BY_AGENT_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    order: action.payload,
                }
            case orderTypes.GET_ORDER_BY_AGENT_ID_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMsg: action.payload
                }
        default:
        return state;
    };
};