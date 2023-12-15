import { Popconfirm, Space, Table, Button, message, Form, Input, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalForm from '../../../components/ModalForm/ModalForm';
import { createShiftDefault, deleteShiftDefault, getShiftDefaultByPitch, updateShiftDefault } from '~/api/shift';
import IShift from '~/interfaces/shift';

const ShiftManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [shifts, setShifts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pitch = JSON.parse(localStorage.getItem('pitch') || '{}');
  const pitchId = pitch?._id;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getShiftDefaultByPitch(pitchId);
      setShifts(data.data);
      setIsLoading(false);
    })();
  }, [pitchId]);

  const confirm = async (id: string) => {
    await deleteShiftDefault(id);

    const newData = shifts?.filter((shift: any) => shift._id !== id);
    setShifts(newData);
    message.success(`Xóa ca thành công!`);
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };

  const columns: ColumnsType<IShift> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
    },
    {
      title: 'Tên Ca',
      dataIndex: 'number_shift',
      key: 'number_shift',
      width: 180,
      render: (text) => <span>Ca {text}</span>,
    },
    {
      title: 'Giờ Bắt Đầu',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text) => <span>{text} Giờ</span>,
    },
    {
      title: 'Giờ Kết Thúc',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text) => <span>{text} Giờ</span>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 240,
      render: (price) => (
        <span>
          {price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },

    {
      title: 'Hành động',
      key: 'action',
      width: 240,
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const shift: any = shifts?.find((shift: IShift) => shift._id === record._id);

              form.setFieldsValue({
                _id: shift?._id,
                number_shift: shift?.number_shift,
                price: shift?.price,
                start_time: shift?.start_time,
                end_time: shift?.end_time,
              });
              showModal('edit');
            }}
            ghost
          >
            <EditOutlined style={{ display: 'inline-flex' }} />
            Sửa
          </Button>

          <Popconfirm
            placement="topRight"
            title="Xóa Ca?"
            description="Bạn có chắc chắn xóa ca này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger>
              <DeleteOutlined style={{ display: 'inline-flex' }} />
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const shiftsShow = Array.isArray(shifts)
    ? shifts.map((item: IShift, index: number) => ({
        ...item,
        key: index,
        index: index + 1,
      }))
    : [];
  const showModal = (mode: string) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: '${label} is required!',
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (modalMode === 'add') {
      const { data } = await createShiftDefault({
        ...values,
        id_pitch: '653ca30f5d70cbab41a2e5d0',
        default: true,
      });

      const newData = [...shifts, data.data];

      setShifts(newData);
      message.success(`Tạo ca thành công!`);
    } else if (modalMode === 'edit') {
      const { _id, ...shift } = values;
      const { data } = await updateShiftDefault(_id, shift);
      const newData = shifts?.map((shift: any) => (shift._id === _id ? data.data : shift));
      setShifts(newData);
      message.success(`Sửa ca thành công!`);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size={'large'}
          className="bg-[#2988bc]"
          onClick={() => {
            form.resetFields();
            showModal('add');
          }}
        >
          Tạo Ca
        </Button>
      </div>
      <Table pagination={false} columns={columns} loading={isLoading} dataSource={shiftsShow} className="min-h-[500px]" />
      <ModalForm
        title={modalMode === 'add' ? 'Tạo Ca' : 'Sửa Ca'}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        modalMode={modalMode}
      >
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
          {modalMode === 'edit' && (
            <Form.Item name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
          )}

          <div className="flex gap-8">
            <Form.Item name="number_shift" label="Tên Ca" className="!w-[50%]" rules={[{ required: true, type: 'number', min: 1 }]}>
              <InputNumber className="!w-full" size="large" placeholder={'Tên Ca'} />
            </Form.Item>
            <Form.Item name="price" label="Giá Ca" className="!w-[50%]" rules={[{ required: true, type: 'number', min: 0 }]}>
              <InputNumber className="!w-full" size="large" placeholder="Giá Ca" />
            </Form.Item>
          </div>

          <Form.Item name="start_time" label="Thời Gian Bắt Đầu" rules={[{ required: true }]}>
            <Input type="time" />
          </Form.Item>

          <Form.Item name="end_time" label="Thời Gian Kết Thúc" rules={[{ required: true }]}>
            <Input type="time" />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ShiftManagement;
