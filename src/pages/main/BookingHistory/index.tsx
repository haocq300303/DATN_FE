import { useGetAllBookingByUserIdQuery } from "~/Redux/booking/bookingApi";
import BookingHistoryItem from "~/pages/main/BookingHistory/BookingHistoryItem";

const BookingHistoryPage = () => {
    const userId = "65131393f8698962d691cd12";

    const { data: bookingHistory } = useGetAllBookingByUserIdQuery({ user_id: userId });

    // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    //     console.log(date, dateString);
    // };

    return (
        <div className="mt-24 m-10 overflow-hidden">
            <h1 className="text-2xl font-body uppercase">Lịch sử booking</h1>
            <div className="">
                <div className="">
                    <div className="">
                        {/* <Space direction="vertical">
                            <DatePicker onChange={onChange} />
                        </Space> */}
                        <table className="mt-4 font-inter w-full table-auto border-separate border-spacing-y-3 overflow-scroll text-left md:overflow-auto">
                            <thead className="w-full rounded-lg bg-gray-200 text-base font-semibold text-white">
                                <tr className="">
                                    <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">Tên sân</th>
                                    <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">Địa chỉ</th>
                                    <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Ca sân</th>
                                    <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Giờ sân</th>
                                    <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Giá tiền</th>
                                    <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Ngày đặt</th>

                                    <th className="whitespace-nowrap rounded-r-lg py-3 pl-10 text-sm font-normal text-[#212B36] ">Status</th>
                                    <th className="whitespace-nowrap rounded-r-lg py-3 pl-10 text-sm font-normal text-[#212B36] ">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingHistory?.data.map((booking: any) => (
                                    <BookingHistoryItem key={booking._id} {...booking} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className=""></div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;
