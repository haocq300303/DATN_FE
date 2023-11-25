import { Modal } from "antd";
import { Dispatch, useState } from "react";
import { Show } from "~/components/Show";
import InfoBooking from "./InfoBooking";
import SelectShift from "./SelectShift";
import SelectChildrenPitch from "./SelectChildrenPitch";

type FormCreateBookingProps = {
    isOpen: boolean;
    setOpen: Dispatch<boolean>;
};

export type PitchInfoType = {
    name: string;
    address: string;
};

export type ShiftInfoType = {
    name: string;
    shiftDay: string;
    shiftTime: string;
    price: number;
};

export type PitchChildrenInfoType = {
    name: string;
};

export type DataBookingType = [PitchChildrenInfoType?, ShiftInfoType?];

const FormCreateBooking = ({ isOpen, setOpen }: FormCreateBookingProps) => {
    const [dataBooking, setDataBooking] = useState<DataBookingType>([]);

    const infoPitch = { name: "Sân Bóng Trần Hữu Dực", address: "Số 6, Trần Hữu Dực, Nam Từ Liêm, Hà Nội" };

    const handleBackPick = () => {
        const _dataBooking = [...dataBooking];

        setDataBooking(_dataBooking.slice(0, -1) as DataBookingType);
    };

    const handleConfirmBooking = () => {
        console.log(dataBooking);
    };

    return (
        <div className="">
            <Modal open={isOpen} onCancel={() => setOpen(false)} width="1044px" footer={false}>
                <div className="grid grid-cols-[1fr_2fr] gap-6 text-[#003553]">
                    <div className="rounded-xl shadow-md bg-white overflow-hidden">
                        <h3 className="text-xl  bg-[linear-gradient(36deg,#00b5f1,#00e0ff)] p-2 text-white text-center font-bold">
                            Thông tin đặt lịch
                        </h3>

                        <InfoBooking dataBooking={dataBooking} infoPitch={infoPitch} />
                    </div>

                    <div className="rounded-xl shadow-md bg-white overflow-hidden">
                        <h3 className="text-xl  font-bold bg-[linear-gradient(36deg,#00b5f1,#00e0ff)] p-2 text-white text-center">
                            Thông tin sân và giá tiền
                        </h3>

                        <div className="h-[400px] px-4 py-5">
                            <Show when={!dataBooking[0]}>
                                <SelectChildrenPitch dataBooking={dataBooking} setDataBooking={setDataBooking} />
                            </Show>
                            <Show when={!!dataBooking[0]}>
                                <SelectShift dataBooking={dataBooking} setDataBooking={setDataBooking} />
                            </Show>
                        </div>

                        <div className="px-4 mt-4 flex space-x-6 mb-6">
                            <Show when={dataBooking.length > 0}>
                                <button
                                    onClick={handleBackPick}
                                    className="flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1 px-2"
                                >
                                    Quay lại
                                    <svg
                                        className="ml-2"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        color="#003553"
                                        height="16"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </Show>

                            <Show when={!!dataBooking[1]}>
                                <button
                                    onClick={handleConfirmBooking}
                                    className="bg-[#228e8a] text-white px-4 flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1"
                                >
                                    Xác nhận
                                </button>
                            </Show>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FormCreateBooking;
