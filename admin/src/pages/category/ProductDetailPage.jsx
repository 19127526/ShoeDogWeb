import {Image} from "antd";
import {useNavigate} from "react-router-dom";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <article className="content item-editor-page">
        <div className="title-block">
          <h3 className="title"> Chi tiết sản phẩm
            <span className="sparkline bar" data-type="bar"></span>
          </h3>
        </div>
        <div class="form-group row">
          <div class="col-sm-10 col-sm-offset-2">
            <button type="submit" id="quaylai" class="btn btn-danger" onClick={() => navigate(-1)}> Quay lại</button>
          </div>
        </div>
        <div className="card card-block">
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" htmlFor="title"> Tiêu đề: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" id="title" placeholder="" readOnly
                     value="{{list.title}}"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" htmlFor="title"> Diện tích </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" id="title" placeholder="" readOnly
                     value="{{list.acreage}}"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" htmlFor="title"> Giá tiền </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" id="title" placeholder="" readOnly
                     value="{{list.current}}"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Mô tả:</label>
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <div className="editor" id="des">hahhah</div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">

            <label className="col-sm-2 form-control-label text-xs-right"> Mô tả chi tiết:</label>
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">

                  <div className="editor" id="des">des</div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Mô tả khác:</label>
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <div className="editor" id="des">des</div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Quận: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" id="title" placeholder="" readOnly
                     value="{{list.ward}}"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Hình ảnh: </label>
            <div className="col-sm-10">
              <div className="images-container">
                <Image.PreviewGroup>
                  <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                  <Image
                    width={200}
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                  />
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}


export default ProductDetailPage