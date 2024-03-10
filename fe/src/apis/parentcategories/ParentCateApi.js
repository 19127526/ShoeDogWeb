import request from "../request";
import {GET_PARENT_CATEGORIES_URI} from "../../configs/url";


export const getParentCategory=async ()=>{
    return await request.get(GET_PARENT_CATEGORIES_URI)
}