import * as types from "./LoginPage.constraints"
import produce from "immer"

const initialState= {
  isLogin:false,

}
export const LoginPageReducer=(state=initialState,action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_NORMAL_SUCCESS:
        draft.isLogin=true;
        localStorage.setItem("accessToken",action.payload?.tokens)
        /*draft.profile=action.payload;*/
        break;
      case types.LOGIN_NORMAL_FAIL:
       break;
      case types.CHANGE_IS_LOGIN:
        draft.isLogin=false;
        break;
      case types.LOGOUT_ACCOUNT:
        draft.isLogin=false;
        localStorage.removeItem("accessToken")
       /* localStorage.removeItem("accessToken");*/
        break;
      default:
        return state;
    }
  })

