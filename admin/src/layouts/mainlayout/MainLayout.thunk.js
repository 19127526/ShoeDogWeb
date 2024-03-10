import * as actions from "./MainLayout.actions"
import * as constraints from "../../components/notification/Notification.constraints"
import Notification from "../../components/notification/Notification";
import {getListParentCategoryApi} from "../../apis/parentcategories/ParentCategoriesApi";
export const getListParentCategory= () => async dispatch => {
    try {
        const res = await getListParentCategoryApi()
        if (res?.status == 200) {
            return dispatch(actions.getListParentCate(res?.data?.data))
        }
    } catch (e) {
        Notification(e.toString(), constraints.NOTIFICATION_ERROR)
    }
}


