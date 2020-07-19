import {orderTypes, authTypes} from "./ActionTypes";
import axios from "./../../axiosinstance";

export const addOrder = (orderObj, order_items) =>  (dispatch) => {
    console.log("orderObj, order_ITEM", orderObj, order_items)

    dispatch ({
        type: orderTypes.ADD_ORDER_START
    })
   
    axios.post(`/order/place-order`, {orderObj, order_items}).then(res => {
        console.log("RES", res)

    if (res.status === 200) {
        
        dispatch({
            type: orderTypes.ADD_ORDER_SUCCESS,
            payload: res.data
        })
    } else if (res.status === 400) {
        dispatch({
            type: orderTypes.ADD_ORDER_FAIL,
            payload: res.data.message
        })
    }
   }).catch( err => {
    dispatch({
        type: orderTypes.ADD_ORDER_FAIL,
        payload: err
    })
})
    
};

export const getOrders = () => (dispatch) => {
    dispatch ({
        type: orderTypes.GET_ORDER_START,
    })
    axios.get("/order").then(res => {
        console.log("TOP orderObj", res)
        if (res.status === 404) {
            dispatch ({
                type: orderTypes.GET_ORDER_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: orderTypes.GET_ORDER_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: orderTypes.GET_ORDER_FAIL,
            payload: err
        })
    })
};

export const resetState = () => (dispatch) => {
    dispatch ({
        type: authTypes.RESTART_START
    });
        dispatch ({
            type: authTypes.RESTART_SUCCESS,
            payload: false
        })
};

export const getOrdersByAgentId = (agent_id) => (dispatch) => {
    dispatch ({
        type: orderTypes.GET_ORDER_BY_AGENT_ID_START,
    })
    axios.get(`/order/agent/${agent_id}`).then(res => {
        console.log("TOP orderObj", res)
        if (res.status === 404) {
            dispatch ({
                type: orderTypes.GET_ORDER_BY_AGENT_ID_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: orderTypes.GET_ORDER_BY_AGENT_ID_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: orderTypes.GET_ORDER_BY_AGENT_ID_FAIL,
            payload: err
        })
    })
};
export default  {
addOrder,
resetState,
}