import {Badge, Descriptions, Space, Table} from 'antd';
import dateFormat from 'dateformat';
import {DownOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LIST_PRODUCT_BY_CATEGORY_ID} from "../../configs/url";


const DescriptionComponent = ({index}) => {

  const navigate=useNavigate();
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'inventory',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'proName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b, sortOrder) => {
        if (sortOrder.includes("ascend")) {
          return a.totalPrice < b.totalPrice
        } else {
          return a.totalPrice >= b.totalPrice
        }
      },
    },
    {
      title: '',
      dataIndex: 'seeDetail'
    },
  ];

  const totalPrice = index.items.map(index => {
    return index.Amount * index.TotalPrice
  }).reduce((previousScore, currentScore, index) => previousScore + currentScore, 0);
    const data = index.items.map((value, index) => {
      return {
        key: index,
        inventory: value.Inventory,
        proName: value.ProName,
        amount: value.Amount,
        size: value.Size,
        totalPrice: (value?.Price).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND'
        }),
        seeDetail:<a className="btn btn-primary btn-sm rounded-s" onClick={()=>navigate(`/${LIST_PRODUCT_BY_CATEGORY_ID}${value.CatId}/${value.ProId}`)}> Xem chi tiết </a>
      }
    })


  return (
    <Descriptions title="Thông tin đơn hàng" bordered>
      <Descriptions.Item label="Mã Đơn hàng">{index?.InventoryOrder}</Descriptions.Item>
      <Descriptions.Item label="Số lượng đơn hàng">{index?.items.length}</Descriptions.Item>
      <Descriptions.Item
        label="Phương thức thanh toán">{index?.MethodPay === 1 ? "Chuyển khoản" : "Thanh toán trực tiếp"}</Descriptions.Item>
      <Descriptions.Item label="Thời gian đặt hàng" span={2}>
        {dateFormat(index?.OrderDate, "dd/mm/yyyy hh:mm:ss")}
      </Descriptions.Item>
      <Descriptions.Item label="Tên khách hàng" span={3}>{index.FullName}</Descriptions.Item>
      <Descriptions.Item label="Số điện thoại" span={3}>{index.PhoneNumber}</Descriptions.Item>
      <Descriptions.Item label="Email" span={3}>{index.Email}</Descriptions.Item>
      <Descriptions.Item label="Địa chỉ giao hàng" span={3}>{index.Address}</Descriptions.Item>
      <Descriptions.Item label="Ghi chú của khách hàng" span={3}>{index.Note}</Descriptions.Item>
      <Descriptions.Item label="Tổng đơn hàng" span={3}>{index?.TotalCost.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      })}</Descriptions.Item>
      <Descriptions.Item label="Trạng thái đơn hàng" span={3}>
        <Badge status={index?.StatusOrder === 0 ? "processing" : "success"}
               text={index?.StatusOrder === 0 ? "Chưa thanh toán" : "Đã thanh toán"}/>
      </Descriptions.Item>
      <Descriptions.Item label="Chi tiết đơn hàng">
        <Table columns={columns} dataSource={data}  pagination={{pageSize: 5}}/>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default DescriptionComponent