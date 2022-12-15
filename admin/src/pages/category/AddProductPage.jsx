import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react'
import {PlusOutlined} from '@ant-design/icons';
import {AutoComplete, Input, InputNumber, message, Modal, Radio, Select, Upload} from 'antd';
import {getBase64} from "../../utils/Utils";
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


  const editor = useRef(null);


  const [proName, setProName] = useState("");

  const [category, setCategory] = useState("");
  const [optionCategories, setOptionCategories] = useState([]);

  const [brand, setBrand] = useState("");
  const [optionsBrand, setOptionBrand] = useState([]);

  const [valueEditorMain, setValueEditorMain] = useState(null);
  const [sizeList, setSizeList] = useState([{size: "", quantity: 0}]);
  const [color, setColor] = useState("");
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
            setOptionBrand(res.data.data.map(index => {
              return {value: index.Brand}
            }).filter(index => (index.value !== "" && index.value !== null)));
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
    const tempSize = sizeList.map((value, index) => {
      const temp = value.size + ": " + value.quantity
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
    formData.append('shortDes',valueEditorMain);
    formData.append('status',1);
    formData.append('brand',brand);
    formData.append('price',price);
    formData.append('discount',discount);
    formData.append('total',totalPrice);
    for(let i=0;i<image.length;i++){
      formData.append('image',image[i]);
    }

    formData.append('size',size);
    formData.append('color',color);




    const payload = {
      catName: category,
      proName: proName,
      brand:brand,
      des: valueEditorMain,
      price: price,
      discount: discount,
      totalPrice: totalPrice,
      formData,
      size: size,
      color: color
    }
    console.log(payload)
    const callApiAddProduct = async () => {
      dispatch(turnOnLoading());
      await addProduct(formData)
        .then(res => {
          if(res.data.status==="success"){
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
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
          <div className="col-sm-9">
            <JoditEditor className="form-control boxed" ref={editor} onChange={handleChangeDescription}/>

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Size-Số lượng </label>
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
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sắc </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title" placeholder="Hãy điền màu sắc"
                   onChange={handleChangeColor}
            />
          </div>
        </div>
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
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml';
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
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml';
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