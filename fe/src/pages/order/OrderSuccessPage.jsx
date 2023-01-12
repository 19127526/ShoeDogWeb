import {useLocation, useNavigate} from "react-router-dom";
import "./OrSuccessPage.css"
import ErrorPage from "../error/ErrorPage";
import {useDispatch} from "react-redux";
import {removeAllItem} from "../detail/DetailPage.actions";
import {Button, Result} from "antd";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
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
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`ORDER SẢN PHẨM THÀNH CÔNG - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL + `/order/success`}
          title={`order sản phẩm thành công - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`order sản phẩm thành công. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="container order-success" >
        <div className="col-md-12">
          <div className="text-center">
            <div className="col-md-12">
              <Result
                status="success"
                title="Đặt hàng thành công!"
                subTitle=" Chúc mừng bạn đã đặt hàng thành công. Vui lòng kiểm tra email để xem chi tiết đơn hàng và thông tin
                thanh toán"
                extra={[
                  <div className="row" style={{display:"flex",justifyContent:"center"}}>
                    <div className="col-md-12" style={{width:"fit-content"}}>
                      <a  onClick={()=>navigate("/")} className="btn btn-glab btn-block btn-success">Tiếp tục mua hàng</a>
                    </div>
                  </div>
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderSuccessPage