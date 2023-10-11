import { Popconfirm, Space, Table, Button, message, Form, Input, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { updatePostMid } from "../../../Redux/Slices/postSlice";
import IPost from "../../../interfaces/post";
import ModalForm from "../../../components/ModalForm/ModalForm";
// import axios from "axios";
import { fetchAllChildrenPitch, fetchCreatChildrentPitch, fetchDeleteChildrentPitch, fetchUpdateChildrentPitch } from "../../../Redux/Slices/childrentPitch";
import IChildrentPitch from "~/interfaces/childrentPitch";

// const { Dragger } = Upload;


const PostManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const childrentPitchs = useAppSelector((state) => state.childrenPitch.childrentpitchs);
  console.log({ childrentPitchs});
  
    useEffect(() => {
        dispatch(fetchAllChildrenPitch());
    }, [dispatch]);

    const confirm = async (idPost: string) => {
        await dispatch(fetchDeleteChildrentPitch(idPost));
        message.success(`Xóa bài viết thành công!`);
    };

    const cancel = () => {
        message.error("Đã hủy!");
    };

    const columns: ColumnsType<IChildrentPitch> = [
        {
            title: "Ca Sân",
            dataIndex: "code_chirldren_pitch",
            key: "code_chirldren_pitch",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            const childrent = childrentPitchs?.find((chill: IChildrentPitch) => chill._id === record._id);

                            form.setFieldsValue({
                                _id: childrent?._id,
                                code_chirldren_pitch: childrent?.code_chirldren_pitch,
                                idParentPitch: childrent?.idParentPitch,
                            });
                            showModal("edit");
                        }}
                        ghost
                    >
                        <EditOutlined style={{ display: "inline-flex" }} />
                        Edit
                    </Button>

                    <Popconfirm
                        placement="topRight"
                        title="Xóa bài viết?"
                        description="Bạn có chắc chắn xóa bài viết này không?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={cancel}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <Button type="primary" danger>
                            <DeleteOutlined style={{ display: "inline-flex" }} />
                            Remove
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = childrentPitchs.map((item: IPost, index: number) => ({
        ...item,
        key: index,
    }));

    const showModal = (mode: string) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: "${label} is required!",
    };

    const [form] = Form.useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        if (modalMode === "add") {
            // const images = values?.images?.fileList?.map(
            //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //     ({ response }: any) => response.data.url
            // );

            // const newValues = { ...values, images };

            await dispatch(fetchCreatChildrentPitch(values));
            message.success(`Tạo bài viết thành công!`);
        } else if (modalMode === "edit") {
            // const newImages = values.images.fileList
            //     ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //       values.images.fileList.map(({ response }: any) => response.data.url)
            //     : values.images;

            const newValues = { ...values };
            const { _id, ...childrentpitch } = newValues;

            await dispatch(fetchUpdateChildrentPitch({ _id, childrentpitch }));
            message.success(`Sửa bài viết thành công!`);
        }
        setIsModalOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const uploadFiles = async (file: any) => {
    //     if (file) {
    //         const CLOUD_NAME = "dhwpz6l7t";
    //         const PRESET_NAME = "datn-img";
    //         const FOLDER_NAME = "datn-img";
    //         const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    //         const formData = new FormData();
    //         formData.append("upload_preset", PRESET_NAME);
    //         formData.append("folder", FOLDER_NAME);
    //         formData.append("file", file);

    //         const response = await axios.post(api, formData);

    //         return response;
    //     }
    // };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const customRequest = async ({ file, onSuccess, onError }: any) => {
    //     try {
    //         // Gọi hàm tải lên ảnh của bạn và chờ kết quả
    //         const response = await uploadFiles(file);
    //         // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
    //         if (response?.status === 200) {
    //             message.success(`${file.name} uploaded successfully`);
    //             onSuccess(response, file);
    //         } else {
    //             message.error(`${file.name} upload failed.`);
    //             onError(response);
    //         }
    //     } catch (error) {
    //         // Xử lý lỗi nếu có
    //         message.error("An error occurred while uploading the image.");
    //         onError(error);
    //     }
    // };

    return (
        <>
            <div className="flex justify-end mb-2">
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    size={"large"}
                    className="bg-[#1677ff]"
                    onClick={() => {
                        form.resetFields();
                        showModal("add");
                    }}
                >
                    Create Post
                </Button>
            </div>
            <Table
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={data}
                rowSelection={{}}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.code_chirldren_pitch}</p>,
                }}
            />
            <ModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} modalMode={modalMode}>
                <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
                    {modalMode === "edit" && (
                        <Form.Item name="_id" style={{ display: "none" }}>
                            <Input />
                        </Form.Item>
                    )}
                    

                    {/* <Form.Item name="images" label="Images" rules={[{ required: true }]}>
                        <Dragger multiple listType="picture" customRequest={customRequest}>
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Dragger>
                    </Form.Item> */}
                    <Form.Item
                        name="code_chirldren_pitch"
                        label="Số Lượng Sân"
                        rules={[{ required: true, type: "number", min: 0 }]}
                    >
                        <InputNumber
                            size="large"
                            placeholder="code_chirldren_pitch"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item name="idParentPitch" label="idParentPitch" rules={[{ required: true }, { whitespace: true, message: "${label} is required!" }]}>
                        <Input size="large" placeholder="idParentPitch" />
                    </Form.Item>
                </Form>
            </ModalForm>
        </>
    );
};

export default PostManagement;
