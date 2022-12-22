import {useLocation, useNavigate} from "react-router-dom";
import "./OrSuccessPage.css"
import ErrorPage from "../error/ErrorPage";
import {useDispatch} from "react-redux";
import {removeAllItem} from "../detail/DetailPage.actions";
const OrderSuccessPage=()=>{
  const navigate=useNavigate();
  const location =useLocation();
  const dispatch=useDispatch();
  if(location.state===null||location.state===undefined||location.state.length===0){
    return <ErrorPage/>
  }
  else{
    dispatch(removeAllItem())
  }
  return (
    <div >
      <div className="container order-success" >
        <div className="col-md-12">
          <div className="text-center">
            <div className="col-md-12">
              <div className="alert alert-info fade in alert-dismissable">
                <h4><i className="icon fa fa-warning"></i> Thông báo!</h4>
                Chúc mừng bạn đã đặt hàng thành công. Vui lòng kiểm tra email để xem chi tiết đơn hàng và thông tin
                thanh toán
              </div>

              <div className="row" style={{display:"flex",justifyContent:"center"}}>
                <div className="col-md-12" style={{width:"fit-content"}}>
                  <a  onClick={()=>navigate("/")} className="btn btn-glab btn-block btn-success">Tiếp tục mua hàng</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderSuccessPage