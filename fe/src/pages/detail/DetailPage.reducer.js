import * as types from "./DetailPage.constraints"
import produce from "immer"

const initialState= {
  cartItem:[]
}
export const DetailPageReducer=(state=initialState, action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.ADD_ITEM_INTO_CART_SUCCESS:
        if(draft.cartItem.length===0) {
          draft.cartItem.push({...action.payload,quantity:1});
        }
        else{
          let isFlag=false
          draft.cartItem.forEach(index=>{
            if(index?.detailProduct?.ProId===action.payload.detailProduct?.ProId
              &&index?.aboutSize.size===action.payload?.aboutSize.size)
            {
              isFlag=true;
              draft.cartItem.map(index=>{
                if(index?.detailProduct?.ProId===action.payload.detailProduct?.ProId
                &&index?.aboutSize.size===action.payload?.aboutSize.size) {
                  index.quantity=index.quantity+1;
                }
              })
              return;
            }
          })
          if(isFlag==false) {
            draft.cartItem.push({...action.payload,quantity:1});
          }
        }
        break;
      case types.REMOVE_ITEM_INTO_CART:
        console.log(action.payload)
        draft.cartItem=action.payload;
        break;
      default:
        return state;
    }
  })

