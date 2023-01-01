import logo from '../../assets/themes/icons/favicon.svg';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CartComponent from "../cart/CartComponent";
import {useComponentSize} from "react-use-size";
import {useSelector} from "react-redux";
import {Avatar, Badge, Space} from "antd";
import LoadingComponent from "../loading/LoadingComponent";


const HeaderComponent = ({categoryList, searchButton, loading ,setChangeSide}) => {
  const navigate = useNavigate();
  const [cartButton, setCartButton] = useState(false);
  const data = useSelector(state => state.mainReducer);
  const {ref, height, width} = useComponentSize();
  const dataProduct = useSelector(state => state.cartReducer);
  const [cartItem, setCartItem] = useState([dataProduct?.cartItem]);
  const [totalPriceCart,setTotalPriceCart]=useState(0);
  useEffect(
    () => {
      if(loading==true) {
        if (data.isLoading === false) {
          ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
      }
    }, []);


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

  if(loading==false){
    return <LoadingComponent/>
  }
  return (
    <header className="clearfix" ref={ref}>
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

              <Badge size={"small"} count={cartItem?.length} offset={[8, 1]}>
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
                                     price={index?.totalPrice}  size={index?.aboutSize?.size} index={index} />
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
                {categoryList.map(index => (
                  <li key={index.CatId} onClick={() => navigate(`/product/${index.CatId}`)}>
                    <a><span>{index.CatName}</span></a></li>
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