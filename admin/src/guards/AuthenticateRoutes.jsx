import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {addUrlGuard, removeUrlGuard} from "./AuthenticateRoutes.actions";
import Notification from "../components/notification/Notification";
import * as constraintNotification from "../components/notification/Notification.constraints";



const Authenticate = ({children}) => {
  const data = useSelector((state) => state.loginReducer);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const isLogin=data.isLogin;
  const location=useLocation();
  if(isLogin===false ){
    Notification("Notification","Vui lòng đăng nhập", constraintNotification.NOTIFICATION_ERROR)
    dispatch(addUrlGuard({url:location.pathname}))
    return <Navigate to="/login" replace />
  }
  return (
    (isLogin === true /*&& localStorage.getItem("accessToken")*/) ?
      {...children}:
      <Navigate to="/login" replace />
  )
}

export default Authenticate