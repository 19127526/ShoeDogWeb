import logo from '../../assets/themes/icons/favicon.ico';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
 const HeaderComponent=({categoryList,searchButton})=>{
   const navigate=useNavigate();
   console.log(categoryList)
   const [cartButton,setCartButton]=useState(false);
  return (
    <header className="clearfix" >
      <a  id="togger__menu">
        <span></span>
        <span></span>
      </a>
      <div className="container">
        <div className="header__left">
          <a  style={{display:"none"}}>SELL</a>
          <a  style={{display:"none"}}>CONSIGNMENT MANAGER</a>
        </div>
        <div className="header__right" >

          <a className="header__right--mbsearch" style={{display:"inline-block"}} onClick={()=>searchButton()}><span className="icon-search"></span></a>
          <div className="header__cart dropdown" onClick={()=>setCartButton(!cartButton)}>
            <a  className={cartButton===true?"val-selected active":"val-selected"}><span className="icon-slice8"></span><span
              className="header__cart--num hide">()</span></a>
            <div className={cartButton===true?"dropdown-up-style active":"dropdown-up-style hide"} >
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
          <a onClick={()=>navigate("/")}><img src={logo} alt=""  style={{height:"5vh"}}/></a>
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
                {categoryList.map(index=>(
                  <li key={index.CatId}><a ><span>{index.CatName}</span></a></li>
                ))}
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