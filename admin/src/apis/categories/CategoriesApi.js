import request from "../request";
import {GET_CATEGORIES_URI} from "../../configs/url";

export const getListCategories=async ()=>{
  return await request.get(GET_CATEGORIES_URI);
}

export const updateCategoryById = async (data) => {
  return await request.put(`${GET_CATEGORIES_URI}/${data.CatId}`, data)
}


export const createCategoryById = async (data) => {
  return await request.post(`${GET_CATEGORIES_URI}`, data)
}

export const removeCategoryById = async (id) => {
  return await request.delete(`${GET_CATEGORIES_URI}/${id}`)
}


