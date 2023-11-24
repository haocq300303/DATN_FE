import { DatePicker } from "antd";
import { Dispatch } from "react";
import { DataBookingType, ShiftInfoType } from ".";
import { useGetShiftsByChildrenPitchQuery } from "~/Redux/shift/shift.api";
import { Show } from "~/components/Show";
import IShift from "~/interfaces/shift";
import { format, parseISO } from "date-fns";

const SelectShiftItem = ({ number_shift, start_time, end_time, price }: IShift) => {
    return (
        <div className="flex flex-col items-center">
            <button className="items-center flex flex-col border border-[#00e0ff] hover:bg-[linear-gradient(83.63deg,#00b5f1_33.34%,#00e0ff_113.91%)] hover:text-white text-base px-5 py-2 rounded-md">
                <span>
                    {start_time} - {end_time}
                </span>
                <span className="text-[#67922c] mt-2 text-base">({price?.toLocaleString()} VND)</span>
            </button>

            <span className="text-base">Ca {number_shift}</span>
        </div>
    );
};

const SelectShift = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
    const handlePickTime = ({ number_shift, start_time, end_time, price, date }: IShift) => {
        const _shift: ShiftInfoType = {
            name: "Ca " + number_shift,
            shiftDay: format(parseISO(date), "dd/MM/yyyy"),
            shiftTime: start_time + " - " + end_time,
            price,
        };
        const _dataBooking = [...dataBooking];

        _dataBooking[1] = _shift;
        setDataBooking(_dataBooking as DataBookingType);
    };

    const { data, isFetching } = useGetShiftsByChildrenPitchQuery({
        childrenPitchId: "655efedffefca5c9571573b1",
        params: {
            id_pitch: "653ca30f5d70cbab41a2e5d0",
            date: "2023-11-25",
        },
    });

    return (
        <div>
            <div className="flex justify-end">
                <DatePicker className="bg-[#51e493] text-white" />
            </div>

            <div className="mt-7 grid grid-cols-3 gap-10">
                <Show when={isFetching}>
                    <p>Loading....</p>
                </Show>

                <Show when={!isFetching}>
                    {data?.data.map((shift) => (
                        <div className="" onClick={() => handlePickTime(shift)} key={shift._id}>
                            <SelectShiftItem {...shift} />
                        </div>
                    ))}
                </Show>
            </div>
        </div>
    );
};

export default SelectShift;
