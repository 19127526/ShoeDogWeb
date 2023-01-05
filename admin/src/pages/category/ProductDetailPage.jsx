import {Image, Input, InputNumber, message, Modal, Radio, Select, Upload} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {Markup} from 'interweave';
import {useEffect, useRef, useState} from "react";
import {convertArrayToOptions, getBase64, onImageEdit} from "../../utils/Utils";
import {editProduct, getAllBrands, getDetailProductByProId} from "../../apis/products/ProductsApi";
import dateFormat from 'dateformat';
import {useDispatch, useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {getListCategories} from "../../apis/categories/CategoriesApi";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import LoadingComponent from "../../components/loading/LoadingComponent";
import JoditEditor from "jodit-react";
import {PlusOutlined} from "@ant-design/icons";



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


const ProductDetailPage = (prop) => {
  const navigate = useNavigate();
  const {proId} = useParams();
  const loadingRedux = useSelector(state => state.mainReducer);
  const dispatch = useDispatch();


  const [productDetail,setProductDetail]=useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');


  const editor = useRef(null);


  const [proName, setProName] = useState("");

  const [category, setCategory] = useState();
  const [optionCategories, setOptionCategories] = useState([]);

  const [brand, setBrand] = useState([]);
  const [optionsBrand, setOptionBrand] = useState([]);
  const [imageList,setImageList]=useState([]);
  const [valueEditorMain, setValueEditorMain] = useState(null);
  const [sizeList, setSizeList] = useState([{size: "", quantity: 0}]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tempDiscount,setTempDiscount]=useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [fileImageSubList, setFileImageSubList] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    const getAllBrandss = async () => {
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
    const getDetailProduct = async () => {
      await getDetailProductByProId(proId)
        .then(res => {
          if (res.data.status === "success") {
            setProductDetail(res.data.data[0])
            setPrice(res.data.data[0]?.Price);
            setDiscount(1-res.data.data[0]?.Discount);
            setTempDiscount(res.data.data[0]?.Discount*100);
            setCategory(res.data.data[0]?.CatName);
            setProName(res.data.data[0].ProName);
            const tempBrand=convertArrayToOptions(res.data.data[0].Brand,",");
            setBrand(tempBrand);
            setColor(res.data.data[0].Color);
            setValueEditorMain(res.data.data[0].Des)
            setIsLoading(true);



            setFileImageMainList([{
              url:res.data.data[0]?.ImageMain
            }])

            if(res.data.data[0].ImageArray!=null|| res.data.data[0].ImageArray!=undefined){
              if(res.data.data[0].length<=1){

              }
              else{
                const tempArrayImg=convertArrayToOptions(res.data.data[0].ImageArray,", ");
                setFileImageSubList(tempArrayImg.map((value,index)=> {
                    return{
                      url:value}
                  }).filter((value,index)=>{return index!==0})
                )
              }

            }
            if(res.data.data[0].Size!=null) {
              const a = convertArrayToOptions(res.data.data[0].Size, ", ");
              const tempValue = a.map(index => {
                const temp = convertArrayToOptions(index, ": ");
                return {
                  size:temp[0],
                  quantity:temp[1]
                }
              });

              setSizeList([...tempValue])
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
  useEffect(() => {
    if(discount===0) {
      setTotalPrice(price * 1)
    }
    else
    {
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



  if(isLoading===false){
    return <LoadingComponent/>
  }


  return (<>
    <article className="content item-editor-page" id="ajax">
      <div className="title-block">
        <h3 className="title"> Chi tiết sản phẩm
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
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mã sản phẩm </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" value={productDetail?.Inventory} id="title"
                   placeholder="Hãy điền tên sản phẩm"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên sản phẩm </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title"
                   placeholder="Hãy điền tên sản phẩm" defaultValue={productDetail?.ProName}
                   value={productDetail?.ProName}
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
              disabled={true}
            />

          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Tên thương hiệu </label>
          <div className="col-sm-9">
            <Select
              mode={"multiple"}
              allowClear
              value={brand}
              options={optionsBrand}
              style={{
                width: 300,
              }}
              placeholder="Nhập tên thương hiệu"
              defaultValue={brand}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              disabled={true}
            />

          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Mô tả </label>
          <div className="col-sm-9 form-control boxed">
            <div dangerouslySetInnerHTML={{__html: productDetail?.Des.replace(/(<? *script)/gi, 'illegalscript')}} >
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Size - Số lượng </label>
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
                    defaultValue={x.size}

                  />
                  <Input
                    className="ml10 discountInput"
                    style={{width: "40%"}}
                    name="quantity"
                    defaultValue={x.quantity}
                    placeholder="Hãy nhập số lượng"
                    value={x.quantity}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title"> Màu sắc </label>
          <div className="col-sm-9">
            <input type="text" className="form-control boxed" id="title" placeholder="Hãy điền màu sắc"
                   onChange={handleChangeColor} defaultValue={productDetail?.Color} value={productDetail?.Color}
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
            }} value={price.toLocaleString('it-IT', {style: 'currency', currency: "VND"})}

            />


          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right" htmlFor="title">Khuyến mãi</label>
          <div className="col-sm-9">
            <InputNumber
              className="form-control boxed discountInput"
              defaultValue={tempDiscount+ "%"}
              readOnly={true}
              value={tempDiscount+"%"}
            >
            </InputNumber>

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
              <Image.PreviewGroup>
                <Image width={200} src={fileImageMainList[0]?.url}/>
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-xs-right"> Hình ảnh phụ: </label>
          <div className="col-sm-9">
            <div className="images-container">
              <Image.PreviewGroup>
                {fileImageSubList && fileImageSubList?.map(index => (
                    <Image width={200} src={index.url}/>
                  )
                )}
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
      </div>
    </article>

  </>)
}


export default ProductDetailPage