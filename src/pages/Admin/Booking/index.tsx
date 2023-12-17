import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import { Show } from '~/components/Show';
import { IBooking } from '~/interfaces/booking.type';
import { useGetAllBookingByUserIdQuery } from '../../../Redux/booking/bookingApi';
import FormCreateBooking from './CreateBooking';

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
        title: '#',
        dataIndex: 'index',
        key: 'index',
        width: 50,
        fixed: 'left',
      },
      {
        title: 'Thông tin người đặt',
        children: [
          {
            title: 'Họ và tên',
            dataIndex: 'user_booking',
            width: 150,
            render: (user_booking) => (
              <p
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'normal',
                  color: '#334155',
                }}
                className="text-line-3 text-sm font-medium text-center"
              >
                {user_booking?.name}
              </p>
            ),
          },
          {
            title: 'Số điện thoại',
            dataIndex: 'user_booking',
            key: 'index',
            width: 120,
            render: (user_booking) => {
              return (
                <p
                  style={{
                    maxWidth: '120px',
                    whiteSpace: 'normal',
                    color: '#334155',
                  }}
                  className="text-line-3 text-[13px] font-medium"
                >
                  {user_booking?.phone_number}
                </p>
              );
            },
          },
          {
            title: 'Email',
            dataIndex: 'user_booking',
            width: 150,
            render: (user_booking) => (
              <p
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'normal',
                  color: '#334155',
                }}
                className="text-line-3 text-[13px] font-medium"
              >
                {user_booking?.email}
              </p>
            ),
          },
        ],
      },
      {
        title: 'Thông tin đặt sân',
        children: [
          {
            title: 'Tên sân',
            width: 180,
            dataIndex: 'pitch',
            render: (pitch) => (
              <p
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'normal',
                  color: '#334155',
                }}
                className="text-line-3 text-[13px] font-medium"
              >
                {pitch?.name}
              </p>
            ),
          },
          {
            title: 'Giờ đặt',
            dataIndex: 'shift',
            width: 150,
            render: (shift) => (
              <>
                <Show when={!!shift?.start_time}>
                  <p
                    style={{
                      maxWidth: '150px',
                      whiteSpace: 'normal',
                      color: '#334155',
                    }}
                    className="text-line-3 text-[13px] font-medium text-center"
                  >
                    {shift?.start_time} - {shift?.end_time}
                  </p>
                </Show>

                <div
                  style={{
                    maxWidth: '150px',
                    whiteSpace: 'normal',
                    color: '#334155',
                  }}
                  className="flex flex-col text-line-3 text-[13px] font-medium text-center"
                >
                  <Show when={!shift?.start_time && shift?.is_booking_month}>
                    <span>{shift?.is_booking_month && 'Đặt full tháng'}</span>
                  </Show>
                  <span className="text-red-500">{shift?.date?.join(', ')}</span>
                </div>
              </>
            ),
          },
          {
            title: 'Mã sân',
            dataIndex: 'childrenPitch',
            width: 90,
            render: (childrenPitch) => (
              <p
                style={{
                  maxWidth: '90px',
                  whiteSpace: 'normal',
                  color: '#334155',
                }}
                className="text-line-3 text-[13px] font-medium text-center"
              >
                {childrenPitch?.code_chirldren_pitch}
              </p>
            ),
          },
          // {
          //   title: 'Thời gian',
          //   dataIndex: 'createdAt',
          //   key: 'shift',
          //   width: 130,
          //   render: (shift) => {
          //     console.log(shift);
          //     return (
          //       <div className="flex flex-col items-center">
          //         <span style={{ color: '#64748b', fontWeight: '600', fontSize: '13px' }}>
          //           {/* {format(new Date(shift.date[0]), 'dd-MM-yyyy')} */}
          //         </span>

          //         <span className="text-xs mt-0.5" style={{ color: '#64748b', fontWeight: '500' }}>
          //           {/* {format(new Date(shift.date[0]), 'HH:mm:ss')} */}
          //         </span>
          //       </div>
          //     );
          //   },
          // },
          {
            title: 'Địa chỉ',
            dataIndex: 'pitch',
            width: 200,
            render: (pitch) => (
              <p
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'normal',
                  color: '#334155',
                }}
                className="text-line-3 text-[13px] font-medium text-left"
              >
                {pitch?.address}
              </p>
            ),
          },
        ],
      },
      {
        title: 'Mã thanh toán',
        dataIndex: 'payment_id',
        width: 130,
        render: (payment_id) => {
          return (
            <p
              style={{
                maxWidth: '130px',
                whiteSpace: 'normal',
                color: '#334155',
              }}
              className="text-line-3 text-[13px] font-medium"
            >
              {payment_id}
            </p>
          );
        },
      },
    ],
    []
  );
  const currentPitch = JSON.parse(localStorage.getItem('pitch') || '');

  const { data: booking, isFetching } = useGetAllBookingByUserIdQuery({ pitch_id: currentPitch._id }, { skip: !currentPitch._id });

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
        <Button icon={<PlusOutlined />} className="bg-[#25964b] text-white" onClick={() => setIsOpenModalCreate(true)}>
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

      <FormCreateBooking isOpen={isOpenModalCreate} setOpen={setIsOpenModalCreate} />
    </div>
  );
};

export default BookingAdminPage;
