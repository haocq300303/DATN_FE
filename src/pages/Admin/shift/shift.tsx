import {
  Popconfirm,
  Space,
  Table,
  Button,
  message,
  Form,
  Input,
  Select,
  // TimePicker,
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
import IShift from "~/interfaces/shift";
import {
  fetchAllShift,
  fetchCreatShift,
  fetchDeleteShift,
  fetchUpdateShift,
} from "../../../Redux/Slices/shift";

const Shift = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");

  const dispatch = useAppDispatch();

  const shifts = useAppSelector((state) => state.shift.shift);
  console.log({ shifts });

  useEffect(() => {
    dispatch(fetchAllShift());
  }, [dispatch]);

  const confirm = async (idPost: string) => {
    await dispatch(fetchDeleteShift(idPost));
    message.success(`Xóa bài viết thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<IShift> = [
    {
      title: "Ca Sân",
      dataIndex: "shift",
      key: "status",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giờ Diễn",
      dataIndex: "timeslot",
      key: "timeslot",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Giá Sân",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Trạng Thái Sân",
      dataIndex: "statusPitch",
      key: "statusPitch",
      render: (text) => (
        <span
          className={
            text
              ? "text-[#fff] bg-green-600 p-[10px] rounded-[10px]"
              : "p-[10px] rounded-[10px] text-[#fff] bg-red-600"
          }
        >
          {text ? "Sân Trống" : "Sân Bận"}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const shift = shifts?.find(
                (chill: IShift) => chill._id === record._id
              );

              form.setFieldsValue({
                _id: shift?._id,
                price: shift?.price,
                timeslot: shift?.timeslot,
                statusPitch: shift?.statusPitch,
              });
              showModal("edit");
            }}
            ghost
          >
            <EditOutlined style={{ display: "inline-flex" }} />
            Cập Nhật
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
              Xoá Ca Sân
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = shifts.map((item: IShift, index: number) => ({
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

  const onFinish = async (values: any) => {
    if (modalMode === "add") {
      console.log({values});
      await dispatch(fetchCreatShift(values));
      message.success(`Tạo bài viết thành công!`);
    } else if (modalMode === "edit") {
      const newValues = { ...values };
      const { _id, ...shift } = newValues;

      await dispatch(fetchUpdateShift({ _id, shift }));
      message.success(`Sửa ca sân thành công!`);
    }
    setIsModalOpen(false);
  };

  const [caCount, setCaCount] = useState(1);
  const [caData, setCaData] = useState([
    {
      id: 1,
      timeSlot: [],
      price: "",
      status: "",
    },
  ]);

  const addCaSan = () => {
    const newCa = {
      id: caCount + 1,
      timeSlot: [],
      price: "",
      status: "Sân Rảnh",
    };
    setCaData([...caData, newCa]);
    setCaCount(caCount + 1);
  };

  const handleDeleteCa = (id: any) => {
    const updatedCaData = caData.filter((ca) => ca.id !== id);
    setCaData(updatedCaData);
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
          Thêm Ca Sân
        </Button>
      </div>

      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record._id}</p>
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
          // layout="vertical"
        >
          {modalMode === "edit" && (
            <Form.Item name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
          )}

          <Form.Item>
            {caData.map((ca: any) => (
              <div key={ca.id}>
                <p className="my-[20px]">Ca {ca.id}</p>
                
                <Form.Item className="hidden" name="shift">
                  <Input size="large" type="number" placeholder={ca.id} value={ca.id} />
                </Form.Item>


                <div className="flex items-center justify-between">
                  <Form.Item
                    name="timeslot"
                    label="Thời Gian"
                    rules={[{ required: true }]}
                  >
                    <Input type="time" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="border-red-600 text-[red]"
                      onClick={() => handleDeleteCa(ca.id)}
                    >
                      Xoá Ca
                    </Button>
                  </Form.Item>
                </div>
              
                <Form.Item
                  name="price"
                  label="Giá Sân"
                  className="mt-[10px]"
                  rules={[
                    { required: true },
                    {
                      whitespace: true,
                      message: "Không được để trống ${label} !",
                    },
                  ]}
                >
                  <Input size="large" type="number" placeholder="Giá Sân" />
                </Form.Item>

                <Form.Item
                  label="Trạng Thái Sân"
                  name="statusPitch"
                  className="my-[20px] w-[50%]"
                  rules={[
                    { required: true, message: "Trạng thái sân là bắt buộc" },
                  ]}
                >
                  <Select placeholder="Chọn trạng thái sân">
                    <Select.Option value={false}>Sân Bận</Select.Option>
                    <Select.Option value={true}>Sân Rảnh</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            ))}
            <Button
              className="border-green-500 flex justify-center float-right mb-[50px] text-[green]"
              onClick={addCaSan}
            >
              Thêm Ca Sân
            </Button>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};
export default Shift;
