import { Popconfirm, Space, Table, Button, message, Form, Input, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { createPostMid, updatePostMid, deletePostMid, getAllPostMid } from "../../../../Redux/Slices/postSlice";
import IPost from "../../../../interfaces/post";
import ModalForm from "../../../../components/ModalForm/ModalForm";
import axios from "axios";

const { Dragger } = Upload;
import "./PostManagement.css";

const PostManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.post.posts);

    useEffect(() => {
        dispatch(getAllPostMid());
    }, [dispatch]);

    const confirm = async (idPost: string) => {
        await dispatch(deletePostMid(idPost));
        message.success(`Xóa bài viết thành công!`);
    };

    const cancel = () => {
        message.error("Đã hủy!");
    };

    const columns: ColumnsType<IPost> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            render: (image) => <img width={30} src={image[0]} />,
        },
        Table.EXPAND_COLUMN,
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
            render: (text) => {
                return text.slice(0, 50).concat(" . . .");
            },
        },
        {
            title: "User",
            key: "user",
            dataIndex: "id_user",
            render: (user) => <span>{user?.name}</span>,
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt",
            defaultSortOrder: "descend",
            render: (date) => <span>{date}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            const post = posts?.find((post: IPost) => post._id === record._id);

                            form.setFieldsValue({
                                _id: post?._id,
                                title: post?.title,
                                images: post?.images,
                                description: post?.description,
                            });
                            showModal("edit");
                        }}
                        ghost
                    >
                        <EditOutlined style={{ display: "inline-flex" }} />

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

                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = posts.map((item: IPost, index: number) => ({
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
            const images = values?.images?.fileList?.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ response }: any) => response.data.url
            );

            const newValues = { ...values, images };

            await dispatch(createPostMid(newValues));
            message.success(`Tạo bài viết thành công!`);
        } else if (modalMode === "edit") {
            const newImages = values.images.fileList
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  values.images.fileList.map(({ response }: any) => response.data.url)
                : values.images;

            const newValues = { ...values, images: newImages };
            const { _id, ...post } = newValues;

            await dispatch(updatePostMid({ _id, post }));
            message.success(`Sửa bài viết thành công!`);
        }
        setIsModalOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFiles = async (file: any) => {
        if (file) {
            const CLOUD_NAME = "dhwpz6l7t";
            const PRESET_NAME = "datn-img";
            const FOLDER_NAME = "datn-img";
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);
            formData.append("file", file);

            const response = await axios.post(api, formData);

            return response;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customRequest = async ({ file, onSuccess, onError }: any) => {
        try {
            // Gọi hàm tải lên ảnh của bạn và chờ kết quả
            const response = await uploadFiles(file);
            // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
            if (response?.status === 200) {
                message.success(`${file.name} uploaded successfully`);
                onSuccess(response, file);
            } else {
                message.error(`${file.name} upload failed.`);
                onError(response);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            message.error("An error occurred while uploading the image.");
            onError(error);
        }
    };

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
                </Button>
            </div>
            <Table
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={data}
                rowSelection={{}}
                scroll={{ y: 100 }}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                }}
            />
            <ModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} modalMode={modalMode}>
                <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
                    {modalMode === "edit" && (
                        <Form.Item name="_id" style={{ display: "none" }}>
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item name="title" label="Title" rules={[{ required: true }, { whitespace: true, message: "${label} is required!" }]}>
                        <Input size="large" placeholder="Title" />
                    </Form.Item>

                    <Form.Item name="images" label="Images" rules={[{ required: true }]}>
                        <Dragger multiple listType="picture" customRequest={customRequest}>
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Dragger>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }, { whitespace: true, message: "${label} is required!" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                </Form>
            </ModalForm>
        </>
    );
};

export default PostManagement;
