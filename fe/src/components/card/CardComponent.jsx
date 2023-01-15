import image from "../../assets/img/62dfdb668b98a.jpg"
import { useNavigate } from "react-router-dom";
import {convertArrayToOptions, convertArrayToQuantity, convertArrayToSize, maxValue, minValue} from "../../utils/Utils";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import {Badge} from "antd"
import "./CardComponent.css"
import Resizer from "react-image-file-resizer"
const CardComponent=({name,priceNonDiscount,priceDiscount,img,proId,statusPro,discount})=>{
  const navigate=useNavigate();
  const [isDiscount,setIsDiscount]=useState(false);
  const [price,setPrice]=useState("");
  const [totalPrice,setTotalPrice]=useState("");
  const [discountTemp,setDiscountTemp]=useState(-1);
  useEffect(()=>{
    let resultTotalPrice="";
    const totalPriceArr=convertArrayToOptions(priceDiscount,",");
    if(totalPriceArr.length==1){
      resultTotalPrice= Number(totalPriceArr[0]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
    }
    else{
      resultTotalPrice=Number(minValue(...totalPriceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()+" - "+
        Number(maxValue(...totalPriceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
    }

    let resultPrice="";
    const priceArr=convertArrayToSize(priceNonDiscount)
    if(priceArr.length==1){
      resultPrice= Number(priceArr[0]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
    }
    else{
      resultPrice=Number(minValue(...priceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()+" - "+
        Number(maxValue(...priceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
    }
    let isFlag=false
    convertArrayToQuantity(discount).map(index=>{
      setDiscountTemp(index)
      if(index!=0){
        isFlag=true;
      }
    })

    setIsDiscount(isFlag);
    setTotalPrice(resultTotalPrice);
    setPrice(resultPrice)
  },[proId])
  return (
    <div className="product__item">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Sản phẩm ${name} - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL + `/detail/${proId}`}
          title={`Sản phẩm ${name} - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Sản phẩm ${name}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      {isDiscount==true?
        <Badge.Ribbon text={discountTemp+"%"} color={"red"}>
          <div className="product__item--pic" style={{color:"black"}}>
            <a onClick={()=>navigate(`/detail/${proId}`)}>
              <div className="product__img">
                <img className="lazy" src={img}
                     alt={name} title={name}
                     style={{display:"inline-block",width:"auto"}}
                />
              </div>
            </a>
            <div className="product__item--infor">
              <div className="clearfix">
                <p className="product-name text-uper " style={{whiteSpace:"initial"}}><a
                  onClick={()=>navigate(`/detail/${proId}`)} style={{whiteSpace:"initial"}}>{name}</a>
                </p>
                {
                  statusPro===0?
                    <p className="product-price">
                      <span>Hết hàng</span>
                    </p>
                    :
                    <p className="product-price">
                      {isDiscount===false?"":
                        <><span className="price-decoration">{price}</span>
                          <br/></>}
                      <span>{totalPrice}</span>
                    </p>
                }
              </div>
            </div>
          </div>
        </Badge.Ribbon>
        : <div className="product__item--pic" style={{color:"black"}}>
          <a onClick={()=>navigate(`/detail/${proId}`)}>
            <div className="product__img">
              <img className="lazy" src={img}
                   alt={name} title={name}
                   style={{display:"inline-block",width:"auto"}}
              />
            </div>
          </a>
          <div className="product__item--infor">
            <div className="clearfix">
              <p className="product-name text-uper " style={{whiteSpace:"initial"}}><a
                onClick={()=>navigate(`/detail/${proId}`)} style={{whiteSpace:"initial"}}>{name}</a>
              </p>
              {
                statusPro===0?
                  <p className="product-price">
                    <span>Hết hàng</span>
                  </p>
                  :
                  <p className="product-price">
                    {isDiscount===false?"":
                      <><span className="price-decoration">{price}</span>
                        <br/></>}
                    <span>{totalPrice}</span>
                  </p>
              }
            </div>
          </div>
        </div>

      }

    </div>
  )
}

export default CardComponent