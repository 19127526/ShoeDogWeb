import logo from '../../assets/themes/icons/faviconFooter.svg';
import "./FooterComponent.css"
const FooterComponent=()=>{
  return (
    <footer className="clearfix">
      <div className="footer__logo">
      <a><img src={logo} alt="" className="img-footer"/></a>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <div className="items__footer">
                <p className="item__title">Thông tin liên hệ</p>
                <p style={{color:"whitesmoke"}}>CN 1: 666/4 Đường 3/2, phường 14, quận 10</p>
                <p style={{color:"whitesmoke"}}>CN 2: 86/118 Trường Chinh , P12 , Q.Tân Bình</p>
                <p style={{color:"whitesmoke"}}>Hotline: 0865414134</p>
              </div>
            </div>
            <div className="col-sm-6 col-xs-6">
              <div className="items__footer items_footer_word_break">
                <p className="item__title">Kết nối fanpage</p>
                <p style={{color:"whitesmoke"}}>Email: Shoedogsneakers@gmail.com</p>
                <p style={{color:"whitesmoke"}}>Website: www.shoedog.vn</p>
                <p style={{color:"whitesmoke"}}>Instagram: www.instagram.com/shoedog.vn_/</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/*  <div className="copyright">Copyright © 2018 GLAB.VN</div>*/}

      <div className="container hide">
        <div className="footer__left">
          <a ><img src="/themes/v1/icons/logo-footer.svg"/></a>
        </div>
        <div className="footer__menu">
          <ul>
            <li><a >home</a></li>
            <li><a >store</a></li>
            <li><a >CONSIGNMENT</a></li>
            <li><a >CONNECT WITH US</a></li>
            <li><a >LOCATION</a></li>
            <li><a >POLICY &amp; TERM</a></li>
          </ul>

        </div>
        <div className="footer__right">

          <div className="footer__right__social"><a ><span className="icon-facebook2"></span></a><a ><span
            className="icon-306026"></span></a><a ><span className="icon-play"></span></a>
          </div>
          <form id="frm-email" className="">
            <div className="frm-icon">
              <input type="text" placeholder="YOUR EMAIL"/>
                <button type="submit" className="icon-frm"><span className="icon-search"></span></button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent