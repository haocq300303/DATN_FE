import React, { Dispatch } from "react";
import { DataBookingType, PitchInfoType } from ".";

const SelectChildrenPitchItem = () => {
    return (
        <div className="cursor-pointer ">
            <img src="https://picsum.photos/300/300" className="aspect-video object-cover rounded-md" />

            <h3 className="text-center text-base font-medium mt-2">Sân 1</h3>
        </div>
    );
};

const SelectChildrenPitch = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
    const handlePickPitch = () => {
        const _pitchChild: PitchInfoType = {
            name: "Ca 1",
            address: "hii",
        };
        const _dataBooking = [...dataBooking];

        _dataBooking[1] = _pitchChild;
        setDataBooking(_dataBooking as DataBookingType);
    };
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="" onClick={handlePickPitch}>
                <SelectChildrenPitchItem />
            </div>
            <SelectChildrenPitchItem />
            <SelectChildrenPitchItem />
        </div>
    );
};

export default SelectChildrenPitch;
