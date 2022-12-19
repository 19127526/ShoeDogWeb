import request from "../request";
import {COMPLETE_ORDER_URI, GET_ALL_ORDER_URI, REMOVE_ORDER_URI} from "../../configs/url";


export const getAllOrders=async ()=>{
  return await request.get(GET_ALL_ORDER_URI);
}

export const removeOrdersByOrderId=async (orderId)=>{
  return await request.post(REMOVE_ORDER_URI,{orderId:orderId})
}

export const completeOrdersByOrderId=async (orderId)=>{
  return await request.post(COMPLETE_ORDER_URI,{orderId:orderId})
}