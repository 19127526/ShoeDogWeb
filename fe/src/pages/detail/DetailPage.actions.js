import * as types from "./DetailPage.constraints";


export const addItemSuccess=(payload)=>({
  type: types.ADD_ITEM_INTO_CART_SUCCESS,
  payload
})