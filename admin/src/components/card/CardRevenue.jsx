import {useNavigate} from "react-router-dom";
import {DETAIL_PRODUCT} from "../../configs/url";


const CardRevenue=({items})=>{
  const navigate=useNavigate();
  return (
    <li className="item" onClick={()=>navigate(DETAIL_PRODUCT+items?.CatId+"/"+items?.ProId)}>
      <div className="item-row">
        <div className="item-col fixed item-col-img xs">
          <a>
            <div className="item-img xs rounded"
                 style={{backgroundImage:`url(${items?.ImageMain})`}}></div>
          </a>
        </div>
        <div className="item-col item-col-title no-overflow">
          <div>
            <a  className="">
              <h4 className="item-title no-wrap"> {items?.ProName} </h4>
            </a>
          </div>
        </div>
        <div className="item-col item-col-sales">
          <div className="item-heading">Đã bán</div>
          <div> 4958</div>
        </div>
        <div className="item-col item-col-stats">
          <div className="item-heading">Doanh thu</div>
          <div> 21 SEP 10:45</div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Tình trạng</div>
          <div> {items?.StatusPro==1?"Còn hàng":"Hết hàng"}</div>
        </div>
      </div>
    </li>
  )
}


export default CardRevenue
