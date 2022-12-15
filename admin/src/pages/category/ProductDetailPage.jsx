import {Image, Select} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import { Markup } from 'interweave';
import {useState} from "react";
import {convertArrayToOptions} from "../../utils/Utils";

const ProductDetailPage = (prop) => {
  const navigate = useNavigate();
  let location = useLocation();
  let index=location.state.index;
  const imageSubArray=convertArrayToOptions(index.ImageArray,", ");
  const optionsSize =[]
  if(index.Size===null){

  }
  else{
    for (let i=0;i< convertArrayToOptions(index.Size,", ").length;i++){
      optionsSize.push({
        label: convertArrayToOptions(index.Size,", ")[i],
        value: convertArrayToOptions(index.Size,", ")[i],
      });
    }
  }
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
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mã kho </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.Inventory}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên danh mục </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.CatName}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên sản phẩm </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.ProName}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Ngày đăng </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.DateStart}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Số lượng </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.Quantity}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
            <div className="col-sm-9">
              <Markup className="form-control boxed" content={index.Des} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả ngắn</label>
            <div className="col-sm-9">
              <Markup className="form-control boxed" content={index.ShortDes} />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Trạng thái </label>
            <div className="col-sm-9">
              <Select
                defaultValue={index.StatusPro===1?"Còn hàng":"Hết hàng"}
                style={{
                  width: "fit-content",
                }}
                disabled={true}

                options={[
                  {
                    value: '1',
                    label: 'Còn hàng',
                  },
                  {
                    value: '0',
                    label: 'Hết hàng',
                  },
                ]}
              />

            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Size </label>
            <div className="col-sm-9">
              <Select
                mode="tags"
                allowClear
                style={{
                  width: '100%',
                }}
                disabled={true}
                tokenSeparators={[',']}
                defaultValue={optionsSize}
                placeholder="Không có"
                options={optionsSize}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sắc </label>
            <div className="col-sm-9">
              <Select
                mode="tags"
                allowClear
                style={{
                  width: '100%',
                }}
                disabled={true}
                defaultValue={"dd"}
                tokenSeparators={[',']}
                placeholder="Không có"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Giá tiền gốc </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.Price.toLocaleString('it-IT',{style:'currency',currency:"VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.Discount+"%"}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Tổng tiền</label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={index.TotalPrice.toLocaleString('it-IT',{style:'currency',currency:"VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh chính: </label>
            <div className="col-sm-9">
              <div className="images-container">
                <Image.PreviewGroup>
                  <Image width={200} src={index.ImageMain===null?null:index.ImageMain}/>
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh phụ: </label>
            <div className="col-sm-9">
              <div className="images-container">
                <Image.PreviewGroup>
                  {imageSubArray&&imageSubArray.map(index=>(
                    <Image width={200} src={index}/>
                    )
                  )}
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