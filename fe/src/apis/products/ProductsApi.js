import request from "../request";
import {GET_DETAIL_PRODUCT_URI, GET_PRODUCTS_URI, SEARCH_PRODUCT_URI} from "../../configs/url";

export const getListProducts= async ()=>{
  return await request.get(GET_PRODUCTS_URI);
}

export const getListProductsByCatId=async (id)=>{
  return await request.get(GET_PRODUCTS_URI+"/"+id);
}

export const getDetailProductByProId=async (id)=>{
  return await request.get(GET_DETAIL_PRODUCT_URI+`/${id}`);
}

export const searchProducts=async (productName)=>{
  return await request.post(SEARCH_PRODUCT_URI,{productName:productName})
}