import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BillScreen from "./screens/BillScreen";
import BookingScreen from "./screens/BookingScreen";
import InfoScreen from "./screens/InfoScreen";
import { toast } from "react-toastify";

const BookingPage: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [steps] = useState([
        {
            title: <div>Điền thông tin </div>,
            content: <InfoScreen setCurrent={setCurrent} />,
        },
        {
            title: "Thông tin đặt",
            content: <BookingScreen setCurrent={setCurrent} />,
        },
        {
            title: "Check bill thanh toán",
            content: <BillScreen />,
        },
    ]);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    sessionStorage.setItem(
        "infoBooking",
        JSON.stringify({
            pitch_name: "Sân bóng Hà Nội",
            pitch_avatar: "https://picsum.photos/300/300",
            admin_pitch_id: "64bdf702a270d23097e91162",
            admin_pitch_name: "Tên chủ sân",
            admin_pitch_phone: "0788113114",
            pitch_id: "64b3759f72fc2491a4d73312",
            pitch_address: "Cao đẳng fpt polytecnic",
            children_pitch_id: "6527771fe9a39084565ae5d3",
            shift_id: "653724069cf0d02633a55a31",
            price: 1000000,
            booking_day: "19/10/2023 | 14:20-16:20",
        })
    );

    useEffect(() => {
        const infoBooking = sessionStorage.getItem("infoBooking");
        if (!infoBooking) {
            toast.info("Bạn chưa có thông tin đặt sân trước đó");
            navigate(-1);
            return;
        }
        const mode = searchParams.get("mode");
        if (!mode) {
            setSearchParams({ mode: "info" });
        }
        if (mode === "info") setCurrent(0);
        if (mode === "order") setCurrent(1);
        if (mode === "check") setCurrent(2);
    }, [searchParams, setSearchParams, navigate]);

    const items = steps?.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="my-4 max-w-[1000px] mx-auto">
            <div className="note">Thanh toán đi đừng có lằng nhằng!!!</div>
            <div className="my-4">
                <Steps current={current} items={items} />
            </div>

            <div className="mt-4">{steps[current].content}</div>

            <div className="h-10"></div>
        </div>
    );
};

export default BookingPage;
