
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Steps, Checkbox, message, Empty, Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { getAllServiceMid } from '~/Redux/Slices/serviceSlice';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { IService } from '~/interfaces/service';
import axios from 'axios';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalMode, setModalMode] = useState("");
  const [form] = Form.useForm();
  const services = useAppSelector((state) => state.service.services);

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [checkboxValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setCheckedValues(checkedValues); 
  };
  // img
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = "dwp7umncy";
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

  
  // end
  const showModal = () => {
    setIsModalOpen(true);
  };

 
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);
  // console.log("service", services);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
// đổ ra dữ liệu
  const onFinishStep = (values: any) => {
    const updatedFormData = { ...formData, ...values, services: checkboxValues }; 
    setFormData(updatedFormData);
    if (current === steps.length - 1) {
      console.log('All form data:', updatedFormData); 
      setIsModalOpen(false); 
      message.success('Thành Công !')
    } else {
      next();
    }
  }
  const steps = [
    {
      title: 'First',
      content: (
        <Form
          form={form}
          name="nest-messages"
          layout="vertical"
          onFinish={() => message.success('Processing complete!')}
        >
          <Form.Item
            name="numberPitch"
            label="Số Lượng Sân"
            rules={[{ required: true, type: 'number', min: 0 }]}
          >
            <InputNumber size="large" placeholder="Number of Pitches" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Second',
      content: (
        <Form
          form={form}
          name="nest-messages"
          layout="vertical"
          onFinish={() => message.success('Processing complete!')}
        >
          <Form.Item
            name="name"
            label="Tên Sân"
            rules={[{ required: true, whitespace: true, message: 'Name is required!' }]}
          >
            <Input size="large" placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input.TextArea rows={2} placeholder="address" />
          </Form.Item>
          <Form.Item
            name="deposit_price"
            label="Deposit_price"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              size="large"
              placeholder="deposit_price"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="images" label="Images" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Dragger>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Last',
      content: (
        <Form
          form={form}
          name="nest-messages"
          layout="vertical"
          onFinish={() => message.success('Processing complete!')}
        >
          <Form.Item
            name="services"
            label="Services"
            rules={[{ required: true }]}
          >
             <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                {services && services.length > 0 ? (
                  services.map((item: IService) => (
                   
                      <Checkbox value={item._id}>{item.name}</Checkbox>
                    
                  ))
                ) : (
                  <div> <Empty /></div>
                )}

            </Checkbox.Group>
          </Form.Item>
        </Form>
      ),
    },
  ];



  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
    <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        size="large"
        className="bg-[#1677ff]"
        onClick={() => {
          form.resetFields();
          showModal();
        }}
      >
        Cài đặt sân
      </Button>
      <Modal
        title="Multi-step Form"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Steps current={current} items={items} />
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <div style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '8px' }}>
            {steps[current].content}
          </div>
          <div style={{ marginTop: '24px' }}>
          {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev} className="bg-[#1677ff]">
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" className="bg-[#1677ff]" onClick={() => form.validateFields().then((values) => onFinishStep(values))}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" className="bg-[#1677ff]" onClick={() => form.validateFields().then((values) => onFinishStep(values))}>
                Done
              </Button>
            )}
            
          </div>
        </div>
      </Modal>
      
    </>

  );
};

export default DashboardPage;
