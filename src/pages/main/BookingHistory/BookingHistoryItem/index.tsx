import { Badge, Button } from 'antd';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { toggleFindOpponent } from '~/Redux/Slices/shiftSlice';
import { useAppDispatch } from '~/Redux/hook';
import { Show } from '~/components/Show';
import { IBooking } from '~/interfaces/booking.type';
// import { IBooking } from "~/interfaces/booking.type";

const BookingHistoryItem = (booking: IBooking) => {
  const dispatch = useAppDispatch();
  console.log(booking);

  const handleCancelBooking = () => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn sẽ mất toàn bộ số tiền đặt cọc. Bạn chắc chắn chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        //    Logic call apii
      }
    });
  };
  // search
  const handleToggleFindOpponent = () => {
    dispatch(
      toggleFindOpponent({
        id: booking.shift?._id,
        currentStatus: booking.shift?.find_opponent,
      })
    );
    window.location.reload();
  };
  return (
    <>
      <div className=" border my-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center p-4 w-full">
          <div className=" flex items-center gap-11">
            <div>
              <h2 className="text-lg text-gray-600">Ca Sân</h2>
              <p className="text-base"> {booking.shift?.number_shift}</p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Ngày Đặt</h2>
              <p className="text-base"> {format(new Date(booking?.updatedAt), 'HH:mm:ss dd-MM-yyyy')}</p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Địa Chỉ</h2>
              <p className="text-base"> {booking.pitch?.address} </p>
            </div>
            <div>
              <h2 className="text-lg text-gray-600">Giờ Sân</h2>
              <p className="text-base">
                {' '}
                <span className="text-lime-800">{booking.shift?.start_time}</span>-
                <span className="text-green-800">{booking.shift?.end_time}</span>
              </p>
            </div>
          </div>
          <div className="">
            <Badge
              count={booking.status === 'success' ? 'Đăt lịch thành công' : 'Đã hủy trước đó'}
              showZero
              color={booking.status === 'success' ? '#52c41a' : '#faad14'}
            />
          </div>
        </div>
        <hr />
        <div className="flex p-4 justify-between">
          <div className="flex">
            <div className="h-[200px] w-[350px]">
              <img src={booking.pitch?.avatar} alt="hepta-brown" className="min-h-[200px] min-w-[200px] rounded-md" />
            </div>

            <div className="ml-8">
              <div className="flex justify-between ">
                <h1 className="">{booking.pitch?.name}</h1>
                <p className=" flex justify-end">{booking.shift?.price.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="max-h-[180px] overflow-auto">
                {booking.services && booking.services.length > 0 ? (
                  <>
                    <h2 className="text-lg text-gray-600 py-3">Các Dịch Vụ :</h2>
                    <p className="">
                      {' '}
                      {booking.services?.map((item: any) => (
                        <div key={item.id} className="flex w-1/5 gap-2">
                          <div className="w-20 h-12 overflow-hidden rounded-xl">
                            <img className="w-[100%]" src={item.image} alt="" />
                          </div>
                          <div>
                            <h2>{item.name}</h2>
                            <h2>{item.price.toLocaleString('vi-VN')}đ</h2>
                          </div>
                        </div>
                      ))}
                    </p>
                  </>
                ) : (
                  <p className="text-base">{booking.pitch?.description}</p>
                )}
              </div>
              <div className="flex items-center justify-end">
                {' '}
                <h2 className="text-lg text-gray-600 py-2 pr-2">Tổng Tiền :</h2>
                <p className="text-base"> {booking.shift?.price.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-end gap-4 pt-2">
              <Button
                key={booking.shift?._id}
                onClick={handleToggleFindOpponent}
                className={`px-6 py-1 rounded-lg ${booking.shift?.find_opponent === 'Find' ? 'bg-red-500' : 'bg-green-500'}`}
              >
                {booking.shift?.find_opponent === 'Find' ? (
                  <span className="text-white ">Tắt Tìm Đối</span>
                ) : (
                  <span className="text-white ">Bật Tìm Đối</span>
                )}
              </Button>

              <Show when={booking.status === 'success'}>
                <Button onClick={handleCancelBooking} className={`px-4 py-1 rounded-lg bg-red-500`}>
                  <span className="text-white ">Hủy lịch</span>
                </Button>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryItem;
