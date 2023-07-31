import logo from '../../assets/themes/icons/faviconFooter.svg';
import "./FooterComponent.css"
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
const FooterComponent=()=>{
  return (
    <footer className="clearfix">
      <Helmet>
        <meta charSet="utf-8" />
        <link
          rel="canonical"
          href={CLIENT_URL}
          title={`Thông tin liên lạc - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Thông tin liên lạc. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="footer__logo">
      <a><img src={logo} alt="" className="img-footer"/></a>
      </div>

      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="row">
            <div className="col-sm-6">
              <div className="items__footer">
                <p className="item__title">Thông tin liên hệ</p>
                <a href={"https://goo.gl/maps/KDW3BnH2f1zqnEwr7"} target="_blank"> <p style={{color:"whitesmoke"}} >CN 1: 666/4 Đường 3/2, phường 14, quận 10</p></a>
                <a href={"https://goo.gl/maps/MB43jKQ9t9XaRDnx5"} target="_blank"> <p style={{color:"whitesmoke"}}>CN 2: 86/118 Trường Chinh , P12 , Q.Tân Bình</p></a>
                <p style={{color:"whitesmoke"}}>Hotline: 0865414134</p>
                <p style={{color:"whitesmoke"}}>Email: Shoedogsneakers@gmail.com</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="items__footer">
                <p className="item__title">Theo dõi chúng tôi</p>
                <a href={"https://www.facebook.com/giay2handschatluong"} target="_blank"><p style={{color:"whitesmoke"}}>Facebook</p></a>
                <a href={"www.instagram.com/shoedog.vn_/"} target="_blank"> <p style={{color:"whitesmoke"}}>Instagram</p></a>
              </div>
            </div>
          {/*  <div className="col-sm-4">
              <div className="items__footer">
                <p className="item__title">Follow Us</p>
                <p><a href="https://www.facebook.com/glab.vn/">Facebook</a></p>
                <p><a href="https://www.instagram.com/glab.vn/">Instagram</a></p>
                <p><a href="https://www.youtube.com/user/giaytv">Youtube</a></p>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    {/*  <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <div className="items__footer">
                <p className="item__title">Thông tin liên hệ</p>
               <a href={"https://goo.gl/maps/KDW3BnH2f1zqnEwr7"} target="_blank"> <p style={{color:"whitesmoke"}} >CN 1: 666/4 Đường 3/2, phường 14, quận 10</p></a>
                <a href={"https://goo.gl/maps/MB43jKQ9t9XaRDnx5"} target="_blank"> <p style={{color:"whitesmoke"}}>CN 2: 86/118 Trường Chinh , P12 , Q.Tân Bình</p></a>
                <p style={{color:"whitesmoke"}}>Hotline: 0865414134</p>
                <p style={{color:"whitesmoke"}}>Email: Shoedogsneakers@gmail.com</p>
              </div>
            </div>
            <div className="col-sm-6 col-xs-6">
              <div className="items__footer items_footer_word_break">
                <p className="item__title">Theo dõi chúng tôi</p>
                <a href={"https://www.facebook.com/giay2handschatluong"} target="_blank"><p style={{color:"whitesmoke"}}>Facebook</p></a>
                <a href={"www.instagram.com/shoedog.vn_/"} target="_blank"> <p style={{color:"whitesmoke"}}>Instagram</p></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© Copyright 2023 By SHOEDOG. Powered by MatBao</div>*/}
    </footer>
  )
}

export default FooterComponent