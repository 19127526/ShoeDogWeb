import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";

const AsideComponent=({onClose})=>{

  return (
    <div id="menu__mobi">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`DANH MỤC SẢN PHẨM - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL}
          title={`danh mục sản phẩm - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Danh mục sản phẩm. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <a href="" className="close__menu" onClick={()=>onClose()}><span className="icon-meunu-close" ></span></a>
      <a href="https://www.glab.vn" className="menu__logo"><img src="/themes/v1/icons/logo.svg" alt=""/></a>
      <div className="menu__items">
        <div className="menu__items--inner">
          <ul className="menu-mobile">
            <li>
              <a href="https://www.glab.vn/login">Account<span className="icon-slice6"></span></a>
            </li>
            <li><a href="https://www.glab.vn/contract/find">Find Contract</a></li>
          </ul>
          <ul className="menu-mobile">
            <li>
              <a href="https://www.glab.vn/product/features">Features</a>
            </li>
            <li>
              <a href="https://www.glab.vn/product/footwear">Footwear<span className="icon-navigate_next"></span></a>
              <ul>
                <li>
                  <a href="https://www.glab.vn/product/newest-sneakers">Newest Sneakers</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/lifestyle">Lifestyle</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/running">Running</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/basketball">Basketball</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/gym-training">Gym &amp; Training</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/sandal">Sandal</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="https://www.glab.vn/product/apparel">Apparel<span className="icon-navigate_next"></span></a>
              <ul>
                <li>
                  <a href="https://www.glab.vn/product/conic" style="color:red;">CONIC®</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/glab" style="color:red;">GLAB®</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/shorts">Shorts</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/outerwears">Outerwears</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/tees">Tees</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/pants">Pants</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/shirts">Shirts</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/jackets">Jackets</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/sweaters">Sweaters</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/long-sleeves">Long Sleeves</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/vintage">Vintage</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="https://www.glab.vn/product/accessories">Accessories<span className="icon-navigate_next"></span></a>
              <ul>
                <li>
                  <a href="https://www.glab.vn/product/watch">Watch</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/socks">Socks</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/cap">Cap</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/backpack-and-bag">Backpack and Bag</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/shoe-care">Shoe Care</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/miscellaneous">Miscellaneous</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/glasses">Glasses</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/bearbrick">Bearbrick</a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/face-mask">Face Mask</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="https://www.glab.vn/product/type/used">Used</a>
            </li>
            <li>
              <a href="https://www.glab.vn/product/type/sale">Sale</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AsideComponent