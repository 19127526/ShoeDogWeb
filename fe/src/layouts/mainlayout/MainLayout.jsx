import {BackTop, Layout, Spin} from 'antd';
import HeaderComponent from "../../components/header/HeaderComponent";
import {useContext, useEffect, useRef, useState} from "react";
import FooterComponent from "../../components/footer/FooterComponent";
import RoutesPage from "../../routes/RoutesPage";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import {useLocation, useNavigate} from "react-router-dom";
import BackTopComponent from "../../components/backtop/BackTopComponent";
import {ThemeContext} from "../../context/ContextProvider";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeStateLoading, turnOffLoading, turnOnLoading} from "./MainLayout.actions";
import {ERROR_ROUTE} from "../../configs/url";
import useDebounce from "../../customhooks/useDebounce";
import {searchProducts} from "../../apis/products/ProductsApi";
import {useElementSize} from "use-element-size";
import {getWindowHeight, getWindowWidth} from "../../utils/Utils";
import "./MainLayout.css"
import {config} from "@fortawesome/fontawesome-svg-core";

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


  useEffect(() => {
    const getListCategory = () => {
      dispatch(turnOnLoading())
      getListCategories()
        .then(res => {
          console.log(res);
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
              console.log(res.data.data)
              setSearchListResult(res.data.data)
            }
          })
          .catch(err=>{console.log(err)})
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

  const [changeSide,setChangeSide]=useState(false);
  return (
    <>
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
                        <a onClick={() => {navigate(`/product/6`); setChangeSide(false)}}>Giày chính hãng<span
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
                      {categories.map((value) => (
                        (value?.CatId!=6&&value?.CatId!=7&&value?.CatId!=8)?
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