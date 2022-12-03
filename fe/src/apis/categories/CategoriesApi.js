import request from "../request";
import {GET_CATEGORIES_URI} from "../../configs/url";

export const getListCategories=async ()=>{
  return await request.get(GET_CATEGORIES_URI);
}
