import { Button, message, Form, Input, Upload, Select, InputNumber, Modal } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import axios from 'axios';

const { Dragger } = Upload;
import { fetchCreatPitch } from '../../../Redux/Slices/pitchSlice';
import { Option } from 'antd/es/mentions';

const ModalViewCreatePitch = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const user = useAppSelector((state) => state.user.currentUser);

  const dispatch = useAppDispatch();

  const host = 'http://localhost:8080/api/location/';

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${host}provinces`);
      setCities(response.data);
    };
    fetchData();
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const images = values?.images?.fileList?.map(({ response }: any) => response.data.url);
    const avatar = values?.avatar?.fileList[0]?.response?.data?.url;

    const newValues = {
      ...values,
      avatar,
      images,
      admin_pitch_id: user?.values?._id,
    };
    //console.log('valueAbc:', newValues);

    await dispatch(fetchCreatPitch(newValues));
    message.success(`Tạo Sân Bóng thành công!`);
    setIsModalOpen(false);
  };

  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = 'dwp7umncy';
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

  const handleCityChange = async (value: string) => {
    if (value !== '') {
      const response = await axios.get(`${host}districts?parent=${value}`);
      setDistricts(response.data);
    }
  };

  const handleDistrictChange = async (value: string) => {
    if (value !== '') {
      const response = await axios.get(`${host}wards?parent=${value}`);
      setWards(response.data);
    }
  };
  return (
    <Modal
      title="Tạo sân bóng"
      visible={isModalOpen}
      closable={false}
      width={1100}
      footer={[
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={() => form.submit()}
          className="bg-[#1677ff]"
        >
          Thêm Mới
        </Button>,
      ]}
    >
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout="vertical"
        className="flex gap-4"
      >
        <div className="w-1/2">
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}>
            <Input.TextArea rows={2} placeholder="address" />
          </Form.Item>
          <Form.Item name="name" label="Tên Sân" rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}>
            <Input size="large" placeholder="Name" />
          </Form.Item>

          <Form.Item name="numberPitch" label="Số Lượng Sân" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber size="large" placeholder="numberPitch" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="images" label="Images" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="description"
            label="Thông Tin Sân"
            rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}
          >
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </div>

        <div className="w-1/2">
          <Form.Item label="Tỉnh" rules={[{ required: true }]}>
            <Select onChange={handleCityChange} size="large" placeholder="---- Tỉnh ----">
              {cities.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="districts_id" label="Quận, Huyện" rules={[{ required: true }]}>
            <Select onChange={handleDistrictChange} size="large" placeholder="---- Quận Huyện ----">
              {districts.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="location_id" label="Xã" rules={[{ required: true }]}>
            <Select size="large" placeholder="---- Xã ----">
              {wards.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="avatar" label="Avatar" rules={[{ required: true }]}>
            <Dragger listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Thêm Ảnh Tổng Quan</Button>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalViewCreatePitch;
