import { Badge, Button } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toggleFindOpponent } from "~/Redux/Slices/shiftSlice";
import { useAppDispatch } from "~/Redux/hook";
import { Show } from "~/components/Show";
import { IBooking } from "~/interfaces/booking.type";
// import { IBooking } from "~/interfaces/booking.type";

const BookingHistoryItem = (booking: IBooking) => {
  const dispatch = useAppDispatch();
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
  const handleToggleFindOpponent = () => {
    dispatch(toggleFindOpponent({ id: booking.shift?._id, currentStatus: booking.shift?.find_opponent }));
    window.location.reload();
  };
  return (
    <>
      <div className="div">
        <div className="container m-auto border w-full my-4 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className=" flex items-center gap-11">
              <div>
                <h2>Ca Sân</h2>
                <p> {booking.shift?.number_shift}</p>
              </div>
              <div>
                <h2>Ngày Đặt</h2>
                <p>
                  {" "}
                  {format(new Date(booking?.updatedAt), "HH:mm:ss dd-MM-yyyy")}
                </p>
              </div>
              <div>
                <h2>Địa Chỉ</h2>
                <p> {booking.pitch?.address} </p>
              </div>
              <div>
                <h2>Giờ Sân</h2>
                <p>
                  {" "}
                  <span className="text-lime-800">
                    {booking.shift?.start_time}
                  </span>
                  -
                  <span className="text-green-800">
                    {booking.shift?.end_time}
                  </span>
                </p>
              </div>
            </div>
            <div className="">
              <Badge
                count={
                  booking.status === "success"
                    ? "Đăt lịch thành công"
                    : "Đã hủy trước đó"
                }
                showZero
                color={booking.status === "success" ? "#52c41a" : "#faad14"}
              />
            </div>
          </div>
          <hr />
          <div className="flex p-4 gap-9">
            <div>
              <div className="h-[200px] w-[200px]">
                <img
                  src={booking.pitch?.avatar}
                  alt="hepta-brown"
                  className="min-h-[200px] min-w-[200px] rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="flex">
                <h1 className="w-2/3">{booking.pitch?.name}</h1>
                <p className="w-1/3 flex justify-end">
                  {booking.shift?.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="h-32 w-[147vh]">
                {
                  booking.service_ids && booking.service_ids.length > 0 ?
                   <>
                   {console.log(booking.service_ids)}
                  <h2>Các Dịch Vụ :</h2>
                 <p>
                   {" "}
                   {booking.service_ids?.map((item: any) => (
                         <div key={item.id}>
                           {console.log("Service IDs:", item.name)}
                           {item.name}
                         </div>
                       ))}
                 </p>
                 </> : <p>{booking.pitch?.description}</p>
                }
                
               
              </div>
              <div className="flex justify-end gap-4 pt-2">
                
                  <Button
                  key={booking.shift?._id}
                    onClick={handleToggleFindOpponent}
                    className={`px-6 py-1 rounded-lg ${ booking.shift?.find_opponent === "Find" ? "bg-red-500" : "bg-green-500" }`}
                  >
                    {booking.shift?.find_opponent === "Find" ? (
                    <span className="text-white ">Tắt Tìm Đối</span>
                    ) : (
                      <span className="text-white ">Bật Tìm Đối</span>
                      )}
                  </Button>

                <Show when={booking.status === "success"}>
                  <Button
                    onClick={handleCancelBooking}
                    className={`px-4 py-1 rounded-lg bg-red-500`}
                  >
                    <span className="text-white ">Hủy lịch</span>
                  </Button>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryItem;
