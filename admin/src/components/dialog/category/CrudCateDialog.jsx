import {useDispatch, useSelector} from "react-redux";
import {crudCate} from "../../../layouts/mainlayout/MainLayout.actions";
import {Button, Form, Input, Modal, Space} from "antd";
import {useEffect} from "react";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {updateCategoryById} from "../../../apis/categories/CategoriesApi";
import {getListParentCategory} from "../../../layouts/mainlayout/MainLayout.thunk";

const CrudCateDialog = () => {
    const [form] = Form.useForm()
    const {dialogEditCate: open, selectedCate: data} = useSelector(state => state.mainReducer);
    const dispatch = useDispatch()
    const handleCancel = async () => {
        dispatch(crudCate({
            isOpen: false,
            id: undefined
        }))
    }

    useEffect(() => {
        form.setFieldsValue({
            CatId: data?.CatId,
            CatName: data?.CatName,
            ParentId: data?.ParentId
        })
    },[data])



    const onFinish = async (values) => {
        try {
            const res = await updateCategoryById(values)
            console.log('test', res)
            if(res && res?.status == 200) {
                dispatch(getListParentCategory())
                Notification("Thông báo cập nhật", "Cập nhật danh mục con thành công!",constraintNotification.NOTIFICATION_SUCCESS)
                handleCancel()
            } else {

            }
        } catch (e) {
            handleCancel()
            Notification("Thông báo cập nhật", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
        }
    };
    return (
        <Modal
            title="Cập nhật danh mục con"
            open={open}
            onCancel={handleCancel}
            centered={true}
            footer={null}
            okText="Cập nhật"
            cancelText="Hủy bỏ"
        >
            <Form
                name="basic"
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                layout={"vertical"}
            >
                <Form.Item
                    name="CatName"
                    label="Tên danh mục con"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng điền danh mục con',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="CatId"
                    name="CatId"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>

                <Form.Item style={{display: "flex", justifyContent: "right"}}>
                    <Space>
                        <Button htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CrudCateDialog