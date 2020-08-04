import {productsTypes} from "./ActionTypes";
import axios from "./../../axiosinstance";

export const addProduct = (productObj) => (dispatch) => {
    // console.log("TOP {...prodObj}", {...productObj})
    //     
    dispatch ({
        type: productsTypes.ADD_PRODUCT_START,
    })
    axios.post("admin/addproduct", {...productObj}).then(res => {
      
        if (res.status === 201) {
            dispatch({
                type: productsTypes.ADD_PRODUCT_SUCCESS,
                payload: res.data
            })
        } else if (res.status === 400) {
            dispatch({
                type: productsTypes.ADD_PRODUCT_FAIL,
                payload: res.data.message
            })
        }
    }).catch (err => {
        dispatch({
            type: productsTypes.ADD_PRODUCT_FAIL,
            payload: err
        })
    }) 
};

export const getProducts = () => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_START,
    })
    axios.get(`/`).then(res => {
        console.log("TOP prodObj", res)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: productsTypes.GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_FAIL,
            payload: err
        })
    })
};


export const updateProduct = (id, updates) => (dispatch) => {
    dispatch ({
        type: productsTypes.UPDATE_PRODUCT_START,
    })
    axios.put(`/admin/edit/${id}`, {...updates}).then(res => {
        if (res.status === 404) {
            dispatch({
                type: productsTypes.UPDATE_PRODUCT_FAIL,
                payload: res.data.message
            })
        } else if (res.status === 200) {
            const message = res.data.message
            dispatch({
                type: productsTypes.UPDATE_PRODUCT_SUCCESS,
                payload: {updates, id, message}, 
            })
        }
    }).catch (err => {
        dispatch({
            type: productsTypes.UPDATE_PRODUCT_FAIL,
            payload: err
        })
    }) 
};

export const deleteProduct = (id, color_id, image_id) => (dispatch) => {
    console.log("id, color_id, image_id from backend", id, color_id, image_id)
    dispatch ({
        type: productsTypes.DELETE_PRODUCT_START,
    })
    axios.delete(`/admin/deleteprod/?id=${id}&color_id=${color_id}&image_id=${image_id}`).then(res => {
        console.log("delete res", res)
        if (res.status === 404) {
            dispatch({
                type: productsTypes.DELETE_PRODUCT_FAIL,
                payload: res.data
            })
        } else if (res.status === 204) {
            dispatch({
                type: productsTypes.DELETE_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch({
            type: productsTypes.DELETE_PRODUCT_FAIL,
            payload: err
        })
    }) 
};

export const getProductsBy = (col, filter) => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_BY_START,
    })
    axios.get(`/product/?col=${col}&filter=${filter}`).then(res => {
        console.log("product by res", res)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_BY_FAIL,
            payload: err
        })
    })
};

export const getProductsById = (id) => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_BY_ID_START,
    })
    axios.get(`/product/${id}`).then(res => {
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_ID_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                
                type: productsTypes.GET_PRODUCT_BY_ID_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_BY_ID_FAIL,
            payload: err
        })
    })
};

export const getProductsByCat = (cat) => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_BY_CAT_START,
    })
    axios.get(`/product/category/${cat}`).then(res => {
        console.log("prod by cat", res.data.products)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_CAT_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                
                type: productsTypes.GET_PRODUCT_BY_CAT_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_BY_CAT_FAIL,
            payload: err
        })
    })
};

export const setUpdate = () => dispatch => {
    dispatch ({
        type: productsTypes.SET_UPDATE,
        payload: true
    })
};

export default {
    addProduct,
    getProducts,
    updateProduct,
    getProductsBy,
    deleteProduct,
    getProductsById,
    getProductsByCat,
    setUpdate 
}