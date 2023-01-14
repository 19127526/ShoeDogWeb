import logo from '../../assets/themes/icons/favicon.svg';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import CartComponent from "../cart/CartComponent";
import {useComponentSize} from "react-use-size";
import {useSelector} from "react-redux";
import {Avatar, Badge, Space} from "antd";
import LoadingComponent from "../loading/LoadingComponent";
import "./Header.css"
import {turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";

const HeaderComponent = ({categoryList, searchButton, loading ,setChangeSide}) => {
  const navigate = useNavigate();
  const [cartButton, setCartButton] = useState(false);
  const dataProduct = useSelector(state => state.cartReducer);
  const [cartItem, setCartItem] = useState([dataProduct?.cartItem]);
  const [totalPriceCart,setTotalPriceCart]=useState(0);
  useEffect(() => {
    setCartItem(dataProduct?.cartItem.map(index=>{
      const totalPrice=index?.aboutSize.price*index?.quantity;
      return {...index,totalPrice:totalPrice}
    }));
    const temp=dataProduct?.cartItem.map(index=>{
      return index?.aboutSize.price*index?.quantity
    })
    setTotalPriceCart(temp.reduce((previousScore, currentScore)=>previousScore+currentScore,0))
  }, [dataProduct?.cartItem]);

  const checkOutButton=()=>{
    setCartButton(false)
    navigate("/order");
  }
  return (
    <header className="clearfix">
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
      <a id="togger__menu" onClick={()=>setChangeSide(true)}>
        <span></span>
        <span></span>
      </a>
      <div className="container">
        <div className="header__left">
          <a style={{display: "none"}}>SELL</a>
          <a style={{display: "none"}}>CONSIGNMENT MANAGER</a>
        </div>
        <div className="header__right">

          <a className="header__right--mbsearch" style={{display: "inline-block"}} onClick={() => searchButton()}><span
            className="icon-search"></span></a>
          <div className="header__cart dropdown" >
            <a className={cartButton === true ? "val-selected active" : "val-selected"} onClick={() => setCartButton(!cartButton)}>

              <Badge size={"small"} count={cartItem?.length} offset={[8, 1]} >
              <span className="icon-slice8"></span>
              </Badge>
            <span className={cartItem?.length===0?"header__cart--num hide":"header__cart--num"}></span></a>
            <div className={cartButton === true ? "dropdown-up-style active" : "dropdown-up-style hide"}>
              <div className="dropdown__inner" >
                <h2 className="text-uper font-700 fs-16">Giỏ hàng của bạn</h2>
                {cartItem.length === 0 ?
                  <div className="text-center">
                    <p className="font-500 fs-15 mgB-15">Không có sản phẩm nào !</p>
                  </div>
                  :
                  <>
                    {cartItem.map(index => (
                      <CartComponent img={index?.detailProduct?.ImageMain} productName={index?.detailProduct?.ProName}
                                     quantity={index?.quantity}
                                     price={index?.totalPrice}  size={index?.aboutSize?.size} index={index} setCartButton={setCartButton} />
                    ))}
                    <hr/>
                    <div className="clearfix mgB-20">
                      <span className="text-uper fs-14 font-600">Tổng giỏ hàng</span>

                      <p className="pull-right product-price font-600">{totalPriceCart?.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-500 fs-15 mgB-15">Phí vận chuyển và thuế sẽ tính lúc thanh toán</p>
                      <a onClick={checkOutButton} className="text-uper btn-checkout ">Thanh toán</a>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="text-center header__logo">
          <span>logo</span>
          <a onClick={() => navigate("/")}><img src={logo} alt=""/></a>
        </div>
      </div>
      <div className="container" style={{padding: "0 10% 0 10%"}}>
        <div id="menu">
          <div className="inner-menu">
            <div>
              <ul>
                <li>
                  <a onClick={() => navigate(`/product/6/page=1`)}><span>Giày chính hãng</span></a>
                  <div className="menu__sub">
                    <ul>
                      <li onClick={() => navigate(`/product/6/page=1`)}>
                        <a>Giày Mới</a>
                      </li>
                      <li onClick={() => navigate(`/product/7/page=1`)}>
                        <a >Giày Secondhand</a>
                      </li>
                      <li onClick={() => navigate(`/product/8/page=1`) }>
                        <a >Giày trẻ em</a>
                      </li>
                    </ul>
                  </div>

                </li>
                <li>
                  <a onClick={() => navigate(`/product/11/page=1`)}><span>Áo chính hãng</span></a>
                  <div className="menu__sub">
                    <ul>
                      <li onClick={() => navigate(`/product/11/page=1`) }>
                        <a >Áo Thun</a>
                      </li>
                      <li onClick={() => navigate(`/product/12/page=1`)}>
                        <a>Áo Khoác</a>
                      </li>
                      <li onClick={() => navigate(`/product/9/page=1`)}>
                        <a>Áo Hoodie</a>
                      </li>
                      <li onClick={() => navigate(`/product/10/page=1`)}>
                        <a>Áo Sweater</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {categoryList.map((value,index) => (
                  (value?.CatId!=6&& value?.CatId!=7&&value?.CatId!=8&&value?.CatId!=11&& value?.CatId!=1&& value?.CatId!=9&& value?.CatId!=10&&value?.CatId!=12)?<li key={value.CatId} onClick={() => navigate(`/product/${value.CatId}/page=1`)}>
                    <a><span>{value.CatName}</span></a></li>:""
                ))}
               {/* <li>
                  <a ><span>Liên hệ</span></a>

                </li>*/}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent