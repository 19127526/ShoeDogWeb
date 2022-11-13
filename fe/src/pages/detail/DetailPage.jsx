import image from "../../assets/img/62dfdb668b98a.jpg"
import {ShareAltOutlined} from '@ant-design/icons';
import {getWindowWidth} from "../../utils/Utils";
import {Carousel} from "react-responsive-carousel";
import "./DetailPage.css"
import {useEffect, useLayoutEffect, useRef, useState} from "react";

const DetailPage = () => {
  const useRefDetailImg=useRef(null);
  const [height,setHeight]=useState();
  useEffect(()=>{
    getWindowWidth().innerWidth>784?setHeight(useRefDetailImg.current?.offsetHeight):setHeight(339)
    console.log(height);
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
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a
                    href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/10/31/480x320/635fbe52adaf2.jpg"
                           alt="Nike Air Force 1 07 LV8 40th Anniversary White Black"
                           title="Nike Air Force 1 07 LV8 40th Anniversary White Black"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=7.5 US"
                          className="size">7.5 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=8 US"
                          className="size">8 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=8.5 US"
                          className="size">8.5 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=9 US"
                          className="size">9 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=9.5 US"
                          className="size">9.5 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=10 US"
                          className="size">10 US</a>
                        <a
                          href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black?size=10.5 US"
                          className="size">10.5 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11032-nike-air-force-1-07-lv8-40th-anniversary-white-black">Nike
                        Air Force 1 07 LV8 40th Anniversary White Black</a></p>

                      <p className="product-price">

                        <span>đ 3,800,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11080-conic-5-in-flat-shorts-forest">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/11/09/480x320/636b8e3c15f2e.jpg"
                           alt="Conic 5 in Flat Shorts Forest" title="Conic 5 in Flat Shorts Forest"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/11080-conic-5-in-flat-shorts-forest?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/11080-conic-5-in-flat-shorts-forest?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/11080-conic-5-in-flat-shorts-forest?size=L"
                           className="size">L</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11080-conic-5-in-flat-shorts-forest">Conic 5 in Flat
                        Shorts Forest</a></p>

                      <p className="product-price">

                        <span>đ 590,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11079-conic-5-in-flat-shorts-wine">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/11/09/480x320/636b8dfc9cc02.jpg"
                           alt="Conic 5 in Flat Shorts Wine" title="Conic 5 in Flat Shorts Wine"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/11079-conic-5-in-flat-shorts-wine?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/11079-conic-5-in-flat-shorts-wine?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/11079-conic-5-in-flat-shorts-wine?size=L"
                           className="size">L</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11079-conic-5-in-flat-shorts-wine">Conic 5 in Flat
                        Shorts Wine</a></p>

                      <p className="product-price">

                        <span>đ 590,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11018-fear-of-god-essentials-crewneck-ss22-stretch-limo">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/10/28/480x320/635b9b1eeb413.jpg"
                           alt="Fear of God Essentials Crewneck (SS22) Stretch Limo"
                           title="Fear of God Essentials Crewneck (SS22) Stretch Limo"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/11018-fear-of-god-essentials-crewneck-ss22-stretch-limo?size=S"
                          className="size">S</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11018-fear-of-god-essentials-crewneck-ss22-stretch-limo">Fear
                        of God Essentials Crewneck (SS22) Stretch Limo</a></p>

                      <p className="product-price">

                        <span>đ 2,800,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/09/09/480x320/631b1a39ab3da.jpg"
                           alt="Conic Da Lat Tee Beige" title="Conic Da Lat Tee Beige"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige?size=L"
                           className="size">L</a>
                        <a href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige?size=XL"
                           className="size">XL</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/8370-conic-da-lat-tee-beige">Conic Da Lat Tee Beige</a>
                      </p>

                      <p className="product-price">

                        <span>đ 550,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/07/26/480x320/62dfdb5d71214.jpg"
                           alt="adidas Adilette 22 Slides Cardboard" title="adidas Adilette 22 Slides Cardboard"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=4 US"
                           className="size">4 US</a>
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=5 US"
                           className="size">5 US</a>
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=6 US"
                           className="size">6 US</a>
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=7 US"
                           className="size">7 US</a>
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard?size=9 US"
                           className="size">9 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10409-adidas-adilette-22-slides-cardboard">adidas
                        Adilette 22 Slides Cardboard</a></p>

                      <p className="product-price">

                        <span className="price-decoration">đ 2,200,000</span><br/>
                        <span>đ 2,000,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a
                    href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2022/04/04/480x320/624ac798d4426.jpg"
                           alt="Nike WMNS Air Force 1 Low '07 Essential White Blue Paisley"
                           title="Nike WMNS Air Force 1 Low '07 Essential White Blue Paisley"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=5.5W US"
                          className="size">5.5W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=6W US"
                          className="size">6W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=7W US"
                          className="size">7W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=7.5W US"
                          className="size">7.5W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=8W US"
                          className="size">8W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley?size=8.5W US"
                          className="size">8.5W US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/9451-nike-wmns-air-force-1-low-07-essential-white-blue-paisley">Nike
                        WMNS Air Force 1 Low '07 Essential White Blue Paisley</a></p>

                      <p className="product-price">

                        <span>đ 4,000,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white">
                    <div className="product__img">
                      <img className="lazy" src="https://glab.vn/storage/products/2021/06/18/480x320/60cc7b37d2213.jpg"
                           alt="Nike Air Force 1 Low LE GS All White" title="Nike Air Force 1 Low LE GS All White"
                           style={{display: "inline-block"}}/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=3.5Y"
                           className="size">3.5Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=4Y"
                           className="size">4Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=4.5Y"
                           className="size">4.5Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=5Y"
                           className="size">5Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=5.5Y"
                           className="size">5.5Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=6Y"
                           className="size">6Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=6.5Y"
                           className="size">6.5Y</a>
                        <a href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white?size=7Y"
                           className="size">7Y</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/8131-nike-air-force-1-low-le-gs-all-white">Nike Air
                        Force 1 Low LE GS All White</a></p>

                      <p className="product-price">

                        <span>đ 2,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/7518-stussy-track-team-socks-white-teal-pink">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2021/04/12/480x320/607402a3d6638.jpg"
                           alt="Stussy Track Team Socks White / Teal / Pink"
                           title="Stussy Track Team Socks White / Teal / Pink"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/7518-stussy-track-team-socks-white-teal-pink?size=White - Free Size"
                          className="size">White - Free Size</a>
                        <a
                          href="https://www.glab.vn/product/detail/7518-stussy-track-team-socks-white-teal-pink?size=Teal - Free Size"
                          className="size">Teal - Free Size</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/7518-stussy-track-team-socks-white-teal-pink">Stussy
                        Track Team Socks White / Teal / Pink</a></p>

                      <p className="product-price">

                        <span>đ 280,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2021/12/18/480x320/61bd9c77a9315.jpg"
                           alt="Nike Dunk Low SB 'Pink Pig'" title="Nike Dunk Low SB 'Pink Pig'"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig?size=9.5 US"
                           className="size">9.5 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/8575-nike-dunk-low-sb-pink-pig">Nike Dunk Low SB 'Pink
                        Pig'</a></p>

                      <p className="product-price">

                        <span className="price-decoration">đ 8,100,000</span><br/>
                        <span>đ 7,600,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10697-fear-of-god-essentials-t-shirt-coral-ss22">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/09/08/480x320/6319c22acea9f.jpg"
                           alt="Fear of God Essentials T-shirt Coral (SS22)"
                           title="Fear of God Essentials T-shirt Coral (SS22)"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/10697-fear-of-god-essentials-t-shirt-coral-ss22?size=XS"
                          className="size">XS</a>
                        <a
                          href="https://www.glab.vn/product/detail/10697-fear-of-god-essentials-t-shirt-coral-ss22?size=S"
                          className="size">S</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10697-fear-of-god-essentials-t-shirt-coral-ss22">Fear
                        of God Essentials T-shirt Coral (SS22)</a></p>

                      <p className="product-price">

                        <span>đ 1,800,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2021/01/16/480x320/6002eaca8ea19.jpg"
                           alt="Nike Air Force 1 Low All White '07" title="Nike Air Force 1 Low All White '07"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=7 US"
                           className="size">7 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=7.5 US"
                           className="size">7.5 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=9.5 US"
                           className="size">9.5 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=10 US"
                           className="size">10 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=10.5 US"
                           className="size">10.5 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=11 US"
                           className="size">11 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=11.5 US"
                           className="size">11.5 US</a>
                        <a href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07?size=12 US"
                           className="size">12 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/6999-nike-air-force-1-low-all-white-07">Nike Air Force
                        1 Low All White '07</a></p>

                      <p className="product-price">

                        <span>đ 3,000,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/436-crep-protect-gift-pack">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2020/08/06/480x320/5f2b9c2fb48fc.jpg"
                           alt="Crep Protect Gift Pack" title="Crep Protect Gift Pack"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/436-crep-protect-gift-pack?size=Free Size"
                           className="size">Free Size</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/436-crep-protect-gift-pack">Crep Protect Gift Pack</a>
                      </p>

                      <p className="product-price">

                        <span className="price-decoration">đ 1,000,000</span><br/>
                        <span>đ 1,250,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2020/03/19/480x320/5e72e69ade5f6.jpg"
                           alt="Nike Air Force 1 Shadow Triple White (W)"
                           title="Nike Air Force 1 Shadow Triple White (W)"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=5.5W US"
                          className="size">5.5W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=6W US"
                          className="size">6W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=7W US"
                          className="size">7W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=7.5W US"
                          className="size">7.5W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=8.5W US"
                          className="size">8.5W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=9W US"
                          className="size">9W US</a>
                        <a
                          href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=12W US"
                          className="size">12W US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w">Nike Air
                        Force 1 Shadow Triple White (W)</a></p>

                      <p className="product-price">

                        <span>đ 3,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/03/08/480x320/622742a34109e.jpg"
                           alt="New Balance 550 Cream Black" title="New Balance 550 Cream Black"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=4 US"
                           className="size">4 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=4.5 US"
                           className="size">4.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=7.5 US"
                           className="size">7.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=10 US"
                           className="size">10 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=10.5 US"
                           className="size">10.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black?size=11 US"
                           className="size">11 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/9248-new-balance-550-cream-black">New Balance 550 Cream
                        Black</a></p>

                      <p className="product-price">

                        <span>đ 4,200,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11078-conic-5-in-flat-shorts-charcoal">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/09/480x320/636b8e0732ca8.jpg"
                           alt="Conic 5 in Flat Shorts Charcoal" title="Conic 5 in Flat Shorts Charcoal"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/11078-conic-5-in-flat-shorts-charcoal?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/11078-conic-5-in-flat-shorts-charcoal?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/11078-conic-5-in-flat-shorts-charcoal?size=L"
                           className="size">L</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11078-conic-5-in-flat-shorts-charcoal">Conic 5 in Flat
                        Shorts Charcoal</a></p>

                      <p className="product-price">

                        <span>đ 590,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11081-conic-5-in-flat-shorts-sage">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/09/480x320/636b8e7d21476.jpg"
                           alt="Conic 5 in Flat Shorts Sage" title="Conic 5 in Flat Shorts Sage"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/11081-conic-5-in-flat-shorts-sage?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/11081-conic-5-in-flat-shorts-sage?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/11081-conic-5-in-flat-shorts-sage?size=L"
                           className="size">L</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11081-conic-5-in-flat-shorts-sage">Conic 5 in Flat
                        Shorts Sage</a></p>

                      <p className="product-price">

                        <span>đ 590,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/10/21/480x320/63522af0cee2a.jpg"
                           alt="Conic Inner Peace White Tee" title="Conic Inner Peace White Tee"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee?size=S"
                           className="size">S</a>
                        <a href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee?size=M"
                           className="size">M</a>
                        <a href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee?size=L"
                           className="size">L</a>
                        <a href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee?size=XL"
                           className="size">XL</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10987-conic-inner-peace-white-tee">Conic Inner Peace
                        White Tee</a></p>

                      <p className="product-price">

                        <span>đ 550,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/06/25/480x320/62b6f8ba91476.jpg"
                           alt="Nike Dunk Low Valerian Blue" title="Nike Dunk Low Valerian Blue"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue?size=6.5 US"
                           className="size">6.5 US</a>
                        <a href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue?size=9.5 US"
                           className="size">9.5 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10095-nike-dunk-low-valerian-blue">Nike Dunk Low
                        Valerian Blue</a></p>

                      <p className="product-price">

                        <span>đ 4,800,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/07/11/480x320/62cc1a5a217e4.jpg"
                           alt="Air Jordan 1 Low Vintage Grey" title="Air Jordan 1 Low Vintage Grey"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=9.5 US"
                           className="size">9.5 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=10 US"
                           className="size">10 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=10.5 US"
                           className="size">10.5 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=11 US"
                           className="size">11 US</a>
                        <a href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey?size=12 US"
                           className="size">12 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10227-air-jordan-1-low-vintage-grey">Air Jordan 1 Low
                        Vintage Grey</a></p>

                      <p className="product-price">

                        <span className="price-decoration">đ 4,600,000</span><br/>
                        <span>đ 4,200,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10843-drew-house-fire-ss-tee-faded-black">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/09/28/480x320/63345081a4941.jpg"
                           alt="Drew House Fire SS Tee Faded Black" title="Drew House Fire SS Tee Faded Black"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10843-drew-house-fire-ss-tee-faded-black?size=M"
                           className="size">M</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10843-drew-house-fire-ss-tee-faded-black">Drew House
                        Fire SS Tee Faded Black</a></p>

                      <p className="product-price">

                        <span>đ 3,300,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/3876-bape-flame-side-big-ape-head-tee-blackblue">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2020/02/12/480x320/5e43acf1b9381.jpg"
                           alt="BAPE Flame Side Big Ape Head Tee Black/Blue"
                           title="BAPE Flame Side Big Ape Head Tee Black/Blue"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/3876-bape-flame-side-big-ape-head-tee-blackblue?size=M"
                          className="size">M</a>
                        <a
                          href="https://www.glab.vn/product/detail/3876-bape-flame-side-big-ape-head-tee-blackblue?size=L"
                          className="size">L</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/3876-bape-flame-side-big-ape-head-tee-blackblue">BAPE
                        Flame Side Big Ape Head Tee Black/Blue</a></p>

                      <p className="product-price">

                        <span>đ 3,400,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/07/26/480x320/62dfdb488e9eb.jpg"
                           alt="adidas Adilette 22 Slides Grey" title="adidas Adilette 22 Slides Grey"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=4 US"
                           className="size">4 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=5 US"
                           className="size">5 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=6 US"
                           className="size">6 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=7 US"
                           className="size">7 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey?size=10 US"
                           className="size">10 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/10397-adidas-adilette-22-slides-grey">adidas Adilette
                        22 Slides Grey</a></p>

                      <p className="product-price">

                        <span>đ 1,700,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/04/04/480x320/624ac7eb44158.jpg"
                           alt="New Balance 550 White Black" title="New Balance 550 White Black"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=5.5 US"
                           className="size">5.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=6 US"
                           className="size">6 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=6.5 US"
                           className="size">6.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=7 US"
                           className="size">7 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=7.5 US"
                           className="size">7.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black?size=9.5 US"
                           className="size">9.5 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/9462-new-balance-550-white-black">New Balance 550 White
                        Black</a></p>

                      <p className="product-price">

                        <span>đ 4,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/3852-air-jordan-dri-fit-basketball-ankle-black-socks">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/05/09/480x320/6278e3a7ee5de.jpg"
                           alt="Air Jordan Dri-Fit Basketball Ankle Black Socks"
                           title="Air Jordan Dri-Fit Basketball Ankle Black Socks"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/3852-air-jordan-dri-fit-basketball-ankle-black-socks?size=Free Size"
                          className="size">Free Size</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/3852-air-jordan-dri-fit-basketball-ankle-black-socks">Air
                        Jordan Dri-Fit Basketball Ankle Black Socks</a></p>

                      <p className="product-price">

                        <span>đ 250,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/05/27/480x320/6290aacbdb1d3.jpg"
                           alt="Air Jordan 1 Low Bulls" title="Air Jordan 1 Low Bulls"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=8 US"
                           className="size">8 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=8.5 US"
                           className="size">8.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=9 US"
                           className="size">9 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=9.5 US"
                           className="size">9.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=10 US"
                           className="size">10 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=10.5 US"
                           className="size">10.5 US</a>
                        <a href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls?size=11 US"
                           className="size">11 US</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/9885-air-jordan-1-low-bulls">Air Jordan 1 Low Bulls</a>
                      </p>

                      <p className="product-price">

                        <span className="price-decoration">đ 3,200,000</span><br/>
                        <span>đ 3,000,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11058-crep-protect-x-dj-khaled-sneaker-care">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/12/480x320/636f6609f1e63.jpg"
                           alt="Crep Protect X DJ Khaled Sneaker Care" title="Crep Protect X DJ Khaled Sneaker Care"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/11058-crep-protect-x-dj-khaled-sneaker-care?size=Free Size"
                          className="size">Free Size</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11058-crep-protect-x-dj-khaled-sneaker-care">Crep
                        Protect X DJ Khaled Sneaker Care</a></p>

                      <p className="product-price">

                        <span>đ 1,400,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11088-fear-of-god-essentials-sweatshorts-wood">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/12/480x320/636f57684971b.jpg"
                           alt="Fear of God Essentials Sweatshorts Wood"
                           title="Fear of God Essentials Sweatshorts Wood"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/11088-fear-of-god-essentials-sweatshorts-wood?size=XS"
                          className="size">XS</a>
                        <a
                          href="https://www.glab.vn/product/detail/11088-fear-of-god-essentials-sweatshorts-wood?size=S"
                          className="size">S</a>
                        <a
                          href="https://www.glab.vn/product/detail/11088-fear-of-god-essentials-sweatshorts-wood?size=M"
                          className="size">M</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11088-fear-of-god-essentials-sweatshorts-wood">Fear of
                        God Essentials Sweatshorts Wood</a></p>

                      <p className="product-price">

                        <span>đ 3,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11090-fear-of-god-essentials-shorts-off-black">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/12/480x320/636f577797d6d.jpg"
                           alt="Fear of God Essentials Shorts Off Black"
                           title="Fear of God Essentials Shorts Off Black"/>
                    </div>
                  </a>
                  <div className="product__item--infor">
                    <div className="text-center mgB-5 hide">
                      <div className="size-item">
                        <a
                          href="https://www.glab.vn/product/detail/11090-fear-of-god-essentials-shorts-off-black?size=XS"
                          className="size">XS</a>
                      </div>
                      <p className="text-uper">available size</p>
                    </div>

                    <div className="clearfix">
                      <p className="product-name text-uper"><a
                        href="https://www.glab.vn/product/detail/11090-fear-of-god-essentials-shorts-off-black">Fear of
                        God Essentials Shorts Off Black</a></p>

                      <p className="product-price">

                        <span>đ 3,500,000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product__item">
                <div className="product__item--pic">
                  <a href="https://www.glab.vn/product/detail/11089-fear-of-god-essentials-dock-short-wood">
                    <div className="product__img">
                      <img className="lazy" src="https://www.glab.vn/images/no-image-3.png"
                           data-src="https://glab.vn/storage/products/2022/11/12/480x320/636f576f1c4c2.jpg"
                           alt="Fear of God Essentials Dock Short Wood" title="Fear of God Essentials Dock Short Wood"/>
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