import "./ErrorPage.css"
import {useNavigate} from "react-router-dom";
import {CLIENT_URL} from "../../configs/url";
import {Helmet} from "react-helmet";
const ErrorPage=()=>{
  const navigate=useNavigate()
  return(
      <section className="wrapper-error" style={{overflowY:"hidden"}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`VUI LÒNG VỀ TRANG CHỦ - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
          <link
            rel="canonical"
            href={CLIENT_URL+`/error`}
            title={`Vui lòng về trang chủ - Shop giày uy tín nhất TP.HCM »`}
          />
          <meta
            name="description"
            content={`Vui lòng về trang chủ. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
          />
        </Helmet>
        <div className="container-error">

          <div id="scene" className="scene" data-hover-only="false">




            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">OOPS</p>
            <p className="p404" data-depth="0.10">OOPS</p>

          </div>

          <div className="text">
            <article>
              <p>Đường link này không tồn tại <br/>Vui lòng quay trở lại trang chủ !!</p>
              <div className="row" style={{display:"flex",justifyContent:"center"}}>
                <div className="col-md-12" style={{width:"fit-content"}}>
                  <a  onClick={()=>navigate("/")} className="btn btn-glab btn-block btn-success">Quay lại trang chủ</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
  )
}

export default ErrorPage