import { Dispatch } from "react";
import { useGetAllChildrenPitchByPitchIdQuery } from "~/Redux/pitch/pitch.api";
import { Show } from "~/components/Show";
import IChildrentPitch from "~/interfaces/childrentPitch";
import { DataBookingType, PitchChildrenInfoType } from ".";

const SelectChildrenPitchItem = ({ code_chirldren_pitch }: IChildrentPitch) => {
    return (
        <div className="cursor-pointer ">
            <img
                src="http://res.cloudinary.com/dwp7umncy/image/upload/v1698472712/datn-img/wf48fo9qkwrka4icasrz.jpg"
                className="aspect-video object-cover rounded-md"
            />

            <h3 className="text-center text-base font-medium mt-2">Sân {code_chirldren_pitch}</h3>
        </div>
    );
};

const SelectChildrenPitch = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
    const handlePickPitch = ({ code_chirldren_pitch }: IChildrentPitch) => {
        const _pitchChild: PitchChildrenInfoType = {
            name: "Sân" + code_chirldren_pitch,
        };
        const _dataBooking = [...dataBooking];

        _dataBooking[0] = _pitchChild;
        setDataBooking(_dataBooking as DataBookingType);
    };

    const { data, isFetching } = useGetAllChildrenPitchByPitchIdQuery("653ca30f5d70cbab41a2e5d0");

    return (
        <div className="grid grid-cols-2 gap-5">
            <Show when={isFetching}>
                <p>Loading....</p>
            </Show>
            <Show when={!isFetching}>
                {data?.data.map((childrentPitch) => (
                    <div className="" onClick={() => handlePickPitch(childrentPitch)} key={childrentPitch._id}>
                        <SelectChildrenPitchItem {...childrentPitch} />
                    </div>
                ))}
            </Show>
        </div>
    );
};

export default SelectChildrenPitch;
