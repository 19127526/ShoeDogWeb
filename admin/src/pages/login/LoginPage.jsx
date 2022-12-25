import {postLoginApi} from "../../apis/auth/AuthApi";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { encrypt, decrypt, compare } from 'n-krypta';
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";


const LoginPage = () => {
  const [userName,setUserName]=useState("");
  const [password,setPassWord]=useState("");
  const navigate=useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();

  }

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
                ModularAdmin
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
                    <input className="checkbox" id="remember" type="checkbox"/>
                      <span>Remember me</span>
                  </label>
                  <a href="reset.html" className="forgot-btn pull-right">Forgot password?</a>
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

export default LoginPage