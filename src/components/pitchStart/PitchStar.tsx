import { Swiper, SwiperSlide } from "swiper/react";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { Link } from "react-router-dom";
import { Empty, Rate } from "antd";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { useEffect } from "react";
import { fetchAllPitchStart } from "~/Redux/Slices/pitchSlice";
import IPitch from "~/interfaces/pitch";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
const PitchStar = () => {
    const dispatch = useAppDispatch();
    const pitchs = useAppSelector((state) => state.pitch.pitchs);
    const services = useAppSelector((state) => state.service.services);
    useEffect(() => {
        dispatch(fetchAllPitchStart({ min: 5, max: 5 }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllServiceMid());
    }, [dispatch]);
    return (
        <div>
            <div className="hot-pitch mx-auto max-w-screen-2xl xl px-[30px]">
                <h1>Sân Bóng Đánh Giá 5 Sao</h1>
                <Swiper
                    spaceBetween={80}
                    slidesPerView={3}
                    onSlideChange={() => //console.log("slide change")}
                    onSwiper={(swiper) => //console.log(swiper)}
                >
                    {pitchs && pitchs.length > 0 ? (
                        pitchs.map((item: IPitch) => (
                            <SwiperSlide>
                                <div className="item-pitch ">
                                    <Link to={`/pitch/detail/${item._id}`}>
                                        <div className="imgae-item-pitch">
                                            <img src={item?.avatar} className="h-[250px] object-cover" width="100%" alt="" />
                                        </div>
                                        <div className="text-item-pitch">
                                            <Rate disabled defaultValue={5} /> <span>( {item?.feedback_id?.length} Review)</span>
                                            <h3>{item?.name}</h3>
                                            <p>Số Người :7 Người</p>
                                            <p className="flex justify-between my-[10px]">
                                                Dịch Vụ :
                                                {item?.services.map((data: any) => {
                                                    // //console.log("data Sê vít", data);
                                                    const service = services?.find(
                                                        (item) => item._id == data._id
                                                    );
                                                    return (
                                                        <span key={data._id!}>
                                                            <i className="fa-solid fa-check"></i>{" "}
                                                            {service ? service?.name : "Chưa có dịch vụ"}
                                                        </span>
                                                    );
                                                })}
                                            </p>
                                            <p className="flex justify-between">
                                                Giá :
                                                <span>
                                                    <del className="italic text-[13px]">
                                                        300.000-1.200.000
                                                    </del>
                                                </span>
                                                <span className="text-[23px] text-[#ffb932] text-bold">
                                                    {item?.deposit_price?.toLocaleString('vi-VN')} - 850.000
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div><Empty /></div>
                    )}

                </Swiper>
            </div>
        </div>
    )
}

export default PitchStar