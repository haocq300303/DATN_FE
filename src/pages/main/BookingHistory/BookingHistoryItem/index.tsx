import { Badge, Button } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Show } from "~/components/Show";
import { IBooking } from "~/interfaces/booking.type";
// import { IBooking } from "~/interfaces/booking.type";

const BookingHistoryItem = (booking: IBooking) => {
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

    return (
        <tr key={booking._id} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl ">
            <td className="rounded-r-[8px] px-3 py-4 text-sm font-normal text-[#637381]">
                <div className="relative  items-center gap-1 md:flex lg:flex ">
                    <div className="h-[50px] w-[50px]">
                        <img src={booking.pitch?.avatar} alt="hepta-brown" className="min-h-[50px] min-w-[22px] rounded-md" />
                    </div>
                    <div>{booking.pitch?.name}</div>
                </div>
            </td>
            <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">{booking.pitch?.address}</td>
            <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                <span className="text-lime-800">{booking.shift?.time_start}</span>-<span className="text-green-800">{booking.shift?.time_end}</span>
            </td>
            <td className="px-1 py-4 text-sm font-normal text-[#637381]">{booking.shift?.number_shift}</td>
            <td className="px-1 py-4 text-sm font-normal text-[#637381]">{booking.shift?.price}</td>

            <td className="px-1 py-4 text-sm font-normal text-[#637381]">{format(new Date(booking?.updatedAt), "HH:mm:ss dd-MM-yyyy")}</td>
            <td className="px-1 py-4 ">
                <Badge
                    count={booking.status === "success" ? "Đăt lịch thành công" : "Đã hủy trước đó"}
                    showZero
                    color={booking.status === "success" ? "#52c41a" : "#faad14"}
                />
            </td>

            <td className="px-1 py-4 ">
                <Show when={booking.status === "success"}>
                    <Button onClick={handleCancelBooking} className={`px-4 py-1 rounded-lg bg-red-500`}>
                        <span className="text-white ">Hủy lịch</span>
                    </Button>
                </Show>
            </td>
        </tr>
    );
};

export default BookingHistoryItem;
