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
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import axios from "axios";
import IBanner from "../../../../interfaces/Banner";
import { createBannerMid, deleteBannerMid, getAllBannerMid, updateBannerMid } from "../../../../Redux/Slices/bannerSlice";

const { Dragger } = Upload;

const BannerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");


  const dispatch = useAppDispatch();
  const banners = useAppSelector((state) => state.banner.banners);
  
console.log(banners);

  useEffect(() => {
    dispatch(getAllBannerMid());
  }, [dispatch]);

  const confirm = (id: string) => {
    void dispatch(deleteBannerMid(id));
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };


  const columns: ColumnsType<IBanner> = [
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      render: (image: string) => <img width={200} src={image} alt="Banner" />,
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Description',
      key: 'content',
      dataIndex: 'content',
      render: (text: string) => {
        return text.slice(0, 50).concat(' . . .');
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
         <Button
            type="primary"
            onClick={() => {
              const banner = banners?.find(
                (banner: IBanner) => banner._id === record._id
              );

              form.setFieldsValue({
                _id: banner?._id,
                url: banner?.url,
                content: banner?.content,
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
            onConfirm={()=>confirm(record._id)}
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

  const data = banners.map((item: IBanner, index: number) => ({
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

  const onFinish = async (values: any) => {
    if (modalMode === "add") {
      const urls = values?.url?.fileList?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ response }: any) => response.data.url
        );
        
        const url = urls[0];
        console.log(url);
        const newValues = { ...values, url };

      await dispatch(createBannerMid(newValues));
      message.success(`Tạo banner thành công!`);
    } else if (modalMode === "edit") {
      const newImages = values.url.fileList
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values.url.fileList.map(({ response }: any) => response.data.url)
        : values.url;

      const newValues = { ...values, url: newImages };
      
      const { _id, ...banner } = newValues;
      
      await dispatch(updateBannerMid({ _id, banner }));
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
            <p style={{ margin: 0 }}>{record.content}</p>
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

          <Form.Item name="url" label="Images" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="content"
            label="Description"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default BannerManagement;
