import { productsTypes } from '../Actions/ActionTypes';

const initialState = {
    products: [],
    id: null,
    error: false,
    errorMsg: null,
    loading: false
}

export default (state = initialState, actions) => {
    console.log(state.id)
    switch (actions.type) {
        case productsTypes.ADD_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case productsTypes.ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
        case productsTypes.GET_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: actions.payload,
                id: actions.payload.id
            }
        case productsTypes.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
            case productsTypes.GET_PRODUCT_BY_START:
                return {
                    ...state,
                    loading: true,
                }
            case productsTypes.GET_PRODUCT_BY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    products: actions.payload,
                }
            case productsTypes.GET_PRODUCT_BY_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMsg: actions.payload
                }
        default:
            return state;
    };
    
};