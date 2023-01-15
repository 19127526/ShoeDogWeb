import {useLocation, useNavigate} from "react-router-dom";
import "./NothingProduct.css"
import {FrownOutlined} from "@ant-design/icons"
import {Button, Result} from "antd";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import gif from "../../assets/themes/icons/loading.gif"
const NothingProduct=()=>{
  const navigate=useNavigate();
  return (
    <div >
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`- SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL + `/order/success`}
          title={` - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="container order-success" >
        <div className="col-md-12">
          <div className="text-center">
            <div className="col-md-12">
              <Result
                icon={<FrownOutlined />}
                title="Mục này chưa có sản phẩm nào. Vui lòng hãy chọn mục khác hoặc quay về trang chủ"
                extra={[
                  <div className="row" style={{display:"flex",justifyContent:"center"}}>
                    <div className="col-md-12" style={{width:"fit-content"}}>
                      <a  onClick={()=>navigate("/")} className="btn btn-glab btn-block btn-success">Quay lại trang chủ</a>
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


export default NothingProduct