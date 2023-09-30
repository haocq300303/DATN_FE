/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../Redux/hook";
import {
  handleUpdateBanner,
} from "../../../../Redux/Reducer/bannerSlice";
import axios from "axios";

const { Dragger } = Upload;

const BannerUpdate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/banners/${id}`)
      .then(({ data: { data } }) => {
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);
  
  

  const props: UploadProps = {
    listType: "picture",
    name: "image",
    action: "https://coza-store-be.vercel.app/api/images/upload",
    onChange(info) {
      const { status , response} = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const [{ url }] = response.urls;

        setUploadedImage(url);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinish = async (values: any) => {
    if (uploadedImage) {
        values.url = uploadedImage;
        void dispatch(handleUpdateBanner(values));
        console.log(values);
        await message.success(`Sửa banner thành công!`);
        navigate("/admin/banner");
    } else {
         message.success(`Sửa banner khong thành công!`);
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
        name="_id"
        style={{display:"none"}}
      >
        <Input/>
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
};

export default BannerUpdate;
