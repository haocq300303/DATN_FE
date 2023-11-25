import {
    Popconfirm,
    Space,
    Table,
    Button,
    message,
    Form,
    Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import "./index.css";
import { createLocationMid, deleteLocationMid, getAllLocationMid, updateLocationMid } from "../../../Redux/Slices/locationSlice";
import ILocation from "../../../interfaces/location";

const LocationList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const locations = useAppSelector((state) => state.location.locations);
    console.log("api", locations);


    useEffect(() => {
        dispatch(getAllLocationMid());
    }, [dispatch]);

    const confirm = async (idLocation: string) => {
        await dispatch(deleteLocationMid(idLocation));
        message.success(`Xóa location thành công!`);
    };

    const cancel = () => {
        message.error("Đã hủy!");
    };

    const columns: ColumnsType<ILocation> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                            const location = locations?.find(
                                (location: ILocation) => location._id === record._id
                            );

                            form.setFieldsValue({
                                _id: location?._id,
                                name: location?.name,
                            });
                            showModal("edit");
                        }}
                        ghost
                    >
                        <EditOutlined style={{ display: "inline-flex" }} />

                    </Button>

                    <Popconfirm
                        placement="topRight"
                        title="Xóa location?"
                        description="Bạn có chắc chắn xóa location này không?"
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

    const data = locations.map((item: any, index: number) => ({
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

            await dispatch(createLocationMid(newValues));
            message.success(`Tạo location thành công!`);
        } else if (modalMode === "edit") {

            const newValues = { ...values };
            const { _id, ...location } = newValues;

            await dispatch(updateLocationMid({ _id, location }));
            message.success(`Sửa location thành công!`);
        }
        setIsModalOpen(false);
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
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>{record.name}</p>
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
                        name="name"
                        label="Name"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input size="large" placeholder="Name" />
                    </Form.Item>

                </Form>
            </ModalForm>
        </>
    );
}

export default LocationList