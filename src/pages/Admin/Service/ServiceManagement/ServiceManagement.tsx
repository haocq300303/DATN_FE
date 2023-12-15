/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popconfirm, Space, Table, Button, message, Form, Input, Upload, InputRef, InputNumber } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import ModalForm from '../../../../components/ModalForm/ModalForm';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import axios from 'axios';
import { createServiceMid, deleteServiceMid, fetchServicePitch, updateServiceMid } from '../../../../Redux/Slices/serviceSlice';
import { IService } from '../../../../interfaces/service';
import './ServiceManagement.css';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
const { Dragger } = Upload;
type DataIndex = keyof IService;
const ServiceManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.user.currentUser);
  const servicePitch = useAppSelector((state) => state.service.services);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const pitchLocal = JSON.parse(localStorage.getItem('pitch')!);
  const id = pitchLocal._id;
  const idUser = user.values?._id;

  useEffect(() => {
    dispatch(fetchServicePitch(idUser));
  }, [dispatch, idUser]);
  const confirm = (id: string) => {
    void dispatch(deleteServiceMid(id));
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };
  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IService> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className=" bg-blue-500"
          >
            Tìm
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Xoá
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Thoát
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IService> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price'),
      sorter: (a, b) => a.price - b.price,
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img width={140} className="object-cover h-[100px]" src={image} alt="Img" />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const service = services?.find((service: IService) => service._id === record._id);

              form.setFieldsValue({
                _id: service?._id,
                admin_pitch_id: user.values._id,
                pitch_id: pitchLocal._id,
                name: service?.name,
                price: service?.price,
                image: service?.image,
              });

              showModal('edit');
            }}
            ghost
          >
            <EditOutlined style={{ display: 'inline-flex' }} />
          </Button>
          <Popconfirm
            placement="topRight"
            title="Xóa dịch vụ?"
            description="Bạn có chắc chắn xóa dịch vụ này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const services = servicePitch.map((item, index) => {
    return {
      ...item,
      key: item._id,
      index: index + 1,
    };
  });
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
  const onFinish = async (values: any) => {
    if (modalMode === 'add') {
      const urls = values?.image?.fileList?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ response }: any) => response.data.url
      );
      const url = urls[0];
      const newValues = { ...values, admin_pitch_id: user.values._id, image: url, pitch_id: pitchLocal._id };
      await dispatch(createServiceMid(newValues));
      message.success(`Tạo dịch vụ thành công!`);
    } else if (modalMode === 'edit') {
      const newImages = values.image.fileList;
      const image = newImages ? newImages[0].response.data.url : values.image;
      const newValues = { ...values, image };
      const { _id, ...service } = newValues;
      await dispatch(updateServiceMid({ _id, service }));
      message.success(`Sửa dịch vụ thành công!`);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = 'dlu4tkcct';
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
    <>
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size={'large'}
          className="bg-[#1677ff]"
          onClick={() => {
            form.resetFields();
            showModal('add');
          }}
        ></Button>
      </div>
      <Table pagination={{ pageSize: 8 }} dataSource={services} columns={columns} scroll={{ y: 100 }} />
      <ModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} modalMode={modalMode}>
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
          {modalMode === 'edit' && (
            <>
              <Form.Item name="_id" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
              <Form.Item name="admin_pitch_id" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
              <Form.Item name="pitch_id" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item name="name" label="Tên Dịch Vụ" rules={[{ required: true }, { whitespace: true, message: '${label} là bắt buộc!' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá "
            className="w-full"
            rules={[
              {
                required: true,
                type: 'number',
                min: 1,
              },
            ]}
          >
            <InputNumber className="w-full" size="large" placeholder="Giá Ca" />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Dragger>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};
export default ServiceManagement;
