import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BillScreen from "./screens/BillScreen";
import BookingScreen from "./screens/BookingScreen";
import InfoScreen from "./screens/InfoScreen";

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

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get("mode");
        if (!mode) {
            setSearchParams({ mode: "info" });
        }
        if (mode === "info") setCurrent(0);
        if (mode === "order") setCurrent(1);
        if (mode === "check") setCurrent(2);
    }, [searchParams, setSearchParams]);

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
