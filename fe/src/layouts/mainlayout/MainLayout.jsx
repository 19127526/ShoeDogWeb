import {BackTop, Layout, Spin} from 'antd';
import HeaderDefaultComponent from "../../components/header/HeaderDefaultComponent";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import FooterComponent from "../../components/footer/FooterComponent";
import RoutesPage from "../../routes/RoutesPage";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import {useLocation, useNavigate} from "react-router-dom";
import BackTopComponent from "../../components/backtop/BackTopComponent";
import {ThemeContext} from "../../context/ContextProvider";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeStateLoading, turnOffLoading, turnOnLoading} from "./MainLayout.actions";
import {CLIENT_URL, ERROR_ROUTE, LIST_NEW_PRODUCT_ROUTE} from "../../configs/url";
import useDebounce from "../../customhooks/useDebounce";
import {searchProducts} from "../../apis/products/ProductsApi";
import "./MainLayout.css"
import { Helmet } from "react-helmet";
const {Header, Footer, Sider, Content} = Layout;
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {getParentCategory} from "../../apis/parentcategories/ParentCateApi";
import HeaderMobileComponent from "../../components/header/HeaderMobileComponent";
const MainLayout = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [searchButton, setSearchButton] = useState(false);
  const navigate = useNavigate();
  const loadingRedux=useSelector(state=>state.mainReducer);
  const dispatch=useDispatch();
  const location=useLocation();
  const [searchValue,setSearchValue]=useState("");
  const [searchListResult,setSearchListResult]=useState([]);
  const debounceValue = useDebounce(searchValue, 500);
  const [scrollY, setScrollY] = useState(0);
  const [loading,isLoading]=useState(false);
  const [changeSide,setChangeSide]=useState(false);
  const data = useSelector(state => state.mainReducer);
  const ref = useRef(null);

  // useEffect(() => {
  //   const getListCategory = () => {
  //     dispatch(turnOnLoading())
  //     getListCategories()
  //       .then(res => {
  //         if (res.data.status === 'success') {
  //           setCategories(res.data.data);
  //           isLoading(true)
  //         }
  //       })
  //       .catch(err => {
  //
  //       })
  //       .finally(()=>{
  //         dispatch(turnOffLoading())
  //       })
  //   }
  //   getListCategory()
  // }, []);
  const searchValueChange=(e)=>{
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    const getParentCategoryFnc = async () => {
      dispatch(turnOnLoading())
      try {
        const res = await getParentCategory()
        if(res?.status === 200) {
          setParentCategories(res?.data?.data || []);
          isLoading(true)
        }
        dispatch(turnOnLoading())
      } catch (e) {
        dispatch(turnOnLoading())
      }
    }
    getParentCategoryFnc()
  }, [])



  useEffect(
    () => {
      if (debounceValue) {
        dispatch(turnOnLoading())
        searchProducts(searchValue)
          .then(res=>{
            if(res.data.status==='success') {
              setSearchListResult(res.data.data)
            }
          })
          .catch(err=>{})
          .finally(()=>{
            dispatch(turnOffLoading())
          })
        }
       else {
        dispatch(turnOffLoading())
        setSearchValue("");
      }
    },[debounceValue]);



  useEffect(() => {

    const logit=()=> {
      setScrollY(window.pageYOffset);
    }

    const watchScroll=()=>{
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  },[window.pageYOffset]);




  useEffect(
    () => {
      if(data.isLoading==false) {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }, [data]);

  useEffect(
    () => {
      if(data.isLoading==false) {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }, []);


  return (
    <>
      <div ref={ref}></div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TRANG CHỦ - SHOEDOG - Shop giày uy tín nhất TP.HCM</title>
        <link
          rel="alternate"
          href={CLIENT_URL}
          title="Dòng thông tin SHOEDOG - Shop giày uy tín nhất TP.HCM »"
        />
        <meta
          name="description"
          content="Shop giày uy tín bậc nhất TP.HCM. Chuyên hàng 2hand, hàng New chính hãng 100%. Bán giày không bán lương tâm. Chất lượng là số 1."
        />
      </Helmet>
    {
      location.pathname.includes(ERROR_ROUTE)?
          <RoutesPage/>
        :
          <Spin size="large"  direction="horizon" spinning={loadingRedux.isLoading} indicator={<LoadingComponent/>}>
            <body className={changeSide==false?"":"activeMenu"}>
            <div id="wrapper">
              <div id="menu__mobi">
                <a  className="close__menu" onClick={()=>setChangeSide(false)}><span className="icon-meunu-close"></span></a>
                <a  className="menu__logo"><img src="/themes/v1/icons/logo.svg" alt=""/></a>
                <div className="menu__items">
                  <div className="menu__items--inner">
                    <ul className="menu-mobile">
                     <HeaderMobileComponent  parentCate={parentCategories} setChangeSide={setChangeSide}/>
                      {/*{parentCategories?.map((value, index) => (*/}
                      {/*        <li key={value?.ParentId}>*/}
                      {/*          <a>{value?.ParentName}<span*/}
                      {/*              className="icon-navigate_next"></span></a>*/}
                      {/*          {*/}
                      {/*            value?.ListCategory?.map((cate, index) => (*/}
                      {/*                <ul>*/}
                      {/*                  <li key={`cate-${index}`} onClick={() =>{ navigate(`/product/${cate?.CatId}?page=1`); setChangeSide(false)}}>*/}
                      {/*                    <a >{cate}</a>*/}
                      {/*                  </li>*/}
                      {/*                </ul>*/}
                      {/*            ))*/}
                      {/*          }*/}
                      {/*        </li>*/}
                      {/*    )*/}
                      {/*)}*/}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="searchPro" style={{display: searchButton === true ? 'block' : 'none'}}>
                <div className="text-right mgB-20 mgT-10"><a id="closeSearch" onClick={() => setSearchButton(false)}><span
                  className="icon-uniF335"></span></a>
                </div>
                <div className="search" id="search">
                  <div className="frm-icon">
                    <input name="word" type="text" placeholder="Search" aria-autocomplete="none"  onChange={searchValueChange}/>
                    <button  className="icon-frm">
                      <span className="icon-enter-arrow"></span>
                    </button>
                    <div className="suggestSearch">
                      {
                        searchListResult.map(index=>(
                          <a onClick={()=>{navigate(`/detail/${index.ProId}`);setSearchButton(false)}}
                             className="item">
                            <div className="name">{index.ProName}</div>
                            <div className="numItems">Xem chi tiết</div>
                          </a>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              <HeaderDefaultComponent categoryList={parentCategories} searchButton={() => setSearchButton(!searchButton)} loading={loading} setChangeSide={setChangeSide}/>
              <Content style={{minHeight: "100px"}}>
                <RoutesPage/>
                <BackTop visible={scrollY>=400?true:false} >
                  <BackTopComponent/>
                </BackTop>
              </Content>
              <FooterComponent/>
              <MessengerCustomerChat
                pageId="1917037658621790"
              />
            </div>
            </body>
          </Spin>
    }
    </>
  )
}


export default MainLayout