import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { deleteCommentMid, getAllCommentMid, setDataComment } from '~/Redux/Slices/commentSlide';
import { commentPagination, getAllComment } from '~/api/comment';

interface DataType {
  key: string;
  title: string;
  name_user: string;
  email: string;
  content: string;
}

type DataIndex = keyof DataType;




const CommentManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [totalItems, setTotalItems] = useState(Number);//phantrang
  const [currentPage, setCurrentPage] = useState(1);//phantrang

  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.comment.comments);
  console.log("dataAminComment:", comments);

  useEffect(() => {
    dispatch(getAllCommentMid());
  }, [dispatch]);
  const cancel = () => {
    message.error("Đã hủy!");
  };
  //delete
  const confirm = async (idComment: string) => {
    await dispatch(deleteCommentMid(idComment));
    message.success(`Xóa bình luận thành công!`);
  };
  // phân trang
  //xử lí phân trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllComment(); // Gửi yêu cầu GET đến URL_API
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
    const response = await commentPagination(pageNumber);
    const totalItems = response?.data?.data?.totalDocs;
    if (totalItems) {
      setTotalItems(totalItems);
    }
    dispatch(setDataComment(response?.data?.data?.data));
    // window.scrollTo({ top: 500, behavior: 'smooth' });
  }
  // kết thức xử lí phân trang

  //data
  const data: DataType[] = comments?.map((item: any) => (
    {
      key: item._id,
      title: item?.id_post?.title,
      name_user: item?.id_user?.name,
      email: item?.id_user?.email || "Email người dùng chưa có !",
      content: item?.content
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
      title: 'Tên Bài Viết',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Tên Người Dùng',
      dataIndex: 'name_user',
      key: 'name_user',
      width: '20%',
      ...getColumnSearchProps('name_user'),
    },
    {
      title: 'Email Người Dùng',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Nội Dung Bình Luận',
      dataIndex: 'content',
      key: 'content',
      ...getColumnSearchProps('content'),
      render: (text) => {
        return text.slice(0, 50).concat(" . . .");
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "Hành Động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            placement="topRight"
            title="Xóa bình luận?"
            description="Bạn có chắc chắn xóa bình luận này không?"
            onConfirm={() => confirm(record.key)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: "inline-flex" }} />
              Xoá
            </Button>
          </Popconfirm>

        </Space>
      ),
    },

  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => <p className='w-[1200px]'>{record.content}</p>,
        }}
        pagination={{
          current: currentPage,
          total: totalItems,
          pageSize: 7,
          onChange: handlePageChange,
        }}
      />
    </div>
  )
}

export default CommentManagement