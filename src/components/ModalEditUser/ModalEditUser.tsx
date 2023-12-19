import { Button, message, Form, Input, InputNumber, Modal, TabsProps, Tabs } from 'antd';
import { useEffect } from 'react';
import { useAppSelector } from '~/Redux/hook';
// import { useEffect, useState } from 'react';

interface IModalForm {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
const ModalEditUser = ({
    isModalOpen,
    setIsModalOpen,
  }: IModalForm) => {
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const user = useAppSelector((state) => state.user.currentUser);    
    // const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user?.values?.name,
        email: user?.values?.email,
      });
    }
  }, [user, form]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };
  
  const onFinish = async (values: any) => {
    const newValues = {...values}
    console.log('valueAbc:', newValues);
    message.success(`Sửa thành công!`);
    setIsModalOpen(false);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông Tin Của Bạn',
      children: (
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="flex flex-col gap-4 "
        >
          <div className="flex gap-4">
            <Form.Item
              name="name"
              className="w-full"
              label="Tên "
              rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}
            >
              <Input size="large" placeholder="Name" />
            </Form.Item>
            <Form.Item
            name="email"
            className="w-full"
            label="Email"
            rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}
          >
            <Input size="large" placeholder="email" />
          </Form.Item>
          </div>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="Mật khẩu" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Đổi Mật Khẩu',
      children: (
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="flex flex-col gap-4 "
        >
          <Form.Item name="numberPitch" label="Mật khẩu cũ" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber size="large" placeholder="Mật khẩu" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="numberPitch" label="Mật khẩu mới" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber size="large" placeholder="Mật khẩu mới" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="numberPitch" label="Nhập lại mật khẩu mới" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber size="large" placeholder="Mật khẩu" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
    open={isModalOpen}
    centered
    onCancel={handleCancel}
      width={600}
      footer={[
          <Button key="submit" type="primary" onClick={() => form.submit()} className="bg-[#1677ff]">
            Sửa Thông Tin
          </Button>,
      ]}
    >
      <Tabs className="text-center" defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default ModalEditUser;
