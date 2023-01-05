import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react'
import {PlusOutlined} from '@ant-design/icons';
import {AutoComplete, Input, InputNumber, message, Modal, Radio, Select, Upload} from 'antd';
import {convertArrayToOptions, getBase64} from "../../utils/Utils";
import {useNavigate} from "react-router-dom";
import {addProduct, getAllBrands} from "../../apis/products/ProductsApi";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import "./AddProductPage.css"
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";

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


function localStringToNumber(s) {
  return Number(String(s).replace(/[^0-9.-]+/g, ""))
}

function onFocus(e) {
  let value = e.target.value.split(" VND")[0];
  value = value.replaceAll(".", "");
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
  const navigate = useNavigate();
  const loadingRedux = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isNonSize,setIsNoneSize]=useState(false)

  const editor = useRef(null);


  const [proName, setProName] = useState("");

  const [category, setCategory] = useState("");
  const [optionCategories, setOptionCategories] = useState([]);

  const [brand, setBrand] = useState("");
  const [optionsBrand, setOptionBrand] = useState([]);

  const [valueEditorMain, setValueEditorMain] = useState("");
  const [sizeList, setSizeList] = useState([{size: "", quantity: 0}]);
  const [color, setColor] = useState("No Size Just Color");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [fileImageSubList, setFileImageSubList] = useState([]);


  useEffect(() => {
    const getAllBrandss = () => {
      getAllBrands()
        .then((res) => {
          if (res.data.status === 'success') {
            let tempBrand = new Set()
            for (let i = 0; i < res.data.data.length; i++) {
              const temp = convertArrayToOptions(res.data.data[i].Brand, ",");
              console.log(temp);
              for (let i = 0; i < temp.length; i++) {
                tempBrand.add(temp[i]);
              }
            }
            const temp=Array.from(tempBrand).map(index=>{
              return {
                value:index
              }
            })
            setOptionBrand(temp);
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch((err) => {
          Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
        })
    }
    const getAllCategoriess = () => {
      getListCategories()
        .then((res) => {
          if (res.data.status === 'success') {
            setOptionCategories(res.data.data.map(index => {
              return {value: index.CatName, label: index.CatName}
            }));
          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch((err) => {
          Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getAllBrandss();
    getAllCategoriess();
  }, [])
  useEffect(() => {
    if (discount === 0) {
      setTotalPrice(price * 1)
    } else {
      setTotalPrice(discount * price)
    }

  }, [discount, price])


  const handleChangeProName = (e) => {
    setProName(e.target.value);
  }

  const handleChangeCategory = (value) => {
    if(value.includes("Phụ Kiện Chính Hãng")
      ||value.includes("Túi Chính Hãng")
      ||value.includes("Nón Chính Hãng")){
      setIsNoneSize(true);
    }
    else{
      setIsNoneSize(false);
    }
    setCategory(value)
  };

  const handleChangeBrand = (e) => {
    setBrand(e);
  }

  const handleChangeDescription = (content) => {
    setValueEditorMain(content)
  }

  const handleChangeColor = (e) => {
    setColor(e.target.value)
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleChangeDiscount = (e) => {
    setDiscount((100 - e) / 100);
  }

  const handleChangeMain = ({fileList: newFileList}) => {
    setFileImageMainList(newFileList)
  };

  const handleChangeSub = ({fileList: newFileList}) => {
    console.log(newFileList)
    setFileImageSubList(newFileList)
  };


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  const addProductClick = () => {
    let status=0;
    const tempSize = sizeList.map((value, index) => {
      const temp = value.size + ": " + value.quantity
      if(value.quantity!=0){
        status=1;
      }
      if (index === 0) {
        return temp
      } else {
        return ", " + temp
      }
    })
    const size = tempSize.reduce((prev, next) => prev + next);

    const tempSubImg=fileImageSubList.map(index=>(index.originFileObj));
    const image = [fileImageMainList[0].originFileObj,...tempSubImg];
    const formData = new FormData();

    formData.append('category',category);
    formData.append('name',proName);
    formData.append('des',valueEditorMain);
    formData.append('shortDes',"empty");
    formData.append('status',status);
    formData.append('brand',brand);
    formData.append('price',Math.round(price));
    formData.append('discount',1.0-discount);
    formData.append('total',Math.round(totalPrice));
    for(let i=0;i<image.length;i++){
      formData.append('image',image[i]);
    }

    formData.append('size',size);
    formData.append('color',color);

    for (const value of formData.values()) {
      console.log(value);
    }
    const callApiAddProduct = async () => {
      dispatch(turnOnLoading());
      await addProduct(formData)
        .then(res => {
          console.log(res?.response?.data);
          console.log(res);
          if(res.data.status==="success"){
            navigate(-1)
            Notification("Thông báo thêm sản phẩm", `Thêm sản phẩm ${proName} thành công`, constraintNotification.NOTIFICATION_SUCCESS)
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(()=>{
          dispatch(turnOffLoading());
        })
    }
    callApiAddProduct();
  }


  //Size

  // handle input change
  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...sizeList];
    list[index][name] = value;
    setSizeList(list);
  };


  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...sizeList];
    list.splice(index, 1);
    setSizeList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSizeList([...sizeList, {size: "", quantity: ""}]);
  };


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
            <input type="text" className="form-control boxed" onChange={handleChangeProName} id="title"
                   placeholder="Hãy điền tên sản phẩm"
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
            <Select
              mode={"multiple"}
              allowClear
              style={{
                width: 300,
              }}
              onChange={handleChangeBrand}
              placeholder="Nhập tên thương hiệu"
              filterOption={(inputValue, option) =>{
                return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }}
              options={optionsBrand}
            />


          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
          <div className="col-sm-9">
            <JoditEditor className="form-control boxed" ref={editor} onChange={handleChangeDescription} value={`<p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;"><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/2705.svg" alt="✅" style="box-sizing: border-box; border: none !important; max-width: 100%; height: 1em !important; display: inline !important; vertical-align: -0.1em !important; transition: opacity 1s ease 0s; opacity: 1; box-shadow: none !important; width: 1em !important; margin: 0px 0.07em !important; background: none !important; padding: 0px !important;">Cam kết trọn đời mọi sản phẩm bên Shoe Dog là hàng chính hãng</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;">Địa chỉ:</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;"><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="📍" style="box-sizing: border-box; border: none !important; max-width: 100%; height: 1em !important; display: inline !important; vertical-align: -0.1em !important; transition: opacity 1s ease 0s; opacity: 1; box-shadow: none !important; width: 1em !important; margin: 0px 0.07em !important; background: none !important; padding: 0px !important;">Chi nhánh 1: 86/118 Trường Chinh, phường 12, quận Tân Bình</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;"><img class="emoji" role="img" draggable="false" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f4cd.svg" alt="📍" style="box-sizing: border-box; border: none !important; max-width: 100%; height: 1em !important; display: inline !important; vertical-align: -0.1em !important; transition: opacity 1s ease 0s; opacity: 1; box-shadow: none !important; width: 1em !important; margin: 0px 0.07em !important; background: none !important; padding: 0px !important;">Chi nhánh 2: 666/4 Ba tháng hai, phường 14, quận 10</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;">Mọi thông tin chi tiết xin vui lòng liên hệ: 0865414134</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;">Facebook: https://www.facebook.com/giay2handschatluong</strong></p><p style="box-sizing: border-box; overflow-wrap: break-word; margin-bottom: 1.3em; margin-top: 0px; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: medium;"><strong style="box-sizing: border-box; font-weight: bolder; font-family: &quot;Times New Roman&quot;, Times, serif;">Instagram: https://www.instagram.com/shoedog.vn_/</strong></p>`}/>

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> {isNonSize==true?"Màu - Số lượng":"Size - Số lượng"} </label>
          <div className="col-sm-9">
            &#9; &#9;
            {sizeList.map((x, i) => {
              return (
                <div className="row" style={{marginBottom: "10px"}}>
                  <Input
                    name="size"
                    style={{width: "20%", marginLeft: "10px", marginRight: "5px"}}
                    placeholder="Hãy nhập size"
                    value={x.size}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <Input
                    className="ml10 discountInput"
                    style={{width: "40%"}}
                    name="quantity"
                    placeholder="Hãy nhập số lượng"
                    value={x.quantity}
                    onChange={e => handleInputChange(e, i)}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <div style={{width: "30%"}}>
                    {sizeList.length > 1 ?
                      <Radio.Button style={{marginRight: "5px", marginBottom: "5px"}} value="large"
                                    onClick={() => handleRemoveClick(i)}>Remove</Radio.Button> : ""
                    }
                    {sizeList.length - 1 === i &&
                      <Radio.Button value="large" onClick={handleAddClick}>Add</Radio.Button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isNonSize == true
          ? "" :
          <div className="form-group row">
            <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sắc </label>
            <div className="col-sm-9">
              <input type="text" className="form-control boxed" id="title" placeholder="Hãy điền màu sắc"
                     onChange={handleChangeColor}
              />
            </div>
          </div>
        }
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Giá tiền gốc </label>
          <div className="col-sm-9">

            <input className="form-control boxed" onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }} onBlur={onBlur} onFocus={onFocus} onChange={handleChangePrice} defaultValue={price}/>


          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
          <div className="col-sm-9">
            <InputNumber
              className="form-control boxed discountInput"
              defaultValue={100}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
              onChange={handleChangeDiscount}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              defaultValue={discount}
            />

          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Tổng tiền</label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title" placeholder="Điền số tiền"
                   value={totalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
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
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml'|| file.type==='image/webp';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, svg and jpeg file`);
                  }
                  return false;
                }}
              >
                {fileImageMainList.length===0?uploadButton:""}
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
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type==='image/webp';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, svg and jpeg file`);
                  }
                  return false;
                }}
              >
                {uploadButton}
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
                <button type="submit" id="post" className="btn btn-primary" onClick={addProductClick}> Thêm sản phẩm
                </button>
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