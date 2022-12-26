import * as actions from "./LoginPages.actions"
import {encrypt} from "n-krypta";
import {postLoginApi} from "../../apis/auth/AuthApi";



const secret = 'my-secret';

export const loginNormal = (payload) => dispatch => {
  const password=payload.password;
  const userName=payload.userName;
  const encryptedString = encrypt(password, secret);
  return postLoginApi({userName:userName,password:encryptedString})
    .then(res=>{
      if(res.data.status=="success"){
        return dispatch(actions.loginNormalSuccess(payload))
      }
      else if(res.data.status=="wrong") {
        return dispatch(actions.loginNormalFail())
      }
    })
    .catch(err=>{
      return dispatch(actions.loginNormalFail())
    })
}


