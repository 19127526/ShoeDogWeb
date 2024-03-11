import {
  convertArrayToOptions,
  convertArrayToQuantity,
  convertArrayToSize,
  getWindowWidth,
  removeItemAll
} from "../../utils/Utils";
import {Carousel} from "react-responsive-carousel";
import "./DetailPage.css"
import {useEffect, useRef, useState} from "react";
import CardComponent from "../../components/card/CardComponent";
import {getDetailProductByProId, relatedProduct} from "../../apis/products/ProductsApi";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import ErrorPage from "../error/ErrorPage";
import {useComponentSize} from "react-use-size";
import {addItemSuccess} from "./DetailPage.actions";
import {Helmet} from "react-helmet";
import {CLIENT_URL} from "../../configs/url";
import {message} from "antd"
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";
import { getImageSize } from 'react-image-size';

const DetailPage = () => {
  const [detailProduct, setDetailProduct] = useState();
  const [chooseSizeBtn, setChooseSizeBtn] = useState(false);
  const [heightDescription, setHeightDescription] = useState();
  const [heightImage,setHeightImage]=useState();
  const {proId} = useParams();
  const dispatch = useDispatch();
  const [imageSubArray, setImageSubArray] = useState([]);
  const [sizeList, setSizeList] = useState([{
    size: null,
    totalPrice: null,
    discount: null
  }]);
  const [color, setColor] = useState();
  const [empty, setEmpty] = useState(false);
  const [chooseSizeSuccess, setChooseSizeSuccess] = useState({
    size: null,
    price: null,
    discount: null,
  });
  const [relatedProductList, setRelatedProductList] = useState([]);
  const {ref, height, width} = useComponentSize();
  const dataProduct = useSelector(state => state.cartReducer);

  useEffect(() => {
    const getRelatedProductByProduct = async (res) => {
       try {
         const relatedResult = await relatedProduct(res?.data?.data[0].CatId, res?.data?.data[0].ProId)
         if(relatedResult?.status === 200) {
           const itemResult = relatedResult?.data.data.map(index => {
             return {
               ...index,
               TotalPrice: convertArrayToSize(index?.TotalPrice).toString()
             }
           });
           setRelatedProductList(itemResult);
         }
         dispatch(turnOffLoading())
       } catch (e) {
         dispatch(turnOffLoading())
         console.log(e)
       }
    }
    const getDetailProduct = async () => {
      dispatch(turnOnLoading())
      setImageSubArray([]);
      setChooseSizeSuccess({
        size: null,
        price: null,
        discount: null,
      })
      try {
        const res = await getDetailProductByProId(proId || 0)
            if(res?.status === 200) {
              setDetailProduct(res?.data.data[0]);
              const tempSize = convertArrayToQuantity(res.data.data[0].Size);
              const tempTotalPrice = convertArrayToQuantity(res.data.data[0].TotalPrice);
              const tempDiscount = convertArrayToQuantity(res.data.data[0].Discount);
              const temp = [];
              for (let i = 0; i < tempSize.length; i++) {
                temp.push({
                  size: tempSize[i],
                  totalPrice: Number(tempTotalPrice[i]),
                  discount: Number(tempDiscount[i])
                })
              }
              setSizeList(temp);
              setColor(res.data.data[0].Color);
              if (res.data.data[0].ImageArray === null || res.data.data[0].ImageArray === undefined || res.data.data[0].ImageArray === "") {
                setImageSubArray([])
              } else {
                let tempImageArr = convertArrayToOptions(res.data.data[0].ImageArray, ", ");
                tempImageArr=removeItemAll(tempImageArr,"")
                setImageSubArray(tempImageArr.map(index=>index.replace("public","private")));
              }
              setEmpty(false);
              getRelatedProductByProduct(res)
            } else if (res?.data?.status === 'empty') {
              setEmpty(true);
            }
      } catch (e) {
        dispatch(turnOffLoading())
      } finally {
      }
    }

    getDetailProduct();
  }, [proId]);

  useEffect(() => {
    if(getWindowWidth().innerWidth > 784) {
      setHeightDescription(Number(height) + 700)
    }
  },[relatedProductList, detailProduct])


  const setChooseSize = (index, price, discount) => {
    setChooseSizeSuccess({
      size: index,
      price: price,
      discount: discount
    })
  }

  const addProductToCart = () => {
    if (chooseSizeSuccess.size === null && chooseSizeSuccess.price === null) {
      message.info('Vui lòng chọn size trước khi thêm vào giỏ hàng');
    } else {
      dispatch(addItemSuccess({aboutSize: chooseSizeSuccess, detailProduct}))
    }
    /*
    for (let i = 0; i < data.length; i++) {
      if (data[i].detailProduct.ProId == proId) {
        if (data[i].aboutSize.size == chooseSizeSuccess.size) {
          const prev=data[i].quantity;
          const next= sizeList.filter(index=>index.size===chooseSizeSuccess.size).map(index=>index.quantity)[0];
          if(next<=prev){
            isAddItem=true;
          }
        }
      }
    }
    if(isAddItem===false) {
      dispatch(addItemSuccess({aboutSize: chooseSizeSuccess, detailProduct}))
    }
    else{
      message.info('Số lượng size của sản phẩm này đã hết, vui lòng chọn size khác');
    }
  }*/
  }

  if (empty === true) {
    return (<ErrorPage/>)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`${detailProduct?.ProName} - SHOEDOG - Shop giày uy tín nhất TP.HCM`}</title>
        <link
          rel="canonical"
          href={CLIENT_URL + `/detail/${detailProduct?.ProId}`}
          title={`Chi tiết sản phẩm - ${detailProduct?.ProName}  - Shop giày uy tín nhất TP.HCM »`}
        />
        <meta
          name="description"
          content={`Chi tiết sản phẩm ${detailProduct?.ProName}. Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1.`}
        />
      </Helmet>
      <div id="container">
        <div className="container detail">
          <div className="detailInner clearfix" data-sticky_parent="">
            <div className="detail__img" ref={ref}>
              <div className="main-slide-detail" >
                <Carousel showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay
                          autoFocus={true} interval={5000} showStatus={false}
                          axis={"horizontal"}
                          dynamicHeight={true}
                          renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                              <button className="arrow-image-left" type="button" title={label} style={{

                              }} onClick={onClickHandler}>
                                <CaretLeftOutlined className={"icon-arrow"}/>
                              </button>
                            )}
                          renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                              <button className="arrow-image-right" type="button" title={label} style={{

                              }} onClick={onClickHandler}>
                                <CaretRightOutlined className={"icon-arrow"} />
                              </button>
                            )}
                >
                  {imageSubArray.length === 0 || imageSubArray === undefined || imageSubArray[0] === "" ?
                    <div>
                      <img className="detail-img" src={detailProduct?.ImageMain} style={{objectFit:"contain"}} alt={detailProduct?.ProName} />
                    </div>
                    :
                    imageSubArray?.map(index => (
                      <div  >
                        <img className="detail-img" src={index} style={{objectFit:"contain"}} alt={detailProduct?.ProName}/>
                      </div>
                    ))
                  }


                </Carousel>

              </div>
              <div className="slidedetail__pagi hide" style={{display: "block"}}>
                <ul>
                  <li><a href=""><span></span></a></li>
                </ul>
              </div>
            </div>
            <div className="detail__desc" style={{height: heightDescription}}>
              <div className="detail__desc--inner">
                <div className="detail__desc--fix">
                  <p className="text-uper font-500  fs-24 mgB-0 lh-40 mgB-20">{detailProduct?.ProName}</p>
                  <div className="mgB-20">
                    <div className="dropdownChooseSize">
                      <a onClick={() => setChooseSizeBtn(!chooseSizeBtn)}
                         className={chooseSizeBtn === true ? "val-selected clearfix active" : "val-selected clearfix"}
                         style={{height: "100%"}}>
                        <span className="icon-uniF140"></span>
                        <div className="get-val clearfix">

                          {chooseSizeSuccess.size === null ? <span className="txtSize">Chọn size</span> :
                            <div className="get-val clearfix">
                                <span className="icon-uniF335" onClick={() => {
                                  setChooseSizeSuccess({size: null, price: null})
                                }}></span>
                              <span className="txtPrice"
                                    style={{fontSize: "13px"}}>{chooseSizeSuccess.price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: "VND"
                              })}</span>
                              {detailProduct?.Color.includes("No Size Just Color") ?
                                <span className="txtSize" style={{fontSize: "13px"}}>{chooseSizeSuccess?.size}</span>
                                :
                                <span className="txtSize">Size {chooseSizeSuccess?.size}</span>
                              }

                            </div>
                          }
                        </div>
                      </a>


                      <div className={chooseSizeBtn === true ? "chooseSize active" : "chooseSize"}>
                        <div className="chooseSizeInner">
                          <ul>
                            {sizeList.map(index => (
                              <li onClick={() => {
                                setChooseSize(index?.size, index?.totalPrice, index?.discount);
                                setChooseSizeBtn(false)
                              }}>
                                <a>
                                  <span
                                    className="pull-right detail__price">{Number(index?.totalPrice).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: "VND"
                                  })}</span>
                                  {detailProduct?.Color.includes("No Size Just Color") ?
                                    <>
                                      <p className="detail__size">{index?.size}</p>
                                    </>
                                    :
                                    <>
                                      <p className="detail__size">Size {index?.size}</p>
                                    </>
                                  }
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {detailProduct?.StatusPro === 0 ?
                        <p className="color7c7c7c font-700 fs-14">
                          Sản phẩm này hiện hết hàng
                        </p>
                        :
                        <button type="submit" className="btn-buy text-uper" onClick={addProductToCart}>Thêm vào giỏ
                          hàng
                        </button>
                      }
                    </div>
                  </div>

                  {/*  <div className="shareWrap">
                    <button className="btn btn-share">&nbsp; &nbsp;<ShareAltOutlined/><span>&nbsp; Share</span></button>
                    <div className="w-100"></div>
                    <div className="col-xs-12">
                      <div id="shareButton" className="collapse">
                        <div className="col">
                          <div className="col-sm-2">
                            <a target="_blank"><i
                              className="fa fa-facebook"></i></a>
                            <a target="_blank"
                               className="fa fa-twitter"><i
                              className="fa fa-facebook"></i></a>
                          </div>
                          <div className="col-sm-10">
                            <input type="text" className="" name="user[name]" placeholder="Name"
                                   value=""
                                   id="copyInput"/>
                            <button className="btn btn-copy">Copy URL</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>*/}
                  <div className="detail__desc--intro">
                    <p className="title__detailproduct">Chi tiết sản phẩm</p>
                    <div className="color-7c7c7c mgB-5">
                      <p className={"font__detailproduct"}>
                        {detailProduct?.Color.includes("No Size Just Color") || detailProduct?.Color.includes("") ?
                          "" :
                          <>
                            <label>Màu sắc: </label>
                            &nbsp; {detailProduct?.Color}
                          </>}
                      </p>
                      <p className={"font__detailproduct"}>
                        <label>Mã sản phẩm: </label> &nbsp;<span
                        style={{color: "black", fontWeight: "bold"}}>{detailProduct?.Inventory}</span>
                      </p>
                      <p className={"font__detailproduct"}>
                        <label>Thương hiệu: </label>
                        &nbsp; <span style={{color: "black", fontWeight: "bold"}}>{detailProduct?.Brand}</span>
                      </p>
                      <label className={"font__detailproduct"}>Mô tả </label>
                      <div
                           dangerouslySetInnerHTML={{__html: detailProduct?.Des.replace(/(<? *script)/gi, 'illegalscript')}}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="detail__related">
            <div className="text-center text-uper font-700 fs-25 mgB-20">Sản phẩm liên quan</div>
            <div className="row products">
              {
                relatedProductList.map(value => (
                  <div className="col-lg-4 col-md-6 ">
                    <CardComponent name={value?.ProName}
                                   img={value?.ImageMain?.replace("public","private")}
                                   proId={value?.ProId}
                                   statusPro={value?.StatusPro}
                                   priceDiscount={value?.TotalPrice}
                                   discount={value?.Discount}
                                   priceNonDiscount={value?.Price}/>
                  </div>
                ))
              }
            </div>


          </div>

        </div>
      </div>
    </>
  )
}


export default DetailPage