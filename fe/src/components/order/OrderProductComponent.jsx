import {Tooltip} from "antd";
import {removeItem} from "../../pages/detail/DetailPage.actions";
import {useDispatch, useSelector} from "react-redux";

const OrderProductComponent=({name,sku,size,quantity,totalPrice,discount,index})=>{
  const dispatch=useDispatch();
  const data = useSelector(state => state.cartReducer);
  const removeItemIntoCart=()=>{
    const dataCart=data.cartItem.filter(index2=>(index2?.detailProduct?.ProId !==index?.detailProduct?.ProId||index2?.aboutSize.size !==size))
    console.log(dataCart)
    dispatch(removeItem(dataCart));
  }
return (
  <div className="clearfix checkout__inforpro-detail 34504"
       data-quotedetail="eyJpdiI6IldEdG5MR0hrZGVZOGxjU2x4YnhNaFE9PSIsInZhbHVlIjoiaDRwTVBhcTZmVHdUWlBwUkoyVENCUT09IiwibWFjIjoiODg4M2FhMDJkNjQ0NmRlYTNmMWYxNmI3NGNhNjM3ZWQ5MDFiMjU3YjBiZTNjNDhjMWFiMDg3M2FlZTAxMDMxMyJ9">
    <Tooltip title="Nhấn để xóa" color={"blue"}>
      <a className="pro-remove removeCart" onClick={removeItemIntoCart}><span className="icon-uniF335"></span></a>
    </Tooltip>
    <div className="font-600 fs-14 mgB-10">
      <a href="https://www.glab.vn/product/detail/5234-off-white-x-wmns-air-jordan-4-sp-sail">
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
    {/*<div className="promoCode">
      <a href="" className="removeCoupon hide"><span className="icon-uniF335"></span></a>
      <div className="frm-item">
        <input type="text" placeholder="PROMO CODE" name="coupon_code[54563]" value=""/>
        <div className="error">Mã Khuyến Mãi không phù hợp</div>
      </div>
      <div className="btnApply">
        <button>APPLY</button>
      </div>
    </div>*/}
  </div>
)
}

export default OrderProductComponent