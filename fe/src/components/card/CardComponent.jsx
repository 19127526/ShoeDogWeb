import image from "../../assets/img/62dfdb668b98a.jpg"
import { useNavigate } from "react-router-dom";
const CardComponent=({name,priceNonDiscount,priceDiscount,img})=>{
  const navigate=useNavigate();

  return (
    <div className="product__item">
      <div className="product__item--pic">
        <a onClick={()=>navigate("/detail")}>
          <div className="product__img">
            <img className="lazy" src={img}
                 alt={name} title={name}
                 style={{display:"inline-block",height:"auto",width:"480px"}}
                />
          </div>
        </a>
        <div className="product__item--infor">
          <div className="text-center mgB-5 hide">
            <div className="size-item">
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=4 US"
                 className="size">4 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=5 US"
                 className="size">5 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=7 US"
                 className="size">7 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=8 US"
                 className="size">8 US</a>
              <a href="https://www.glab.vn/product/detail/10410-adidas-adilette-22-slides-clear-grey?size=10 US"
                 className="size">10 US</a>
            </div>
            <p className="text-uper">available size</p>
          </div>

          <div className="clearfix">
            <p className="product-name text-uper "><a
              onClick={()=>navigate("/detail")}>{name}</a>
            </p>
            <p className="product-price">
              {priceNonDiscount===null?"":<><span className="price-decoration">{priceNonDiscount} VNĐ</span><br/></>}
              <span>{priceDiscount} VNĐ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent