import {combineReducers} from "redux";
import {MainLayoutReducer} from "../layouts/mainlayout/MainLayout.reducer";
import {LoginPageReducer} from "../pages/login/LoginPage.reducer";
import {AuthenticateRoutesReducer} from "../guards/AuthenticateRoutes.reducer";


const rootReducer = combineReducers({
  mainReducer:MainLayoutReducer,
  loginReducer:LoginPageReducer,
  authenticateReducer:AuthenticateRoutesReducer
})

export default rootReducer