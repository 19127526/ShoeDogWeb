import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { encrypt, decrypt, compare } from 'n-krypta';
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {loginNormal} from "./LoginPage.thunk";
import * as constraints from "./LoginPage.constraints"
import {removeUrlGuard} from "../../guards/AuthenticateRoutes.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import {REGISTER} from "../../configs/url";

const secret = 'my-secret';

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  loginNormal:loginNormal
}

const connector = connect(mapStateToProps,mapDispatchToProps)

const LoginPage = (props) => {
  const {loginNormal}=props
  const [userName,setUserName]=useState("");
  const [password,setPassWord]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const dataUrl=useSelector((state)=>state.authenticateReducer);
  const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken"): null
  const handleLogin = async (event) => {
    event.preventDefault();
    const temp=await loginNormal({userName:userName,password:password});
    if(temp.type===constraints.LOGIN_NORMAL_SUCCESS){
      Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)
      dispatch(removeUrlGuard());
      navigate(dataUrl?.url);
    }
    else{
      Notification("Thông báo đăng nhập", "Đăng nhập thất bại (Tài khoản và mật khẩu không đúng",constraintNotification.NOTIFICATION_ERROR)
    }
  }

  useEffect(() => {
    if(accessToken == null) {
      Notification("Thông báo đăng nhập", "Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại",constraintNotification.NOTIFICATION_ERROR)
    }
  },[accessToken])

  return (
    <>
      <div className="auth">
        <div className="auth-container" style={{marginBottom:"0"}}>
          <div className="card" style={{height:"100%"}}>
            <header className="auth-header">
              <h1 className="auth-title">
                <div className="logo">
                  <span className="l l1"></span>
                  <span className="l l2"></span>
                  <span className="l l3"></span>
                  <span className="l l4"></span>
                  <span className="l l5"></span>
                </div>
               SHOE DOG ADMIN
              </h1>
            </header>
            <div className="auth-content">
              <p className="text-center">LOGIN TO CONTINUE</p>
              <form id="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control underlined" name="username" id="username"
                         placeholder="Your user name" required onChange={(e)=>setUserName(e.target.value)}/></div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control underlined" name="password" id="password"
                         placeholder="Your password" required onChange={(e)=>setPassWord(e.target.value)}/></div>
                <div className="form-group">
                  <label htmlFor="remember">
                      <span>Please login to access admin page</span>
                  </label>
                 {/* <a onClick={()=>navigate(REGISTER)} className="forgot-btn pull-right">Register</a>*/}
                </div>
                <div className="form-group" >
                  <button type="submit" className="btn btn-block btn-primary" type="submit" value="Submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="ref" id="ref">
        <div className="color-primary"></div>
        <div className="chart">
          <div className="color-primary"></div>
          <div className="color-secondary"></div>
        </div>
      </div>

    </>
)
}


export default connector(LoginPage)