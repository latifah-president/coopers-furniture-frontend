import productReducer from "./productsReducer";
import userReducer from "./usersReducer";
import adminReducer from "./adminReducer";
import agentReducer from "./agentReducer";
import {combineReducers} from "redux";

export default combineReducers({
    product:  productReducer,
    user:  userReducer,
    admin: adminReducer,
    agent: agentReducer,
}); 