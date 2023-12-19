import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import Form from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '~/interfaces/user.type';
import { useAppSelector } from '../../../../Redux/hook';
import { signup } from '~/api/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { saveUserValues } from '~/Redux/Slices/userSlice';

type InfoScreenProps = {
  setCurrent: React.Dispatch<number>;
};

const InfoScreen = ({ setCurrent }: InfoScreenProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<IUser | null>(null);
  const currentUser = useAppSelector((state) => state.user.currentUser.values);

  const [form] = useForm();
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  // const currentUser = undefined;
  const handleNextStep = (values: any) => {
    if (currentUser) {
      setSearchParams({ mode: 'order' });
      setCurrent(1);
    }
    if (!currentUser) {
      setNewUser(values);
      setIsOpenModal(true);
    }
  };

  // create new account
  const handleCreateAccount = async (values: any) => {
    try {
      const _newUser = { ...newUser, ...values };
      // call api get token save redux store

      const { data } = await signup({
        name: _newUser.fullname,
        email: _newUser.email,
        password: _newUser.password,
        phone_number: _newUser.phone_number,
      } as any);

      if (!data) {
        toast.error('Đăng ký thất bại');
      }
      toast.success('Bạn đã tạo tk trên hệ thống thành công');
      localStorage.setItem('accessToken', data.data.token);
      const decode: any = jwtDecode(data.data.token);
      dispatch(
        saveUserValues({
          accessToken: data.data.token,
          values: decode,
          role_name: decode.role_name,
        })
      );

      // affter if token && current user
      setSearchParams({ mode: 'order' });
      setCurrent(1);
    } catch (error: any) {
      toast.error('Đăng ký thất bại -' + ' ' + error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (currentUser) setIsDisabled(true);
  }, [currentUser]);

  return (
    <div className="border border-solid px-5 py-2 rounded-md border-[#e7e7e7]">
      <div className="note">Vui lòng điền đúng thông tin để chúng tôi có thể xử lý cho bạn chính xác nhất</div>
      <h2 className="bg-[#EBF3FF] pl-2 py-1 my-4 text-xl font-semibold">Thông tin về bạn</h2>

      <div className="">
        <Form
          form={form}
          initialValues={{
            _id: currentUser?._id,
            phone_number: currentUser?.phone_number,
            fullname: currentUser?.name,
            email: currentUser?.email,
          }}
          key={JSON.stringify(currentUser)}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          name="nest-messages"
          onFinish={handleNextStep}
        >
          <Row gutter={60}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="phone_number"
                label="Số điện thoại"
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input disabled={isDisabled} size="large" placeholder="Số diện thoại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="fullname"
                label="Họ và tên"
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input disabled={isDisabled} size="large" placeholder="Họ và tên..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="phone_another" label="Số điện thoại khác (nếu có)">
                <Input size="large" placeholder="Số điện thoại.." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="email"
                label="Địa chỉ email"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input disabled={isDisabled} size="large" placeholder="Địa chỉ email.." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="address" label="Địa chỉ của bạn (nếu có)">
                <Input size="large" placeholder="Địa chỉ.." />
              </Form.Item>
            </Col>
            <Col span={24} className="flex flex-col items-end space-x-5">
              <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} className="ml-6 bg-[#34e43d] text-white">
                Tiếp theo: Sang bước tiếp theo nhé
              </Button>
              <p className="mt-3 text-xs italic ">Đừng lo — bạn chưa bị trừ tiền đâu!</p>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Tạo mật khẩu khi chưa đăng nhập */}
      <Modal open={isOpenModal} footer={false} onCancel={() => setIsOpenModal(false)}>
        <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} name="create-account" onFinish={handleCreateAccount}>
          <Row gutter={60}>
            <Col span={24}>
              <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 48 }} name="password" label="Nhập mật khẩu">
                <Input.Password size="large" placeholder="Mật khẩu.." />
              </Form.Item>
            </Col>

            <Col span={24} className="flex flex-col items-end space-x-5">
              <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} className="ml-6 bg-[#34e43d] text-white">
                Tạo mật khẩu mới
              </Button>
              <p className="mt-3 text-xs italic ">Chúng tôi cần mật khẩu để bảo mật thông tin cho bạn!</p>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InfoScreen;
