import { productsTypes } from '../Actions/ActionTypes';

const initialState = {
    products: [],
    colors: [],
    images: [],
    error: false,
    errorMsg: null,
    loading: false,
    deleted: false,
    deletedMsg: null,
    edit: false,
    editMsg: null,
    editSuccess: false,
    deleteSucces: false
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
                products: actions.payload.products.data,
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
                    images: actions.payload[2],
                    edit: state.edit,
                    deleted: false
                }
        case productsTypes.GET_PRODUCT_BY_FAIL:
                return {
                  ...state,
                    loading: false,
                    error: true,
                    errorMsg: actions.payload
                }
        case productsTypes.SET_UPDATE:
            return {
                ...state,
                edit: true
            }
        case productsTypes.UPDATE_PRODUCT_START:
            return {
                ...state,
                loading: true
            }
        case productsTypes.UPDATE_PRODUCT_SUCCESS:
                    
            return {
                ...state,
                loading: false,
                products: state.products.map(item =>
                    item.id === actions.payload.id ? actions.payload.updates : item,
                    ),
                editSuccess: true,
                editMsg: actions.payload.message,
                edit: false
            }
        case productsTypes.UPDATE_PRODUCT_FAIL:
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
                        products: state.products.filter(item => item.id !== actions.payload),
                        deleted: true,
                        deletedMsg: actions.payload.message,
                        deleteSucces: true
                        // images: state.images.filter(item => item.id !== actions.payload),
                        // colors: state.colors.filter(item => item.id !== actions.payload),

                    }
        case productsTypes.DELETE_PRODUCT_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: true,
                        errorMsg: actions.payload.message
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
                products: actions.payload[0]
            }
        case productsTypes.GET_PRODUCT_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
            case productsTypes.GET_PRODUCT_BY_CAT_START:
                return {
                    ...state,
                    loading: true,
                }
            case productsTypes.GET_PRODUCT_BY_CAT_SUCCESS:
                console.log("product reducer",actions.payload.products)
                return {
                    ...state,
                    loading: false,
                    // products: state.products.find( item  => { return actions.payload === `${item.id}`})
                    products: actions.payload.products
                }
            case productsTypes.GET_PRODUCT_BY_CAT_FAIL:
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