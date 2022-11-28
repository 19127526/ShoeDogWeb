import logo from '../../assets/themes/icons/logo.svg';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
 const HeaderComponent=({onClickAside})=>{
   const navigate=useNavigate();
  return (
    <header className="clearfix active" >
      <a  id="togger__menu" onClick={()=>onClickAside()}>
        <span></span>
        <span></span>
      </a>
      <div className="container">
        <div className="header__left">
          <a href="" style={{display:"none"}}>SELL</a>
          <a href="https://www.glab.vn/user/items" style={{display:"none"}}>CONSIGNMENT MANAGER</a>
        </div>
        <div className="header__right" >
          <div className="auth__user">
            <div className="dropdown">
              <a href="" className="toggle__auth val-selected"><span className="icon-slice6"></span></a>
              <div className="dropdown-up-style hide">
                <div className="dropdown__inner">
                  <ul>
                    <li><a href="https://www.glab.vn/login">Log In</a></li>
                    <li><a href="https://www.glab.vn/register">Create Account</a></li>
                    <li><a href="https://www.glab.vn/contract/find">Find Contract</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="" className="header__right--mbsearch" style={{display:"inline-block"}}><span className="icon-search"></span></a>
          <div className="header__cart dropdown" >
            <a href="" className="val-selected"><span className="icon-slice8"></span>
              <span className="header__cart--num hide">
                ()
              </span>
            </a>
            <div className="dropdown-up-style hide">
              <div className="dropdown__inner">
                <h2 className="text-uper font-700 fs-16">your cart</h2>
                <div className="text-center">
                  <p className="font-500 fs-15 mgB-15">Không có sản phẩm nào !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center header__logo">
          <span>logo</span>
          <a onClick={()=>navigate("/")}><img src={logo} alt="" /></a>
        </div>
      </div>
      <div className="container">
        <div id="menu">
          <div className="inner-menu">
            <div>
              <ul>
                <li>
                  <a href="https://www.glab.vn/product/features"><span>Features</span></a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/footwear"><span>Footwear</span></a>
                  <div className="menu__sub">
                    <ul>
                      <li>
                        <a href="https://www.glab.vn/product/newest-sneakers">Newest Sneakers</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/lifestyle">Lifestyle</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/running">Running</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/basketball">Basketball</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/gym-training">Gym &amp; Training</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/sandal">Sandal</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/apparel"><span>Apparel</span></a>
                  <div className="menu__sub">
                    <ul>
                      <li>
                        <a href="https://www.glab.vn/product/conic" style={{color:"red"}}>CONIC®</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/glab" style={{color:"red"}}>GLAB®</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/hoodies">Hoodies</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/shorts">Shorts</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/outerwears">Outerwears</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/tees">Tees</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/pants">Pants</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/shirts">Shirts</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/jackets">Jackets</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/sweaters">Sweaters</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/long-sleeves">Long Sleeves</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/vintage">Vintage</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/accessories"><span>Accessories</span></a>
                  <div className="menu__sub">
                    <ul>
                      <li>
                        <a href="https://www.glab.vn/product/watch">Watch</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/socks">Socks</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/cap">Cap</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/backpack-and-bag">Backpack and Bag</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/shoe-care">Shoe Care</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/miscellaneous">Miscellaneous</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/glasses">Glasses</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/bearbrick">Bearbrick</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/face-mask">Face Mask</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/type/used"><span>Used</span></a>
                </li>
                <li>
                  <a href="https://www.glab.vn/product/type/sale"><span>Sale</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    )
}

export default HeaderComponent