import CardComponent from "../../components/card/CardComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListProductsByCatId, searchProducts, searchProductsByCatId} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {ADD_NEW_PRODUCT} from "../../configs/url";
import {Pagination} from "antd";
import useDebounce from "../../customhooks/useDebounce";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";


const pageIndex = 6;


const ProductListPage = () => {
  const {catId} = useParams();
  const [item, setItem] = useState([]);
  const [loading,setLoading]=useState(false);
  const [page, setPage] = useState(1);
  const [searchValue,setSearchValue]=useState("");
  const currentIndexPage = pageIndex * page;
  const prevIndexPage = pageIndex * (page - 1);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    const getListItemByCatId = async () => {
      await getListProductsByCatId(catId || null)
        .then(res => {
          if (res.data.status === 'success'||res.data.status==='empty') {
            const a=[]
            for(let i=0;i<10;i++){
              a.push(res.data.data[0])
            }
            setItem(a);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getListItemByCatId();
  }, [catId,loading]);

  const searchProductBtn=()=>{
    dispatch(turnOnLoading())
    searchProductsByCatId({productName:searchValue,catId:catId})
      .then(res=>{
        if(res.data.status==='success') {
          console.log(res.data.data)
          setItem(res.data.data)
        }
      })
      .catch(err=>{console.log(err)})
      .finally(()=>{
        dispatch(turnOffLoading())
      })
  }


  const handleSearchProduct=(e)=>{
    setSearchValue(e.target.value);
  }
  return (<article className="content items-list-page">
    <div className="title-search-block">
      <div className="title-block">
        <div className="row">
          <div className="col-md-6">
            <h3 className="title"> Sản phẩm &nbsp;
              <a onClick={() => navigate(`${ADD_NEW_PRODUCT}`)} className="btn btn-primary btn-sm rounded-s"> Thêm mới  </a>
              &nbsp;
            </h3>
            <p className="title-description"> Danh sách sản phẩm </p>
          </div>
        </div>
      </div>
      <div className="items-search">
        <form className="form-inline">
          <div className="input-group">
            <input type="text" className="form-control boxed rounded-s" placeholder="Nhập vào để tìm kiếm..." onChange={handleSearchProduct}/>
            <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button" style={{height:"100%"}} onClick={()=>searchProductBtn()}>
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

        {item.map((value,index) => {
          return prevIndexPage <= index && index < currentIndexPage ? (
            <CardComponent index={value} setLoading={()=>setLoading(!loading)}/>):""
        })}

      </ul>
    </div>
    <nav className="text-right" style={{display:"flex",justifyContent:"center",marginTop:"3%"}}>
      <ul className="pagination">
      <Pagination total={item.length} current={page} defaultCurrent={1}  pageSize={pageIndex}  showSizeChanger={false} onChange={(pageindex)=>setPage(pageindex)} />
      </ul>
    </nav>
  </article>)
}

export default ProductListPage