import { combineReducers } from "redux";
import { loadingPage } from "./utils";
import { userInfor } from "./userInfor";

const rootReducer = combineReducers({
    
    loading : loadingPage,

    user : userInfor
})

export default rootReducer;
