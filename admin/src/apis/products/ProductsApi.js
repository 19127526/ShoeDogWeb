import request from "../request";
import {GET_PRODUCTS_URI, REMOVE_PRODUCT_URI} from "../../configs/url";

export const getListProducts= async ()=>{
  return await request.get(GET_PRODUCTS_URI);
}
export const getListProductsByCatId=async (id)=>{
  return await request.get(GET_PRODUCTS_URI+"/"+id);
}

export const removeProductByProId=async ({proId})=>{
  return await request.post(REMOVE_PRODUCT_URI,{id:proId});
}