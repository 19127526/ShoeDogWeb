import * as actions from "./LoginPages.actions"
import {postLoginNormal} from "../../apis/login/loginApi";
import * as constraints from "./LoginPage.constraints"
import request from "../../apis/request";
import registerUser from "../../service/socket";
import {encrypt} from "n-krypta";
import {postLoginApi} from "../../apis/auth/AuthApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";


const secret = 'my-secret';

export const loginNormal = (payload) => dispatch => {
  const password=payload.password;
  const userName=payload.userName;
  const encryptedString = encrypt(password, secret);
  return postLoginApi({userName:userName,password:encryptedString})
    .then(res=>{
      console.log(res)
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


