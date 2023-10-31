import Swal from "sweetalert2";
import { IBooking } from "~/interfaces/booking.type";

const BookingHistoryItem = ({ pitch, status }: IBooking) => {
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
    return (
        <section className="flex items-center space-x-4">
            <div className="w-10 h-10">
                <img src={pitch?.avatar} alt="" />
            </div>

            <span>{status === "success" ? "Đặt thành công" : "Bạn đã hủy lịch"}</span>

            {status === "success" && (
                <button onClick={handleCancelBooking} className="px-4 py-1 bg-green-500">
                    Hủy đặt lịch
                </button>
            )}
        </section>
    );
};

export default BookingHistoryItem;
