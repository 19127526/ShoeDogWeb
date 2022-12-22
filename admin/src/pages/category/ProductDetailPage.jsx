import {Image, Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {Markup} from 'interweave';
import {useEffect, useState} from "react";
import {convertArrayToOptions} from "../../utils/Utils";
import {getDetailProductByProId} from "../../apis/products/ProductsApi";
import dateFormat from 'dateformat';


const ProductDetailPage = (prop) => {
  const navigate = useNavigate();
  const [indexValueDetail, setIndexValueDetail] = useState();
  const [imageSubArray, setImageSubArray] = useState([]);
  const [optionsSize, setOptionSize] = useState([]);
  const [quantity, setQuantity] = useState();
  const {proId} = useParams();
  useEffect(() => {
    const getDetailProduct = async () => {
      await getDetailProductByProId(proId)
        .then(res => {
          if (res.data.status === "success") {
            setIndexValueDetail(res.data.data[0]);
            setImageSubArray(convertArrayToOptions(res.data.data[0]?.ImageArray, ", "));
            if (res.data.data[0].Size === null) {

            } else {
              const a = convertArrayToOptions(res.data.data[0].Size, ", ");
              const tempValue = a.map(index => {
                const temp = convertArrayToOptions(index, ": ");
                return {
                  size:temp[0],
                  quantity:temp[1]
                }
              });
              setOptionSize(tempValue.map(index=>index.size));
             setQuantity(tempValue.map(index=>index.quantity).reduce((previousScore, currentScore, index) => Number(previousScore) + Number(currentScore)))
            }
          }
        })
        .catch(err => {
        })
    }
    getDetailProduct();
  }, []);
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
                     value={indexValueDetail?.Inventory}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên danh mục </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={indexValueDetail?.CatName}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên sản phẩm </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={indexValueDetail?.ProName}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Ngày đăng </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={dateFormat(indexValueDetail?.DateStart, "dd/mm/yyyy hh:mm:ss")}/>

            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Số lượng </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={quantity}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
            <div className="col-sm-9">
              <Markup className="form-control boxed" content={indexValueDetail?.Des}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Trạng thái </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={indexValueDetail?.StatusPro === 1 ? "Còn hàng" : "Hết hàng"}/>
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
                defaultValue={optionsSize}
                placeholder="Không có"

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
                     value={indexValueDetail?.Price.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={indexValueDetail?.Discount*100 + "%"}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Tổng tiền</label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     value={indexValueDetail?.TotalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh chính: </label>
            <div className="col-sm-9">
              <div className="images-container">
                <Image.PreviewGroup>
                  <Image width={200} src={indexValueDetail?.ImageMain === null ? null : indexValueDetail?.ImageMain}/>
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh phụ: </label>
            <div className="col-sm-9">
              <div className="images-container">
                <Image.PreviewGroup>
                  {imageSubArray && imageSubArray?.map(index => (
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