import CardComponent from "../../../components/card/CardComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
  getListProductsByCatId,
  removeProductByProId,
  searchProducts,
  searchProductsByCatId
} from "../../../apis/products/ProductsApi";
import Notification from "../../../components/notification/Notification";
import * as constraintNotification from "../../../components/notification/Notification.constraints";
import {ADD_NEW_PRODUCT, EDIT_PRODUCT} from "../../../configs/url";
import {Button, Dropdown, Pagination, Space, Table, Typography} from "antd";
import useDebounce from "../../../customhooks/useDebounce";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../../layouts/mainlayout/MainLayout.actions";
import dateFormat from "dateformat";
import DescriptionComponent from "../../../components/description/DescriptionComponent";
import {DownOutlined} from "@ant-design/icons";
import {
  convertArrayToOptions,
  convertArrayToQuantity,
  convertArrayToSize2Price,
  maxValue,
  minValue
} from "../../../utils/Utils";


const pageIndex = 6;


const ProductListPage = () => {
  const {catId,pageindex} = useParams();
  const [item, setItem] = useState([]);
  const [loading,setLoading]=useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [searchValue,setSearchValue]=useState("");
  const currentIndexPage = pageIndex * pageCurrent;
  const prevIndexPage = pageIndex * (pageCurrent - 1);
  const navigate = useNavigate();
  const dispatch=useDispatch();




  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);
  const [sort, setSort] = useState('ascend');
  const scroll = {};

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      responsive: ['md'],
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'proName',
      responsive: ['md'],
    },
    {
      title: 'Giá tiền',
      dataIndex: 'totalPrice',
      responsive: ['md'],

    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      responsive: ['md'],
      filters: [
        {
          text: 'Hết hàng',
          value: 'Hết hàng',
        },
        {
          text: 'Còn hàng',
          value: 'Còn hàng',
        },
      ],
      onFilter: (value, record) => record?.status.indexOf(value) === 0,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'date',
      responsive: ['md'],
      sorter: (a, b,sortOrder) =>{
        if(sortOrder.includes("ascend")){
          return a.date>=b.date
        }
        else{
          return a.date<b.date
        }
      },
    },
    {
      title: 'Xem chi tiết',
      responsive: ['md'],
      key: 'action',
      dataIndex: 'action',
    },
  ];

  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }


  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };


  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  const tableProps = {
    bordered:false,
    loading:false,
    size:"large",
    expandable:defaultExpandable,
    rowSelection,
    scroll,
    tableLayout,
  };












  useEffect(() => {
    const getListItemByCatId = async () => {
      await getListProductsByCatId(catId || null)
        .then(res => {
          if (res.data.status === 'success'||res.data.status==='empty') {
            let temp=[];
            res.data.data.map(index=>{

              //totalPrice
              let totalPriceSet=new Set();
              const totalPrice=convertArrayToOptions(index?.TotalPrice,", ");
              totalPrice.map(index=>{
                const temp=convertArrayToOptions(index,": ");
                totalPriceSet.add(temp[1])
              })


              let resultTotalPrice="";
              let totalPriceArr=new Array(...totalPriceSet);
              if(totalPriceArr.length==1){
                resultTotalPrice= Number(totalPriceArr[0]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
              }
              else{
                resultTotalPrice=Number(minValue(...totalPriceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()+" - "+
                  Number(maxValue(...totalPriceArr)).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
              }


              const tempIndex={
                key: index?.ProId,
                image:( <a onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}>
                  <div className="item-img rounded"
                       style={{backgroundImage: `url(${index.ImageMain})`}}></div>
                </a>),
                proName:index?.ProName,
                totalPrice:resultTotalPrice,
                status:index?.StatusPro==1?"Còn hàng":"Hết hàng",
                date:dateFormat(index?.DateStart, "dd/mm/yyyy hh:mm:ss"),
                action:  <Space
                  direction="vertical"
                  size="small"
                  style={{
                    display: 'flex',
                  }}
                >
                  <Button onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}>
                    Xem chi  tiết</Button>
                  <Button onClick={()=>navigate(`${EDIT_PRODUCT}`+`${index.ProId}`,{state:{index:index}})}>
                    Chỉnh sửa sản phẩm</Button>
                </Space>
              }
                temp.push(tempIndex)
            })
            setItem(temp);

          } else {
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo dữ liệu", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
    }
    getListItemByCatId();
  }, [catId,loading]);

  useEffect(()=>{
    if(pageindex==undefined){
      setPageCurrent(1);
    }
    else{
      setPageCurrent(pageindex);
    }
  },[pageindex])

  const searchProductBtn=()=>{
    dispatch(turnOnLoading())
    searchProductsByCatId({productName:searchValue,catId:catId})
      .then(res=>{
        if(res.data.status==='success') {
          let temp=[];
          res.data.data.map(index=>{
            //totalPrice
            let resultTotalPrice=""
            let totalPriceArr=convertArrayToSize2Price(index?.TotalPrice);
            console.log(totalPriceArr)
            for(let i=0;i<totalPriceArr.length;i++){
              if(i==0){
                resultTotalPrice+=Number(totalPriceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
              }
              else{
                resultTotalPrice=resultTotalPrice+" - "+Number(totalPriceArr[i]).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}).toString()
              }
            }


            //quantity

            const tempIndex={
              key: index?.ProId,
              image:( <a onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}>
                <div className="item-img rounded"
                     style={{backgroundImage: `url(${index.ImageMain})`}}></div>
              </a>),
              proName:index?.ProName,
              totalPrice:resultTotalPrice,
              status:index?.StatusPro==1?"Còn hàng":"Hết hàng",
              date:dateFormat(index?.DateStart, "dd/mm/yyyy hh:mm:ss"),
              action:  <Space
                direction="vertical"
                size="small"
                style={{
                  display: 'flex',
                }}
              >
                <Button onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}>
                  Xem chi  tiết</Button>
                <Button onClick={()=>navigate(`${EDIT_PRODUCT}`+`${index.ProId}`,{state:{index:index}})}>
                  Chỉnh sửa sản phẩm</Button>
              </Space>
            }
            temp.push(tempIndex)
          })
          setItem(temp);
        }
      })
      .catch(err=>{console.log(err)})
      .finally(()=>{
        dispatch(turnOffLoading())
      })
  }

  const handleRemoveProduct=async () => {
    console.log(selectedRowKeys.length)
    let isFlag=false;
    for (const index of selectedRowKeys) {
      dispatch(turnOnLoading())
      await removeProductByProId({proId: index})
        .then(res => {

          if (res.data.status === 'success') {
          } else {
            isFlag=true;
            Notification("Thông báo dữ liệu", "Không thể load dữ liệu", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          isFlag=true
          Notification("Thông báo dữ liệu", "Có 1 đơn hàng đang order sản phẩm này", constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(() => {
           setLoading(prevState => !prevState);
          dispatch(turnOffLoading())
        })
    }
    if(isFlag==false){
      Notification("Thông báo dữ liệu", `Xóa sản phẩm thành công`, constraintNotification.NOTIFICATION_SUCCESS)
    }
  }


  const handleSearchProduct=(e)=>{
    setSearchValue(e.target.value);
  }
  return (
    <>
    <article className="content items-list-page">
      <div className="title-search-block">
        <div className="title-block">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title"> Sản phẩm &nbsp;
                <a onClick={() => navigate(`${ADD_NEW_PRODUCT}`)} className="btn btn-primary btn-sm rounded-s"> Thêm mới  </a>
                &nbsp;
                {selectedRowKeys.length === 0 ? ""
                  :
                  <a onClick={handleRemoveProduct} className="btn btn-danger btn-sm rounded-s"> Xoá
                    sản phẩm </a>
                }
                </h3>

              <p className="title-description"> Danh sách sản phẩm </p>
            </div>
          </div>
        </div>
        <div className="items-search">
          <form className="form-inline">
            <div className="input-group">
              <input type="text" className="form-control boxed rounded-s" placeholder="Nhập vào để tìm kiếm..." onChange={handleSearchProduct}/>
              <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button" style={{height:"100%"}} onClick={()=>searchProductBtn()}>
                      <i className="fa fa-search"></i>
                  </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="card items">
        <ul className="item-list striped">
          <Table
            {...tableProps}
            columns={tableColumns}
            dataSource={item}
            scroll={scroll}
            pagination={{
              style:{display:"flex",justifyContent:"center"},
              total: item.length,
              current:Number(pageCurrent),
              defaultCurrent:Number(pageCurrent) ,
              pageSize: pageIndex ,
              showSizeChanger:false,
              onChange: (pageindex)=>{setPageCurrent(pageindex);navigate(`/admin/category/${catId}/page=${pageindex}`)}
            }}
          />
        </ul>

      </div>
    </article>


  </>
)
}

export default ProductListPage