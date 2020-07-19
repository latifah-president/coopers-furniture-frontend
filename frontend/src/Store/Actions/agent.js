import {agentTypes} from "./ActionTypes";
import axios from "./../../axiosinstance";

export const registerAgent = (userObj) =>  (dispatch) => {
    dispatch ({
        type: agentTypes.ADD_AGENT_START
    })

    axios.post("/agent/addagent", { ...userObj }).then(res => {
    if (res.status === 201) {
        const data = {
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            email: userObj.email,
            firebase_id: userObj.firebase_id,
        }
        dispatch({
            type: agentTypes.ADD_AGENT_SUCCESS,
            payload: data
        })
    } else if (res.status === 400) {
        dispatch({
            type: agentTypes.ADD_AGENT_FAIL,
            payload: res.data
        })
    }
   }).catch( err => {
    dispatch({
        type: agentTypes.ADD_AGENT_FAIL,
        payload: err
    })
})  
};

export const getAgentById = (firebase_id) => dispatch => {
    dispatch ({
        type: agentTypes.GET_AGENT_BY_ID_START
    })
    if (firebase_id) {
        // axios.defaults.headers.common["IdTokenResults"] = idTokenResults;
        axios.get(`/agent/${firebase_id}`)
        .then(res => {
            console.log("get user response", res)
            if (res.status === 200) {
                
                dispatch({
                    type: agentTypes.GET_AGENT_BY_ID_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: agentTypes.GET_AGENT_BY_ID_FAIL,
                payload: err
            })
        })
    } else {
        dispatch ({
            type: agentTypes.GET_AGENT_BY_ID_FAIL,
            payload: "No uid provided"
        })
    }
};

export const getAgents = () => (dispatch) => {
    dispatch ({
        type: agentTypes.GET_USERS_START
    })
    axios.get("/admin/agents").then(res => {
        if (res.status === 404) {
            dispatch ({
                type: agentTypes.GET_AGENT_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: agentTypes.GET_AGENT_SUCCESS,
                payload: res.data
            })
        }
        
    })
    .catch (err => {
        dispatch ({
            type: agentTypes.GET_AGENT_FAIL,
            payload: err
        })
    })
};
export default  {
    registerAgent,
    getAgentById,
    getAgents
}