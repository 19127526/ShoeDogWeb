import {useNavigate} from "react-router-dom";
import {Button, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {removeItem} from "../../pages/detail/DetailPage.actions";
import "./CartComponent.css"
import {CLIENT_URL} from "../../configs/url";
import {Helmet} from "react-helmet";

const CartComponent = ({productName, price, size, quantity, img, index, setCartButton}) => {

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const data = useSelector(state => state.cartReducer);
  const removeItemIntoCart=()=>{
    const dataCart=data.cartItem.filter(index2=>(index2?.detailProduct?.ProId !==index?.detailProduct?.ProId||index2?.aboutSize.size !==size))
    dispatch(removeItem(dataCart));
  }
  return (

    <div className="header__cart--items">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Sản phẩm trong giỏ hàng - ${productName} - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL}
          title={`Sản phẩm trong giỏ hàng ${productName} - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Sản phẩm trong giỏ hàng ${productName}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div className="header__cart--item clearfix">
        <a onClick={() =>{ navigate(`/detail/${index?.detailProduct?.ProId}`);setCartButton(false)}}>
          <div className="pull-left wrap-img">
            <img src={img} alt={productName}/>
          </div>
        </a>

        <div className="overflow-all" style={{paddingTop: "10px"}}>
          <p style={{display: "flex", justifyContent: "space-between",position:"relative"}}>
            <a onClick={() => {navigate(`/detail/${index?.detailProduct?.ProId}`);setCartButton(false)}}>
              <span className="text-uper fs-15 font-700">{productName}</span>
            </a>
           {/* <a className="remove-button-cart" onClick={removeItemIntoCart}>
              <Tooltip title="Nhấn để xóa" color={"blue"}>
                <i className="fa fa-times">x</i>
              </Tooltip>
            </a>*/}
          </p>
          <p className="product-type text-uper font-500 fs-13 mgB-5"></p>
          <p className="pull-right font-700 fs-12">{price?.toLocaleString('it-IT', {
            style: 'currency',
            currency: "VND"
          })}</p>
          {
            index?.detailProduct?.Color.includes("No Size Just Color")?
              <>
              <p className="text-uper font-700 fs-12">Loại: {size}</p>
                <p className="product-type text-uper font-500 fs-13 mgB-5"></p>
              <p className="text-uper font-700 fs-12">
                Số lượng: {quantity}
              </p>
              </>
              :
              <>
                <p className="text-uper font-700 fs-12">Size: {size} -   Số lượng: {quantity}</p>
              </>
          }
          <p className="text-uper font-700 " style={{float:"right"}}>
            <Tooltip title="Nhấn để xóa" color={"blue"}>
            <Button size={"small"} style={{padding:"10px,3px,3px,3px",background:"#404040",color:"white"}} onClick={removeItemIntoCart}>Xóa sản phẩm</Button>
            </Tooltip>
          </p>
        </div>
      </div>
    </div>)
}

export default CartComponent