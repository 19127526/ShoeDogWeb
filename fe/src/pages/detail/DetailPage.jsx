import image from "../../assets/img/62dfdb668b98a.jpg"
import {ShareAltOutlined} from '@ant-design/icons';
import {getWindowWidth} from "../../utils/Utils";
import {Carousel} from "react-responsive-carousel";
import "./DetailPage.css"
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import CardComponent from "../../components/card/CardComponent";

const DetailPage = () => {
  const useRefDetailImg=useRef(null);
  const [height,setHeight]=useState();
  const a = [];
  for (let i = 0; i < 10; i++) {
    a.push(CardComponent);
  }
  useEffect(()=>{
    getWindowWidth().innerWidth>784?setHeight(useRefDetailImg.current?.offsetHeight):setHeight(339)
  },[useRefDetailImg.current?.offsetHeight])
  return (
    <div id="container">
      <div className="container detail">
        <div className="detailInner clearfix" data-sticky_parent="" >
          <div className="detail__img"  ref={useRefDetailImg}>
            <div className="main-slide" >
              <Carousel showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay
                        autoFocus={true} emulateTouch={true}>
                <div>
                  <img src={image}/>
                </div>
                <div>
                  <img src={image}/>
                </div>
                <div>
                  <img src={image}/>
                </div>
                <div>
                  <img src={image}/>
                </div>
                <div>
                  <img src={image}/>
                </div>
                <div>
                  <img src={image}/>
                </div>
              </Carousel>
            </div>
            <ul className="breakcum hide">
              <li><a href="https://www.glab.vn">home</a></li>
              <li><span>/</span></li>
              <li><a href="https://www.glab.vn/product?category=footwear">footwear</a></li>
              <li><span>/</span></li>
              <li>Nike Dunk Low SB 'Pink Pig'</li>
            </ul>
            <div className="slidedetail__pagi hide" style={{display: "block"}}>
              <ul>
                <li><a href=""><span></span></a></li>
              </ul>
            </div>
          </div>
            <div className="detail__desc" style={{height:height}}>
              <div className="detail__desc--inner">
                <div className="detail__desc--fix">
                  <ul className="breakcum hide">
                    <li><a href="https://www.glab.vn">home</a></li>
                    <li><span>/</span></li>
                    <li><a href="https://www.glab.vn/product?category=footwear">footwear</a></li>
                    <li><span>/</span></li>
                    <li>Nike Dunk Low SB 'Pink Pig'</li>
                  </ul>
                  <p className="color7c7c7c font-700 fs-14"><a href="https://www.glab.vn/product?brand=nike">Nike</a>
                  </p>
                  <p className="text-uper font-500  fs-24 mgB-0 lh-40 mgB-20">Nike Dunk Low SB 'Pink Pig'</p>
                  <div className="mgB-20">
                    <div className="dropdownChooseSize">
                      <form id="frmAddCart" method="POST">
                        <a href="" className="val-selected clearfix">
                          <span className="icon-uniF140"></span>
                          <div className="get-val clearfix">choose your size</div>
                        </a>
                        <div className="chooseSize">
                          <div className="chooseSizeInner">
                            <ul>
                              <li data-size="9.5 US">
                                <a href="">
                                  <span className="pull-right detail__price">7,600,000 đ</span>
                                  <span className="detail__size" data-size="12" data-size-value="9.5 US"
                                        data-price="7600000.0000" data-new-status="1.00"
                                        data-product="eyJpdiI6IjZndDkwQ1pwQ2JWVEFWTHFjU0hRSFE9PSIsInZhbHVlIjoiZXVZYmZuWXkybmsyeVVxVWhmc3JFUT09IiwibWFjIjoiM2E4MTM0N2NlNTZmOWZhNTdlNDRiYmJjOGY4NjFlMTdiYWJhYTZmOWNhZjY5NmQzZTA3NDBlMWEzOTVjMTI0OCJ9">
                                                                        9.5 US - New
                                                                </span>
                                </a>
                              </li>
                            </ul>
                            <input type="hidden" name="size" id="val-size" value=""/>
                            <input type="hidden" name="sizeValue" id="val-sizeValue" value=""/>
                            <input type="hidden" name="product" id="val-product" value=""/>
                            <input type="hidden" name="price" id="val-price" value=""/>
                            <input type="hidden" name="new_status" id="val-newStatus" value=""/>
                            <input type="hidden" name="quantity" value="1"/>
                          </div>
                        </div>
                        <button type="submit" className="btn-buy text-uper">add to cart</button>
                      </form>
                    </div>
                  </div>
                  <div className="shareWrap">
                    <button className="btn btn-share">&nbsp; &nbsp;<ShareAltOutlined/><span>&nbsp; Share</span></button>
                    <div className="w-100"></div>
                    <div className="col-xs-12">
                      <div id="shareButton" className="collapse">
                        <div className="col">
                          <div className="col-sm-2">
                            <a target="_blank"
                               href="//www.facebook.com/sharer.php?u=https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig"><i
                              className="fa fa-facebook"></i></a>
                            <a target="_blank"
                               href="//twitter.com/share?text=&amp;url=https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig"><i
                              className="fa fa-twitter"></i></a>
                          </div>
                          <div className="col-sm-10">
                            <input type="text" className="" name="user[name]" placeholder="Name"
                                   value="https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig"
                                   id="copyInput"/>
                            <button className="btn btn-copy">Copy URL</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="detail__desc--intro">
                    <p className="title__detailproduct">Detail</p>
                    <div className="color-7c7c7c mgB-5">
                      <p>
                        <label>SKU</label>
                        CV1655-600
                      </p>
                      Nike Dunk Low SB 'Pink Pig'

                      <div className="alert alert-danger alert-dismissable alert-used hide">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h4><i className="icon fa fa-ban"></i> Alert!</h4>
                        Danger alert preview. This alert is dismissable. A wonderful serenity has taken possession of my
                        entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>

        <div className="detail__related">
          <div className="text-center text-uper font-700 fs-25 mgB-20">related products</div>
          <div className="row products">
            {a.map(u => (
              <div className="col-lg-4 col-md-6 ">
                <CardComponent name={"New Balance 550 White Black"} img={"https://www.glab.vn/storage/products/2021/03/03/480x320/603f603c3cb03.jpg"} priceDiscount={"4,400,000"} priceNonDiscount={"4,500,000"}/>
              </div>
            ))}

            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11089-fear-of-god-essentials-dock-short-wood">
                    <div className="product__img">
                      <img className="lazy" src="https://media.istockphoto.com/id/1079117394/photo/great-sneaker.jpg?s=612x612&w=0&k=20&c=fJC7xIo9Umddw2TMF7nyUFHIThbi4zV2zvoXEIevRUI="
                           data-src="https://media.istockphoto.com/id/1079117394/photo/great-sneaker.jpg?s=612x612&w=0&k=20&c=fJC7xIo9Umddw2TMF7nyUFHIThbi4zV2zvoXEIevRUI="
                           alt="Fear of God Essentials Dock Short Wood" title="Fear of God Essentials Dock Short Wood"
                      style={{height:"320px",width:"480px"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/11089-fear-of-god-essentials-dock-short-wood?size=S"
                           className="size">S</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11089-fear-of-god-essentials-dock-short-wood">Fear of
                        God Essentials Dock Short Wood</a></p>

                      <p className="product-price">

                        <span>đ 3,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">


            <a href="https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig?page=2"
               className="btn-see-more ajax text-uper">see more</a>
          </div>

        </div>

      </div>
    </div>
  )
}


export default DetailPage