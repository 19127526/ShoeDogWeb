import request from "../request";
import {GET_ALL_ORDER_URI} from "../../configs/url";


export const getAllOrders=async ()=>{
  return await request.get(GET_ALL_ORDER_URI);
}