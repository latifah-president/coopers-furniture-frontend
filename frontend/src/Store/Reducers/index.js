import productReducer from "./productsReducer";
import userReducer from "./usersReducer";
import {combineReducers} from "redux";

export default combineReducers({
    product:  productReducer,
    user:  userReducer,
}); 