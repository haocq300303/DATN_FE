/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalForm from "../../../../components/ModalForm/ModalForm";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import {
  createServiceMid,
  deleteServiceMid,
  getAllServiceMid,
  updateServiceMid,
} from "../../../../Redux/Slices/serviceSlice";
import { IService } from "../../../../interfaces/service";
import "./ServiceManagement.css";
import { Option } from "antd/es/mentions";
import { fetchAllPitch } from "~/Redux/Slices/pitchSlice";

const { Dragger } = Upload;

const ServiceManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");

  const dispatch = useAppDispatch();

  const services = useAppSelector((state) => state.service.services);
  const pitch_id = useAppSelector((state) => state.pitch.pitchs);


  useEffect(() => {
    dispatch(getAllServiceMid());
    dispatch(fetchAllPitch(""));
  }, [dispatch]);

  const confirm = (id: string) => {
    void dispatch(deleteServiceMid(id));
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<IService> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Id_Pitch",
      dataIndex: "id_Pitch",
      key: "id_Pitch",
      // render: (id_Pitch) => <span>{id_Pitch.name}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img width={200} src={image} alt="Banner" />,
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const service = services?.find(
                (service: IService) => service._id === record._id
              );
                
              form.setFieldsValue({
                _id: service?._id,
                name: service?.name,
                price: service?.price,
                // id_Pitch: service?.id_Pitch?._id ?? service?._id,
                image: service?.image,
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
              <DeleteOutlined />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = services.map((item: IService, index: number) => {
    return {
      ...item,
      key: index,
    };
  });
  

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

  const onFinish = async (values: any) => {
    if (modalMode === "add") {
      const urls = values?.image?.fileList?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ response }: any) => response.data.url
      );
      const url = urls[0]
      const newValues = { ...values, image: url };
        
      await dispatch(createServiceMid(newValues));
      message.success(`Tạo banner thành công!`);
    } else if (modalMode === "edit") {
      const newImages = values.image.fileList
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values.image[0].fileList.map(({ response }: any) => response.data.url)
        : values.image;

        
      const newValues = { ...values,image: newImages };

      const { _id, ...service } = newValues;

      await dispatch(updateServiceMid({ _id, service }));
      message.success(`Sửa banner thành công!`);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = "dlu4tkcct";
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

  const [form] = Form.useForm();

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
          Create Banner
        </Button>
      </div>
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={data}
        rowSelection={{}}
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
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="id_Pitch"
            label="ID_Pitch"
            rules={[{ required: true, message: "ID_Pitch is required!" }]}
          >
            <Select style={{ width: '100%' }}>
            {pitch_id.map((item: any) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Images" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Dragger>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ServiceManagement;
