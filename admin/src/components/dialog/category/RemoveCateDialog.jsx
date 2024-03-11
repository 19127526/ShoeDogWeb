import {useDispatch, useSelector} from "react-redux";
import {crudCate, removeCate, resetMainLayout} from "../../../layouts/mainlayout/MainLayout.actions";
import {Button, Form, Input, Modal, Space} from "antd";
import {removeCategoryById, updateCategoryById} from "../../../apis/categories/CategoriesApi";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {FallOutlined} from "@ant-design/icons";
import {getListParentCategory} from "../../../layouts/mainlayout/MainLayout.thunk";
import {useNavigate} from "react-router-dom";

const RemoveCateDialog = () => {
    const {dialogRemoveCate: open, selectedCate: data} = useSelector(state => state.mainReducer);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCancel = async () => {
        dispatch(removeCate({
            isOpen: false,
            id: undefined
        }))
    }




    const handleRemove = async () => {
        try {
            const res = await removeCategoryById(data?.CatId)
            if(res && res?.status == 200) {
                dispatch(resetMainLayout())
                dispatch(getListParentCategory())
                Notification("Thông báo xóa", "Xóa danh mục con thành công!",constraintNotification.NOTIFICATION_SUCCESS)
                handleCancel()
                navigate("/admin")
            }
        } catch (e) {
            handleCancel()
            Notification("Thông báo Xóa", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
        }
    };
    return (
        <Modal
            title="Xoá danh mục con"
            open={open}
            onCancel={handleCancel}
            onOk={handleRemove}
            okText="Xóa"
            closeIcon={<FallOutlined/>}
            cancelText="Hủy bỏ"
        >
            <span>Bạn có chắc chắn muốn xóa danh mục con này?</span>
        </Modal>
    )
}

export default RemoveCateDialog