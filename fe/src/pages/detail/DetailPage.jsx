import {ShareAltOutlined} from '@ant-design/icons';
import {convertArrayToOptions, getWindowWidth} from "../../utils/Utils";
import {Carousel} from "react-responsive-carousel";
import "./DetailPage.css"
import {useEffect, useRef, useState} from "react";
import CardComponent from "../../components/card/CardComponent";
import {getDetailProductByProId, relatedProduct} from "../../apis/products/ProductsApi";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import ErrorPage from "../error/ErrorPage";
import {message} from "antd";
import {useComponentSize} from "react-use-size";
import {addItemSuccess} from "./DetailPage.actions";
import listProduct from "../listproduct/ListProduct";


const DetailPage = () => {
  const [detailProduct, setDetailProduct] = useState();
  const useRefDetailImg = useRef(null);
  const [chooseSizeBtn, setChooseSizeBtn] = useState(false);
  const [height2, setHeight2] = useState();
  const {proId} = useParams();
  const dispatch = useDispatch();
  const [imageSubArray, setImageSubArray] = useState([]);
  const [sizeList, setSizeList] = useState([{
    size: null,
    quantity: null,
  }]);
  const [color, setColor] = useState();
  const [empty, setEmpty] = useState(false);
  const [chooseSizeSuccess, setChooseSizeSuccess] = useState({
    size: null,
    price: null
  });
  const [relatedProductList, setRelatedProductList] = useState([]);
  const {ref, height, width} = useComponentSize();
  const dataProduct = useSelector(state => state.cartReducer);

  useEffect(() => {
    const getDetailProduct = () => {
      dispatch(turnOnLoading())
      setImageSubArray([])
      getDetailProductByProId(proId || 0)
        .then(res => {
          if (res.data.status === 'success') {
            setDetailProduct(res.data.data[0]);
            setSizeList(convertArrayToOptions(res.data.data[0].Size, ", ")
              .map(index => {
                const temp = convertArrayToOptions(index, ": ");
                return {
                  size: temp[0],
                  quantity: temp[1]
                }
              }));
            setColor(res.data.data[0].Color);
            if (res.data.data[0].ImageArray === null || res.data.data[0].ImageArray === undefined || res.data.data[0].ImageArray === "") {
              setImageSubArray([])
            } else {
              setImageSubArray(convertArrayToOptions(res.data.data[0].ImageArray, ", "));
            }
            setEmpty(false);


            const getRelatedProductByProduct = async () => {
              await relatedProduct(res.data.data[0].CatId, res.data.data[0].ProId)
                .then(res => {
                  if (res.data.status === 'success') {
                    setRelatedProductList(res.data.data);
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }
            getRelatedProductByProduct()


          } else if (res.data.status === 'empty') {
            setEmpty(true);
          }
        })
        .catch(err => {

          console.log(err);
        })
        .finally(() => {
          dispatch(turnOffLoading())
        })
    }

    getDetailProduct();
  }, [proId]);

  useEffect(() => {
    /*setHeight2(339)*/
    getWindowWidth().innerWidth > 784 ? setHeight2(height) : ""
  },)

  const setChooseSize = (index, price) => {
    setChooseSizeSuccess({
      size: index,
      price: price
    })
  }

  const addProductToCart = () => {
    if (chooseSizeSuccess.size === null && chooseSizeSuccess.price === null) {
      message.info('Vui lòng chọn size trước khi thêm vào giỏ hàng');
    } else {
      let isAddItem=false;
      const data=dataProduct?.cartItem;
      for (let i=0;i<sizeList.length;i++){
        if(sizeList[i].size===chooseSizeSuccess.size){
          if(sizeList[i].quantity==0){
            message.info('Số lượng size của sản phẩm này đã hết, vui lòng chọn size khác');
            return;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].detailProduct.ProId == proId) {
          if (data[i].aboutSize.size == chooseSizeSuccess.size) {
            const prev=data[i].quantity;
            const next= sizeList.filter(index=>index.size===chooseSizeSuccess.size).map(index=>index.quantity)[0];
            if(next<=prev){
              isAddItem=true;
            }
            console.log(next);
            console.log(prev)
          }
        }
      }
      if(isAddItem===false) {
        dispatch(addItemSuccess({aboutSize: chooseSizeSuccess, detailProduct}))
      }
      else{
        message.info('Số lượng size của sản phẩm này đã hết, vui lòng chọn size khác');
      }
    }
  }


  if (empty === true) {
    return (<ErrorPage/>)
  }
  return (
    <>

      <div id="container">
        <div className="container detail">
          <div className="detailInner clearfix" data-sticky_parent="">
            <div className="detail__img" ref={ref}>
              <div className="main-slide-detail">
                <Carousel showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay
                          autoFocus={true}>

                  {imageSubArray.length === 0 || imageSubArray === undefined || imageSubArray[0] === "" ?
                    <div>
                      <img src={detailProduct?.ImageMain}/>
                    </div>
                    :
                    imageSubArray?.map(index => (
                      <div>
                        <img src={index}/>
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
            <div className="detail__desc" style={{height: height2}}>
              <div className="detail__desc--inner">
                <div className="detail__desc--fix">
                  <p className="color7c7c7c font-700 fs-14"><a>Mã sản
                    phẩm: {detailProduct?.Inventory}</a>
                  </p>
                  <p className="text-uper font-500  fs-24 mgB-0 lh-40 mgB-20">{detailProduct?.ProName}</p>
                  <div className="mgB-20">
                    <div className="dropdownChooseSize">
                      <a onClick={() => setChooseSizeBtn(!chooseSizeBtn)}
                         className={chooseSizeBtn === true ? "val-selected clearfix active" : "val-selected clearfix"}>
                        <span className="icon-uniF140"></span>
                        <div className="get-val clearfix">

                          {chooseSizeSuccess.size === null ? <span className="txtSize">Chọn size</span> :
                            <div className="get-val clearfix">
                                <span className="icon-uniF335" onClick={() => {
                                  setChooseSizeSuccess({size: null, price: null})
                                }}></span>
                              <span className="txtPrice">{chooseSizeSuccess.price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: "VND"
                              })}</span>
                              <span className="txtSize">Size {chooseSizeSuccess.size}</span>
                            </div>
                          }
                        </div>
                      </a>


                      <div className={chooseSizeBtn === true ? "chooseSize active" : "chooseSize"}>
                        <div className="chooseSizeInner">
                          <ul>
                            {sizeList.map(index => (
                              <li onClick={() => setChooseSize(index.size, detailProduct?.TotalPrice)}>
                                <a>
                                  <span className="pull-right detail__price">
                                    {detailProduct?.TotalPrice.toLocaleString('it-IT', {
                                      style: 'currency',
                                      currency: "VND"
                                    })}
                                  </span>
                                  <span className="detail__size">
                                      {index.size} - Số lượng {index.quantity}
                                  </span>
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
                      <p>
                        <label>Màu sắc: </label>
                        &nbsp;{detailProduct?.Color}
                      </p>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: detailProduct?.Des.replace(/(<? *script)/gi, 'illegalscript')}}>
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
                                   img={value?.ImageMain}
                                   proId={value?.ProId}
                                   priceDiscount={value?.TotalPrice}
                                   priceNonDiscount={value.Discount === 0 ? null : value?.Price}/>
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