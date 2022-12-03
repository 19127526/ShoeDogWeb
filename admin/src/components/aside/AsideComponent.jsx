import {useEffect, useState} from "react";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints"
import {useNavigate} from "react-router-dom";
const AsideComponent = ({onClose}) => {
  const [categories,setCategories]=useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    const getCategory=async ()=>{
      getListCategories()
        .then(res=>{setCategories(res.data.data)})
        .catch(err=>{  Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_WARN)})
    }
    getCategory()
  },[])
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
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                 aria-expanded="true">
                <div className="img" style={{backgroundImage: ""}}></div>
                <span className="name">haha </span>
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
                <a className="dropdown-item" href="#">
                  <i className="fa fa-user icon"></i> Profile </a>
                <a className="dropdown-item" href="#">
                  <i className="fa fa-bell icon"></i> Notifications </a>
                <a className="dropdown-item" href="#">
                  <i className="fa fa-gear icon"></i> Settings </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="login.html">
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
              <a className="navbar-brand text-brand" href="/">Shoe<span className="color-b"> Dog</span></a>
            </div>
          </div>
          <nav className="menu">
            <ul className="sidebar-menu metismenu" id="sidebar-menu">
              <li id="dashboard">
                <a href="/">
                  <i className="fa fa-home"></i> Dashboard </a>
              </li>
              <li id="managementProduct">
                <a href="#">
                  <i className="fa fa-th-large">
                  </i> Quản lí sản phẩm
                  <i className="fa arrow"></i>
                </a>
                <ul className="sidebar-nav">
                  {categories.map(index=>( <li key={index.CatId} onClick={()=>navigate(`/admin/category/${index.CatId}`)}>
                    <a> {index.CatName} </a>
                  </li>))}
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-area-chart"></i> Quản lí danh mục
                  &nbsp;&nbsp; &nbsp;
                  <i className="fa fa-plus" aria-hidden="true" data-toggle="modal" data-target="#addCategory"></i>
                  <i className="fa arrow"></i>
                </a>
                <ul className="sidebar-nav">
                </ul>
              </li>
              <li>
                <a href="/admin/quan-li-tai-khoan">
                  <i className="fa fa-pencil-square-o"></i> Quản lí tài khoản
                </a>
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