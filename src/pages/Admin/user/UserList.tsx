import { Popconfirm, Space, Table, Button, message, Input, InputRef, Modal, Select } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './index.css';
import { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { getAllUser, removeUser, updateUser } from '~/api/auth';

const INFOR_ROLE = [
  {
    value: '64b3884d222e457d74917006',
    label: 'Admin',
  },
  {
    value: '64b398ced24d6a414a3db7a5',
    label: 'Chủ sân',
  },
  {
    value: '655b87021ac3962a68ccf1b5',
    label: 'User',
  },
];

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [totalItems, setTotalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueRole, setValueRole] = useState('');
  const [idUpdate, setIdUpdate] = useState('');
  const [defaultRole, setDefaultRole] = useState('');

  const fetchData = async () => {
    try {
      const response = await getAllUser(); // Gửi yêu cầu GET đến URL_API
      const users = response?.data?.data;
      setTotalItems(users);
      setCurrentPage(response?.data?.currentPage);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatRole = (dataArray: any = [], inputValue: any) => {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].value === inputValue) {
        return dataArray[i].label;
      } else if (dataArray[i].label === inputValue) {
        return dataArray[i].value;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirm = async (id: string) => {
    try {
      const res = await removeUser(id);
      if (res.status === 200) {
        message.success(`Xóa sân thành công !!!`);
        fetchData();
      } else {
        message.error('Xóa không thành công!');
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };
  //
  const data: any = totalItems.map((item: any) => ({
    key: item._id,
    name: item.name,
    email: item?.email || 'N/A',
    phone_number: item.phone_number || 'N/A',
    role_id: formatRole(INFOR_ROLE, item.role_id),
  }));

  const handleSearch = (selectedKeys: string[], confirm: (param?: any) => void, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
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

  const columns: any = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: '20%',
      ...getColumnSearchProps('phone_number'),
    },
    {
      title: 'Quyền',
      dataIndex: 'role_id',
      key: 'role_id',
      width: '10%',
      ...getColumnSearchProps('role_id'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      width: '10%',
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => {
              setIdUpdate(record.key);
              setIsModalOpen(true);
              setDefaultRole(record.role_id);
            }}
          >
            Sửa quyền
          </Button>
          <Popconfirm
            placement="topRight"
            title="Xóa bài viết?"
            description="Bạn có chắc chắn xóa bài viết này không?"
            onConfirm={() => confirm(record.key)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: 'inline-flex' }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOk = async () => {
    try {
      const response = await updateUser(idUpdate, { role_id: valueRole });
      if (response.status === 200) {
        message.success('Cập nhật thành công!');
        fetchData();
      } else {
        message.error(response.data?.message);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error.message);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        className=""
        bordered
        pagination={{
          current: currentPage,
          // total: totalItems,
          pageSize: 7,
          onChange: handlePageChange,
        }}
      />
      <Modal title="Cập nhật quyền" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Select
          showSearch
          defaultValue={{
            value: formatRole(INFOR_ROLE, defaultRole),
            label: formatRole(INFOR_ROLE, formatRole(INFOR_ROLE, defaultRole)),
          }}
          style={{ width: 200 }}
          optionFilterProp="children"
          filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
          filterSort={(optionA: any, optionB: any) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(value: any) => setValueRole(value)}
          options={INFOR_ROLE}
        />
      </Modal>
    </>
  );
};

export default UserList;
