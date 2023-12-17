import { useGetAllBookingByUserIdQuery } from '~/Redux/booking/bookingApi';
import { useAppSelector } from '~/Redux/hook';
import BookingHistoryItem from '~/pages/main/BookingHistory/BookingHistoryItem';

const BookingHistoryPage = () => {
  const user: any = useAppSelector((state) => state.user.currentUser);

  const { data: bookingHistory } = useGetAllBookingByUserIdQuery({ user_id: user?.values?._id });

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //     //console.log(date, dateString);
  // };
  return (
    <div className="mt-24  max-w-6xl mx-auto">
      <h1 className="text-2xl text-center">Lịch sử booking</h1>
      <div className="">
        <div className="">
          <div className="">{bookingHistory?.data.map((booking: any) => <BookingHistoryItem key={booking._id} {...booking} />)}</div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
