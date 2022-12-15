

const db = require('../utils/db');

exports.getAllBrands= ()=>{
  return db("products")
    .distinct('Brand');
}

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