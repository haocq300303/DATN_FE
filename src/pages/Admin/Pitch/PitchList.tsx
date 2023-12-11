import {
  Popconfirm,
  Space,
  Table,
  Button,
  message,
  Input,
  InputRef
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import "./index.css";
import {
  fetchAllPitch,
  fetchDeletePitch,
  search,
} from "../../../Redux/Slices/pitchSlice";
import IPitch from "../../../interfaces/pitch";

import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [totalItems, setTotalItems] = useState(Number);//phantrang
  const [currentPage, setCurrentPage] = useState(1);//phantrang

  const dispatch = useAppDispatch();
  const pitchs = useAppSelector((state) => state.pitch.pitchs);

  console.log("pitchadmin:", pitchs);

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
      width: '40%',
      ...getColumnSearchProps('address'),

    },
    {
      title: "Hành Động",
      key: "action",
      width: '10%',
      render: (record) => (
        <Space size="middle">
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



  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        className=""
        bordered
        pagination={{
          current: currentPage,
          total: totalItems,
          pageSize: 7,
          onChange: handlePageChange,
        }}
      />



    </>
  );
};

export default PitchList;
