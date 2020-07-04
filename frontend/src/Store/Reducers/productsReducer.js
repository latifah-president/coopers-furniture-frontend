import { productsTypes } from '../Actions/ActionTypes';

const initialState = {
    products: [],
    colors: [],
    images: [],
    error: false,
    errorMsg: null,
    loading: false
}

export default (state = initialState, actions) => {
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
                products: actions.payload.products,
                colors: actions.payload.colors,
                images: actions.payload.images,
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
                    products: actions.payload[0],
                    colors: actions.payload[1],
                }
        case productsTypes.GET_PRODUCT_BY_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMsg: actions.payload
                }
        case productsTypes.DELETE_PRODUCT_START:
                    return {
                        ...state,
                        loading: true,
                    }
        case productsTypes.DELETE_PRODUCT_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        products: actions.payload,
                    }
        case productsTypes.DELETE_PRODUCT_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: true,
                        errorMsg: actions.payload
                    }
        case productsTypes.GET_PRODUCT_BY_ID_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                // products: state.products.find( item  => { return actions.payload === `${item.id}`})
                product: actions.payload[0]
            }
        case productsTypes.GET_PRODUCT_BY_ID_FAIL:
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