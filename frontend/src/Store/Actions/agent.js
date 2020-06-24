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

export default  {
    registerAgent,
}