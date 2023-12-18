import { Popconfirm, Space, Table, Button, message, Form, Input, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalForm from '../../../components/ModalForm/ModalForm';
import IChildrentPitch from '~/interfaces/childrentPitch';
import {
  getAllChildrentPicthByParent,
  getCreatChildrentPitch,
  getDeleteChildrentPitch,
  getUpdateChildrentPitch,
} from '~/api/childrentPitch';
import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';

const ChildrentPitch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [childrenPitchs, setShildrenPitchs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pitchLocal = JSON.parse(localStorage.getItem('pitch') || '');
  const id = pitchLocal._id;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getAllChildrentPicthByParent(id, '');      
      setShildrenPitchs(data.data);
      setIsLoading(false);
    })();
  }, []);
  const confirm = async (id: string) => {
    await getDeleteChildrentPitch(id);
    const newData = childrenPitchs?.filter((chilPitch: any) => chilPitch._id !== id);
    setShildrenPitchs(newData);
    message.success(`Xóa sân thành công!`);
  };
  const cancel = () => {
    message.error('Đã hủy!');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = 'dhwpz6l7t';
      const PRESET_NAME = 'datn-img';
      const FOLDER_NAME = 'datn-img';
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append('upload_preset', PRESET_NAME);
      formData.append('folder', FOLDER_NAME);
      formData.append('file', file);

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
      message.error('An error occurred while uploading the image.');
      onError(error);
    }
  };

  const columns: ColumnsType<IChildrentPitch> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
    },
    {
      title: 'Tên Sân',
      dataIndex: 'code_chirldren_pitch',
      key: 'code_chirldren_pitch',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <p className="flex justify-center">
          <img width={80} src={image} />
        </p>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const childrent: any = childrenPitchs?.find((chill: IChildrentPitch) => chill._id === record._id);

              form.setFieldsValue({
                _id: childrent?._id,
                code_chirldren_pitch: childrent?.code_chirldren_pitch,
                idParentPitch: childrent?.idParentPitch,
                image: childrent?.image,
              });
              showModal('edit');
            }}
            ghost
          >
            <EditOutlined style={{ display: 'inline-flex' }} />
            Edit
          </Button>

          <Popconfirm
            placement="topRight"
            title="Xóa sân?"
            description="Bạn có chắc chắn xóa sân này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: 'inline-flex' }} />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = Array.isArray(childrenPitchs)
    ? childrenPitchs.map((item: IChildrentPitch, index: number) => ({
        ...item,
        key: index,
        index: index + 1,
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
    required: '${label} is required!',
  };
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    if (modalMode === 'add') {
      const { data } = await getCreatChildrentPitch({
        ...values,
        idParentPitch: id,
        image: values?.image?.file?.response?.data?.url,
      });
      const newData = [...childrenPitchs, data.data];
      setShildrenPitchs(newData);
      message.success(`Tạo sân thành công!`);
    } else if (modalMode === 'edit') {
      const newImage = values?.image?.file ? values?.image?.file?.response?.data?.url : values?.image;
      const newValues = {
        ...values,
        idParentPitch: id,
        image: newImage,
      };
      const { _id, ...childrentpitch } = newValues;
      const { data } = await getUpdateChildrentPitch(_id, childrentpitch);
      const newData = childrenPitchs?.map((childrentPitch: any) => (childrentPitch._id === _id ? data.data : childrentPitch));
      setShildrenPitchs(newData);
      message.success(`Sửa sân thành công!`);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size={'large'}
          className="bg-[#2988bc]"
          onClick={() => {
            form.resetFields();
            showModal('add');
          }}
        >
          Tạo sân con
        </Button>
      </div>
      <Table pagination={{ pageSize: 8 }} loading={isLoading} columns={columns} dataSource={data} />
      <ModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} modalMode={modalMode}>
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
          {modalMode === 'edit' && (
            <Form.Item name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="code_chirldren_pitch" label="Sân số" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber size="large" placeholder="Tên sân" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" rules={[{ required: true }]}>
            <Dragger listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Dragger>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ChildrentPitch;
