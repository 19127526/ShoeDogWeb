import {useLocation, useNavigate} from "react-router-dom";
import {convertArrayToOptions, getBase64} from "../../utils/Utils";
import {Image, InputNumber, Select} from "antd";
import {useRef, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import JoditEditor from "jodit-react";

const uploadButton = (
  <div>
    <PlusOutlined/>
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);


const EditProductPage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({fileList: newFileList}) => {
    setFileList(newFileList)
  };

  function localStringToNumber( s ){
    return Number(String(s).replace(/[^0-9.-]+/g,""))
  }

  function onFocus(e){
    var value = e.target.value.split("VND")[0];
    e.target.value = value ? localStringToNumber(value) : ''
  }

  function onBlur(e) {
    var value = e.target.value
    var options = {
      style: "currency",
      currency: 'VND',
      currencyDisplay: "symbol"
    }
    e.target.value = (value || value === 0)
      ? localStringToNumber(value).toLocaleString('it-IT', options)
      : ''
  }

  const editor = useRef(null);
  const [valueEditorMain, setValueEditorMain] = useState(null);
  const [valueEditorSub, setValueEditorSub] = useState(null);
  const discountChange=(event)=>{
    console.log(event.target.value)
  }

  let index = location.state.index;
  const optionsSize = []
  const optionsColor = [];
  if(index.Size===null){

  }
  else{
    for (let i = 0; i < convertArrayToOptions(index.Size, ", ").length; i++) {
      optionsSize.push({
        label: convertArrayToOptions(index.Size, ", ")[i],
        value: convertArrayToOptions(index.Size, ", ")[i],
      });
    }
  }

  for (let i = 0; i < convertArrayToOptions(index.Color).length; i++) {
    optionsColor.push({
      label: convertArrayToOptions(index.Color)[i],
      value: convertArrayToOptions(index.Color)[i],
    });
  }


  return (<>
      <article className="content item-editor-page">
        <div className="title-block">
          <h3 className="title"> Chỉnh sửa sản phẩm
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
                     value={index.Inventory} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên danh mục </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     defaultValue={index.CatName}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên sản phẩm </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" defaultValue={index.ProName}
                    />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Số lượng </label>
            <div className="col-sm-9">
              <InputNumber className="form-control boxed" defaultValue={index.Quantity}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
            <div className="col-sm-9">
              <JoditEditor className="form-control boxed" ref={editor} onChange={content => setValueEditorMain(content)} value={index.Des}/>

            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả ngắn</label>
            <div className="col-sm-9">
              <JoditEditor className="form-control boxed" ref={editor} onChange={content => setValueEditorSub(content)}
                           value={index.ShortDes}/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Trạng thái </label>
            <div className="col-sm-9">
              <Select
                defaultValue={index.StatusPro === 1 ? "Còn hàng" : "Hết hàng"}
                style={{
                  width: "fit-content",
                }}
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
                defaultValue={optionsSize}
                tokenSeparators={[',']}
                placeholder="Please select"
                options={optionsSize}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sẵc </label>
            <div className="col-sm-9">
              <Select
                mode="tags"
                allowClear
                style={{
                  width: '100%',
                }}
                defaultValue={optionsColor}
                tokenSeparators={[',']}
                placeholder="Please select"
                options={optionsColor}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Giá tiền gốc </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder="" onBlur={onBlur} onFocus={onFocus}
                     defaultValue={index.Price.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
            <div className="col-sm-9">
              <input type="number" className="form-control boxed" id="title" placeholder=""  min="0.0" max="1.0"
                     defaultValue={index.Discount} onChange={discountChange}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Tổng tiền</label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder=""
                     onBlur={onBlur} onFocus={onFocus} defaultValue={index.TotalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh chính: </label>
            <div className="col-sm-9">
              <div className="images-container">
                <Image.PreviewGroup>
                  <Image width={200} src={index.ImageMain}/>
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh phụ: </label>
            <div className="col-sm-9">
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

export default EditProductPage