import { Badge, Button } from 'antd';
import { addDays, differenceInMinutes, format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { toggleFindOpponent } from '~/Redux/Slices/shiftSlice';
import { useAppDispatch } from '~/Redux/hook';
import { cancelBooking } from '~/api/shift';
import { Show } from '~/components/Show';
import { IBooking } from '~/interfaces/booking.type';
// import { IBooking } from "~/interfaces/booking.type";

const BookingHistoryItem = (booking: IBooking) => {
  const [isFindOpponent, setIsFindOpponent] = useState(booking.shift?.find_opponent);
  const [bookingStatus, setBookingStatus] = useState(booking.status);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const timeDifference = differenceInMinutes(new Date(), new Date(booking?.createdAt));

  const handleCancelBooking = () => {
    Swal.fire({
      position: 'center',
      title: 'Hủy Lịch Đã Đặt',
      text: 'Bạn sẽ mất toàn bộ số tiền đặt cọc. Bạn chắc chắn chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await cancelBooking(booking?.shift?._id, booking?._id);
          const newStatus = bookingStatus === 'success' ? 'cancel' : 'success';
          setBookingStatus(newStatus);
          setIsLoading(false);
          toast('Hủy lịch thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } catch (error: any) {
          toast.error(error?.response?.data?.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
    });
  };

  const handleToggleFindOpponent = () => {
    Swal.fire({
      position: 'center',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Hủy',
      title: `${isFindOpponent === 'Find' ? 'Tắt trạng thái tìm đối?' : 'Bật trạng thái tìm đối?'}`,
      icon: 'question',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(
          toggleFindOpponent({
            id: booking.shift?._id,
            currentStatus: isFindOpponent,
          })
        );
        const newStatus = isFindOpponent === 'Find' ? 'NotFind' : 'Find';
        setIsFindOpponent(newStatus);
      }
    });
  };
  return (
    <>
      <div className=" border my-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <div className=" flex items-center gap-11">
            <div>
              <h2 className="text-lg text-gray-600">Ca Sân</h2>
              <p className="text-base"> {booking.shift?.number_shift}</p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Ngày Đặt</h2>
              <p className="text-base"> {booking?.createdAt && format(new Date(booking?.createdAt), 'HH:mm:ss dd-MM-yyyy')}</p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Địa Chỉ</h2>
              <p className="text-base"> {booking.pitch?.address} </p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Giờ Sân</h2>
              <p className="text-base">
                <span className="text-lime-800">{booking.shift?.start_time}h</span> -
                <span className="text-green-800"> {booking.shift?.end_time}h</span>
              </p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Giá Ca Sân</h2>
              <p className="text-base">{booking?.shift?.price?.toLocaleString('vi-VN')}đ</p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Ngày Đá</h2>
              <p className="text-base">
                {booking.shift?.is_booking_month
                  ? `${format(booking?.shift?.date[0], 'dd-MM-yyyy')} đến ${format(
                      addDays(new Date(booking?.shift?.date[0]), 29),
                      'dd-MM-yyyy'
                    )}`
                  : booking?.shift?.date?.map((item: string) => format(new Date(item), 'dd-MM-yyyy'))}
              </p>
            </div>
          </div>
          <div className="">
            <Badge
              count={bookingStatus === 'success' ? 'Đăt lịch thành công' : 'Đã hủy trước đó'}
              showZero
              color={bookingStatus === 'success' ? '#52c41a' : '#faad14'}
            />
          </div>
        </div>
        <hr />
        <div className="flex p-4 justify-between">
          <div className="flex">
            <div className="h-[180px] w-[320px]">
              <img src={booking.pitch?.avatar} alt="hepta-brown" className="w-full rounded-md" />
            </div>

            <div className="ml-8">
              <div className="flex justify-between">
                <h1 className="text-[22px]">{booking.pitch?.name}</h1>
              </div>
              <div className="max-h-[180px] overflow-auto">
                {booking.services && booking.services.length > 0 ? (
                  <>
                    <h2 className="text-lg text-gray-600 pb-3">Các Dịch Vụ :</h2>
                    <p className="">
                      {booking.services?.map((item: any) => (
                        <div key={item.id} className="flex gap-2">
                          <div className="w-20 h-12 mr-[6px] overflow-hidden rounded-xl">
                            <img className="w-[100%]" src={item.image} alt="" />
                          </div>
                          <div>
                            <h2>{item.name}</h2>
                            <h2>{item.price?.toLocaleString('vi-VN')}đ</h2>
                          </div>
                        </div>
                      ))}
                    </p>
                  </>
                ) : (
                  <p className="text-base">{booking.pitch?.description}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-end items-end flex-col gap-4 pt-2">
              {bookingStatus !== 'success' ? (
                ''
              ) : (
                <Button
                  key={booking.shift?._id}
                  onClick={handleToggleFindOpponent}
                  className={`px-6 py-1 rounded-lg ${isFindOpponent === 'Find' ? 'bg-red-500' : 'bg-green-500'}`}
                >
                  {isFindOpponent === 'Find' ? (
                    <span className="text-white ">Tắt Tìm Đối</span>
                  ) : (
                    <span className="text-white ">Bật Tìm Đối</span>
                  )}
                </Button>
              )}

              <Show when={bookingStatus === 'success'}>
                {timeDifference > 30 ? (
                  ''
                ) : (
                  <Button onClick={handleCancelBooking} className={`px-4 py-1 rounded-lg bg-red-500`}>
                    <span className="text-white ">{isLoading ? 'Loading...' : 'Hủy lịch'}</span>
                  </Button>
                )}
              </Show>
              <div className="flex items-center justify-end">
                <h2 className="text-lg text-gray-600 py-2 pr-2">Tổng Tiền :</h2>
                <p className="text-lg"> {booking.payment?.total_received?.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="flex items-center justify-end">
                <h2 className="text-lg text-gray-600 py-2 pr-2">Đã thanh toán :</h2>
                <p className="text-lg"> {booking.payment?.price_received?.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryItem;
