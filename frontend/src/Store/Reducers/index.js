import productReducer from "./productsReducer";
import userReducer from "./usersReducer";
import adminReducer from "./adminReducer";
import agentReducer from "./agentReducer";
import orderReducer from "./orderReducer";
import {combineReducers} from "redux";

export default combineReducers({
    product: productReducer,

    admin: adminReducer,
    agent: agentReducer,
    order: orderReducer,
    user:  userReducer,

}); 