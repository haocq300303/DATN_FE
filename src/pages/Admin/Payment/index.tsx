import Table, { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { IPayment } from '~/interfaces/payment.type';
import { useGetAllPaymentByUserIdQuery } from '../../../Redux/payment/paymentApi';
import BillScreen from './components/BillScreen';

interface DataType extends IPayment {
  key: React.Key;
}
const PaymentAdminPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
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
        title: 'Thông tin người chuyển',
        children: [
          {
            title: 'Họ và tên',
            dataIndex: 'user_bank',
            width: 100,
            render: (user_bank) => (
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  color: '#334155',
                  fontSize: 13,
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_bank?.name}
              </p>
            ),
          },
          {
            title: 'SĐT',
            dataIndex: 'user_bank',
            key: 'index',
            width: 105,
            render: (user_bank) => {
              return (
                <p
                  style={{
                    maxWidth: '200px',
                    whiteSpace: 'normal',
                    color: '#334155',
                    fontSize: 13,
                  }}
                  className="text-line-3 text-base font-medium"
                >
                  {user_bank?.phone_number}
                </p>
              );
            },
          },
          {
            title: 'Email',
            dataIndex: 'user_bank',
            width: 200,
            render: (user_bank) => (
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  color: '#334155',
                  fontSize: 12,
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_bank?.email}
              </p>
            ),
          },
        ],
      },
      {
        title: 'Thông tin người nhận',
        dataIndex: 'user_receiver',
        children: [
          {
            title: 'Họ và tên',
            width: 100,
            dataIndex: 'user_receiver',
            render: (user_receiver) => (
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  color: '#334155',
                  fontSize: 13,
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_receiver?.name}
              </p>
            ),
          },
          {
            title: 'SĐT',
            dataIndex: 'user_receiver',
            width: 105,
            render: (user_receiver) => (
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  color: '#334155',
                  fontSize: 13,
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_receiver?.phone_number}
              </p>
            ),
          },
          {
            title: 'Email',
            dataIndex: 'user_receiver',
            width: 200,
            render: (user_receiver) => (
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  color: '#334155',
                  fontSize: 12,
                }}
                className="text-line-3 text-base font-medium"
              >
                {user_receiver?.email}
              </p>
            ),
          },
        ],
      },
      {
        title: 'Số tiền',
        children: [
          {
            title: 'Đã chuyển',
            dataIndex: 'price_received',
            width: 130,
            key: 'price_received',
            render: (price_received) => (
              <p
                className="text-center"
                style={{
                  color: '#10b981',
                  backgroundColor: '#10b98119',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: 13,
                }}
              >
                {price_received?.toLocaleString()} VNĐ
              </p>
            ),
          },
          {
            title: 'Phải chuyển',
            dataIndex: 'total_received',
            width: 130,
            key: 'total_received',
            render: (total_received) => (
              <p
                className="text-center"
                style={{
                  color: 'rgb(0 95 182)',
                  backgroundColor: '#10b98119',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: 13,
                }}
              >
                {total_received?.toLocaleString()} VNĐ
              </p>
            ),
          },
          {
            title: 'Còn nợ',
            width: 100,
            render: (item) => (
              <p
                className="text-center"
                style={{
                  color: 'rgb(227 15 103)',
                  backgroundColor: '#10b98119',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: 13,
                }}
              >
                {(item?.total_received - item?.price_received)?.toLocaleString()} VNĐ
              </p>
            ),
          },
        ],
      },
      {
        title: 'Hệ thống thanh toán',
        children: [
          {
            title: 'P/thức',
            dataIndex: 'payment_method',
            width: 120,
            render: (payment_method) => {
              return (
                <p
                  style={{
                    maxWidth: '200px',
                    whiteSpace: 'normal',
                    color: '#334155',
                    fontSize: 13,
                  }}
                  className="text-line-3 text-base font-medium"
                >
                  {payment_method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                </p>
              );
            },
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            key: 'status',
            render: (status) => (
              <span
                style={{
                  color: status === 'success' ? '#3917d2' : '#fcfcfc',
                  backgroundColor: status === 'success' ? '#23d707' : 'red',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: 13,
                }}
              >
                {status}
              </span>
            ),
          },
          {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 100,
            render: (createdAt) => (
              <div className="flex flex-col items-center">
                <span style={{ color: '#64748b', fontWeight: '600', fontSize: '13px' }}>{format(new Date(createdAt), 'dd-MM-yyyy')}</span>

                <span className="text-sm mt-0.5" style={{ color: '#64748b', fontWeight: '500', fontSize: '13px' }}>
                  {format(new Date(createdAt), 'HH:mm:ss')}
                </span>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Options',
        width: 100,
        fixed: 'right',
        render: (row) => <BillScreen payment_id={row._id} />,
      },
    ],
    []
  );

  const { data: payment, isFetching } = useGetAllPaymentByUserIdQuery();

  useEffect(() => {
    const _dataSource = payment?.data?.map((item, index) => ({
      key: item._id,
      index: index + 1,
      ...item,
    }));
    setDataSource(_dataSource as DataType[]);
  }, [payment]);

  return (
    <div className="w-full">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1000 }}
        sticky={{ offsetHeader: 0 }}
        pagination={false}
      />
    </div>
  );
};

export default PaymentAdminPage;
