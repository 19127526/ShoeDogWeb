import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import CardComponent from "../../components/card/CardComponent";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import "./ListProduct.css"
import InfiniteScroll from 'react-infinite-scroll-component';
import {List} from "antd";
import { Tag } from 'antd';

import { Pagination } from 'antd';
import {convertArrayToOptions} from "../../utils/Utils";
const pageIndex = 9;

const onlyUnique=(value, index, self)=> {
  return self.indexOf(value) === index;
}

const ListProduct = () => {
  const dispatch=useDispatch();
  const [filterButton, setFilterButton] = useState(false);
  const [sortButton, setSortButton] = useState(false);
  const [brandButton,setBrandButton]=useState(false);
  const [sizeButton,setSizeButton]=useState(false);
  const [priceButton,setPriceButton]=useState(false);

  const {product} = useParams();
  const [loading,setLoading]=useState(false)
  const [itemInCategory, setItemInCategory] = useState([]);
  const [itemTempInCategory,setItemTempInCategory]=useState([]);
  const[listBrand,setListBrand]=useState([]);
  const [listSize,setListSize]=useState([]);

  const [page, setPage] = useState(1);
  const currentIndexPage = pageIndex * page;
  const prevIndexPage = pageIndex * (page - 1);
  const [resultFilter,setResultFilter]=useState({
    brand:null,
    size:null,
    sort:null
  });

  const navigate=useNavigate()
  useEffect(() => {
    setPage(1)
    const getListProductByCatId2 = async () => {
      dispatch(turnOnLoading())
      await getListProductsByCatId(product)
        .then(res => {
          if (res.data.status === 'success') {
            console.log(res.data.data.map(index=>index.Size).map(index=>convertArrayToOptions(index,", ")))
            setListBrand(res.data.data.map(index=>index.Brand).filter(onlyUnique))
            setItemInCategory(res.data.data);
            setItemTempInCategory(res.data.data);
            setLoading(true)
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(()=>{
          dispatch(turnOffLoading())
        })
    }
    getListProductByCatId2()
  }, [product])
  useEffect(() => {
    if (filterButton === true) {
      document.body.classList.add("filterActive")
    } else {
      document.body.classList.remove("filterActive")
    }
  }, [filterButton])

  const filterBrand=(brandName)=>{
    const tempBrand=itemTempInCategory.filter(index=>index.Brand===brandName);
    setItemInCategory(tempBrand);
    setResultFilter({...resultFilter,brand: brandName})
    setFilterButton(false);
  }

  const filterSize=(sizeName)=>{
    const tempBrand=itemTempInCategory.filter(index=>index.Brand===brandName);
    setItemInCategory(tempBrand);
    setResultFilter({...resultFilter,brand: brandName})
    setFilterButton(false);
  }
  const handleChangeFilter=()=>{
     setFilterButton(true);
  }
  const handleCloseFilter=()=>{
    setFilterButton(false);
    setSortButton(false)
    setBrandButton(false)
    setSizeButton(false)
    setPriceButton(false)
  }
  const handleChangeBrand=()=>{
    setSortButton(false)
    setBrandButton(!brandButton);
  }
  const handleChangeSize=()=>{
    setSortButton(false)
    setSizeButton(!sizeButton);
  }
  const handleChangePrice=()=>{
    setSortButton(false)
    setPriceButton(!priceButton);
  }
  const log = (e) => {
    console.log(e.target)
  }
  if(loading===false){
    return <LoadingComponent/>
  }
  return (
    <div className="container container-list-product" >
      <div className="text-center">
        <div className="typeProducts">
          <div className="row text-title" style={{width: "100%"}}>
            {itemInCategory[0]?.CatName===null?
              <div className="col-xs-12"><h2 style={{textAlign: "center"}}>Nothing</h2></div>
              :
              <div className="col-xs-12"><h2 style={{textAlign: "center"}}>{itemInCategory[0]?.CatName}</h2></div>
            }

            <div className="col-xs-9">
              <div className="bootstrap-tagsinput">
                {resultFilter.brand===null?"":(<Tag closable onClose={log}>{resultFilter.brand}</Tag>)}
                {resultFilter.size===null?"":(<Tag closable onClose={log}>{resultFilter.size}</Tag>)}
                {resultFilter.sort===null?"":(<Tag closable onClose={log}>{resultFilter.sort}</Tag>)}
              </div>

            </div>
            <div className="col-xs-3">
              <div className="typeFilter text-left">
                <a className="filterToggle" onClick={handleChangeFilter}><span
                  className="icon-settings"></span>Filter</a>
              </div>
            </div>
          </div>

        </div>

        <div className="menuFilter">
          <a className="filterClose" onClick={handleCloseFilter}><span
            className="icon-meunu-close"></span></a>
          <div className="filterIcon"><span className="icon-settings"></span>Filter</div>
          <div className="filterItems">
            <div className={sortButton === true ? "dropdown open" : "dropdown"}
                 onClick={() => setSortButton(!sortButton)}>
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


            <div className={brandButton===true?"filterItem active":"filterItem"} onClick={handleChangeBrand}>
              <a >Brand <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                {listBrand.map(index=>(<li onClick={()=>filterBrand(index)}><a>{index}</a></li>))}
              </ul>
            </div>
            <div className={sizeButton===true?"filterItem active":"filterItem"} onClick={handleChangeSize}>
              <a >Sizes <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix">
                <li onClick={()=>filterBrand("S")}><a >S</a></li>
                <li onClick={()=>filterBrand("M")}><a >M</a></li>
                <li onClick={()=>filterBrand("L")}><a >L</a></li>
              </ul>
            </div>
            <div className={priceButton===true?"filterItem active":"filterItem"} onClick={handleChangePrice}>
              <a >Price <span className="toggleSub icon-add-2"></span></a>
              <ul className="clearfix" style={{padding: "0 0 20px 50px"}}>
                <li style={{width: "90%"}}>
                  <p>
                    <input type="text" id="amount" readOnly=""
                           style={{border: "0", color: "#f6931f", fontWeight: "bold", width: "100%"}}/>
                  </p>
                  <div id="slider-range"
                       className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                    <div className="ui-slider-range ui-corner-all ui-widget-header"
                         style={{left: "3.0303%", width: "16.1616%"}}></div>
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



          {itemInCategory.map((value,index) => {
            return prevIndexPage <= index && index < currentIndexPage ? (
              <div className="col-lg-4 col-md-6">
                <CardComponent name={value?.ProName}
                               img={value?.ImageMain}
                               proId={value?.ProId}
                               priceDiscount={value?.TotalPrice}
                               priceNonDiscount={value.Discount === 0 ? null : value?.Price}/>
              </div>):""
          })}



      </div>
      {itemInCategory.length > 9 ?
        <div className="text-center" style={{padding:"10px 0 0 0"}}>
          <Pagination total={itemInCategory.length} current={page} defaultCurrent={1}  pageSize={pageIndex}  showSizeChanger={false} onChange={(pageindex)=>setPage(pageindex)} />
        </div>
        : ""
      }
    </div>
  )
}

export default ListProduct