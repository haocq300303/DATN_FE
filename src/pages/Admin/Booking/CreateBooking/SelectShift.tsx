import { DatePicker } from "antd";
import { Dispatch } from "react";
import { DataBookingType, ShiftInfoType } from ".";

const SelectShiftItem = () => {
    return (
        <div className="flex flex-col items-center">
            <button className="items-center flex flex-col border border-[#00e0ff] hover:bg-[linear-gradient(83.63deg,#00b5f1_33.34%,#00e0ff_113.91%)] hover:text-white text-base px-5 py-2 rounded-md">
                <span>07:00 - 08:00</span>
                <span className="text-[#67922c] mt-2 text-base">(800.000 VND)</span>
            </button>

            <span className="text-base">Ca 1</span>
        </div>
    );
};

const SelectShift = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
    const handlePickTime = () => {
        const _shift: ShiftInfoType = {
            name: "Ca 5",
            shiftDay: "12/03/2023",
            shiftTime: "7:00 - 9:00",
            price: 200,
        };
        const _dataBooking = [...dataBooking];

        _dataBooking[0] = _shift;
        setDataBooking(_dataBooking as DataBookingType);
    };

    return (
        <div>
            <div className="flex justify-end">
                <DatePicker className="bg-[#51e493] text-white" />
            </div>
            <div className="mt-7 grid grid-cols-3 gap-10">
                <div className="" onClick={handlePickTime}>
                    <SelectShiftItem />
                </div>

                <SelectShiftItem />
                <SelectShiftItem />
            </div>
        </div>
    );
};

export default SelectShift;
