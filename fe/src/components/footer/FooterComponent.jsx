import logo from '../../assets/themes/icons/faviconFooter.svg';
import "./FooterComponent.css"
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";

const FooterComponent = () => {
  return (
    <footer className="clearfix">
      <Helmet>
        <meta charSet="utf-8"/>
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
            <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12">
              <div className="items__footer">
                <p className="item__title">Thông tin liên hệ</p>
                <a href={"https://goo.gl/maps/KDW3BnH2f1zqnEwr7"} target="_blank"><p style={{color: "whitesmoke"}}>CN 1:
                  666/4 Đường 3/2, phường 14, quận 10</p></a>
                <a href={`tel:0967751579`}>
                  <p style={{color: "whitesmoke"}}>Hotline: 0967751579</p>
                </a>
                <a href={`mailto:shoedogsneakers@gmail.com`}>
                  <p style={{color: "whitesmoke"}}>Email: shoedogsneakers@gmail.com</p>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12">
              <div className="items__footer">
                <p className="item__title">Theo dõi chúng tôi</p>
                <a href={"https://www.facebook.com/giay2handschatluong"} target="_blank"><p
                  style={{color: "whitesmoke"}}>Facebook</p></a>
                <a href={"www.instagram.com/shoedog.vn_/"} target="_blank"><p
                  style={{color: "whitesmoke"}}>Instagram</p></a>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 col-md-4 col-xs-12">
              <div className="items__footer" style={{padding: "0px 4px"}}>
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?q=Shoedog+CN+3/2,+Đường+3+Tháng+2,
              +Phường+14,+District+10,+Ho+Chi+Minh+City,+Vietnam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                  width="100%" height="300" style={{border: "0"}} loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
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