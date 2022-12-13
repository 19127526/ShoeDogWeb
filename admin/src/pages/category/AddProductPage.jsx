import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react'
import {PlusOutlined} from '@ant-design/icons';
import {InputNumber, message, Modal, Select, Upload} from 'antd';
import {getBase64} from "../../utils/Utils";
import {useNavigate} from "react-router-dom";
import InputColor from 'react-input-color';
import { AutoComplete } from 'antd';
import {getAllBrands} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {getListCategories} from "../../apis/categories/CategoriesApi";


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



function localStringToNumber( s ){
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function onFocus(e){
  let value = e.target.value.split(" VND")[0];
  value=value.replaceAll(".","");
  console.log(value)
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


const AddProductPage = () => {
  const navigate=useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');


  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [fileImageSubList, setFileImageSubList] = useState([]);
  const [valueEditorMain, setValueEditorMain] = useState(null);
  const editor = useRef(null);
  const [totalPrice,setTotalPrice]=useState(0);
  const [price,setPrice]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [brand,setBrand]=useState("");
  const [color, setColor] = useState({});
  const [category,setCategory]=useState("");
  const [optionCategories,setOptionCategories]=useState([]);
  const [optionsSize,setOptionSize] = useState([])
  const [optionsColor,setOptionColor] = useState([]);
  const [optionsBrand,setOptionBrand]=useState([]);

  useEffect(()=>{
    const getAllBrandss= ()=>{
       getAllBrands()
        .then((res)=>{
          if (res.data.status === 'success') {
            setOptionBrand(res.data.data.map(index=>{return{value:index.Brand}}));
            console.log(optionsBrand);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch((err)=>{
          Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
        })
    }
    const getAllCategoriess= ()=>{
      getListCategories()
        .then((res)=>{
          if (res.data.status === 'success') {
            setOptionCategories(res.data.data.map(index=>{return {value:index.CatId,label:index.CatName}}));
            console.log(res.data.data);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch((err)=>{
          Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getAllBrandss();
    getAllCategoriess();
  },[])


  useEffect(()=>{
    if(discount===0){
      setTotalPrice(price*1)
    }
    else{
      setTotalPrice(discount*price)
    }

  },[discount,price])



  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChangeMain = ({fileList: newFileList}) => {
    setFileImageMainList(newFileList)
  };

  const handleChangeBrand=(e)=>{
    setBrand(e);
  }

  const handleChangeSub = ({fileList: newFileList}) => {
    setFileImageSubList(newFileList)
  };
  const handleChangeCategory = (value) => {
    console.log(`selected ${value}`);
  };


  const onChangeDiscount=(e)=>{
    setDiscount((100-e)/100);
  }
  const onChangePrice=(e)=>{
    setPrice(e.target.value)
  }

  return (<>
    <article className="content item-editor-page" id="ajax">
      <div className="title-block">
        <h3 className="title"> Thêm sản phẩm
          <span className="sparkline bar" data-type="bar"></span>
        </h3>
      </div>

      <div className="form-group row">
        <div className="col-sm-10 col-sm-offset-2">
          <button type="submit" id="quaylai" className="btn btn-danger" onClick={() => navigate(-1)}> Quay lại</button>
        </div>
      </div>


      <div className="card card-block">
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên sản phẩm </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên danh mục </label>
          <div className="col-sm-9">
            <Select
              placeholder="Lựa chọn danh mục"
              style={{
                width: 300,
              }}
              onChange={handleChangeCategory}
              options={optionCategories}
            />

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên thương hiệu </label>
          <div className="col-sm-9">
            <AutoComplete
              options={optionsBrand}
              style={{
                width: 300,
              }}
              onChange={handleChangeBrand}
              placeholder="Nhập tên thương hiệu"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />

          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Số lượng </label>
          <div className="col-sm-9">
            <InputNumber  style={{width:120}} onKeyPress={(event)=>{ if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }}} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
          <div className="col-sm-9">
            <JoditEditor className="form-control boxed" ref={editor} onChange={content => setValueEditorMain(content)} />

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
              placeholder="Hãy chọn size"
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
              placeholder="Hãy chọn màu sắc"
              options={optionsColor}
            />


          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Giá tiền gốc </label>
          <div className="col-sm-9">

            <input className="form-control boxed" onKeyPress={(event)=>{ if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }}} onBlur={onBlur} onFocus={onFocus} onChange={onChangePrice} defaultValue={price}/>



          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
          <div className="col-sm-9">

            <InputNumber
              className="form-control boxed"
              defaultValue={100}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
              onChange={onChangeDiscount}
              onKeyPress={(event)=>{ if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }}}
              defaultValue={discount}
            />

          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Tổng tiền</label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title" placeholder="Điền số tiền"
                   value={totalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh chính: </label>
          <div className="col-sm-9">
            <div className="images-container">
              <Upload
                listType="picture-card"
                fileList={fileImageMainList}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                beforeUpload={(file) => {
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'||file.type==='image/svg+xml';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, svg and jpeg file`);
                  }
                  return false;
                }}
              >
                { uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh phụ: </label>
          <div className="col-sm-9">
            <div className="images-container">
              <Upload
                listType="picture-card"
                fileList={fileImageSubList}
                onPreview={handlePreview}
                onChange={handleChangeSub}
                multiple={true}
                beforeUpload={(file) => {
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'||file.type==='image/svg+xml';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, svg and jpeg file`);
                  }
                  return false;
                }}
              >
                { uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
            <div className="form-group row">
              <div className="col-sm-10 col-sm-offset-2 "
                   style={{display: "flex", justifyContent: "center", width: "100%", marginLeft: "50px"}}>
                <button type="submit" id="post" className="btn btn-primary"> Thêm sản phẩm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    {/*<div className="modal fade" id="modal-media">
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

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>*/}
  </>)
}

export default AddProductPage