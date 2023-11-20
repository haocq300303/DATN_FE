import { Popconfirm, Space, Table, Button, message, Form, Input, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import { fetchAllChildrenPitch, fetchCreatChildrentPitch, fetchDeleteChildrentPitch, fetchUpdateChildrentPitch } from "../../../Redux/Slices/childrentPitch";
import IChildrentPitch from "~/interfaces/childrentPitch";


const ChildrentPitch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const childrentPitchs = useAppSelector((state) => state.childrenPitch.childrentpitchs);
    console.log(childrentPitchs.data);
  
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
            title: "Giờ Diễn",
            dataIndex: "_id",
            key: "code_chirldren_pitch",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Thực Hiện",
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
                        title="Xóa ca sân?"
                        description="Bạn có chắc chắn xóa ca sân này không?"
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
    const data = Array.isArray(childrentPitchs.data)
    ? childrentPitchs.data.map((item: IChildrentPitch, index: number) => ({
        ...item,
        key: index,
    }))
    : [];
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
    const onFinish = async (values: any) => {
        if (modalMode === "add") {
            await dispatch(fetchCreatChildrentPitch(values));
            message.success(`Tạo bài viết thành công!`);
        } else if (modalMode === "edit") {
            const newValues = { ...values };
            const { _id, ...childrentpitch } = newValues;
            await dispatch(fetchUpdateChildrentPitch({ _id, childrentpitch }));
            message.success(`Sửa bài viết thành công!`);
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
                    className="bg-[#2988bc]"
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

export default ChildrentPitch;