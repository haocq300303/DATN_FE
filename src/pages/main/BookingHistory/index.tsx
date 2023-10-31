import { useGetAllBookingByUserIdQuery } from "~/Redux/booking/bookingApi";
import BookingHistoryItem from "~/components/BookingHistoryItem";

const BookingHistoryPage = () => {
    const userId = "65131393f8698962d691cd12";
    const { data: bookingHistory } = useGetAllBookingByUserIdQuery({ user_id: userId });

    return (
        <div className="max-w-[900px]">
            <div className="">Lịch sử booking</div>

            <div className="grid grid-cols-[1fr_300px]">
                <div className="">
                    {bookingHistory?.data.map((booking) => (
                        <BookingHistoryItem key={booking._id} {...booking} />
                    ))}
                </div>

                <div className=""></div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;
