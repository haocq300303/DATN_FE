/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { Link } from 'react-router-dom';
import { Popconfirm, Space, Table, Button, message, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {  getAllBanner, handleRemoveBanner } from '../../../../Redux/Reducer/bannerSlice';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';

const { Search } = Input;

const BannerManagement = () => {
  const [searchText, setSearchText] = useState('');

  const dispatch = useAppDispatch();
  const banners = useAppSelector((state) => state.banner.banners);
  

  useEffect(() => {
    dispatch(getAllBanner());
  }, [dispatch]);

  const confirm = (id: string) => {
    void dispatch(handleRemoveBanner(id));
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      render: (image: string) => <img width={200} src={image} alt="Banner" />,
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Description',
      key: 'content',
      dataIndex: 'content',
      render: (text: string) => {
        return text.slice(0, 50).concat(' . . .');
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Link to={`/admin/banner/update/${record._id}`}>
            <Button type="primary" ghost>
              <EditOutlined />
              Edit
            </Button>
          </Link>
          <Popconfirm
            placement="topRight"
            title="Xóa bài viết?"
            description="Bạn có chắc chắn xóa bài viết này không?"
            onConfirm={()=>confirm(record._id)}
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

  return (
    <>
      <Search
        style={{ width: '22%', marginBottom: 10 }}
        placeholder="Search name . . ."
        size="large"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={banners}
        rowKey={(record: any) => record._id}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.content}</p>
          ),
        }}
      />
    </>
  );
};

export default BannerManagement;
