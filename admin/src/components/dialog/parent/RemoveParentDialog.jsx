import {useDispatch, useSelector} from "react-redux";
import {crudParentCate, removeCate, removeParentCate} from "../../../layouts/mainlayout/MainLayout.actions";
import {Modal} from "antd";
import {getListParentCategory} from "../../../layouts/mainlayout/MainLayout.thunk";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {FallOutlined} from "@ant-design/icons";
import {removeParentCategory} from "../../../apis/parentcategories/ParentCategoriesApi";

const RemoveParentDialog = () => {
    const {dialogRemoveParent: open, selectedParent: data} = useSelector(state => state.mainReducer);
    const dispatch = useDispatch()
    const handleCancel = async () => {
        dispatch(removeParentCate({
            isOpen: false,
        }))
    }




    const handleRemove = async () => {
        try {
            const res = await removeParentCategory(data?.ParentId)
            if(res && res?.status == 200) {
                dispatch(getListParentCategory())
                Notification("Thông báo xóa", "Xóa danh mục cha thành công!",constraintNotification.NOTIFICATION_SUCCESS)
                handleCancel()
            }
        } catch (e) {
            handleCancel()
            Notification("Thông báo Xóa", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
        }
    };
    return (
        <Modal
            title="Xoá danh mục cha"
            open={open}
            onCancel={handleCancel}
            onOk={handleRemove}
            okText="Xóa"
            closeIcon={<FallOutlined/>}
            cancelText="Hủy bỏ"
        >
            <span>Bạn có chắc chắn muốn xóa danh mục cha này?</span>
        </Modal>
    )
}

export default RemoveParentDialog