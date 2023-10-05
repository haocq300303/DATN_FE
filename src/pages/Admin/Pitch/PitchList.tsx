import {
    Popconfirm,
    Space,
    Table,
    Button,
    message,
    Form,
    Input,
    Upload,
    Select,
    InputNumber,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import axios from "axios";

const { Dragger } = Upload;
import "./index.css";
import { fetchAllPitch, fetchCreatPitch, fetchDeletePitch, fetchUpdatePitch } from "../../../Redux/Slices/pitchSlice";
import { getAllLocationMid } from "../../../Redux/Slices/locationSlice";
import IPitch from "../../../interfaces/pitch";
import { Option } from "antd/es/mentions";


const PitchList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const pitchs = useAppSelector((state) => state.pitch.pitchs);
    // console.log("api Pitch", pitchs);

    const locations = useAppSelector((state) => state.location.locations);
    // console.log("api Location", locations);


    useEffect(() => {
        dispatch(fetchAllPitch());
        dispatch(getAllLocationMid());
    }, [dispatch]);

    const confirm = async (idPost: string) => {
        await dispatch(fetchDeletePitch(idPost));
        message.success(`Xóa bài viết thành công!`);
    };

    const cancel = () => {
        message.error("Đã hủy!");
    };

    const columns: ColumnsType<IPitch> = [

        {
            title: "Địa Điểm",
            dataIndex: "address",
            key: "address",
            render: (text) => {
                return text.slice(0, 50).concat(" . . .");
            },
        },
        Table.EXPAND_COLUMN,
        {
            title: "Tên Sân",
            dataIndex: "name",
            key: "name",
            // render: (image) => <img width={30} src={image[0]} />,
        },
        {
            title: "Số Lượng sân",
            key: "numberPitch",
            dataIndex: "numberPitch",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "deposit_price",
            key: "deposit_price",
            dataIndex: "deposit_price",
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
                            const pitch = pitchs?.find(
                                (pitch: IPitch) => pitch._id === record._id
                            );

                            form.setFieldsValue({
                                _id: pitch?._id,
                                address: pitch?.address,
                                name: pitch?.name,
                                admin_pitch_id: pitch?.admin_pitch_id,
                                images: pitch?.images,
                                numberPitch: pitch?.numberPitch,
                                description: pitch?.description,
                                location_id: pitch?.location_id,
                                shift_id: pitch?.shift_id,
                                deposit_price: pitch?.deposit_price,
                                avatar: pitch?.avatar,
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
    // call pitchs
    const data = pitchs?.map((item: IPitch, index: number) => ({
        ...item,
        key: index,
    }));

    // call creat location

    const options: { value: string; label: string }[] = locations?.map((data: any) => ({
        value: data._id,
        label: data.name,
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
            const avatar = values?.avatar?.fileList[0]?.response?.data?.url

            const newValues = { ...values, avatar, images };
            console.log({ newValues });


            await dispatch(fetchCreatPitch(newValues));
            message.success(`Tạo Sân Bóng thành công!`);
        } else if (modalMode === "edit") {
            const images = values.images.fileList
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                values.images.fileList.map(({ response }: any) => response.data.url)
                : values.images;
            const avatar = values.avatar.fileList
                ?
                values?.avatar?.fileList[0]?.response?.data?.url
                : values.avatar;

            const newValues = { ...values, images, avatar };
            const { _id, ...pitch } = newValues;
            // console.log({ newValues });
            await dispatch(fetchUpdatePitch({ _id, pitch }));
            message.success(`Sửa Sân Bóng thành công!`);
        }
        setIsModalOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFiles = async (file: any) => {
        if (file) {
            const CLOUD_NAME = "dwp7umncy";
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
                    Create Pitch
                </Button>
            </div>
            <Table
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={data}
                rowSelection={{}}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                }}
            />
            <ModalForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                form={form}
                modalMode={modalMode}
            >
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                >
                    {modalMode === "edit" && (
                        <Form.Item name="_id" style={{ display: "none" }}>
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="address"
                        label="Vị Trí"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input.TextArea rows={2} placeholder="address" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên Sân"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input size="large" placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="admin_pitch_id"
                        label="ID Chủ Sân"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input size="large" placeholder="admin_pitch_id" />
                    </Form.Item>
                    <Form.Item
                        name="numberPitch"
                        label="Số Lượng Sân"
                        rules={[{ required: true, type: "number", min: 0 }]}
                    >
                        <InputNumber
                            size="large"
                            placeholder="numberPitch"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item name="images" label="Images" rules={[{ required: true }]}>
                        <Dragger multiple listType="picture" customRequest={customRequest}>
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Dragger>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        name="shift_id"
                        label="Ca Sân"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input size="large" placeholder="shift_id" />
                    </Form.Item>

                    <Form.Item
                        name="location_id"
                        label="Location"
                        rules={[{ required: true }]}
                    >
                        <Select size="large" placeholder="---- Location ----">
                            {options.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="deposit_price"
                        label="Deposit_price"
                        rules={[{ required: true, type: "number", min: 0 }]}
                    >
                        <InputNumber
                            size="large"
                            placeholder="deposit_price"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item name="avatar" label="Avatar" rules={[{ required: true }]}>
                        <Dragger listType="picture" customRequest={customRequest}>
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </Dragger>
                    </Form.Item>
                </Form>
            </ModalForm>
        </>
    );
}

export default PitchList