import CardComponent from "../../components/card/CardComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {ADD_NEW_PRODUCT} from "../../configs/url";

const ProductListPage = () => {
  const {catId} = useParams();
  const [item, setItem] = useState([])
  useEffect(() => {
    const getListItemByCatId = async () => {
      await getListProductsByCatId(catId || null)
        .then(res => {
          if (res.data.status === 'success') {
            setItem(res.data.data);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getListItemByCatId();
  }, [catId]);
  const navigate = useNavigate();
  return (<article className="content items-list-page">
    <div className="title-search-block">
      <div className="title-block">
        <div className="row">
          <div className="col-md-6">
            <h3 className="title"> Items
              <a onClick={() => navigate(`${ADD_NEW_PRODUCT}`)} className="btn btn-primary btn-sm rounded-s"> Add
                New </a>
              <div className="action dropdown">
                <button className="btn  btn-sm rounded-s btn-secondary dropdown-toggle" type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> More actions...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-pencil-square-o icon"></i>Mark as a draft</a>
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#confirm-modal">
                    <i className="fa fa-close icon"></i>Delete</a>
                </div>
              </div>
            </h3>
            <p className="title-description"> List of sample items - e.g. books, movies, events, etc... </p>
          </div>
        </div>
      </div>
      <div className="items-search">
        <form className="form-inline">
          <div className="input-group">
            <input type="text" className="form-control boxed rounded-s" placeholder="Search for..."/>
            <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button">
                      <i className="fa fa-search"></i>
                  </button>
              </span>
          </div>
        </form>
      </div>
    </div>
    <div className="card items">
      <ul className="item-list striped">
        <li className="item item-list-header">
          <div className="item-row">
            <div className="item-col fixed item-col-check">
              <label className="item-check" id="select-all-items">
                <input type="checkbox" className="checkbox"/>
                <span></span>
              </label>
            </div>
            <div className="item-col item-col-header fixed item-col-img md">
              <div>
                <span>Hình ảnh</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-title">
              <div>
                <span>Tên sản phẩm</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-sales">
              <div style={{marginRight:"45px"}}>
                <span>Giá tiền</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-stats">
              <div className="no-overflow" style={{marginRight:"45px"}}>
                <span>Trạng thái</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-category">
              <div className="no-overflow" >
                <span>Số lượng</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-author">
              <div className="no-overflow">
                <span>Người đăng</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-date">
              <div  style={{marginRight:"49px"}}>
                <span>Ngày đăng</span>
              </div>
            </div>





          </div>
        </li>
        {
          item.map(index => (
            <CardComponent index={index}/>
          ))
        }
      </ul>
    </div>
    <nav className="text-right">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#"> Prev </a>
        </li>

        <li className="page-item active">
          <a className="page-link" href="#"> 1 </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#"> 2 </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#"> 3 </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#"> 4 </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#"> 5 </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#"> Next </a>
        </li>
      </ul>
    </nav>
  </article>)
}

export default ProductListPage