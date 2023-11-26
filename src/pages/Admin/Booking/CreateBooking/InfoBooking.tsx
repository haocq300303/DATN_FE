import { ClockCircleOutlined, HomeOutlined, RadarChartOutlined, TransactionOutlined, UserOutlined, SecurityScanFilled } from "@ant-design/icons";
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

            <div className="space-y-5 max-h-[340px] overflow-auto scrollbar-sm -mr-2 pr-2">
                <Show when={!!dataBooking[0]}>
                    <div className="flex">
                        <span className="w-8 text-2xl">
                            <UserOutlined />
                        </span>
                        <div className="text-lg">
                            Người đặt sân <strong>{dataBooking[0]?.fullName}</strong>
                        </div>
                    </div>
                </Show>

                <Show when={!!dataBooking[1]}>
                    <div className="flex">
                        <span className="w-8 text-2xl">
                            <RadarChartOutlined />
                        </span>
                        <div className="text-lg">
                            Sân đăng ký <strong>{dataBooking[1]?.name}</strong>
                        </div>
                    </div>
                </Show>

                <Show when={!!dataBooking[2]}>
                    <div className="flex">
                        <span className="w-8 text-xl">
                            <ClockCircleOutlined />
                        </span>
                        <div className="text-lg">
                            {dataBooking[1]?.name} <strong>{dataBooking[2]?.shiftTime}</strong> ({dataBooking[2]?.shiftDay})
                        </div>
                    </div>

                    <div className="flex">
                        <span className="w-8 text-2xl">
                            <TransactionOutlined />
                        </span>
                        <div className="text-lg">
                            Giá sân <strong>{dataBooking[2]?.price?.toLocaleString()} VNĐ</strong>
                        </div>
                    </div>
                </Show>

                <Show when={!!dataBooking[3]}>
                    <div className="flex">
                        <span className="w-8 text-2xl">
                            <SecurityScanFilled />
                        </span>
                        <div className="text-lg">
                            {dataBooking[3]?.map((service) => (
                                <div key={service._id} className="">
                                    Dịch vụ{" "}
                                    <strong>
                                        {service.name} - {service?.price?.toLocaleString()} VNĐ
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </Show>
            </div>

            <div className="text-lg">
                Tổng tiền:{" "}
                <strong>
                    {(
                        (dataBooking[2] as any)?.price + (dataBooking[3]?.reduce((total, service) => total + service.price, 0) || 0)
                    )?.toLocaleString() || 0}{" "}
                    VNĐ
                </strong>
            </div>
            <div className="mb-6"></div>
        </section>
    );
};

export default InfoBooking;
