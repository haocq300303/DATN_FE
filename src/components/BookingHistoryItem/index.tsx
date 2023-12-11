import { format } from "date-fns";
import Swal from "sweetalert2";
// import { IBooking } from "~/interfaces/booking.type";
import { DatePicker, Space } from 'antd';
import { useGetAllBookingByUserIdQuery } from "~/Redux/booking/bookingApi";
import { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";

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

  // SEARCH DATEPICKER----------------------------------------------------------------
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('all');
  useEffect(() => {
    if (selectedDate) {
      const filteredByDate = bookingHistory?.data.filter(booking => {
        const bookingDate = new Date(booking.updatedAt);
        return bookingDate.toDateString() === selectedDate.toDate().toDateString();
      });
      setFilteredBookings(filteredByDate);
    } else {
      setFilteredBookings(bookingHistory?.data || []);
    }
  }, [selectedDate, bookingHistory]);

  const handleFilter = (status: any) => {
    if (status === 'all') {
      setFilteredBookings(bookingHistory?.data || []);
    } else {
      const filteredByStatus = bookingHistory?.data.filter(booking => booking.status === status);
      setFilteredBookings(filteredByStatus || []);
    }
    setBookingStatus(status);
  };
  const onChange = (date: any, dateString: any) => {
    setSelectedDate(date, dateString);
    if (bookingHistory?.data) {
      const foundBooking = bookingHistory.data.some(booking => {
        const bookingDate = new Date(booking.updatedAt);
        return bookingDate.toDateString() === date.toDate().toDateString();
      });

      if (!foundBooking) {
        Swal.fire({
          icon: 'error',
          title: 'Không có đặt sân',
          text: 'Không có đặt sân nào cho ngày đã chọn',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không có dữ liệu đặt sân',
      });
    }
  };


  // LOGIC SEARCH DATAPICKER END----------------------------------------------------------------
  return (
    <section className="invoice-historybooking py-5">
      <div className="">
        <div className="flex">

          <Space direction="vertical">
            <DatePicker onChange={onChange} />

          </Space>
          <select
            data-te-select-init
            className="border rounded-lg ml-1 py-[5px] px-4 transition duration-300 ease-in-out focus:ring  focus:border-gray-100 outline-none"
            onChange={(e) => handleFilter(e.target.value)}
            value={bookingStatus}
          >
            <option value="all">Trạng thái</option>
            <option value="success">Đặt sân thành công</option>
            <option value="cancel">Hủy đặt sân</option>
          </select>

        </div>



        <section className="py-2">

          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">

                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">

                            <button className="flex items-center gap-x-2">
                              <span>Địa chỉ</span>

                              <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-800 dark:text-gray-400">
                          Ngày
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 dark:text-gray-400">
                          Ca sân
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 dark:text-gray-400">
                          Số tiền
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 dark:text-gray-400">
                          Giờ đá
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 dark:text-gray-400">
                          <span className="sr-only">Trạng thái</span>
                        </th>

                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {filteredBookings.map((booking: any) => (
                        <tr key={booking.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <img className="object-cover w-10 h-10 rounded-md" src={booking.pitch?.avatar} alt="" />
                                <div>
                                  <h2 className="text-base font-medium text-gray-800 dark:text-white ">{booking.pitch?.name}</h2>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">Địa chỉ: {booking.pitch?.address}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"> {format(new Date(booking.updatedAt), "d MMM yyyy")}</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">


                              <h2 className="text-sm font-normal">{booking.shift?.number_shift}</h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-medium ">
                            <h2 className="text-sm font-normal text-red-900">{booking.shift?.price} VNĐ</h2>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"><span className="text-gray-800">{booking.shift?.time_start}</span>-<span className="text-green-800">{booking.shift?.time_end}</span></td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6 ">
                              {booking.status === "success" ? (
                                <button onClick={handleCancelBooking} className={`p-3 text-sm rounded-lg bg-green-100 `}>
                                <span className={`text-green-600 font-bold shadow-white `}>
                                  Thành Công
                                </span>
                              </button>
                              ) : (
                                <button onClick={handleCancelBooking} className={`p-3 text-sm rounded-lg bg-red-100 `}>
                                <span className={`text-red-600 font-bold shadow-white `}>
                                  Hủy đặt lịch
                                </span>
                              </button>
                              )}
                              
                            </div>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </section>
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
