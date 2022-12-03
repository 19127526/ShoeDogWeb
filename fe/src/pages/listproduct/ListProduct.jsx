import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ListProduct=()=>{
  const [filterButton,setFilterButton]=useState(false);
  const [dropdownButton,setDropdownButton]=useState(false);
  const {product}=useParams();
  console.log(product)
  useEffect(()=>{
    if(filterButton===true){
      document.body.classList.add("filterActive")
    }
    else{
      document.body.classList.remove("filterActive")
    }
  },[filterButton])
  return (
    <div className="container">
      <div className="text-center">
        <div className="typeProducts">
          <div className="row" style={{width: "100%"}}>
            <div className="col-xs-3"><h2>Footwear</h2></div>
            <div className="col-xs-6">
              <div className="bootstrap-tagsinput">
              </div>
            </div>
            <div className="col-xs-3">
              <div className="typeFilter text-left">
                <a className="filterToggle" onClick={()=>setFilterButton(true)}><span className="icon-settings"></span>Filter</a>
              </div>
            </div>
          </div>

        </div>

        <div className="menuFilter">
          <a className="filterClose" onClick={()=>setFilterButton(false)}><span className="icon-meunu-close"></span></a>
          <div className="filterIcon"><span className="icon-settings"></span>Filter</div>
          <div className="filterItems">
            <div className={dropdownButton===true?"dropdown open":"dropdown"} onClick={()=>setDropdownButton(!dropdownButton)}>
              <div className="btn btn-default btn-xs dropdown-toggle" type="button" id="sortUsers"
                   data-toggle="dropdown">
                Sort &nbsp;&nbsp;
                <span className="caret"></span>
              </div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="sortUsers">
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_asc">Price: lowest
                  first <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=c.price_desc">Price:
                  highest first <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_desc">New to
                  Old <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
                <li role="presentation"><a role="menuitem" tabIndex="-1"
                                           href="https://www.glab.vn/product/footwear?sortBy=a.created_at_asc">Old to
                  New <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Brand <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?brand=adidas">adidas</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=air-jordan">Air Jordan</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=anti-social-social-club">Anti Social Social
                  Club</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=asics">Asics</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=bape">Bape</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=bearbrick">Bearbrick</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=billionaire-boys-club">Billionaire Boys Club</a>
                </li>
                <li><a href="https://www.glab.vn/product/footwear?brand=casio">CASIO</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=champion">Champion</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=chrome-hearts">Chrome Hearts</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=comme-des-garcons">Comme Des Garcons </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=conic">CONIC</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=converse">Converse</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=crep-protect">Crep Protect</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=drew-house">Drew House</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=fear-of-god">Fear Of God </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=front">FRONT</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=glab">GLAB</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=grateful-dead">Grateful Dead</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=huf">HUF</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=jason-mark">Jason Mark</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=loop-brand">Loop Brand</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=mlb">MLB</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=new-balance">New Balance</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=nike">Nike</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=off-white">Off-White </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=others">OTHERS</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=palace">Palace</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=puma">Puma</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=reebok">Reebok</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=reshoevn8r">Reshoevn8r</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=ripndip">RIPNDIP</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=shoex">ShoeX</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=stussy">Stussy</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=supreme">Supreme</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=the-collectors">The Collectors </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=undefeated">Undefeated</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=under-armour">Under Armour</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=uniqlo">Uniqlo </a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=vans">Vans</a></li>
                <li><a href="https://www.glab.vn/product/footwear?brand=vintage">Vintage</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Subcategory <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=newest-sneakers">Newest Sneakers</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=lifestyle">Lifestyle</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=running">Running</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=basketball">Basketball</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=gym-training">Gym &amp; Training</a></li>
                <li><a href="https://www.glab.vn/product/footwear?sub_cat=sandal">Sandal</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Sizes <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li><a href="https://www.glab.vn/product/footwear?size=149">6C</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=122">9CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=130">2Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=134">1.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=135">18.5 CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=150">5.5K</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=152">37</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=153">21CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=154">20CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=157">13 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=158">15 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=141">1Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=139">1 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=124">3 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=123">3.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=1">4 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=2">4.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=3">5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=4">5.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=5">6 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=6">6.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=7">7 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=8">7.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=9">8 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=10">8.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=11">9 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=12">9.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=13">10 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=128">13cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=14">10.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=15">11 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=16">11.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=17">12 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=18">12.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=60">13 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=113">13.5 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=101">14 US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=27">3.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=28">4W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=29">4.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=30">5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=31">5.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=32">6W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=33">6.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=34">7W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=35">7.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=36">8W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=37">8.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=38">9W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=39">9.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=40">10W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=41">10.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=42">11W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=43">11.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=118">12.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=117">13.5W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=79">12W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=114">14W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=115">13W US</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=104">3Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=44">3.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=45">4Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=46">4.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=47">5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=48">5.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=49">6Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=50">6.5Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=51">7Y</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=94">32</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=110">35.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=95">33.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=100">36</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=109">37</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=102">34</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=108">36.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=76">38</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=75">39</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=52">40</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=78">41.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=53">41</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=54">42</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=55">43</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=58">44</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=112">29.5CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=111">37.5</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=87">12cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=106">17CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=105">18CM</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=88">14cm</a></li>
                <li><a href="https://www.glab.vn/product/footwear?size=89">16cm</a></li>
              </ul>
            </div>
            <div className="filterItem">
              <a href="">Price <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix" style={{padding: "0 0 20px 50px"}}>
                <li style={{width: "90%"}}>
                  <p>
                    <input type="text" id="amount" readOnly=""
                           style={{border:"0", color:"#f6931f", fontWeight:"bold", width: "100%"}}/>
                  </p>
                  <div id="slider-range"
                       className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "3.0303%", width: "16.1616%"}}></div>
                    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"
                          style={{left: "3.0303%"}}></span><span tabIndex="0"
                                                              className="ui-slider-handle ui-corner-all ui-state-default"
                                                              style={{left: "19.1919%"}}></span></div>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>
      <div className="row products">
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2021/03/19/480x320/605479b65d160.jpg"
                       alt=" Air Jordan 1 Retro High OG University Blue"
                       title=" Air Jordan 1 Retro High OG University Blue" style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a
                      href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue?size=7.5 US"
                      className="size">7.5 US</a>
                    <a
                      href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue?size=9 US"
                      className="size">9 US</a>
                    <a
                      href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue?size=10.5 US"
                      className="size">10.5 US</a>
                    <a
                      href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue?size=12 US"
                      className="size">12 US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/7452-air-jordan-1-retro-high-og-university-blue"> Air
                    Jordan 1 Retro High OG University Blue</a></p>

                  <p className="product-price">

                    <span className="price-decoration">đ 11,000,000</span><br/>
                    <span>đ 10,200,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2021/02/04/480x320/601ba3545a88c.jpg"
                       alt="Nike Dunk Low Retro White Black (2021)" title="Nike Dunk Low Retro White Black (2021)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021?size=8 US"
                       className="size">8 US</a>
                    <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021?size=9 US"
                       className="size">9 US</a>
                    <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021?size=9.5 US"
                       className="size">9.5 US</a>
                    <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021?size=10 US"
                       className="size">10 US</a>
                    <a href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021?size=10.5 US"
                       className="size">10.5 US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/7068-nike-dunk-low-retro-white-black-2021">Nike Dunk Low
                    Retro White Black (2021)</a></p>

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
              <a href="https://www.glab.vn/product/detail/7971-nike-dunk-low-se-gs-free-99-white">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2021/05/24/480x320/60ab7a3bbb53d.jpg"
                       alt="Nike  Dunk Low SE GS Free 99 White" title="Nike  Dunk Low SE GS Free 99 White"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/7971-nike-dunk-low-se-gs-free-99-white?size=4Y"
                       className="size">4Y</a>
                    <a href="https://www.glab.vn/product/detail/7971-nike-dunk-low-se-gs-free-99-white?size=5Y"
                       className="size">5Y</a>
                    <a href="https://www.glab.vn/product/detail/7971-nike-dunk-low-se-gs-free-99-white?size=5.5Y"
                       className="size">5.5Y</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/7971-nike-dunk-low-se-gs-free-99-white">Nike Dunk Low SE GS
                    Free 99 White</a></p>

                  <p className="product-price">

                    <span className="price-decoration">đ 4,800,000</span><br/>
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
              <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2021/01/19/480x320/6006e45216668.jpg"
                       alt="Air Jordan 1 Low Black Siren Red (W)" title="Air Jordan 1 Low Black Siren Red (W)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w?size=5.5W US"
                       className="size">5.5W US</a>
                    <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w?size=7W US"
                       className="size">7W US</a>
                    <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w?size=7.5W US"
                       className="size">7.5W US</a>
                    <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w?size=11W US"
                       className="size">11W US</a>
                    <a href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w?size=11.5W US"
                       className="size">11.5W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/7009-air-jordan-1-low-black-siren-red-w">Air Jordan 1 Low
                    Black Siren Red (W)</a></p>

                  <p className="product-price">

                    <span className="price-decoration">đ 5,400,000</span><br/>
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
              <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/05/13/480x320/627e4d5cebce2.jpg"
                       alt="Air Jordan 1 Low Shadow Toe (GS)" title="Air Jordan 1 Low Shadow Toe (GS)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=4Y"
                       className="size">4Y</a>
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=5Y"
                       className="size">5Y</a>
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=5.5Y"
                       className="size">5.5Y</a>
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=6Y"
                       className="size">6Y</a>
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=6.5Y"
                       className="size">6.5Y</a>
                    <a href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs?size=7Y"
                       className="size">7Y</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/9744-air-jordan-1-low-shadow-toe-gs">Air Jordan 1 Low
                    Shadow Toe (GS)</a></p>

                  <p className="product-price">

                    <span>đ 5,300,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/07/06/480x320/62c5617322f30.jpg"
                       alt="Air Jordan 1 Low Vintage Grey (GS)" title="Air Jordan 1 Low Vintage Grey (GS)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=3.5Y"
                       className="size">3.5Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=4Y"
                       className="size">4Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=4.5Y"
                       className="size">4.5Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=5Y"
                       className="size">5Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=5.5Y"
                       className="size">5.5Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=6Y"
                       className="size">6Y</a>
                    <a href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs?size=7Y"
                       className="size">7Y</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/10196-air-jordan-1-low-vintage-grey-gs">Air Jordan 1 Low
                    Vintage Grey (GS)</a></p>

                  <p className="product-price">

                    <span className="price-decoration">đ 4,200,000</span><br/>
                    <span>đ 3,700,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/11/02/480x320/636263dd7c2f3.jpg"
                       alt="Wmns Air Jordan 1 Low Aluminum" title="Wmns Air Jordan 1 Low Aluminum"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=5.5W US"
                       className="size">5.5W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=6W US"
                       className="size">6W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=6.5W US"
                       className="size">6.5W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=7W US"
                       className="size">7W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=7.5W US"
                       className="size">7.5W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=8W US"
                       className="size">8W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=10W US"
                       className="size">10W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=10.5W US"
                       className="size">10.5W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=11W US"
                       className="size">11W US</a>
                    <a href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum?size=11.5W US"
                       className="size">11.5W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/11041-wmns-air-jordan-1-low-aluminum">Wmns Air Jordan 1 Low
                    Aluminum</a></p>

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
              <a href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/01/13/480x320/61e000afdf7f1.jpg"
                       alt="Nike WMNS Air Force 1 Low Shadow Sail Pink Glaze "
                       title="Nike WMNS Air Force 1 Low Shadow Sail Pink Glaze " style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=5W US"
                      className="size">5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=6.5W US"
                      className="size">6.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=7.5W US"
                      className="size">7.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=8W US"
                      className="size">8W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=8.5W US"
                      className="size">8.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze?size=9W US"
                      className="size">9W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/8887-nike-wmns-air-force-1-low-shadow-sail-pink-glaze">Nike
                    WMNS Air Force 1 Low Shadow Sail Pink Glaze </a></p>

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
              <a href="https://www.glab.vn/product/detail/10892-air-jordan-1-low-triple-white-2022">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/10/04/480x320/633bf1ee24304.jpg"
                       alt="Air Jordan 1 Low Triple White (2022)" title="Air Jordan 1 Low Triple White (2022)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/10892-air-jordan-1-low-triple-white-2022?size=10.5 US"
                       className="size">10.5 US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/10892-air-jordan-1-low-triple-white-2022">Air Jordan 1 Low
                    Triple White (2022)</a></p>

                  <p className="product-price">

                    <span>đ 5,000,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/10/05/480x320/633d47bcc471d.jpg"
                       alt="WMNS Air Jordan 1 Low Triple White (2022)" title="WMNS Air Jordan 1 Low Triple White (2022)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=5W US"
                      className="size">5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=5.5W US"
                      className="size">5.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=6W US"
                      className="size">6W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=6.5W US"
                      className="size">6.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=7W US"
                      className="size">7W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=7.5W US"
                      className="size">7.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=8W US"
                      className="size">8W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=8.5W US"
                      className="size">8.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=9W US"
                      className="size">9W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=9.5W US"
                      className="size">9.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=10W US"
                      className="size">10W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=10.5W US"
                      className="size">10.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=11W US"
                      className="size">11W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=11.5W US"
                      className="size">11.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022?size=12W US"
                      className="size">12W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/10904-wmns-air-jordan-1-low-triple-white-2022">WMNS Air
                    Jordan 1 Low Triple White (2022)</a></p>

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
              <a href="https://www.glab.vn/product/detail/9591-wmns-nike-air-force-1-shadow-white-pink-oxford">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/04/25/480x320/62666d96993d8.jpg"
                       alt="Wmns Nike Air Force 1 Shadow White Pink Oxford"
                       title="Wmns Nike Air Force 1 Shadow White Pink Oxford" style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a
                      href="https://www.glab.vn/product/detail/9591-wmns-nike-air-force-1-shadow-white-pink-oxford?size=7.5W US"
                      className="size">7.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/9591-wmns-nike-air-force-1-shadow-white-pink-oxford?size=8.5W US"
                      className="size">8.5W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/9591-wmns-nike-air-force-1-shadow-white-pink-oxford">Wmns
                    Nike Air Force 1 Shadow White Pink Oxford</a></p>

                  <p className="product-price">

                    <span>đ 3,600,000</span>
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
                  <img className="lazy" src="https://glab.vn/storage/products/2020/03/19/480x320/5e72e69ade5f6.jpg"
                       alt="Nike Air Force 1 Shadow Triple White (W)" title="Nike Air Force 1 Shadow Triple White (W)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a
                      href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=5.5W US"
                      className="size">5.5W US</a>
                    <a href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=6W US"
                       className="size">6W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=6.5W US"
                      className="size">6.5W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=7.5W US"
                      className="size">7.5W US</a>
                    <a href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=8W US"
                       className="size">8W US</a>
                    <a
                      href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=8.5W US"
                      className="size">8.5W US</a>
                    <a href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=9W US"
                       className="size">9W US</a>
                    <a href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w?size=12W US"
                       className="size">12W US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/4180-nike-air-force-1-shadow-triple-white-w">Nike Air Force
                    1 Shadow Triple White (W)</a></p>

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
              <a href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/08/16/480x320/62fb5aaa22aa9.jpg"
                       alt="Nike Dunk Low Hot Curry Game Royal (GS)" title="Nike Dunk Low Hot Curry Game Royal (GS)"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs?size=4Y"
                       className="size">4Y</a>
                    <a href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs?size=6Y"
                       className="size">6Y</a>
                    <a href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs?size=6.5Y"
                       className="size">6.5Y</a>
                    <a href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs?size=7Y"
                       className="size">7Y</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/10559-nike-dunk-low-hot-curry-game-royal-gs">Nike Dunk Low
                    Hot Curry Game Royal (GS)</a></p>

                  <p className="product-price">

                    <span>đ 3,900,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item--pic">
              <a href="https://www.glab.vn/product/detail/3378-adidas-yeezy-boost-700-wave-runner">
                <div className="product__img">
                  <img className="lazy" src="https://glab.vn/storage/products/2022/03/23/480x320/623b1acc698db.jpg"
                       alt="adidas Yeezy Boost 700 Wave Runner" title="adidas Yeezy Boost 700 Wave Runner"
                       style={{display: "inline-block"}}/>
                </div>
              </a>
              <div className="product__item--infor">
                <div className="text-center mgB-5 hide">
                  <div className="size-item">
                    <a href="https://www.glab.vn/product/detail/3378-adidas-yeezy-boost-700-wave-runner?size=4.5 US"
                       className="size">4.5 US</a>
                    <a href="https://www.glab.vn/product/detail/3378-adidas-yeezy-boost-700-wave-runner?size=5 US"
                       className="size">5 US</a>
                  </div>
                  <p className="text-uper">available size</p>
                </div>

                <div className="clearfix">
                  <p className="product-name text-uper"><a
                    href="https://www.glab.vn/product/detail/3378-adidas-yeezy-boost-700-wave-runner">adidas Yeezy Boost
                    700 Wave Runner</a></p>

                  <p className="product-price">

                    <span>đ 9,000,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">


        <a href="https://www.glab.vn/product/footwear?page=2&amp;category=footwear"
           className="btn-see-more ajax text-uper">see more</a>
      </div>

    </div>
  )
}

export default ListProduct