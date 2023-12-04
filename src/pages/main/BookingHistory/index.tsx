import { useGetAllBookingByUserIdQuery } from "~/Redux/booking/bookingApi";
import BookingHistoryItem from "~/pages/main/BookingHistory/BookingHistoryItem";

const BookingHistoryPage = () => {
    const userId = "655c53ed6c0689551d7528a3";

    const { data: bookingHistory } = useGetAllBookingByUserIdQuery({ user_id: userId });

    // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    //     console.log(date, dateString);
    // };

    return (
        <div className="mt-24 m-10 overflow-hidden">
            <h1 className="text-2xl text-center">Lịch sử booking</h1>
            <div className="">
                <div className="">
                    <div className="">
                                {bookingHistory?.data.map((booking: any) => (
                                    <BookingHistoryItem key={booking._id} {...booking} />
                                ))}
                    </div>
                </div>

                <div className=""></div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;
