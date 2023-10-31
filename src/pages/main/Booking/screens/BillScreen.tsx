import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetBookingByPaymentIdQuery } from "~/Redux/booking/bookingApi";
import BillBanking from "~/components/BillBanking";
import { hideLoader, showLoader } from "~/components/LoaderAllPage";
import { BillBankingProps } from "~/interfaces/payment.type";

const BillScreen = () => {
    const [searchParams] = useSearchParams();
    const { data, isFetching } = useGetBookingByPaymentIdQuery(
        { payment_id: searchParams.get("payment_id") as string },
        { skip: !searchParams.get("payment_id") }
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isFetching) {
            showLoader();
        } else {
            hideLoader();
        }
    }, [isFetching]);

    const handleConfirmBill = () => {
        Swal.fire({
            position: "center",
            title: "Warning",
            text: "Bạn chắc chắn với thông tin trên chứ!!",
            icon: "warning",
            confirmButtonText: "Đồng ý",
            showDenyButton: true,
            returnInputValueOnDeny: false,
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("infoBooking");
                toast.success("Cảm ơn bạn đã đặt sân trên hệ thống của chúng tôi !!!");
                navigate("/booking/history");
            }
        });
    };

    const billData: BillBankingProps = {
        payment_id: data?.data?.payment_id as string,
        payment: data?.data?.payment,
    };
    return (
        <div>
            <BillBanking {...billData} />

            <div className="mt-6 flex justify-end gap-x-3">
                <button className="inline-flex justify-center items-center gap-x-3 text-sm text-center hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 bg-red-500 no-underline text-white">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                    PDF
                </button>
                <button
                    onClick={handleConfirmBill}
                    className="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 bg-green-600 border-none text-white"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default BillScreen;
