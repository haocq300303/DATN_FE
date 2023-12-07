import {
  Popconfirm,
  Space,
  Table,
  Button,
  message,
  Form,
  Input,
  Upload,
  Select,
  InputNumber,
  Checkbox, Col, Row, Empty, InputRef
} from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { ColumnsType, ColumnType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import axios from "axios";

const { Dragger } = Upload;
import "./index.css";
import {
  fetchAllPitch,
  fetchCreatPitch,
  fetchDeletePitch,
  fetchUpdatePitch,
  search,
} from "../../../Redux/Slices/pitchSlice";
import IPitch from "../../../interfaces/pitch";
import { Option } from "antd/es/mentions";
// import { Link } from "react-router-dom";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
import { IService } from "~/interfaces/service";
import Highlighter from 'react-highlight-words';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import IFeedback from "~/interfaces/feedback";
import { PitchPagination, getAllPitch } from "~/api/pitch";


interface DataType {
  key: string;
  _id: string;
  address: string;
  name: string;
  admin_pitch_id: any;
  numberPitch: number;
  images: string[];
  services: string[];
  description: string[];
  location_id?: string;
  feedback_id: IFeedback[];
  districts_id?: string;
  deposit_price: number;
  averageStars?: number;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

type DataIndex = keyof DataType;
const PitchList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [totalItems, setTotalItems] = useState(Number);//phantrang
  const [currentPage, setCurrentPage] = useState(1);//phantrang

  const dispatch = useAppDispatch();

  const pitchs = useAppSelector((state) => state.pitch.pitchs);
  const services = useAppSelector((state) => state.service.services);
  const host = "http://localhost:8080/api/location/";

  console.log("pitchadmin:", pitchs);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${host}provinces`);
      setCities(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchAllPitch(""));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);
  // console.log("service", services);

  //xử lí phân trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPitch(); // Gửi yêu cầu GET đến URL_API
        const allItemsPitch = response?.data?.data?.totalDocs;
        setTotalItems(allItemsPitch)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const response = await PitchPagination(pageNumber);
    const totalItems = response?.data?.data?.totalDocs;
    if (totalItems) {
      setTotalItems(totalItems);
    }
    dispatch(search(response?.data?.data?.data));
    // window.scrollTo({ top: 500, behavior: 'smooth' });
  }
  // kết thức xử lí phân trang

  const confirm = async (idPost: string) => {
    await dispatch(fetchDeletePitch(idPost));
    message.success(`Xóa sân thành công !!!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };
  //
  const data: DataType[] = pitchs.map((item: IPitch) => (
    {
      key: item._id,
      name: item.name,
      address: item.address,
      numberPitch: item.numberPitch,
    }
  ))

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
            Tìm Kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
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
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên Sân',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Số Sân',
      dataIndex: 'numberPitch',
      key: 'numberPitch',
      width: '10%',
      ...getColumnSearchProps('numberPitch'),
      sorter: (a, b) => a.numberPitch - b.numberPitch,
    },
    {
      title: 'Vị Trí',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),

    },
    {
      title: "Hành Động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const pitch: IPitch = pitchs?.find(
                (pitch: IPitch) => pitch._id === record.key

              );

              form.setFieldsValue({
                _id: pitch?._id,
                address: pitch?.address,
                name: pitch?.name,
                admin_pitch_id: pitch?.admin_pitch_id,
                images: pitch?.images,
                numberPitch: pitch?.numberPitch,
                description: pitch?.description,
                districts_id: pitch?.districts_id,
                location_id: pitch?.location_id,
                deposit_price: pitch?.deposit_price,
                services: pitch?.services,
                avatar: pitch?.avatar,
              });
              showModal("edit");
            }}
            ghost
          >
            <EditOutlined style={{ display: "inline-flex" }} />
          </Button>

          <Popconfirm
            placement="topRight"
            title="Xóa bài viết?"
            description="Bạn có chắc chắn xóa bài viết này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: "inline-flex" }} />
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];



  const showModal = (mode: string) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const [form] = Form.useForm();

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    if (modalMode === "add") {
      const images = values?.images?.fileList?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ response }: any) => response.data.url
      );
      const avatar = values?.avatar?.fileList[0]?.response?.data?.url;

      const newValues = { ...values, avatar, images };
      // console.log("valueAbc:", newValues);

      await dispatch(fetchCreatPitch(newValues));
      message.success(`Tạo Sân Bóng thành công!`);
    } else if (modalMode === "edit") {
      const images = values.images.fileList
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        values.images.fileList.map(({ response }: any) => response.data.url)
        : values.images;
      const avatar = values.avatar.fileList
        ? values?.avatar?.fileList[0]?.response?.data?.url
        : values.avatar;

      const newValues = { ...values, images, avatar };
      const { _id, ...pitch } = newValues;

      await dispatch(fetchUpdatePitch({ _id, pitch }));
      message.success(`Sửa Sân Bóng thành công!`);
    }
    setIsModalOpen(false);
  };

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

  const handleCityChange = async (value: string) => {
    if (value !== "") {
      const response = await axios.get(`${host}districts?parent=${value}`);
      setDistricts(response.data);
    }
  };

  const handleDistrictChange = async (value: string) => {
    if (value !== "") {
      const response = await axios.get(`${host}wards?parent=${value}`);
      setWards(response.data);
    }
  };
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size={"large"}
          className="bg-[#1677ff]"
          onClick={() => {
            form.resetFields();
            showModal("add");
          }}
        >
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        className=""
        scroll={{ y: 100 }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
      />
      
      <ModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        modalMode={modalMode}
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="flex gap-4"
        >
          {modalMode === "edit" && (
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
          )}
          <div className="w-1/2">
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
            name="name"
            label="Tên Sân"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input size="large" placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="admin_pitch_id"
            label="ID Chủ Sân"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input size="large" placeholder="admin_pitch_id" />
          </Form.Item>
          <Form.Item
            name="numberPitch"
            label="Số Lượng Sân"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              size="large"
              placeholder="numberPitch"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="images" label="Images" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="description"
            label="Thông Tin Sân"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
          </div>

          <div className="w-1/2">
          <Form.Item label="Tỉnh" rules={[{ required: true }]}>
            <Select
              onChange={handleCityChange}
              size="large"
              placeholder="---- Tỉnh ----"
            >
              {cities.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="districts_id" label="Quận, Huyện" rules={[{ required: true }]}>
            <Select
              onChange={handleDistrictChange}
              size="large"
              placeholder="---- Quận Huyện ----"
            >
              {districts.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="location_id" label="Xã" rules={[{ required: true }]}>
            <Select size="large" placeholder="---- Xã ----">
              {wards.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="deposit_price"
            label="Giá Thấp Nhất"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              size="large"
              placeholder="Giá Thấp Nhất"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="services"
            label="Services"
            rules={[{ required: true, }]}
          >
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Row>
                {services && services.length > 0 ? (
                  services.map((item: IService) => (
                    <Col span={8}>
                      <Checkbox value={item._id}>{item.name}</Checkbox>
                    </Col>
                  ))
                ) : (
                  <div> <Empty /></div>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="avatar" label="Avatar" rules={[{ required: true }]}>
            <Dragger listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Thêm Ảnh Tổng Quan</Button>
            </Dragger>
          </Form.Item>
          </div>
        </Form>
      </ModalForm>
    </>
  );
};

export default PitchList;
