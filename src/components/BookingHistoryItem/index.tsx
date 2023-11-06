import { format } from "date-fns";
import Swal from "sweetalert2";
// import { IBooking } from "~/interfaces/booking.type";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { useGetAllBookingByUserIdQuery } from "~/Redux/booking/bookingApi";

const BookingHistoryItem = () => {
  const userId = "65131393f8698962d691cd12";

  const { data: bookingHistory } = useGetAllBookingByUserIdQuery({ user_id: userId });
  const handleCancelBooking = () => {
    Swal.fire({
      position: "center",
      title: "Warning",
      text: "Bạn sẽ mất toàn bộ số tiền đặt cọc. Bạn chắc chắn chứ!!",
      icon: "warning",
      confirmButtonText: "Đồng ý",
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        //    Logic call apii
      }
    });
  };
  // search 

  console.log(bookingHistory);
  // console.log(booking.data.status);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <section className="">
      
      <div className="">
      <Space direction="vertical">
        <DatePicker onChange={onChange} />

      </Space>
        <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead className="w-full rounded-lg bg-gray-200 text-base font-semibold text-white">
            <tr className="">
              <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">Tên sân</th>
              <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">Địa chỉ</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Ca sân</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Giờ sân</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Giá tiền</th>
              <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Ngày đặt</th>

              <th className="whitespace-nowrap rounded-r-lg py-3 pl-1 text-sm font-normal text-[#212B36]">Customer</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory?.data.map((booking: any) => {
              return (
                <tr key={booking._id} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                  <td className="rounded-r-[8px] px-1 py-4 text-sm font-normal text-[#637381]">
                    <div className="relative flex items-center gap-1">
                      <div className="h-[50px] w-[50px]"><img src={booking.pitch?.avatar} alt="hepta-brown" className="min-h-[50px] min-w-[22px]" /></div>
                      {booking.pitch?.name}
                    </div>
                  </td>
                  <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">{booking.pitch?.address}</td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]"><span className="text-lime-800">{booking.shift?.time_start}</span>-<span className="text-green-800">{booking.shift?.time_end}</span></td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">{booking.shift?.number_shift}</td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">{booking.shift?.price}</td>


                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">{format(new Date(booking.updatedAt), "HH:mm:ss dd-MM-yyyy")}</td>
                  <td className="px-1 py-4 " >


                    <button onClick={handleCancelBooking} className={`p-4 bg-${booking.status === "success" ? "green-600" : "red-600"}`}>
                      <span className="text-white">
                        {booking.status === "success" ? "Đặt thành công" : "Bạn đã hủy lịch"}
                      </span>
                    </button>

                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      {/*           
            <div className="">
                
                <img src={booking.data.pitch?.avatar} alt="" className="w-10" />
                <p>adress: {booking.data.pitch?.address}</p>
                
            </div> */}


    </section>
  );
};

export default BookingHistoryItem;
