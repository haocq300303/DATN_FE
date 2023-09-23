import { Link } from "react-router-dom";
import { Popconfirm, Space, Table, Button, message, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useState, useEffect } from "react";

const { Search } = Input;

const PostManagement = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  //   if (!posts) {
  //     <Spin indicator={antIcon} />;
  //   }

  const [searchText, setSearchText] = useState("");

  const confirm = (idPost: string) => {
    message.success(`Xóa sản phẩm thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img width={50} src={image.url} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (text) => {
        return text.slice(0, 50).concat(" . . .");
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryId",
      render: (cate) => (
        <span>
          {/* {categories?.map((category: ICategory) =>
            category._id === cate ? category.name : ""
          )} */}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/post/update/${record._id}`}>
            <Button type="primary" ghost>
              <EditOutlined />
              Edit
            </Button>
          </Link>
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
              <DeleteOutlined />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //   const filterPost = posts?.filter((item: IPost) =>
  //     item?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  //   );

  return (
    <>
      <Search
        style={{ width: "22%", marginBottom: 10 }}
        placeholder="Search name . . ."
        size="large"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        loading
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        // dataSource={filterPost}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
      />
    </>
  );
};

export default PostManagement;
