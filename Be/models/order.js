

const db = require('../utils/db');


exports.addOrder=(order)=>{
  return db('orders')
    .insert(order);
}

exports.addDetailOrder=(orderPayload)=>{
  return db('ordersdetails')
    .insert(orderPayload)
}

exports.getDetailOrderByOrderId=(orderId)=>{
  return db("orders")
    .join('ordersdetails','orders.OrderId','ordersdetails.OrderId')
    .where('orders.OrderId',orderId)
}

exports.getAllOrders = () => {
  return db('orders')
}

exports.getAllDetailOrders=()=>{
  return db('ordersdetails')
    .join('products','products.ProId','ordersdetails.ProId')
    .select('ordersdetails.*','products.ProName',
      'products.ProId','products.TotalPrice','products.Brand',
      'products.ImageMain','products.Inventory'
    ,'products.Color','products.CatId')
}

exports.deleteOrder = async (id) => {
  const check=db('orders')
    .where('orders.OrderId', id).del();
  return check;
}
exports.deleteOrderDetail = async (id) => {
  const check=db('ordersdetails')
    .where('ordersdetails.OrderId', id).del();
  return check;
}


exports.acceptOrder=async (id)=>{
  const check=db('orders')
    .where('orders.OrderId', id)
    .update({
      StatusOrder:1
    })
  return check;
}


