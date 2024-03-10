import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Modal, Space} from "antd";
import {crudCate, crudParentCate} from "../../../layouts/mainlayout/MainLayout.actions";
import {useEffect} from "react";
import {createCategoryById, updateCategoryById} from "../../../apis/categories/CategoriesApi";
import {getListParentCategory} from "../../../layouts/mainlayout/MainLayout.thunk";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {addParentCategory, updateParentCategory} from "../../../apis/parentcategories/ParentCategoriesApi";

const CrudParentDialog = () => {
    const [form] = Form.useForm()
    const {dialogEditParent: open, selectedParent: data} = useSelector(state => state.mainReducer);
    const dispatch = useDispatch()
    const handleCancel = async () => {
        dispatch(crudParentCate({
            isOpen: false,
        }))
    }

    useEffect(() => {
        if(data?.type == 0) {
            form.setFieldsValue({
                ParentId: data?.ParentId,
                ParentName: data?.ParentName,
            })
        } else {
            form.setFieldsValue({
                ParentId: data?.ParentId,
                ParentName: data?.ParentName,
                CatName: undefined
            })
        }
    },[data])



    const handleUpdateParent = async (values) => {
        try {
            const res = await updateParentCategory(values?.ParentId, values)
            if(res && res?.status == 200) {
                dispatch(getListParentCategory())
                Notification("Thông báo cập nhật", "Cập nhật danh mục cha thành công!",constraintNotification.NOTIFICATION_SUCCESS)
                handleCancel()
            } else {

            }
        } catch (e) {
            handleCancel()
            Notification("Thông báo cập nhật", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
        }
    }

    const handleCreateParent = async (values) => {
        try {
            const res = await createCategoryById(values)
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
    }


    // const handleCreateParent = async (values) => {
    //     try {
    //         const res = await addParentCategory(values)
    //         if(res && res?.status == 200) {
    //             dispatch(getListParentCategory())
    //             Notification("Thông báo thêm mới", "Thêm mới danh mục cha thành công!",constraintNotification.NOTIFICATION_SUCCESS)
    //             handleCancel()
    //         } else {
    //
    //         }
    //     } catch (e) {
    //         handleCancel()
    //         Notification("Thông báo thêm mới", e?.toString(),constraintNotification.NOTIFICATION_ERROR)
    //     }
    // };
    return (
        <Modal
            title={data?.type == 0 ? "Cập nhật danh mục cha": "Thêm mới danh mục con"}
            open={open}
            onCancel={handleCancel}
            centered={true}
            footer={null}
            title={data?.type == 0 ? "Cập nhật": "Thêm mới"}
            cancelText="Hủy bỏ"
        >
            {
                data?.type == 0 ?
                    <Form
                        name="basic"
                        form={form}
                        autoComplete="off"
                        onFinish={handleUpdateParent}
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

                        <Form.Item
                            label="ParentId"
                            name="ParentId"
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
                    :
                    <Form
                        name="basic"
                        form={form}
                        autoComplete="off"
                        onFinish={handleCreateParent}
                        layout={"vertical"}
                    >
                        <Form.Item
                            name="ParentId"
                            label="ParentId"
                            hidden={true}
                        >
                            <Input/>
                        </Form.Item>

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
                            <Input readOnly/>
                        </Form.Item>

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
            }
        </Modal>
    )
}

export default CrudParentDialog