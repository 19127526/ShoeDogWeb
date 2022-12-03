const CartComponent=({productName,price,size,quantity})=>{
  return (<div className="header__cart--items">
    <a href="" className="header__cart--item clearfix">
      <div className="pull-left wrap-img">
        <img src="https://glab.vn/storage/products/2022/07/13/480x320/62ceb71c13327.jpg" alt=""/>
      </div>
      <div className="overflow-all">
        <p className="text-uper fs-15 font-700">{productName}</p>

        <p className="product-type text-uper font-500 fs-13 mgB-10"></p>

        <p className="pull-right font-700 fs-12">{price} VNĐ</p>

        <p className="text-uper font-700 fs-12">Size: {size} - Quantity: {quantity}</p>
      </div>
    </a>
  </div>)
}

export default CartComponent