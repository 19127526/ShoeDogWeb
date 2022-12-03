import CardComponent from "../../components/card/CardComponent";

const ProductListPage=()=>{
  return (
    <article className="content items-list-page">
    <div className="title-search-block">
      <div className="title-block">
        <div className="row">
          <div className="col-md-6">
            <h3 className="title"> Items
              <a href="item-editor.html" className="btn btn-primary btn-sm rounded-s"> Add New </a>
              <div className="action dropdown">
                <button className="btn  btn-sm rounded-s btn-secondary dropdown-toggle" type="button" id="dropdownMenu1"
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
                <span>Media</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-title">
              <div>
                <span>Name</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-sales">
              <div>
                <span>Sales</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-stats">
              <div className="no-overflow">
                <span>Stats</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-category">
              <div className="no-overflow">
                <span>Category</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-author">
              <div className="no-overflow">
                <span>Author</span>
              </div>
            </div>
            <div className="item-col item-col-header item-col-date">
              <div>
                <span>Published</span>
              </div>
            </div>
            <div className="item-col item-col-header fixed item-col-actions-dropdown"></div>
          </div>
        </li>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
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
  </article>
)
}

export default ProductListPage