import {
  Popconfirm,
  Space,
  Table,
  Button,
  message,
  Form,
  Input,
  Upload,
  InputRef,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  createPostMid,
  updatePostMid,
  deletePostMid,
  getAllPostMid,
  setData,
} from "../../../../Redux/Slices/postSlice";
import IPost from "../../../../interfaces/post";
import ModalForm from "../../../../components/ModalForm/ModalForm";
import axios from "axios";
import type { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
const { Dragger } = Upload;
import "./PostManagement.css";
import Highlighter from "react-highlight-words";
import { PostPagination, getAllPost } from "~/api/post";

type DataIndex = keyof IPost;
const PostManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [totalItems, setTotalItems] = useState(Number);//phantrang
  const [currentPage, setCurrentPage] = useState(1);//phantrang

  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);

  const confirm = async (idPost: string) => {
    await dispatch(deletePostMid(idPost));
    message.success(`Xóa bài viết thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  //phân trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPost(); // Gửi yêu cầu GET đến URL_API
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
    const response = await PostPagination(pageNumber);
    const totalItems = response?.data?.data?.totalDocs;
    if (totalItems) {
      setTotalItems(totalItems);
    }
    dispatch(setData(response?.data?.data?.data));
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IPost> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<IPost> = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "images",
      key: "images",
      render: (image) => <img className="h-[100px]" width={300} src={image[0]} />,
    },
    {
      title: "Miêu Tả",
      key: "description",
      dataIndex: "description",
      render: (text) => {
        return text.slice(0, 50).concat(" . . .");
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "Ngày Đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("createdAt"),
      render: (date) => <span>{date}</span>,
    },
    {
      title: "Ngày Sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("updatedAt"),
      render: (date) => <span>{date}</span>,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const post = posts?.find(
                (post: IPost) => post._id === record._id
              );

              form.setFieldsValue({
                _id: post?._id,
                title: post?.title,
                images: post?.images,
                description: post?.description,
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

  const data = posts.map((item: IPost, index: number) => ({
    ...item,
    key: index,
  }));

  const showModal = (mode: string) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} chưa nhập!",
  };

  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    if (modalMode === "add") {
      const images = values?.images?.fileList?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ response }: any) => response.data.url
      );

      const newValues = { ...values, images };

      await dispatch(createPostMid(newValues));
      message.success(`Tạo bài viết thành công!`);
    } else if (modalMode === "edit") {
      const newImages = values.images.fileList
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        values.images.fileList.map(({ response }: any) => response.data.url)
        : values.images;

      const newValues = { ...values, images: newImages };
      const { _id, ...post } = newValues;

      await dispatch(updatePostMid({ _id, post }));
      message.success(`Sửa bài viết thành công!`);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = "dhwpz6l7t";
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
        ></Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        pagination={{
          current: currentPage,
          total: totalItems,
          pageSize: 6,
          onChange: handlePageChange,
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
        >
          {modalMode === "edit" && (
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="title"
            label="Tiêu Đề"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} chưa nhập!" },
            ]}
          >
            <Input size="large" placeholder="Tiêu đề" />
          </Form.Item>

          <Form.Item name="images" label="Hình ảnh" rules={[{ required: true }]}>
            <Dragger multiple listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Thêm Hình Ảnh</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="description"
            label="Miêu Tả"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} chưa nhập!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Miêu tả" />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default PostManagement;
