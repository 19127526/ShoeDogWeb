import request from "../request";
import {
  ADD_NEW_PRODUCT_URI, DETAIL_PRODUCT_URI,
  GET_BRANDS_URI,
  GET_PRODUCTS_URI,
  REMOVE_PRODUCT_URI,
  SEARCH_PRODUCT_URI
} from "../../configs/url";

export const getListProducts= async ()=>{
  return await request.get(GET_PRODUCTS_URI);
}
export const getListProductsByCatId=async (id)=>{
  return await request.get(GET_PRODUCTS_URI+"/"+id);
}

export const removeProductByProId=async ({proId})=>{
  return await request.post(REMOVE_PRODUCT_URI,{id:proId});
}

export const addProduct=async (payload)=>{
 /* category: payload.catName,
    name: payload.proName,
    des:payload.des,
    shortDes:"",
    status:1,
    brand:payload.brand,
    price:payload.price,
    discount:payload.discount,
    total:payload.totalPrice,
    image:payload.image,
    size:payload.size,
    color:payload.color,*/
  return await request.post(ADD_NEW_PRODUCT_URI,payload,{
    headers:{
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getAllBrands=async ()=>{
  return await request.get(GET_BRANDS_URI);
}


export const searchProductsByCatId=async ({productName,catId})=>{
  return await request.post(SEARCH_PRODUCT_URI,{productName:productName,catId:catId})
}

export const getDetailProductByProId=async (proId)=>{
  return await request.get(DETAIL_PRODUCT_URI+proId);
}