import {useEffect, useState} from "react";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints"
import {useNavigate} from "react-router-dom";
import {DASHBOARD, LIST_PRODUCT_BY_CATEGORY_ID, ORDER_PRODUCT, ORDER_SUCCESS_PRODUCT} from "../../configs/url";
import {useDispatch} from "react-redux";
import {logoutAccount} from "../../pages/login/LoginPages.actions";
const AsideComponent = ({onClose}) => {
  const [categories,setCategories]=useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  useEffect(()=>{
    const getCategory=async ()=>{
      getListCategories()
        .then(res=>{setCategories(res.data.data)})
        .catch(err=>{  Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_WARN)})
    }
    getCategory()
  },[]);
  const handleLogout=()=>{
    dispatch(logoutAccount());
  }
  return (
    <>
      <header className="header">
        <div className="header-block header-block-collapse d-lg-none d-xl-none">
          <button className="collapse-btn" id="sidebar-collapse-btn">
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div className="header-block header-block-nav">
          <ul className="nav-profile">

            <li className="profile dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown"  role="button" aria-haspopup="true"
                 aria-expanded="true">
                <div className="img" style={{backgroundImage: ""}}></div>
                <span className="name">Admin</span>
              </a>
              <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1"
                   x-placement="bottom-start"
                   style={{
                     position: "absolute",
                     transform: "translate3d(-72px, 30px, 0px)",
                     top: "0px",
                     left: "0px",
                     willChange: "transform"
                   }}>
               {/* <a className="dropdown-item" >
                  <i className="fa fa-user icon"></i> Profile </a>
                <a className="dropdown-item" >
                  <i className="fa fa-bell icon"></i> Notifications </a>
                <a className="dropdown-item" >
                  <i className="fa fa-gear icon"></i> Settings </a>*/}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={handleLogout}>
                  <i className="fa fa-power-off icon"></i> Logout </a>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="brand"
                 style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <div className="logo">
                <span className="l l1"></span>
                <span className="l l2"></span>
                <span className="l l3"></span>
                <span className="l l4"></span>
                <span className="l l5"></span>
              </div>
              <a className="navbar-brand text-brand" >Shoe<span className="color-b"> Dog</span></a>
            </div>
          </div>
          <nav className="menu">
            <ul className="sidebar-menu metismenu" id="sidebar-menu">
              <li id="dashboard">
                <a onClick={()=>navigate('/admin')}>
                  <i className="fa fa-home"></i> Thống kê </a>
              </li>
              <li id="managementProduct">
                <a >
                  <i className="fa fa-th-large">
                  </i> Quản lí sản phẩm
                  <i className="fa arrow"></i>
                </a>
                <ul className="sidebar-nav">
                  {categories.map(index=>( <li key={index.CatId} onClick={()=>navigate(`${LIST_PRODUCT_BY_CATEGORY_ID}${index.CatId}`)}>
                    <a> {index.CatName} </a>
                  </li>))}
                </ul>
              </li>
              <li>
                <a >
                  <i className="fa fa-pencil-square-o"></i> Quản lí đơn
                  <i className="fa arrow"></i>
                </a>
                <ul className="sidebar-nav">
                  <li key={1} onClick={()=>navigate(ORDER_PRODUCT)}>
                    <a> Đơn hàng đang xử lý </a>
                  </li>
                  <li key={1} onClick={()=>navigate(ORDER_SUCCESS_PRODUCT)}>
                    <a> Đơn hàng đã xử lý </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="modal fade" id="addCategory">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <i className="fa fa-opera"></i> Thêm danh mục cha</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-inline">
                <div className="input-group">
                  <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                         placeholder="Tên danh mục..."/>
                  <span className="input-group-btn align-content-center">
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button">
                Hủy bỏ
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button">
                Thêm
                </button>
                </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AsideComponent