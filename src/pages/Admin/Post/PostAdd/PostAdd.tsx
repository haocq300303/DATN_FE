import { Button, Form, Input, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../Redux/hook';
import { createPostMid } from '../../../../Redux/Slices/postSlice';
// import ReactQuill from 'react-quill';

const { Dragger } = Upload;

const PostAdd = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const images = values?.images?.fileList?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ response }: any) => response.data.url
    );

    const newValues = { ...values, images };

    await dispatch(createPostMid(newValues));
    message.success(`Tạo bài viết thành công!`);
    navigate('/admin/post');
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

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 800 }} validateMessages={validateMessages}>
      <Typography.Title level={2}>Tạo Bài viết</Typography.Title>
      <Form.Item name="title" label="Title" rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}>
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
        rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}
      >
        <Input.TextArea rows={4} placeholder="Description" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          Tạo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostAdd;
