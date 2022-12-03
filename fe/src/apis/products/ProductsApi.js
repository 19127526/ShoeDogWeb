import request from "../request";
import {GET_PRODUCTS_URI} from "../../configs/url";

export const getListProducts= async ()=>{
  return await request.get(GET_PRODUCTS_URI);
}