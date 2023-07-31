import {Button, Tooltip} from "antd";
import {removeItem} from "../../pages/detail/DetailPage.actions";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import {useNavigate} from "react-router-dom";

const OrderProductComponent=({name,sku,size,quantity,totalPrice,discount,index})=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const data = useSelector(state => state.cartReducer);
  const removeItemIntoCart=()=>{
    const dataCart=data.cartItem.filter(index2=>(index2?.detailProduct?.ProId !==index?.detailProduct?.ProId||index2?.aboutSize.size !==size))
    dispatch(removeItem(dataCart));
  }
return (
  <div className="clearfix checkout__inforpro-detail">
    <Helmet>
      <meta charSet="utf-8" />
      <link
        rel="canonical"
        href={CLIENT_URL}
        title={`Sản phẩm trong giỏ hàng ${name} - Shop giày uy tín nhất TP.HCM »`}
      />
      <meta
        name="description"
        content={`Sản phẩm trong giỏ hàng ${name}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
      />
    </Helmet>

    <div className="font-600 fs-14 mgB-10">
      <a onClick={()=>navigate(`/detail/${index?.detailProduct?.ProId}`)}>
        {name}
      </a>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>Mã sản phẩm:</em>
      <div>{sku}</div>
    </div>

    <div className="font-600 fs-11 justifyAround mgB-5"><em>Size:</em>
      <div>{size}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5">
      <em>Số lượng:</em>
      <div>{quantity}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>Giảm Giá:</em>
      <div>{discount} %</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>Thành Tiền:</em>
      <div>{totalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5" style={{float:"right"}}>
      <Tooltip title="Nhấn để xóa" color={"blue"}>
        <Button size={"small"} style={{padding:"10px,3px,3px,3px",background:"#404040",color:"white"}} onClick={removeItemIntoCart}>Xóa sản phẩm</Button>
      </Tooltip>
    </div>
  </div>
)
}

export default OrderProductComponent