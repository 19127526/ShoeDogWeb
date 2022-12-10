import {combineReducers} from "redux";
import {DetailPageReducer} from "../pages/detail/DetailPage.reducer";
import {MainLayoutReducer} from "../layouts/mainlayout/MainLayout.reducer";


const rootReducer = combineReducers({
  cartReducer:DetailPageReducer,
  mainReducer:MainLayoutReducer
})

export default rootReducer