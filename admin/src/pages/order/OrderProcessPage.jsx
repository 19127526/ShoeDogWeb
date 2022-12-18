import OrderProductComponent from "../../components/order/OrderProductComponent";
import {ADD_NEW_PRODUCT} from "../../configs/url";
import CardComponent from "../../components/card/CardComponent";
import {Dropdown, Pagination} from "antd";
import {useEffect, useState} from "react"
import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table,Typography } from 'antd';
import DescriptionComponent from "../../components/description/DescriptionComponent";
import {getAllOrders, removeOrdersByOrderId} from "../../apis/orders/OrdersApi";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/mainlayout/MainLayout.actions";
import dateFormat from 'dateformat';
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";



const OrderProcessPage = () => {
  const dispatch=useDispatch()
  const [rowSelection, setRowSelection] = useState({});
  const [tableLayout, setTableLayout] = useState(undefined);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);
  const [sort, setSort] = useState('ascend');
  const [valueOrder,setValueOrder]=useState([]);
  const scroll = {};
  const [isLoading,setIsLoading]=useState(false);
  const columns = [
    {
      title: 'Mã order',
      dataIndex: 'orderInventory',
      responsive: ['md'],
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'fullName',
      responsive: ['md'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      responsive: ['md'],
    },
    {
      title: 'Kiểu thanh toán',
      dataIndex: 'orderPay',
      responsive: ['md'],
      filters: [
        {
          text: 'Chuyển khoản',
          value: 'Chuyển khoản',
        },
        {
          text: 'Thanh toán khi nhận hàng',
          value: 'Thanh toán khi nhận hàng',
        },
      ],
      onFilter: (value, record) => record.orderPay.indexOf(value) === 0,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      responsive: ['md'],

      sorter: (a, b,sortOrder) =>{
        if(sortOrder.includes("ascend")){
          return a.orderDate<b.orderDate
        }
        else{
          return a.orderDate>=b.orderDate
        }
      },
    },
    {
      title: 'Trạng thái đặt hàng',
      dataIndex: 'statusOrder',
      responsive: ['md'],
      filters: [
        {
          text: 'Chưa nhận hàng',
          value: 'Chưa nhận hàng',
        },
        {
          text: 'Đã nhận hàng',
          value: 'Đã nhận hàng',
        },
      ],
      onFilter: (value, record) => record.statusOrder.indexOf(value) === 0,
    },
    {
      title: 'Action',
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




  const tableProps = {
    bordered:false,
    loading:false,
    size:"large",
    expandable:defaultExpandable,
    rowSelection,
    scroll,
    tableLayout,
  };

  useEffect(()=>{
    dispatch(turnOnLoading());
    const getAllOrdersInit=async ()=>{
      await getAllOrders()
        .then(res=>{
          if(res.data.status==="success"){
            let temp=[];

            res.data.data.map(index=>{

              const items = [
                {
                  key: index.OrderId+".1",
                  label: 'Xóa order',
                },
                {
                  key: index.OrderId+".2",
                  label: 'Chỉnh sửa order',
                },
                {
                  key: index.OrderId+".3",
                  label: 'Hoàn thành đơn hàng',
                },
              ];

              const menuProps = {
                items,
                onClick: handleMenuClick,
                selectable: true,
              };
              const tempIndex={
                key: index.OrderId,
                orderInventory: index.InventoryOrder,
                fullName: index.FullName,
                email: index.Email,
                orderPay: index.MethodPay===0?"Thanh toán khi nhận hàng": "Chuyển khoản",
                orderDate:dateFormat(index.OrderDate, "dd/mm/yyyy hh:mm:ss"),
                statusOrder: index.StatusOrder===0?"Chưa nhận hàng":"Đã nhận hàng",
                description: <DescriptionComponent index={index}/>,
                action: <Dropdown
                  menu={menuProps}

                >
                  <Typography.Link>
                    <Space size={"middle"}>
                      Tùy chỉnh
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              }

              if(index.StatusOrder===0){
                temp.push(tempIndex)
              }else{
              }

            })

            setValueOrder(temp);
          }
        })
        .catch(err=>console.log(err))
        .finally(()=>dispatch(turnOffLoading()))
    }
    getAllOrdersInit()
  },[isLoading])

  const handleMenuClick=async (e) => {
    const type = e.key.substring(e.key.indexOf(".") + 1, e.key.length);
    const orderId = e.key.substring(0, e.key.indexOf("."));
    //remove order
    if (type.includes(1)) {
      dispatch(turnOnLoading());
      await removeOrdersByOrderId(orderId)
        .then(res => {
          if (res.data.status === "success") {
            setIsLoading(!isLoading)
            Notification("Thông báo đơn đặt hàng", "Đã xóa thành công", constraintNotification.NOTIFICATION_SUCCESS)
          } else {
            Notification("Thông báo đơn đặt hàng", "Xóa thất bại", constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("Thông báo đơn đặt hàng", err.toString(), constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(() => dispatch(turnOffLoading()))
    }
    else {

    }

  }

  return (
    <article className="content items-list-page">
      <div className="title-search-block">
        <div className="title-block">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title"> Đơn hàng đang xử lý&nbsp;
                <a  className="btn btn-primary btn-sm rounded-s"> Thêm mới  </a>
                &nbsp;
              </h3>
              <p className="title-description"> Danh sách sản phẩm </p>
            </div>
          </div>
        </div>
        <div className="items-search">
          <form className="form-inline">
            <div className="input-group">
              <input type="text" className="form-control boxed rounded-s" placeholder="Nhập vào để tìm kiếm..." />
              <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button" style={{height:"100%"}}>
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
            dataSource={valueOrder}
            scroll={scroll}
            pagination={{
              pageSize: 12,
            }}
          />
        </ul>
      </div>
      <nav className="text-right" style={{display:"flex",justifyContent:"center",marginTop:"3%"}}>
       {/* <ul className="pagination">
          <Pagination total={item.length} current={page} defaultCurrent={1}  pageSize={pageIndex}  showSizeChanger={false} onChange={(pageindex)=>setPage(pageindex)} />
        </ul>*/}
      </nav>
    </article>
  )
}
export default OrderProcessPage