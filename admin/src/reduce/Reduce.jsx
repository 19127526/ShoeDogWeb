import {combineReducers} from "redux";
import {MainLayoutReducer} from "../layouts/mainlayout/MainLayout.reducer";


const rootReducer = combineReducers({
  mainReducer:MainLayoutReducer
})

export default rootReducer