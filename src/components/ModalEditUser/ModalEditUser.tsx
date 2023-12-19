import { Button, message, Form, Input, Modal, TabsProps, Tabs } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/Redux/hook';
import { changePassword, updateUser } from '~/api/auth';
import { routes } from '~/routes';
// import { useEffect, useState } from 'react';

interface IModalForm {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
const ModalEditUser = ({ isModalOpen, setIsModalOpen }: IModalForm) => {
  const navigate = useNavigate();
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
        phone_number: user?.values?.phone_number,
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
    Modal.warning({
      title: 'Lưu ý',
      content: 'Khi thay đổi thông tin người dùng, để tránh trường hợp dữ liệu sai bạn phải đăng nhập lại!',
      async onOk() {
        const { name, email, phone_number } = values;
        const response = await updateUser(user.values?._id || '', {
          name: name,
          email: email,
          phone_number: phone_number,
        });
        if (response.data.statusCode === 200) {
          message.success(`Sửa thông tin thành công!`);
          setIsModalOpen(false);
          navigate(routes.login);
        } else {
          message.error(response?.data.message);
        }
      },
    });
  };

  const onChangePassword = async (values: any) => {
    const { password, new_password } = values;
    const response = await changePassword({
      user_id: user.values?._id,
      password: password,
      new_password: new_password,
    });
    if (response.data.statusCode === 200) {
      message.success(`Đổi mật khẩu thành công!`);
      setIsModalOpen(false);
    } else {
      message.error(response?.data.message);
    }
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
          <Form.Item name="phone_number" label="Số điện thoại" rules={[{ required: true }]}>
            <Input size="large" placeholder="Số điện thoại" style={{ width: '100%' }} />
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
          onFinish={onChangePassword}
          validateMessages={validateMessages}
          layout="vertical"
          className="flex flex-col gap-4 "
        >
          <Form.Item name="password" label="Mật khẩu cũ" rules={[{ required: true }]}>
            <Input size="large" placeholder="Mật khẩu" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="new_password" label="Mật khẩu mới" rules={[{ required: true }]}>
            <Input size="large" placeholder="Mật khẩu mới" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="confirm_password" label="Nhập lại mật khẩu mới" rules={[{ required: true }]}>
            <Input size="large" placeholder="Mật khẩu" style={{ width: '100%' }} />
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
