import request from "../request";
import {
  ADD_NEW_PRODUCT_URI,
  DETAIL_PRODUCT_URI,
  EDIT_PRODUCT_URI,
  GET_BRANDS_URI,
  GET_MAX_ITEM_BUY_DAY_URI,
  GET_MAX_ITEM_BUY_MONTH_URI,
  GET_MAX_ITEM_BUY_YEAR_URI, GET_MIN_ITEM_BUY_DAY_URI,
  GET_MIN_ITEM_BUY_MONTH_URI, GET_MIN_ITEM_BUY_YEAR_URI, GET_PRODUCTS_SOLD_OUT_URI,
  GET_PRODUCTS_URI,
  GET_STATISTIC_DAY_URI,
  GET_STATISTIC_MONTH_URI,
  GET_STATISTIC_YEAR_URI,
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

export const editProduct=async (payload)=>{
  return await request.post(EDIT_PRODUCT_URI,payload,{
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


export const getTotalPriceStatisticDay=async ()=>{
  return await request.get(GET_STATISTIC_DAY_URI)
}

export const getTotalPriceStatisticYear=async ()=>{
  return await request.get(GET_STATISTIC_YEAR_URI)
}

export const getTotalPriceStatisticMonth=async ()=>{
  return await request.get(GET_STATISTIC_MONTH_URI)
}

export const getMaxItemBuyStatisticMonth=async ({limit})=>{
  return await request.get(GET_MAX_ITEM_BUY_MONTH_URI+limit)
}

export const getMaxItemBuyStatisticDay=async ({limit})=>{
  return await request.get(GET_MAX_ITEM_BUY_DAY_URI+limit)
}
export const getMaxItemBuyStatisticYear=async ({limit})=>{
  return await request.get(GET_MAX_ITEM_BUY_YEAR_URI+limit)
}

export const getMinItemBuyStatisticMonth=async ({limit})=>{
  return await request.get(GET_MIN_ITEM_BUY_MONTH_URI+limit)
}

export const getMinItemBuyStatisticDay=async ({limit})=>{
  return await request.get(GET_MIN_ITEM_BUY_DAY_URI+limit)
}
export const getMinItemBuyStatisticYear=async ({limit})=>{
  return await request.get(GET_MIN_ITEM_BUY_YEAR_URI+limit)
}

export const getListProductSoldOut=async ()=>{
  return await request.get(GET_PRODUCTS_SOLD_OUT_URI);
}


