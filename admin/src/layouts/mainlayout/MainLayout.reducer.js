import * as types from "./MainLayout.constraints"
import produce from "immer"

const initialState = {
    isLoading: false,
    dialogRemoveParent: false,
    dialogEditParent: false,
    dialogRemoveCate: false,
    dialogAddParent: false,
    dialogEditCate: false,
    selectedCate: undefined,
    selectedParent: undefined,
    listParentCate: null
}
export const MainLayoutReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case types.CHANGE_IS_LOADING:
                draft.isLoading = !draft.isLoading;
                break;
            case types.TURN_ON_IS_LOADING:
                draft.isLoading = true;
                break;
            case types.TURN_OFF_IS_LOADING:
                draft.isLoading = false;
                break;
            case types.REMOVE_CATEGORY:
                draft.dialogRemoveCate = action?.payload?.isOpen;
                draft.selectedCate = action?.payload?.data || undefined;
                break;
            case types.CRUD_CATEGORY:
                draft.selectedCate = action?.payload?.data || undefined;
                draft.dialogEditCate = action?.payload?.isOpen;
                break;
            case types.REMOVE_PARENT_CATEGORY:
                draft.selectedParent = action?.payload?.data || undefined;
                draft.dialogRemoveParent = action?.payload?.isOpen;
                break;
            case types.CRUD_PARENT_CATEGORY:
                draft.selectedParent = action?.payload?.data || undefined;
                draft.dialogEditParent = action?.payload?.isOpen;
                break;
            case types.GET_LIST_PARENT_CATEGORY:
                draft.listParentCate = action?.payload || [];
                break;
            case types.ADD_PARENT_CATEGORY:
                draft.dialogAddParent = action?.payload?.isOpen;
                break;
            default:
                return state;
        }
    })

