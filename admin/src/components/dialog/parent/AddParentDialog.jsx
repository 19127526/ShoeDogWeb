import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Modal, Space} from "antd";
import {addParentCate, crudParentCate} from "../../../layouts/mainlayout/MainLayout.actions";
import {getListParentCategory} from "../../../layouts/mainlayout/MainLayout.thunk";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {addParentCategory} from "../../../apis/parentcategories/ParentCategoriesApi";

const AddParentDialog = () => {
    const [form] = Form.useForm()
    const {dialogAddParent: open,} = useSelector(state => state.mainReducer);
    const dispatch = useDispatch()
    const handleCancel = async () => {
        dispatch(addParentCate({
            isOpen: false,
        }))
    }



    const handleCreateParent = async (values) => {
        try {
            const res = await addParentCategory(values)
            if(res && res?.status == 200) {
                dispatch(getListParentCategory())
                Notification("Thông báo thêm mới", "Thêm mới danh mục cha thành công!",constraintNotification.NOTIFICATION_SUCCESS)
                handleCancel()
            } else {

            }
        } catch (e) {
            handleCancel()
            Notification("Thông báo thêm mới", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
        }
    };
    return (
        <Modal
            title={"Thêm mới danh mục cha"}
            open={open}
            onCancel={handleCancel}
            centered={true}
            footer={null}
            title="Thêm mới"
            cancelText="Hủy bỏ"
        >

            <Form
                name="basic"
                form={form}
                autoComplete="off"
                onFinish={handleCreateParent}
                layout={"vertical"}
            >
                <Form.Item
                    name="ParentName"
                    label="Tên danh mục cha"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền danh mục cha',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item style={{display: "flex", justifyContent: "right"}}>
                    <Space>
                        <Button htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Thêm mới
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddParentDialog