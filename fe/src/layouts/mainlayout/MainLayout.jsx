import {BackTop, Layout, Spin} from 'antd';
import HeaderComponent from "../../components/header/HeaderComponent";
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
import {CLIENT_URL, ERROR_ROUTE} from "../../configs/url";
import useDebounce from "../../customhooks/useDebounce";
import {searchProducts} from "../../apis/products/ProductsApi";
import {useElementSize} from "use-element-size";
import {getWindowHeight, getWindowWidth} from "../../utils/Utils";
import "./MainLayout.css"
import {config} from "@fortawesome/fontawesome-svg-core";
import { Helmet } from "react-helmet";
const {Header, Footer, Sider, Content} = Layout;

const MainLayout = () => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const getListCategory = () => {
      dispatch(turnOnLoading())
      getListCategories()
        .then(res => {
          if (res.data.status === 'success') {
            setCategories(res.data.data);
            isLoading(true)
          }
        })
        .catch(err => {

        })
        .finally(()=>{
          dispatch(turnOffLoading())
        })
    }
    getListCategory()
  }, []);
  const searchValueChange=(e)=>{
    setSearchValue(e.target.value);
  }



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



  useLayoutEffect(
    () => {
      if(data.isLoading==false) {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }, [data]);

  useLayoutEffect(
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
                      <li onClick={()=>{
                        navigate("/");
                        setChangeSide(false)
                      }}>
                        <a>Trang chủ</a>
                      </li>
                     {/* <li>
                        <a>Sales</a>
                      </li>*/}
                      <li>
                        <a onClick={() => {navigate(`/product/6/page=1`); setChangeSide(false)}}>Giày chính hãng<span
                          className="icon-navigate_next"></span></a>
                        <ul style={{marginBottom: "0px"}}>
                          <li onClick={() => {navigate(`/product/6/page=1`); setChangeSide(false)}}>
                            <a>Giày Mới</a>
                          </li>
                          <li onClick={() =>{navigate(`/product/7/page=1`); setChangeSide(false)}}>
                            <a >Giày Secondhand</a>
                          </li>
                          <li onClick={() => {navigate(`/product/8/page=1`); setChangeSide(false)}}>
                            <a >Giày trẻ em</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a onClick={() => {navigate(`/product/11/page=1`); setChangeSide(false)}}>Áo chính hãng<span
                          className="icon-navigate_next"></span></a>
                        <ul style={{marginBottom: "0px"}}>
                          <li onClick={() => {navigate(`/product/11/page=1`); setChangeSide(false)}}>
                            <a >Áo Thun</a>
                          </li>
                          <li onClick={() => {navigate(`/product/12/page=1`); setChangeSide(false)}}>
                            <a>Áo Khoác</a>
                          </li>
                          <li onClick={() => {navigate(`/product/9/page=1`); setChangeSide(false)}}>
                            <a>Áo Hoodie</a>
                          </li>
                          <li onClick={() =>{navigate(`/product/10/page=1`); setChangeSide(false)}}>
                            <a>Áo Sweater</a>
                          </li>

                        </ul>
                      </li>
                      {categories.map((value) => (
                        (value?.CatId!=6&&value?.CatId!=7&&value?.CatId!=12&&value?.CatId!=8&& value?.CatId!=1&& value?.CatId!=9&& value?.CatId!=10 &&value?.CatId!=11)?
                        <li key={value.CatId}>
                          <a onClick={() => {
                            navigate(`/product/${value.CatId}/page=1`);
                            setChangeSide(false)}
                          }>{value.CatName}<span
                            className="icon-navigate_next"></span></a>
                        </li>:""))}

                     {/* <li>
                        <a >Used</a>
                      </li>
                      <li>
                        <a >Help</a>
                      </li>*/}
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
              <HeaderComponent categoryList={categories} searchButton={() => setSearchButton(!searchButton)} loading={loading} setChangeSide={setChangeSide}/>
              <Content style={{minHeight: "100px"}}>
                <RoutesPage/>
                <BackTop visible={scrollY>=400?true:false}>
                  <BackTopComponent/>
                </BackTop>
              </Content>
              <FooterComponent/>
            </div>
            </body>
          </Spin>
    }
    </>
  )
}


export default MainLayout