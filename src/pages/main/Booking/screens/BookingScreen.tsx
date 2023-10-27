import { Button, Radio } from "antd";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNewBookingAffterPayMutation } from "~/Redux/booking/bookingApi";
import { createUrlVnpay } from "~/api/vnpay.api";

type BookingScreenProps = {
    setCurrent: React.Dispatch<number>;
};

const BookingScreen = ({ setCurrent }: BookingScreenProps) => {
    const [modeBanking, setModeBanking] = useState<number>(1); // 1=== thanh toán toàn bộ, 2 === cọc 20%
    const [searchParams, setSearchParams] = useSearchParams();

    //
    const [newBooking] = useNewBookingAffterPayMutation();

    // Get redux store
    const currentUser = { _id: "65131393f8698962d691cd12" };
    // Get session
    const infoBooking = {
        price: 2000000,
        admin_pitch_id: "64bdf702a270d23097e91162",
        pitch_id: "64b3759f72fc2491a4d73312",
        pitch_name: "Sân bóng Hà Nội",
        pitch_address: "",
        shift_id: "653724069cf0d02633a55a31",
        children_pitch_id: "6527771fe9a39084565ae5d3",
    };

    const handleBanking = () => {
        Swal.fire({
            position: "center",
            title: "Warning",
            text: "Bạn xác nhận thanh toán chứ!!",
            icon: "warning",
            confirmButtonText: "Đồng ý",
            showDenyButton: true,
            returnInputValueOnDeny: false,
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const _infoBooking = {
                    user_bank: currentUser._id,
                    user_receiver: infoBooking?.admin_pitch_id,
                    vnp_OrderInfo: "Thanh toan",
                    price_received: modeBanking === 1 ? infoBooking?.price : infoBooking?.price * 0.2,
                    total_received: infoBooking?.price,
                };
                createUrlVnpay(_infoBooking)
                    .then(async (result) => {
                        const urlRedirect = result.data.url_redierct;

                        window.open(urlRedirect, "_self");
                    })
                    .catch((error: any) => {
                        toast.error("Lỗi " + error.message);
                        console.log(error);
                    });
            }
        });
    };

    useEffect(() => {
        const handleNewBooking = async () => {
            const paymentId = searchParams.get("payment_id");
            if (paymentId) {
                const _infoBooking = {
                    pitch_id: infoBooking.pitch_id,
                    user_id: currentUser._id,
                    shift_id: infoBooking.shift_id,
                    children_pitch_id: infoBooking.children_pitch_id,
                    payment_id: paymentId,
                };
                // Show Loading

                newBooking(_infoBooking)
                    .unwrap()
                    .then((result) => {
                        setSearchParams({
                            mode: "check",
                            code: searchParams.get("code") as string,
                            payment_id: searchParams.get("payment_id") as string,
                        });
                        setCurrent(2);
                        toast.success(result.message);
                    })
                    .catch((error) => {
                        toast.error("Booking thất bại " + error.message);
                    })
                    .finally(() => {
                        // Hide loading
                    });
            }
        };
        handleNewBooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get("payment_id")]);

    return (
        <div className="border border-solid px-5 py-2 rounded-md border-[#e7e7e7]">
            <div className="note">Vui lòng xác nhận đúng thông tin và thời gian đặt sân để chúng tôi có thể xử lý cho bạn chính xác nhất</div>
            <section>
                <h2 className="bg-[#EBF3FF] pl-2 py-1 my-4 text-xl font-semibold">Thông tin đặt sân</h2>
                <div className="md:flex items-center">
                    <div className="w-full md:w-[300px] md:min-w-[300px] h-[300px]">
                        <img src="https://picsum.photos/300/300" alt="" className="w-full rounded-md" />
                    </div>

                    <div className="mt-2 md:mt-0 flex-1 md:ml-10 space-y-2 md:space-y-4 text-base md:text-lg">
                        <div className="flex flex-wrap ">
                            <div className="mr-3 flex justify-between text-[#422eb1] font-semibold  w-[100px]">
                                Tên sân <span>:</span>{" "}
                            </div>
                            <span className="flex-1 text-[#242424]">{infoBooking?.pitch_name}</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="text-[#422eb1] font-semibold mr-3 flex justify-between w-[100px]">
                                Địa chỉ <span>:</span>{" "}
                            </div>
                            <span className="flex-1 text-[#242424]">{infoBooking?.pitch_address}</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="text-[#422eb1] font-semibold mr-3 flex justify-between w-[100px]">
                                Giờ thuê <span>:</span>{" "}
                            </div>
                            <span className="flex-1 text-[#242424]">19/10/2023 | 14:20-16:20</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="text-[#422eb1] font-semibold mr-3 flex justify-between w-[100px]">
                                Chủ sân <span>:</span>{" "}
                            </div>
                            <span className="flex-1 text-[#242424]">Sân bóng Hà Nội</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="text-[#422eb1] font-semibold mr-3 flex justify-between w-[100px]">
                                Số đt <span>:</span>{" "}
                            </div>
                            <span className="flex-1 text-[#242424]">Sân bóng Hà Nội</span>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className="bg-[#EBF3FF] pl-2 py-1 my-4 text-xl font-semibold">
                    Tóm tắt giá <span className="text-xs md:text-sm font-normal">(cho tất cả mọi người)</span>
                </h2>

                <div className="flex justify-between items-center">
                    <Radio.Group
                        className="flex flex-col space-y-6"
                        defaultValue={1}
                        value={modeBanking}
                        onChange={(e) => setModeBanking(e.target.value)}
                    >
                        <Radio value={1} className="text-base">
                            Trả toàn bộ ({infoBooking?.price?.toLocaleString()} VNĐ)
                        </Radio>
                        <Radio value={2} className="text-base">
                            Đặt cọc (20%) - ({(infoBooking?.price * 0.2)?.toLocaleString()} VNĐ)
                        </Radio>
                    </Radio.Group>

                    <div className="w-24 h-24 rounded-md">
                        <img
                            src="https://static.vivnpay.vn/202211211351/gioi-thieu-vi-vnpay-qua-khung-ca-doi.jpeg"
                            alt=""
                            className="w-full rounded-md"
                        />
                    </div>
                </div>
                <div className="mt-4 text-sm">
                    <span className="text-red-500">Lưu ý *:</span> Chúng tôi chỉ nhận thanh toán bằng hình thức internet banking qua trang web của
                    chúng tôi. Mọi thanh toán ngoài luồng đều không được chấp nhận.
                </div>
            </section>

            <section>
                <h2 className="bg-[#EBF3FF] pl-2 py-1 my-4 text-xl font-semibold">Chi phí hủy là bao nhiêu?</h2>

                <div className="text-base">Chi phí hủy sân là 10% số tiền cọc sân trước đó</div>
            </section>

            <hr className="my-6 border-t-[1px] border-solid border-[#404040]" />

            <section className="my-4 flex justify-end">
                <Button type="primary" className="bg-[#36d833] text-white" onClick={() => setCurrent(0)}>
                    Quay lại trang trước đó
                </Button>
                <Button type="primary" className="ml-6 bg-[#3255f3] text-white" onClick={handleBanking}>
                    Xác nhận thanh toán
                </Button>
            </section>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(BookingScreen);