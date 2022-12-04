import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {EDIT_PRODUCT} from "../../configs/url";

const CardComponent = ({index}) => {
  const navigate = useNavigate();
  const [openSetting,setOpenSetting]=useState(false);
  return (
    <li className="item">
      <div className="item-row">
        <div className="item-col fixed item-col-check">
          <label className="item-check" id="select-all-items">
            <input type="checkbox" className="checkbox"/>
            <span></span>
          </label>
        </div>
        <div className="item-col fixed item-col-img md">
          <a onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}>
            <div className="item-img rounded"
                 style={{backgroundImage: `url(${index.ImageMain})`}}></div>
          </a>
        </div>
        <div className="item-col fixed pull-left item-col-title">
          <div className="item-heading">Tên sản phẩm</div>
          <div>
            <a onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}
               className="">
              <h4 className="item-title"> {index.ProName} </h4>
            </a>
          </div>
        </div>
        <div className="item-col item-col-sales">
          <div className="item-heading">Giá tiền</div>
          <div className="no-overflow">
            <div> {index.TotalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</div>
          </div>
        </div>
        <div className="item-col item-col-stats no-overflow">
          <div className="item-heading">Tình trạng</div>
          <div className="no-overflow">
            <div>{index.StatusPro === 1 ? "Còn hàng" : "Hết hàng"}</div>
          </div>
        </div>
        <div className="item-col item-col-category no-overflow">
          <div className="item-heading">Số lượng</div>
          <div className="no-overflow" style={{marginLeft:"45px"}}>
            <div>{index.Quantity}</div>
          </div>
        </div>
        <div className="item-col item-col-author">
          <div className="item-heading">Người đăng</div>
          <div className="no-overflow"  style={{marginLeft:"45px"}}>
            <div>Admin</div>
          </div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Ngày đăng</div>
          <div className="no-overflow"> {index.DateStart}</div>
        </div>

        <div className="item-col fixed item-col-actions-dropdown" onClick={()=>setOpenSetting(!openSetting)}>
          <div className={ openSetting===true? "item-actions-dropdown active":"item-actions-dropdown"}>
            <a className="item-actions-toggle-btn">
              <span className="inactive">
                  <i className="fa fa-cog"></i>
              </span>
              <span className="active">
                  <i className="fa fa-chevron-circle-right"></i>
              </span>
            </a>
            <div className="item-actions-block" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <ul className="item-actions-list">
                <li>
                  <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal">
                    <i className="fa fa-trash-o "></i>
                  </a>
                </li>
                <li>
                  <a className="edit" onClick={()=>navigate(`${EDIT_PRODUCT}`+`${index.ProId}`,{state:{index:index}})}>
                    <i className="fa fa-pencil"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CardComponent