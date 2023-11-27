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
    // Get store
    const pitchId = "653ca30f5d70cbab41a2e5d0";

    const { data, isFetching } = useGetAllChildrenPitchByPitchIdQuery(pitchId);

    const handlePickPitch = ({ code_chirldren_pitch, _id }: IChildrentPitch) => {
        const _pitchChild: PitchChildrenInfoType = {
            name: "Sân" + code_chirldren_pitch,
            _id,
        };
        const _dataBooking = [...dataBooking];

        _dataBooking[1] = _pitchChild;
        setDataBooking(_dataBooking as DataBookingType);
    };

    return (
        <>
            <h2 className="text-xl font-medium leading-3">Chọn sân đá</h2>

            <hr className="my-3" />

            <Show when={isFetching}>
                <p>Loading....</p>
            </Show>

            <Show when={!isFetching}>
                <div className="grid grid-cols-2 gap-5">
                    {data?.data.map((childrentPitch) => (
                        <div className="" onClick={() => handlePickPitch(childrentPitch)} key={childrentPitch._id}>
                            <SelectChildrenPitchItem {...childrentPitch} />
                        </div>
                    ))}
                </div>
            </Show>
        </>
    );
};

export default SelectChildrenPitch;
