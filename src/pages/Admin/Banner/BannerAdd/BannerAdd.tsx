import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    // InputNumber,
    Typography,
    // Select,
    Upload,
    UploadProps,
    message,
  } from "antd";
  import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../Redux/hook';
import IBanner from '../../../../interfaces/Banner';
import {  handleCreateBanner } from '../../../../Redux/Reducer/bannerSlice';
  
  const { Dragger } = Upload;


const BannerAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };


  const props: UploadProps = {
    listType: "picture",
    name: "image",
    action: "https://coza-store-be.vercel.app/api/images/upload",
    onChange(info) {
      const { status, response } = info.file;
      
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const [{url}] = response.urls; 

        setUploadedImage(url);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


  const onFinish = async (value: IBanner) => {
    if (uploadedImage) {
      value.url = uploadedImage;
       dispatch(handleCreateBanner(value));  
     await message.success(`Thêm bài viết thành công!`);
     navigate("/admin/banner");
    } else {
      message.error('Thêm banner thất bại!');
    }
  };
  

  return (
    <Form
    form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      validateMessages={validateMessages}
    >
      <Typography.Title level={2}>Thêm Banner</Typography.Title>

      <Form.Item name="url" label="Image" rules={[{ required: true }]}>
        <Dragger {...props}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Dragger>
      </Form.Item>

      <Form.Item
        name="content"
        label="Content"
        rules={[
          { required: true },
          { whitespace: true, message: "${label} is required!" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Content" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BannerAdd
