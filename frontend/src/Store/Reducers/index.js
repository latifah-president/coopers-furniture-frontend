import productReducer from "./productsReducer";
import userReducer from "./usersReducer";
import adminReducer from "./adminReducer";
import {combineReducers} from "redux";

export default combineReducers({
    product:  productReducer,
    user:  userReducer,
    admin: adminReducer,
}); 