import { useNavigate } from "react-router-dom";
const CardComponent=({name,priceNonDiscount,priceDiscount,img})=>{
  const navigate=useNavigate();

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
          <a href="item-editor.html">
            <div className="item-img rounded"
                 style={{backgroundImage: "url(../../s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg)"}}></div>
          </a>
        </div>
        <div className="item-col fixed pull-left item-col-title">
          <div className="item-heading">Name</div>
          <div>
            <a href="item-editor.html" className="">
              <h4 className="item-title"> 50% of things doesn't really belongs to you </h4>
            </a>
          </div>
        </div>
        <div className="item-col item-col-sales">
          <div className="item-heading">Sales</div>
          <div> 4567</div>
        </div>
        <div className="item-col item-col-stats no-overflow">
          <div className="item-heading">Stats</div>
          <div className="no-overflow">
            <div className="item-stats sparkline" data-type="bar">
              <canvas width="84" height="724319201"
                      style={{display: "inline-block", width: "84px", height: "4e+14px", verticalAlign: "top"}}></canvas>
            </div>
          </div>
        </div>
        <div className="item-col item-col-category no-overflow">
          <div className="item-heading">Category</div>
          <div className="no-overflow">
            <a href="#">Hardware</a>
          </div>
        </div>
        <div className="item-col item-col-author">
          <div className="item-heading">Author</div>
          <div className="no-overflow">
            <a href="#">Alexander Sargssyan</a>
          </div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Published</div>
          <div className="no-overflow"> 21 SEP 10:45</div>
        </div>
        <div className="item-col fixed item-col-actions-dropdown">
          <div className="item-actions-dropdown">
            <a className="item-actions-toggle-btn">
                                                <span className="inactive">
                                                    <i className="fa fa-cog"></i>
                                                </span>
              <span className="active">
                                                    <i className="fa fa-chevron-circle-right"></i>
                                                </span>
            </a>
            <div className="item-actions-block">
              <ul className="item-actions-list">
                <li>
                  <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal">
                    <i className="fa fa-trash-o "></i>
                  </a>
                </li>
                <li>
                  <a className="edit" href="item-editor.html">
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