import * as types from "./MainLayout.constraints"



export const changeStateLoading=()=>({
  type: types.CHANGE_IS_LOADING
})

export const turnOffLoading=()=>({
  type: types.TURN_OFF_IS_LOADING
})


export const turnOnLoading=()=>({
  type: types.TURN_ON_IS_LOADING
})


export const crudParentCate=(payload)=>({
  type: types.CRUD_PARENT_CATEGORY,
  payload
})


export const getListParentCate=(payload)=>({
  type: types.GET_LIST_PARENT_CATEGORY,
  payload
})


export const removeParentCate=(payload)=>({
  type: types.REMOVE_PARENT_CATEGORY,
  payload
})

export const addParentCate=(payload)=>({
  type: types.ADD_PARENT_CATEGORY,
  payload
})

export const crudCate=(payload)=>({
  type: types.CRUD_CATEGORY,
  payload
})


export const removeCate=(payload)=>({
  type: types.REMOVE_CATEGORY,
  payload
})

