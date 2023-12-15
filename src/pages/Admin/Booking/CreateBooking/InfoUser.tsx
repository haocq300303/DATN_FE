import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Search from 'antd/es/input/Search';
import { Dispatch, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUser, signup } from '~/api/auth';
import { Show } from '~/components/Show';
import { DataBookingType, UserBookingType } from '.';

const InfoUser = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
  const [form] = useForm();
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmitInfo = async (values: any) => {
    try {
      const _newUser = { ...values };
      // call api get token save redux store

      const { data } = await signup({
        name: _newUser.name,
        email: _newUser.email,
        password: _newUser.password,
        phone_number: _newUser.phone_number,
      } as any);
      toast.success('Tạo tài khoản thành công');
      if (!data) {
        toast.error('Đăng ký thất bại');
        return;
      }
      const _dataBooking = [...dataBooking];

      _dataBooking[0] = { ...data.data, fullName: data.data.name } as any;
      setDataBooking(_dataBooking as DataBookingType);
    } catch (error: any) {
      toast.error('Đăng ký thất bại -' + ' ' + error?.response?.data?.message);
    }
  };
  const handlePickUser = (user: UserBookingType) => {
    const _dataBooking = [...dataBooking];
    _dataBooking[0] = user;
    setDataBooking(_dataBooking as DataBookingType);
  };
  return (
    <div>
      <div className="flex justify-between space-x-4">
        {!isCreateAccount ? (
          <Search placeholder="Tìm kiếm account bằng sdt.." allowClear style={{ width: 350 }} />
        ) : (
          <Button className="flex items-center bg-orange-400 text-white" onClick={() => setIsCreateAccount(false)}>
            <CloseOutlined className="" />
            Close
          </Button>
        )}

        <Button className="flex items-center bg-green-600 text-white" onClick={() => setIsCreateAccount(true)}>
          <PlusOutlined className="" />
          Tạo mới account
        </Button>
      </div>

      <hr className="my-3" />

      <Show when={!isCreateAccount}>
        <div className="space-y-2">
          {users?.map((user: any, index) => (
            <div key={user._id} onClick={() => handlePickUser(user)}>
              <InfoUserItem {...user} index={index} />
            </div>
          ))}
        </div>
      </Show>

      {/* Create account */}
      <Show when={isCreateAccount}>
        <Form form={form} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onFinish={handleSubmitInfo} name="nest-messages">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="phone_number"
                label="Số điện thoại"
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input size="large" placeholder="Số diện thoại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
                label="Họ và tên"
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input size="large" placeholder="Họ và tên..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true }, { whitespace: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="password"
                label="Mật khẩu"
              >
                <Input.Password size="large" placeholder="Số điện thoại.." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="email"
                label="Địa chỉ email (nếu có)"
                rules={[{ type: 'email' }]}
              >
                <Input size="large" placeholder="Địa chỉ email.." />
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
              <p className="mt-3 text-xs italic ">Nhanh nào — bạn sắp có tiền uống bia rồi!</p>
            </Col>
          </Row>
        </Form>
      </Show>
    </div>
  );
};

export default InfoUser;

const InfoUserItem = ({ name, phone_number, index }: UserBookingType) => {
  return (
    <div className="flex border border-gray-500  rounded-md cursor-pointer hover:bg-red-100 px-4 py-2">
      <div className="w-20">
        <img src={`https://picsum.photos/id/${index}/300/300`} className="rounded-sm aspect-square" />
      </div>

      <div className="flex-1 ml-4">
        <h3 className="text-base">{name}</h3>
        <p className="my-1 text-sm">{phone_number}</p>
      </div>
    </div>
  );
};
