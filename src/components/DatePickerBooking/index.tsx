import { DatePicker } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";

import { DatePickerProps } from "antd/es/date-picker";
import "dayjs/locale/zh-cn";
import { toast } from "react-toastify";

type DatePickerBookingProps = { onChange?: (date: string) => void } & Omit<DatePickerProps, "onChange">;

const DatePickerBooking = ({ onChange, ...props }: DatePickerBookingProps) => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const [value, setValue] = useState<any>(currentDate);

    const handleChange = (e: any) => {
        const datePicker = format(e.$d, "yyyy-MM-dd");
        if (datePicker < currentDate) return toast.warning("Bạn không thể chọn một ngày trong quá khứ !!");
        setValue(datePicker);
        if (onChange) onChange(datePicker);
    };
    return (
        <div className="inline-flex">
            <DatePicker
                disabledDate={(current) => current.isBefore(currentDate)}
                value={dayjs(value, "YYYY-MM-DD")}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
};

export default DatePickerBooking;
