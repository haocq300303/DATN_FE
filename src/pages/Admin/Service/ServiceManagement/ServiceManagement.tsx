/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from "react-router-dom";
import { Popconfirm, Space, Table, Button, message, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";
import { useState, } from "react";

const { Search } = Input;
// import { Spin } from "antd";

const ServiceManagement = () => {
    // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    //   if (!posts) {
    //     <Spin indicator={antIcon} />;
    //   }

  const [searchText, setSearchText] = useState("");


    const confirm = () => {
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
          title: "Price",
          dataIndex: "price",
          key: "price",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: "PitchId",
          key: "category",
          dataIndex: "categoryId",
          render: () => (
            <span>
              {/* {categories?.map((category: ICategory) =>
                category._id === cate ? category.name : ""
              )} */}
            </span>
          ),
        },
        {
          title: "Image",
          dataIndex: "image",
          key: "image",
          render: (image) => <img width={50} src={image.url} />,
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
                // onConfirm={() => confirm(record._id)}
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
}

export default ServiceManagement
