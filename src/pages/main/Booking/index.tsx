import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BillScreen from "./screens/BillScreen";
import BookingScreen from "./screens/BookingScreen";
import InfoScreen from "./screens/InfoScreen";
import { toast } from "react-toastify";
import { IInfoBooking } from "~/interfaces/booking.type";

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

    const a: IInfoBooking = {
        pitch: {
            _id: "655efedffefca5c9571573b1",
            name: "sân",
            image: "https://picsum.photos/300/300",
            address: "ss",
        },
        admin_pitch: {
            _id: "655efedffefca5c9571573b1",
            name: "admin",
            phone: "098",
        },
        children_pitch: {
            _id: "655efedffefca5c9571573b1",
            children_pitch_code: "1",
        },
        shift: {
            _id: "1",
            price: 600000,
            shift_day: "2023",
        },
        services: [{ _id: "655efedffefca5c9571573b1", name: "dvu 1", price: 120000, image: "https://picsum.photos/300/300" }],
    };
    sessionStorage.setItem("infoBooking", JSON.stringify(a));
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

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
