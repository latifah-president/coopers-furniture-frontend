import {productsTypes} from "./ActionTypes";
import axios from "./../../axiosinstance";

export const addProduct = (productObj) => (dispatch) => {
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
    axios.get("/").then(res => {
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
    axios.post(`/admin/edit/${id}`, {...updates}).then(res => {
        if (res.status === 404) {
            dispatch({
                type: productsTypes.UPDATE_PRODUCT_FAIL,
                payload: res.data.message
            })
        } else if (res.status === 200) {
            dispatch({
                type: productsTypes.UPDATE_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch({
            type: productsTypes.UPDATE_PRODUCT_FAIL,
            payload: err
        })
    }) 
};

export const deleteProduct = (id) => (dispatch) => {
    dispatch ({
        type: productsTypes.DELETE_PRODUCT_START,
    })
    axios.post(`/admin/delete/${id}`).then(res => {
        if (res.status === 404) {
            dispatch({
                type: productsTypes.DELETE_PRODUCT_FAIL,
                payload: res.data.message
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

export default {
    addProduct,
    getProducts,
    updateProduct,
    getProductsBy,
}