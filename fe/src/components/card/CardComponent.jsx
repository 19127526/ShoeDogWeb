import image from "../../assets/img/62dfdb668b98a.jpg"
import { useNavigate } from "react-router-dom";
import {convertArrayToOptions, convertArrayToQuantity, convertArrayToSize2Price} from "../../utils/Utils";
import {useEffect, useState} from "react";
const CardComponent=({name,priceNonDiscount,priceDiscount,img,proId,statusPro,discount})=>{
  const navigate=useNavigate();
  const [isDiscount,setIsDiscount]=useState(false);
  const [price,setPrice]=useState("");
  const [totalPrice,setTotalPrice]=useState("");
  useEffect(()=>{
    let resultTotalPrice="";
    const totalPriceArr=convertArrayToOptions(priceDiscount,",")
    for(let i=0;i<totalPriceArr.length;i++){
      if(i==0){
        resultTotalPrice+=Number(totalPriceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
      }
      else{
        resultTotalPrice=resultTotalPrice+" - "+Number(totalPriceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
      }
    }

    let resultPrice="";
    const priceArr=convertArrayToSize2Price(priceNonDiscount)
    for(let i=0;i<priceArr.length;i++){
      if(i==0){
        resultPrice+=Number(priceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
      }
      else{
        resultPrice=resultPrice+" - "+Number(priceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
      }
    }

    let isFlag=false
    convertArrayToQuantity(discount).map(index=>{
      if(index!=0){
        isFlag=true;
      }
    })


    setIsDiscount(isFlag);
    setTotalPrice(resultTotalPrice);
    setPrice(resultPrice)
  },[])
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
    </div>
  )
}

export default CardComponent