import { ClockCircleOutlined, HomeOutlined, RadarChartOutlined, TransactionOutlined } from "@ant-design/icons";
import { Show } from "~/components/Show";
import { DataBookingType, PitchInfoType } from ".";

const InfoBooking = ({ dataBooking, infoPitch }: { dataBooking: DataBookingType; infoPitch: PitchInfoType }) => {
    return (
        <section className="mt-2 px-4 py-2 space-y-5">
            <div className="flex">
                <span className="w-8 text-xl">
                    <HomeOutlined />
                </span>
                <div className="">
                    <p className="text-lg">
                        Sân bóng <strong>{infoPitch?.name}</strong>
                    </p>
                    <p className="text-[#858585] text-sm">{infoPitch?.address} </p>
                </div>
            </div>

            <Show when={!!dataBooking[0]}>
                <div className="flex">
                    <span className="w-8 text-2xl">
                        <RadarChartOutlined />
                    </span>
                    <div className="text-lg">
                        Sân đăng ký <strong>{dataBooking[0]?.name}</strong>
                    </div>
                </div>
            </Show>

            <Show when={!!dataBooking[1]}>
                <div className="flex">
                    <span className="w-8 text-xl">
                        <ClockCircleOutlined />
                    </span>
                    <div className="text-lg">
                        {dataBooking[1]?.name} <strong>{dataBooking[1]?.shiftTime}</strong> ({dataBooking[1]?.shiftDay})
                    </div>
                </div>

                <div className="flex">
                    <span className="w-8 text-2xl">
                        <TransactionOutlined />
                    </span>
                    <div className="text-lg">
                        Giá sân <strong>{dataBooking[1]?.price?.toLocaleString()} VNĐ</strong>
                    </div>
                </div>
            </Show>

            {/* <Show when={!!dataBooking[2]}>
                <div className="flex">
                    <span className="w-8 text-2xl">
                        <TransactionOutlined />
                    </span>
                    <div className="text-lg">
                        Giá sân <strong>{dataBooking[2]?.price} VNĐ</strong>
                    </div>
                </div>
            </Show> */}

            <div className="mb-6"></div>
        </section>
    );
};

export default InfoBooking;
