import React from 'react'
import {
    Button,
    Form,
    Input,
    InputNumber,
    Typography,
    Select,
    Upload,
    UploadProps,
    message,
  } from "antd";
  import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const ServiceAdd = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    
      /* eslint-disable no-template-curly-in-string */
      const validateMessages = {
        required: "${label} is required!",
      };
    
      const onFinish = () => {
        message.success(`Thêm bài viết thành công!`);
      };
    
      const props: UploadProps = {
        listType: "picture",
        name: "image",
        action: "https://coza-store-be.vercel.app/api/images/upload",
        onChange(info) {
          const { status } = info.file;
          if (status !== "uploading") {
            console.log(info.file, info.fileList);
          }
          if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
      return (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 800 }}
          validateMessages={validateMessages}
        >
          <Typography.Title level={2}>Thêm Dịch Vụ</Typography.Title>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input size="large" placeholder="Product Name" />
          </Form.Item>
    
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              size="large"
              placeholder="Product Price"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="pitchId"
            label="PitchId"
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              placeholder="---- pitch ----"
              //   options={selectOptions}
            />
          </Form.Item>
    
          <Form.Item name="image" label="Image" rules={[{ required: true }]}>
            <Dragger {...props}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Dragger>
          </Form.Item>
    
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button size="large" type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      );
}

export default ServiceAdd
