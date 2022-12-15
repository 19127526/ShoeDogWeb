import request from "../request";
import {ADD_ORDER_URI} from "../../configs/url";


export const addOrderApi=async (payload)=>{
  return await request.post(ADD_ORDER_URI,payload)
}