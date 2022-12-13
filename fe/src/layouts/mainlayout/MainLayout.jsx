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
  useEffect(() => {
    const getListCategory = () => {
      dispatch(turnOnLoading())
      getListCategories()
        .then(res => {
          if (res.data.status === 'success') {
            setCategories(res.data.data)
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
  return (
    <>
    {
      location.pathname.includes(ERROR_ROUTE)?
          <RoutesPage/>
        :
          <Spin  size="large"  direction="horizon" spinning={loadingRedux.isLoading} indicator={<LoadingComponent/>}>
            <body className="">
            <div id="wrapper">
              <div id="menu__mobi">
                <a href="" className="close__menu"><span className="icon-meunu-close"></span></a>
                <a href="https://www.glab.vn" className="menu__logo"><img src="/themes/v1/icons/logo.svg" alt=""/></a>
                <div className="menu__items">
                  <div className="menu__items--inner">
                    <ul className="menu-mobile">
                      <li>
                        <a>Features</a>
                      </li>
                      <li>
                        <a>Sales</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/footwear">Products<span
                          className="icon-navigate_next"></span></a>
                        <ul style={{marginBottom: "0px"}}>
                          {categories.map((value) => (
                            <li key={value.CatId}>
                              <a onClick={() => navigate(`/product/${value.CatId}`)}>{value.CatName}</a>
                            </li>))}
                        </ul>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/type/used">Used</a>
                      </li>
                      <li>
                        <a href="https://www.glab.vn/product/type/used">Help</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="searchPro" style={{display: searchButton === true ? 'block' : 'none'}}>
                <div className="text-right mgB-20 mgT-10"><a id="closeSearch" onClick={() => setSearchButton(false)}><span
                  className="icon-uniF335"></span></a>
                </div>
                <form className="search" id="search">
                  <div className="frm-icon">
                    <input name="word" type="text" placeholder="Search" aria-autocomplete="none"  onChange={searchValueChange}/>
                    <button type="submit" className="icon-frm">
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
                </form>
              </div>
              <HeaderComponent categoryList={categories} searchButton={() => setSearchButton(!searchButton)}/>
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