import image from "../../assets/img/62dfdb668b98a.jpg"
import { useNavigate } from "react-router-dom";
const CardComponent=({name,priceNonDiscount,priceDiscount,img,proId,statusPro})=>{
  const navigate=useNavigate();

  return (
    <div className="product__item">
      <div className="product__item--pic">
        <a onClick={()=>navigate(`/detail/${proId}`)}>
          <div className="product__img">
            <img className="lazy" src={img}
                 alt={name} title={name}
                 style={{display:"inline-block",height:"auto",width:"480px"}}
                />
          </div>
        </a>
        <div className="product__item--infor">


          <div className="clearfix">
            <p className="product-name text-uper "><a
              onClick={()=>navigate(`/detail/${proId}`)}>{name}</a>
            </p>
            {
              statusPro===0?
                <p className="product-price">
                  <span>Hết hàng</span>
                </p>
                :
                <p className="product-price">
                  {priceNonDiscount===null?"":<><span className="price-decoration">{priceNonDiscount?.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}</span><br/></>}
                  <span>{priceDiscount?.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}</span>
                </p>

            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent