import request from "../request";
import {PARENT_CATEGORIES_URI} from "../../configs/url";

export const getListParentCategoryApi=async ()=>{
    return await request.get(PARENT_CATEGORIES_URI);
}

export const removeParentCategory=async (id)=>{
    return await request.delete(`${PARENT_CATEGORIES_URI}/${id}`);
}


export const updateParentCategory=async (id,data)=>{
    return await request.put(`${PARENT_CATEGORIES_URI}/${id}`, data);
}

export const addParentCategory=async (data)=>{
    return await request.post(`${PARENT_CATEGORIES_URI}`, data);
}