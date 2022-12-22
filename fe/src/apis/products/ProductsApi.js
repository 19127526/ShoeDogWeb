import request from "../request";
import {GET_DETAIL_PRODUCT_URI, GET_PRODUCTS_URI, RELATED_PRODUCT_URI, SEARCH_PRODUCT_URI} from "../../configs/url";

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

export const relatedProduct=async (catId,proId)=>{
  return await request.post(RELATED_PRODUCT_URI,{catId:catId,proId});
}