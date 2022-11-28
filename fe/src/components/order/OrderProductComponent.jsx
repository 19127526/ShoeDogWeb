const OrderProductComponent=({name,sku,size,quantity,price})=>{
return (
  <div className="clearfix checkout__inforpro-detail 34504"
       data-quotedetail="eyJpdiI6IldEdG5MR0hrZGVZOGxjU2x4YnhNaFE9PSIsInZhbHVlIjoiaDRwTVBhcTZmVHdUWlBwUkoyVENCUT09IiwibWFjIjoiODg4M2FhMDJkNjQ0NmRlYTNmMWYxNmI3NGNhNjM3ZWQ5MDFiMjU3YjBiZTNjNDhjMWFiMDg3M2FlZTAxMDMxMyJ9">
    <a href="" className="pro-remove removeCart"><span className="icon-uniF335"></span></a>
    <div className="font-600 fs-14 mgB-10">
      <a href="https://www.glab.vn/product/detail/5234-off-white-x-wmns-air-jordan-4-sp-sail">
        {name}
      </a>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>SKU:</em>
      <div>{sku}</div>
    </div>

    <div className="font-600 fs-11 justifyAround mgB-5"><em>SIZE:</em>
      <div>{size}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5">
      <em>QTY:</em>
      <div>{quantity}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>Thành Tiền:</em>
      <div>{price}</div>
    </div>
    <div className="font-600 fs-11 justifyAround mgB-5"><em>Giảm Giá:</em>
      <div>0 đ</div>
    </div>
    <div className="promoCode">
      <a href="" className="removeCoupon hide"><span className="icon-uniF335"></span></a>
      <div className="frm-item">
        <input type="text" placeholder="PROMO CODE" name="coupon_code[54563]" value=""/>
        <div className="error">Mã Khuyến Mãi không phù hợp</div>
      </div>
      <div className="btnApply">
        <button>APPLY</button>
      </div>
    </div>
  </div>
)
}

export default OrderProductComponent