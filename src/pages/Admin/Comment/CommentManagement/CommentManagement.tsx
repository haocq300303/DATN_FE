import { Popconfirm, Space, Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import IComment from "../../../../interfaces/comment";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  deleteCommentMid,
  getAllCommentMid,
} from "../../../../Redux/Slices/commentSlide";

const CommentManagement = () => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(getAllCommentMid());
  }, [dispatch]);

  const confirm = async (idComment: string) => {
    await dispatch(deleteCommentMid(idComment));
    message.success(`Xóa sản phẩm thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<IComment> = [
    {
      title: "Post",
      dataIndex: "id_post",
      key: "post",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Pitch",
      dataIndex: "id_pitch",
      key: "pitch",
      render: (text) => <span>{text ? text : "Null"}</span>,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Content",
      key: "content",
      dataIndex: "content",
      render: (text) => {
        return text.slice(0, 50).concat(" . . .");
      },
    },
    {
      title: "User",
      key: "user",
      dataIndex: "id_user",
      render: (user) => <span>{user?.name}</span>,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      defaultSortOrder: "descend",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            placement="topRight"
            title="Xóa bình luận?"
            description="Bạn có chắc chắn xóa binh luận này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: "inline-flex" }} />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = comments.map((item: IComment, index: number) => ({
    ...item,
    key: index,
  }));

  return (
    <>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.content}</p>
          ),
        }}
      />
    </>
  );
};

export default CommentManagement;
