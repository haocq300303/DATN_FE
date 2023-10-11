import { Button, Steps, message } from "antd";
import React, { useState } from "react";
import BookingScreen from "./screens/BookingScreen";
import PaymentScreen from "./screens/PaymentScreen";

const BookingPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const [steps] = useState([
        {
            title: <div>Điền thông tin </div>,
            content: <BookingScreen />,
        },
        {
            title: "Second",
            content: <PaymentScreen current={current} setCurrent={setCurrent} />,
        },
        {
            title: "Last",
            content: "Last-content",
        },
    ]);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps?.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="max-w-[1000px] mx-auto">
            <Steps current={current} items={items} />

            <div className="mt-4">{steps[current].content}</div>

            {/* <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success("Processing complete!")}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div> */}
        </div>
    );
};

export default BookingPage;
