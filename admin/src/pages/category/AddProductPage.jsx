const AddProductPage = () => {
  return (<>
    <article className="content item-editor-page" id="ajax">
      <div className="title-block">
        <h3 className="title"> Thêm sản phẩm
          <span className="sparkline bar" data-type="bar"></span>
        </h3>
      </div>
      <form method="post">
        <div className="card card-block">
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Tiêu đề: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" name="title" id="title" placeholder=""/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Content: </label>
            <div className="col-sm-10">
                        <textarea id="des" name="des">
                        </textarea>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Quận: </label>
            <div className="col-sm-10">
              {/* <select className="c-select form-control boxed" name="ward" id="ward">
                {{#each listward}}
                {{#if this.check}}
                <option selected>{{this.ward}}</option>
                {{else}}
                <option>{{this.ward}}</option>
                {{/if}}
                {{/each}}
                  </select>*/}
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10 col-sm-offset-2 ">
              <button type="submit" id="submitbtn22" class="btn btn-primary"> Tiếp theo</button>
            </div>
          </div>
        </div>
      </form>
    </article>
    <div className="modal fade" id="modal-media">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Media Library</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="modal-body modal-tab-container">
            <ul className="nav nav-tabs modal-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" href="#gallery" data-toggle="tab" role="tab">Gallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#upload" data-toggle="tab" role="tab">Upload</a>
              </li>
            </ul>
            <form method="post" encType="multipart/form-data">
              <div className="tab-content modal-tab-content">
                <div className="tab-pane fade active in" id="upload" role="tabpanel">
                  <div className="file-loading">
                    <input id="input-700" type="file" name="image"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
    <div className="modal fade" id="confirm-modal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-pencil"></i>  &nbsp; Xác nhận cập nhật sản phẩm</h4>
            <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Bạn có chắc chắn muốn cập nhật sản phẩm này?</p>
          </div>
          <div className="modal-footer">
            <button type="button" id="submitUpdate" className="btn btn-primary" data-dismiss="modal">Yes</button>
            <button type="button" id="no" className="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default AddProductPage