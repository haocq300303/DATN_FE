
import BookingHistoryItem from "~/components/BookingHistoryItem";

const BookingHistoryPage = () => {

    return (
        <div className="mt-24 m-10 overflow-hidden">
            <h1 className="text-2xl font-body uppercase"  >Lịch sử booking</h1>
            <div className="">
                <div className="">
                        <BookingHistoryItem  />
                </div>

                <div className=""></div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;
