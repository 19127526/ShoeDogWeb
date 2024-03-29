import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
  convertArrayToOptions,
  convertArrayToQuantity,
  convertUrlToImageData,
  getBase64,
  onImageEdit
} from "../../../utils/Utils";
import {AutoComplete, Image, Input, InputNumber, message, Modal, Radio, Select, Space, Upload,Form} from "antd";
import {useEffect, useRef, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import JoditEditor from "jodit-react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, editProduct, getAllBrands, getDetailProductByProId} from "../../../apis/products/ProductsApi";
import Notification from "../../../components/notification/Notification";
import * as constraintNotification from "../../../components/notification/Notification.constraints";
import {getListCategories} from "../../../apis/categories/CategoriesApi";
import {turnOffLoading, turnOnLoading} from "../../../layouts/mainlayout/MainLayout.actions";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import "./EditProductPage.css"
import axios from "axios";
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

const EditProductPage = () => {
  const navigate = useNavigate();
  const {proId} = useParams();
  const loadingRedux = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();


  const [productDetail,setProductDetail]=useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isNonSize, setIsNoneSize] = useState(false);

  const [statusProduct,setStatusProduct]=useState(1);
  const editor = useRef(null);


  const [proName, setProName] = useState("");

  const [proCode, setProCode] = useState("");

  const [category, setCategory] = useState();
  const [optionCategories, setOptionCategories] = useState([]);

  const [brand, setBrand] = useState([]);
  const [optionsBrand, setOptionBrand] = useState([]);
  const [imageList,setImageList]=useState([]);
  const [valueEditorMain, setValueEditorMain] = useState(null);

  const [size2Quantity2PriceList, setSize2Quantity2PriceList] = useState([{size: "", price: 0, discount: 0, totalPrice: 0,tempDiscount:0}]);
  const [color, setColor] = useState("No Size Just Color");
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [fileImageSubList, setFileImageSubList] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    const getAllBrandss = async () => {
      getAllBrands()
        .then((res) => {
          if (res.data.status === 'success') {
            let tempBrand = new Set()
            for (let i = 0; i < res.data.data.length; i++) {
              const temp = convertArrayToOptions(res.data.data[i].Brand, ",");
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
    const getDetailProduct = async () => {
      await getDetailProductByProId(proId)
        .then(res => {
          if (res.data.status === "success") {
            setProductDetail(res.data.data[0]);


            /*setDiscount(1-res.data.data[0]?.Discount);*/


            if (res.data.data[0]?.CatName.includes("Phụ Kiện Chính Hãng")
              || res.data.data[0]?.CatName.includes("Túi Chính Hãng")
              || res.data.data[0]?.CatName.includes("Nón Chính Hãng")) {
              setIsNoneSize(true);
            } else {
              setIsNoneSize(false);
            }

            setCategory(res.data.data[0]?.CatName);
            setProName(res.data.data[0].ProName);
            setProCode(res.data.data[0]?.Inventory);
            setStatusProduct(res.data.data[0].StatusPro)

            const tempBrand=convertArrayToOptions(res.data.data[0].Brand,", ");
            setBrand(tempBrand);
            setColor(res.data.data[0].Color);
            setValueEditorMain(res.data.data[0].Des)
            setIsLoading(true);



            setFileImageMainList([{
              url:res.data.data[0]?.ImageMain?.toString().replace("public","private")
            }])

            if(res.data.data[0].ImageArray!=null|| res.data.data[0].ImageArray!=undefined){
              if(res.data.data[0].length<=1){

              }
              else{
                const tempArrayImg=convertArrayToOptions(res.data.data[0].ImageArray,", ");
                setFileImageSubList(tempArrayImg.map((value,index)=> {
                  return{
                    url:value?.toString().replace("public","private")}
                }).filter((value,index)=>{return index!==0})
                )
              }

            }
            if(res.data.data[0].Size!=null) {
              const tempSize=convertArrayToQuantity(res.data.data[0].Size);
              const tempPrice=convertArrayToQuantity(res.data.data[0].Price);
              const tempDiscount=convertArrayToQuantity(res.data.data[0].Discount);
              const tempTotalPrice=convertArrayToQuantity(res.data.data[0].TotalPrice);
              const tempValueArr=[];
              for(let i=0;i<tempSize.length;i++){
                tempValueArr.push({
                  size:tempSize[i],
                  price:Number(tempPrice[i]),
                  discount:Number(tempDiscount[i]==0?tempDiscount[i]:tempDiscount[i]),
                  totalPrice:Number(tempTotalPrice[i]),
                  tempDiscount:tempDiscount[i]==0?tempDiscount[i]:tempDiscount[i]
                })
              }

              setSize2Quantity2PriceList([...tempValueArr])
            }
            else{

            }
          }
          else{
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          console.log(err)
          Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getDetailProduct();
  }, []);


  const handleChangeProName = (e) => {
    setProName(e.target.value);
  }

  const handleChangeProCode = (e) => {
    setProCode(e.target.value);
  }

  const handleChangeCategory = (value) => {
    if (value.includes("Phụ Kiện Chính Hãng")
      || value.includes("Túi Chính Hãng")
      || value.includes("Nón Chính Hãng")) {
      setIsNoneSize(true);
    } else {
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


  const handleChangeDiscount = (e,index) => {
    const a = ((100 - e) / 100);
    const list = [...size2Quantity2PriceList];
    list[index].discount = e;
    let tempPrice = (list[index].price);
    list[index].totalPrice = tempPrice * a;
    setSize2Quantity2PriceList(list);
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

  const editProductClick = async () => {
    const tempSize2Quantity2PriceList=size2Quantity2PriceList.filter(index=>{
      return (index.totalPrice!=0&&index.price!=0&&index.size!=""
        &&index.quantity!=0)
    });


    if(category==""||proName==""||brand.length==0||
      tempSize2Quantity2PriceList.length==0/*||color==""*/){
      Notification("Thông báo thêm sản phẩm","Vui lòng điền đầy đủ thông tin",constraintNotification.NOTIFICATION_ERROR);
      return;
    }


    const tempSize= tempSize2Quantity2PriceList.map((value, index) => {
      const temp = index + ": " + value.size
      if (index === 0) {
        return temp
      } else {
        return " " + temp
      }
    })


    const tempPrice= tempSize2Quantity2PriceList.map((value, index) => {
      const temp = index + ": " + value.price
      if (index === 0) {
        return temp
      } else {
        return " " + temp
      }
    });
    const tempDiscount= tempSize2Quantity2PriceList.map((value, index) => {
      const temp = index + ": " + value.discount;
      if (index === 0) {
        return temp
      } else {
        return " " + temp
      }
    });
    const tempTotalPrice= tempSize2Quantity2PriceList.map((value, index) => {
      const temp = index + ": " + value?.totalPrice
      if (index === 0) {
        return temp
      } else {
        return " " + temp
      }
    });







    //Convert image url to file
    let tempImageSub=[];
    let tempImageMain=[];
    for (let i = 0; i < fileImageSubList.length; i++) {
      if (fileImageSubList[i].url === undefined || fileImageSubList[i].url === null) {
        tempImageSub.push(fileImageSubList[i].originFileObj)
      } else {
        await onImageEdit(fileImageSubList[i].url)
          .then(res => {
            tempImageSub.push(res)
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }


    if(fileImageMainList[0].url===undefined||fileImageMainList[0].url===null){
      tempImageMain.push(fileImageMainList[0]?.originFileObj)
    }
    else{
      await onImageEdit(fileImageMainList[0].url)
        .then(res=>{
          tempImageMain.push(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }


    const tempImageTotal = tempImageMain.concat(tempImageSub);


    const formData = new FormData();

    formData.append('category', category);
    formData.append('ProId', proId);
    formData.append('name', proName);
    formData.append('des', valueEditorMain);
    formData.append('shortDes', "empty");
    formData.append('status', statusProduct);
    formData.append('brand', brand.toString().replaceAll(",",", "));
    formData.append('size',tempSize.toString());
    formData.append('price',tempPrice.toString());
    formData.append('discount',tempDiscount.toString());
    formData.append('totalPrice',tempTotalPrice.toString());
    formData.append('inventory',proCode.toString());
    if(isNonSize==true){
      formData.append('color', "No Size Just Color");
    }
    else {
      formData.append('color', color);
    }

    for (let i = 0; i < tempImageTotal.length; i++) {
      console.log(tempImageTotal)
      formData.append('files', tempImageTotal[i],i+1);
    }



    const callApiEditProduct = async () => {
      dispatch(turnOnLoading());
      await editProduct(formData)
        .then(res => {
          if (res.data?.status === "success") {
            navigate(-1)
            Notification("Thông báo thêm sản phẩm", `Sửa đổi sản phẩm ${proName} thành công`, constraintNotification.NOTIFICATION_SUCCESS)
          } else {
            console.log(res.response.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          dispatch(turnOffLoading());
        })
    }
    callApiEditProduct();
  }


  //Size

  // handle input change
  // handle input change
  const handleSize2Quantity = (e, index) => {
    const {name, value} = e.target;
    const list = [...size2Quantity2PriceList];
    list[index][name] = value;
    list[index].price = Number(list[index].price);
    if (list[index].discount == 0) {
      list[index].totalPrice = Number(list[index].price);
    } else {
      list[index].totalPrice = Number(list[index].price) * ((100 - Number(list[index].discount)) / 100);
    }
    list[index].totalPrice = Number(list[index].totalPrice);
    setSize2Quantity2PriceList(list);
  };


  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...size2Quantity2PriceList];
    list.splice(index, 1);
    setSize2Quantity2PriceList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSize2Quantity2PriceList([...size2Quantity2PriceList, {size: "",  price: 0, discount: 0, totalPrice: 0,tempDiscount:0}]);
  };

  const handleChangeStatusProduct=(e)=>{
    setStatusProduct(e)
  }


  if(isLoading===false){
    return <LoadingComponent/>
  }





  return (<>
    <article className="content item-editor-page" id="ajax" >
      <div className="title-block">
        <h3 className="title"> Chỉnh sửa sản phẩm
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
                   placeholder="Hãy điền tên sản phẩm" defaultValue={productDetail?.ProName}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mã sản phẩm </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" value={proCode} id="title" onChange={handleChangeProCode}
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
                value={category}
                defaultValue={productDetail?.CatName}


            />

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên thương hiệu </label>
          <div className="col-sm-9">
            <Select
                mode={"tags"}
                allowClear
                options={optionsBrand}
                style={{
                  width: 300,
                }}
                onChange={handleChangeBrand}
                placeholder="Nhập tên thương hiệu"
                defaultValue={brand}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />

          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Trạng thái sản phẩm </label>
          <div className="col-sm-9">
            <Select
                defaultValue={statusProduct == 1 ? "Còn hàng" : "Hết hàng"}
                style={{
                  width: 300,
                }}
                onChange={handleChangeStatusProduct}
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
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
          <div className="col-sm-9">
            <JoditEditor className="form-control boxed" ref={editor} onChange={handleChangeDescription}
                         value={productDetail?.Des}
            />

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right"
                 htmlFor="title"> {isNonSize == true ? "Màu - Số lượng" : "Size - Số lượng"} </label>
          <div className="col-sm-9">
            &#9; &#9;
            <div className="row">
              {size2Quantity2PriceList.map((x, i) => {
                return (
                    <div className="col-lg-6" style={{marginBottom: "10px"}}>
                      <Space
                          direction="vertical"
                          size="small"
                          style={{
                            display: 'flex',
                          }}
                      >
                        <Form.Item className={"label-input"} label={isNonSize == true ? "Màu sắc" : "Size"}>
                          <Input
                              name="size"
                              placeholder={isNonSize == true ? "Hãy nhập Màu" : "Hãy nhập size"}
                              value={x.size}
                              onChange={e => handleSize2Quantity(e, i)}
                          />
                        </Form.Item>
                        <Form.Item className={"label-input"} label="Giá tiền">
                          <input className=" form-control boxed " style={{width: "99%", marginLeft: "5px"}}
                                 placeholder="Hãy nhập giá tiền" onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }} name="price" onBlur={onBlur} onFocus={onFocus} onChange={e => handleSize2Quantity(e, i)}
                                 value={x.price}/>
                        </Form.Item>
                        <Form.Item className={"label-input"} label="Khuyến mãi"
                                   style={{width: "98%", marginLeft: "10px"}}>
                          <InputNumber
                              className="form-control boxed discountInput"
                              min={0}
                              max={100}
                              name="discount"
                              placeholder="Hãy nhập khuyến mãi"
                              formatter={(value) => `${value}%`}
                              defaultValue={x.tempDiscount}
                              parser={(value) => value.replace('%', '')}
                              onChange={e => handleChangeDiscount(e, i)}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                          />
                        </Form.Item>
                        <Form.Item className={"label-input"} label="Tổng giá tiền">
                          <input type="text" className="form-control boxed" id="title"
                                 name="totalPrice"
                                 value={x.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}/>
                        </Form.Item>

                        <div>
                          {size2Quantity2PriceList.length - 1 === i &&
                              <Radio.Button value="large" style={{float: "right"}} onClick={handleAddClick}>Thêm
                                mới</Radio.Button>}

                          {size2Quantity2PriceList.length > 1 ?
                              <Radio.Button style={{marginRight: "5px", marginBottom: "5px", float: "right"}}
                                            value="large"
                                            onClick={() => handleRemoveClick(i)}>Xóa</Radio.Button> : ""
                          }
                        </div>
                      </Space>
                    </div>

                );
              })}
            </div>
          </div>
        </div>
        {isNonSize == true
            ? "" :
            <div className="form-group row">
              <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sắc </label>
              <div className="col-sm-9">
                <input type="text" className="form-control boxed" id="title" placeholder="Hãy điền màu sắc"
                       onChange={handleChangeColor} defaultValue={productDetail?.Color}
                />
              </div>
            </div>
        }

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
                    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
                    if (!isPNG) {
                      message.error(`${file.name} is not a png, svg and jpeg file`);
                    }
                    return false;
                  }}
              >
                {fileImageMainList.length === 0 ? uploadButton : ""}
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
                    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
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
                <button type="submit" id="post" className="btn btn-primary" onClick={editProductClick}> Chỉnh sửa sản
                  phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

  </>)
}

export default EditProductPage