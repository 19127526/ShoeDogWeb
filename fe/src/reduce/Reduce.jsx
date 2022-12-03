import {combineReducers} from "redux";
import {DetailPageReducer} from "../pages/detail/DetailPage.reducer";


const rootReducer = combineReducers({
  cartReducer:DetailPageReducer
})

export default rootReducer