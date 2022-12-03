import * as types from "./DetailPage.constraints"
import produce from "immer"

const initialState= {
  cartItem:[]
}
export const DetailPageReducer=(state=initialState, action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.ADD_ITEM_INTO_CART_SUCCESS:
        draft.cartItem.push(action.payload)
        break;
      default:
        return state;
    }
  })

