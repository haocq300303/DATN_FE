import { Space, Table, Button, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import IShift from "~/interfaces/shift";
import dayjs from "dayjs";
import { format } from "date-fns";
import { getShiftsByPitch } from "~/api/shift";

const Shift = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getShiftsByPitch(
        "653ca30f5d70cbab41a2e5d0",
        selectedDate && selectedDate.trim() !== ""
          ? `?date=${selectedDate}`
          : ""
      );
      setShifts(data.data);
      setIsLoading(false);
    })();
  }, [selectedDate]);

  const handleDateChange = (e: any) => {
    const datePicker = format(e.$d, "yyyy-MM-dd");

    setSelectedDate(datePicker);
  };

  const columns: ColumnsType<IShift> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 50,
    },
    {
      title: "Tên Ca",
      dataIndex: "number_shift",
      key: "number_shift",
      width: 120,
      render: (text) => <span>Ca {text}</span>,
    },
    {
      title: "Giờ Bắt Đầu",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => <span>{text} Giờ</span>,
    },
    {
      title: "Giờ Kết Thúc",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => <span>{text} Giờ</span>,
    },
    {
      title: "Sân Số",
      dataIndex: "id_chirlden_pitch",
      key: "id_chirlden_pitch",
      width: 140,
      render: (chil_pitch) => (
        <span>Sân {chil_pitch?.code_chirldren_pitch}</span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (price) => (
        <span>
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Tìm Đối",
      dataIndex: "find_opponent",
      key: "find_opponent",
      width: 160,
      render: (find_opponent) => (
        <span
          className={`p-[10px] rounded-[8px] text-[#fff] ${
            find_opponent === "Find" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {find_opponent === "Find" ? "Bật" : "Tắt"}
        </span>
      ),
    },
    {
      title: "Đặt Theo Tháng",
      dataIndex: "is_booking_month",
      key: "is_booking_month",
      width: 160,
      render: (value) => (
        <span
          className={`p-[10px] rounded-[8px] text-[#fff] ${
            value ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status_shift",
      key: "status_shift",
      width: 140,
      render: (status_shift) => (
        <span
          className={`p-[10px] rounded-[8px] text-[#fff] ${
            status_shift ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {status_shift ? "Đã đặt" : "Còn trống"}
        </span>
      ),
    },
  ];

  const shiftsShow = Array.isArray(shifts)
    ? shifts.map((item: IShift, index: number) => ({
        ...item,
        key: index,
        index: index + 1,
      }))
    : [];

  return (
    <>
      <div className="flex justify-end mb-2 items-center gap-3">
        <Space direction="vertical">
          <DatePicker
            onChange={handleDateChange}
            value={dayjs(selectedDate, "YYYY-MM-DD")}
            size={"large"}
          />
        </Space>
        <Button
          type="primary"
          size="large"
          icon={<FilterOutlined />}
          className="bg-[#2988bc]"
        ></Button>
      </div>

      <Table
        loading={isLoading}
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={shiftsShow}
        className="min-h-[500px]"
        // scroll={{ y: 100 }}
      />
    </>
  );
};
export default Shift;
