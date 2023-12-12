import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { IBooking } from "~/interfaces/booking.type";
import { useGetAllBookingByUserIdQuery } from "../../../Redux/booking/bookingApi";
import FormCreateBooking from "./CreateBooking";

interface DataType extends IBooking {
  key: React.Key;
}
const BookingAdminPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: 50,
        fixed: "left",
      },
      {
        title: "Thông tin người đặt",
        children: [
          {
            title: "Họ và tên",
            dataIndex: "user_booking",
            width: 200,
            render: (user_booking) => (
              <p
                style={{
                  maxWidth: "200px",
                  whiteSpace: "normal",
                  color: "#334155",
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_booking?.name}
              </p>
            ),
          },
          {
            title: "Số điện thoại",
            dataIndex: "user_booking",
            key: "index",
            width: 200,
            render: (user_booking) => {
              return (
                <p
                  style={{
                    maxWidth: "200px",
                    whiteSpace: "normal",
                    color: "#334155",
                  }}
                  className="text-line-3 text-base font-medium"
                >
                  {user_booking?.phone}
                </p>
              );
            },
          },
          {
            title: "Email",
            dataIndex: "user_booking",
            width: 200,
            render: (user_booking) => (
              <p
                style={{
                  maxWidth: "200px",
                  whiteSpace: "normal",
                  color: "#334155",
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_booking?.email}
              </p>
            ),
          },
        ],
      },
      {
        title: "Thông tin đặt sân",
        children: [
          {
            title: "Tên sân",
            width: 200,
            dataIndex: "pitch",
            render: (pitch) => (
              <p
                style={{
                  maxWidth: "200px",
                  whiteSpace: "normal",
                  color: "#334155",
                }}
                className="text-line-3 text-base font-medium"
              >
                {pitch?.name}
              </p>
            ),
          },
          {
            title: "Địa chỉ",
            dataIndex: "pitch",
            width: 200,
            render: (pitch) => (
              <p
                style={{
                  maxWidth: "200px",
                  whiteSpace: "normal",
                  color: "#334155",
                }}
                className="text-line-3 text-base font-medium"
              >
                {pitch?.address}
              </p>
            ),
          },
          {
            title: "Giờ đặt",
            dataIndex: "shift",
            width: 200,
            render: (shift) => (
              <p
                style={{
                  maxWidth: "200px",
                  whiteSpace: "normal",
                  color: "#334155",
                }}
                className="text-line-3 text-base font-medium"
              >
                {shift?.time_start} - {shift?.time_end}
              </p>
            ),
          },
        ],
      },
      {
        title: "Mã thanh toán",
        dataIndex: "payment_id",
        width: 200,
        render: (payment_id) => {
          return (
            <p
              style={{
                maxWidth: "200px",
                whiteSpace: "normal",
                color: "#334155",
              }}
              className="text-line-3 text-base font-medium"
            >
              {payment_id}
            </p>
          );
        },
      },
      {
        title: "Thời gian",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        render: (createdAt) => (
          <div className="flex flex-col">
            <span
              style={{ color: "#64748b", fontWeight: "600", fontSize: "15px" }}
            >
              {format(new Date(createdAt), "dd-MM-yyyy")}
            </span>

            <span
              className="text-sm mt-0.5"
              style={{ color: "#64748b", fontWeight: "500" }}
            >
              {format(new Date(createdAt), "HH:mm:ss")}
            </span>
          </div>
        ),
      },
      // {
      //     title: "Options",
      //     width: 100,
      //     fixed: "right",
      //     render: () => (
      //         <div className="flex justify-center">
      //             <span onClick={() => setIsModalOpen(!isModalOpen)}>
      //                 <InfoCircleOutlined size={20} className="cursor-pointer text-2xl hover:text-red-600" />
      //             </span>

      //             <Modal title="Basic Modal" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
      //                 <p>Some contents...</p>
      //                 <p>Some contents...</p>
      //                 <p>Some contents...</p>
      //             </Modal>
      //         </div>
      //     ),
      // },
    ],
    []
  );

  const { data: booking, isFetching } = useGetAllBookingByUserIdQuery(null);

  useEffect(() => {
    const _dataSource = booking?.data?.map((item, index) => ({
      key: item._id,
      index: index + 1,
      ...item,
    }));
    if (_dataSource) setDataSource(_dataSource as DataType[]);
  }, [booking]);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          icon={<PlusOutlined />}
          className="bg-[#25964b] text-white"
          onClick={() => setIsOpenModalCreate(true)}
        >
          Chủ sân tạo booking
        </Button>
      </div>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1000 }}
        sticky={{ offsetHeader: 0 }}
        pagination={false}
        className="min-h-[500px]"
      />

      <FormCreateBooking
        isOpen={isOpenModalCreate}
        setOpen={setIsOpenModalCreate}
      />
    </div>
  );
};

export default BookingAdminPage;
