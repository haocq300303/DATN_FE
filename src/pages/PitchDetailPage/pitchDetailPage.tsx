import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import {
  Button,
  Carousel,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  Modal,
  Rate,
  Select,
  Space
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import "./pitchDetailPage.css";

// import { IService } from "~/interfaces/service";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getOnePitch } from "~/api/pitch";
import FindOpponent from "~/components/FindOpponent/FindOpponent";
import IPitch from "~/interfaces/pitch";
// import IShift from "~/interfaces/shift";
// import { fetchAllChildrenPitch } from "~/Redux/Slices/childrentPitch";
import { fetchAllPitch } from "~/Redux/Slices/pitchSlice";
// import { fetchAllShift } from "~/Redux/Slices/shiftSlice";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
// const today = dayjs();

const PitchDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [dataBookShift, setDataBookShift] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookShift, setModalBookShift] = useState(false);
  const [childrenPitchs, setShildrenPitchs] = useState([]);
  const [Pitch, setPitch] = useState<IPitch>({} as IPitch);
  // console.log({
  //   pitch_name: Pitch.name,
  //   pitch_avatar: Pitch.avatar,
  //   admin_pitch_id: Pitch.admin_pitch_id,
  //   admin_pitch_name: "Tên chủ sân",
  //   admin_pitch_phone: "0788113114",
  //   pitch_id: Pitch._id,
  //   pitch_address: Pitch.address,
  //   children_pitch_id: "",
  //   shift_id: "",
  //   price: 0,
  //   booking_day: "19/10/2023 | 14:20-16:20",
  // });

  const services = useAppSelector((state) => state.service.services);

  const pitchAll = useAppSelector((state) => state.pitch.pitchs);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/childrentPicth/parent/${id}${
          selectedDate && selectedDate.trim() !== ""
            ? `?date=${selectedDate}`
            : ""
        }`
      );
      setShildrenPitchs(data.data);
      setIsLoading(false);
    })();
  }, [id, selectedDate]);

  // form modal
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  //  form add đặt nhiều ngày

  // xử lí detailPitch
  useEffect(() => {
    getOnePitch(String(id)).then(({ data: { data } }) => setPitch(data));
  }, [id]);

  const handleComfirmBookShift = (data: any) => {
    setDataBookShift(data);
    setModalBookShift(true);
  };

  const onFinishModalBookShift = async (values: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/shift",
        values
      );

      sessionStorage.setItem(
        "infoBooking",
        JSON.stringify({
          pitch_name: Pitch.name,
          pitch_avatar: Pitch.avatar,
          admin_pitch_id: Pitch.admin_pitch_id,
          admin_pitch_name: "Tên chủ sân",
          admin_pitch_phone: "0788113114",
          pitch_id: Pitch._id,
          pitch_address: Pitch.address,
          children_pitch_id: data.data.id_chirlden_pitch,
          shift_id: data.data._id,
          price: data.data.price,
          booking_day: data.data.date,
        })
      );
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailedModalBookShift = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // Khi dataBookShift thay đổi, cập nhật giá trị initialValues trong form
    form.setFieldsValue({
      id_chirlden_pitch: dataBookShift?.id_chirlden_pitch,
      id_pitch: dataBookShift?.id_pitch,
      number_shift: dataBookShift?.number_shift,
      start_time: dataBookShift?.start_time,
      end_time: dataBookShift?.end_time,
      price: dataBookShift?.price,
      date: dataBookShift?.date,
    });
  }, [dataBookShift, form]);
  // const renderPitchCards = () => {
  //   const pitchCards = [];
  //   for (let i = 1; i <= Pitch.numberPitch; i++) {
  //     pitchCards.push(
  //       <div
  //         className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden"
  //         key={i}
  //       >
  //         <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
  //           Sân {i}
  //         </h3>
  //         <p className="mx-[20px] mt-[20px]">
  //           Thời Gian: 7:00
  //           <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
  //         </p>
  //         <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p>
  //         <p className="mx-[20px] mt-[20px]">
  //           Ca Sân :
  //           <div className="flex flex-wrap justify-between my-[20px]">
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 1
  //             </button>
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 2
  //             </button>
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 3
  //             </button>
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 4
  //             </button>
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 5
  //             </button>
  //             <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
  //               Ca 6
  //             </button>
  //           </div>
  //         </p>
  //         <div className="grid grid-cols-2 border mt-[20px] ">
  //           <button className="justify-center mx-auto flex border-r py-3 w-full items-center">
  //             <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
  //             Đặt Sân
  //           </button>
  //           <button>
  //             <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
  //             Tìm Đối
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return pitchCards;
  // };

  //end detailPitch
  // const childrenPitchs = useAppSelector(
  //   (state) => state.childrenPitch.childrentpitchs
  // );
  // console.log(services);

  // Xử lí đội bóng liên quan
  const districtsId = Pitch.districts_id; // ID của danh mục bạn muốn lọc
  // console.log("All Pitch", pitchAll);

  useEffect(() => {
    dispatch(fetchAllPitch(""));
  }, [dispatch]);

  const filteredPitch = pitchAll.filter(
    (pitch: IPitch) => pitch.districts_id === districtsId
  );

  // end xử lí đội bóng liên quan

  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);
  //

  // const shifts = useAppSelector((state) => state.shift.shift);

  // const dataTable = shifts.map((item: IShift, index: number) => ({
  //   ...item,
  //   key: index,
  // }));

  //end detailPitch
  // useEffect(() => {
  //   // dispatch(fetchAllShift());
  //   dispatch(fetchAllChildrenPitch());
  // }, [dispatch]);

  // const datachildrentPitch = childrenPitchs.data;
  // datachildrentPitch.forEach((element:any) => {
  //   console.log(element);

  //   if (element.idShifts) {
  //       const idShifts = element.idShifts;
  //       idShifts.forEach((shift:any) => {
  //           console.log(shift);
  //       });
  //       console.log(idShifts.length);

  //   }
  // });

  const data = [
    {
      label: "THÔNG TIN CƠ BẢN",
      value: "html",
      desc: (
        <>
          <div className="flex img-pitch gap-[20px]">
            <div className="left-img w-[65%] md:w-[100%]">
              <Image.PreviewGroup
                items={[
                  `
                  ${
                    Pitch?.images &&
                    Pitch.images.length > 0 &&
                    (Pitch.images[0], Pitch.images[1], Pitch.images[2])
                  }
                  `,
                ]}
              >
                {Pitch?.images && Pitch.images.length > 0 && (
                  <Image
                    className="w-[100%] h-[100%] object-cover"
                    src={Pitch.images[0]}
                  />
                )}
              </Image.PreviewGroup>
            </div>
            {Pitch?.images && Pitch.images.length > 0 && (
              <div className="right-img w-[30%] xl:grid md:hidden">
                <img
                  src={Pitch?.images[1]}
                  alt="No Image 1"
                  className="w-[100%] h-[100%]"
                />
                <img
                  src={Pitch?.images[2]}
                  alt="No Image 2"
                  className="w-[100%] h-[100%]"
                />
              </div>
            )}
          </div>
        </>
      ),
    },
    {
      label: "ĐỘI BÓNG LIÊN QUAN",
      value: "react",
      desc: (
        <div className="hot-pitch mx-auto max-w-screen-2xl xl px-[30px]">
          <Swiper
            spaceBetween={80}
            slidesPerView={2}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {filteredPitch && filteredPitch.length > 0 ? (
              filteredPitch.map((item: IPitch) => (
                <SwiperSlide>
                  <div className="item-pitch ">
                    {/* <Link to={`/pitch/detail/${item._id}`}>
                      
                    </Link> */}
                    <a href={`/pitch/detail/${item._id}`}>
                      <div className="imgae-item-pitch">
                        <img
                          src={item.avatar}
                          width="100%"
                          className="h-[250px]"
                          alt=""
                        />
                      </div>
                      <div className="text-item-pitch">
                        <Rate allowHalf defaultValue={4.5} />{" "}
                        <span>( 99+ Review)</span>
                        <h3>{item.name}</h3>
                        <p>Số Người :7 Người</p>
                        <p className="flex justify-between my-[10px]">
                          Dịch Vụ :
                          {item.services.map((data: any) => {
                            const service = services.find(
                              (item) => item._id == data._id
                            );
                            return (
                              <span key={data._id!}>
                                <i className="fa-solid fa-check"></i>{" "}
                                {service ? service.name : "Chưa có dịch vụ"}
                              </span>
                            );
                          })}
                        </p>
                        <p className="flex justify-between">
                          Giá :
                          <span>
                            <del className="italic text-[13px]">
                              500.000-1.200.000
                            </del>
                          </span>
                          <span className="text-[23px] text-[#ffb932] text-bold">
                            {item.deposit_price.toLocaleString("vi-VN")} -
                            850.000
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div>
                {" "}
                <Empty />
              </div>
            )}
          </Swiper>
        </div>
      ),
    },

    {
      label: "Tìm Đối",
      desc: <FindOpponent idPitch={id!} />,
    },

    {
      label: "Dịch VỤ",
      value: "angular",
      desc: (
        <div className="flex flex-wrap box-service-pitch-detail">
          {Pitch.services
            ? Pitch.services.map((serviceId: string) => {
                const service = services.find((item) => item._id === serviceId);
                return (
                  <Card
                    className="mt-6 w-28 md:w-1/2 lg:w-1/4 mb-4 mr-2"
                    key={service?._id}
                  >
                    <CardHeader
                      color="blue-gray"
                      className="relative w- h-28 pl-0"
                    >
                      <img
                        className="w-full"
                        src={service?.image}
                        alt="card-image"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography
                        color="blue-gray"
                        className="mb-2 text-base font-bold w-max"
                      >
                        {service?.name}
                      </Typography>
                      <Typography>
                        {service?.price.toLocaleString("vi-VN")}đ
                      </Typography>
                    </CardBody>
                  </Card>
                );
              })
            : "Không có dịch vụ"}
        </div>
      ),
    },
    {
      label: "ĐÁNH GIÁ",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  // form lọc theo giá sân :
  // const IntegerStep = () => {
  //   const [inputValue, setInputValue] = useState(1);

  //   const onChangePrice = (newValue: number | null) => {
  //     if (newValue !== null) {
  //       setInputValue(newValue);
  //     }
  //   };
  //   return (
  //     <div className="flex items-center justify-between">
  //       <Slider
  //         className="w-[80%]"
  //         min={1}
  //         max={200000}
  //         onChange={onChangePrice}
  //         value={typeof inputValue === "number" ? inputValue : 0}
  //       />

  //       <InputNumber
  //         style={{ margin: "0 16px" }}
  //         value={inputValue}
  //         onChange={onChangePrice}
  //       />
  //     </div>
  //   );
  // };
  return (
    <div className="bg-[#f3f3f5]">
      {/* =========banner========= */}
      <div className="detail-pitch">
        <div className="banner-detail">
          <Carousel autoplay>
            <div className="banner1 banner"></div>
            <div className="banner2 banner"></div>
            <div className="banner3 banner"></div>
            <div className="banner4 banner"></div>
          </Carousel>
        </div>
      </div>
      {/* -===========detail pitch============ */}
      {/* ảnh ọt thôi */}
      <div className="mx-auto max-w-screen-2xl  xl:flex gap-10 md:block relative">
        {/* left */}
        <div className="sm:w-full md:w-full xl:w-[72%]">
          <Tabs id="custom-animation" value="html">
            <TabsHeader className="">
              {data.map(({ label, value }) => (
                <Tab key={value} value={value!}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value!}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        <div className="right-detail-pitch xl:w-[25%] mt-[-50px]">
          <div className=" bg-white p-[40px] rounded-[10px] shadow-xl">
            <p className="mb-[30px] flex justify-between">
              HOT PITCH{" "}
              <span>
                <i className="text-[30px] fa-sharp fa-solid fa-star-of-david fa-spin fa-spin-reverse"></i>
              </span>
            </p>
            <p className="flex items-center justify-between">
              <i className="fa-solid fa-tag"></i>
              <span className="text-[13px]">GIÁ THUÊ CHỈ</span>
              <span className="text-[#ffb932]">
                {Pitch.deposit_price}
              </span> - <span className="text-[#fd9e4b]">850.000</span> -{" "}
              <span className="text-[#fd9e4b]">1.150.000</span>
            </p>
            <p className="my-[20px]">
              Sân trống : <span>10</span>
            </p>
            <p className="my-[20px]">
              Sân chưa có đối : <span>1</span>
            </p>

            <p className="my-[20px]">
              Sân Bận : <span>8</span>
            </p>
            <p></p>
            <p>
              <a href="#timca" className="text-[#3a75da]">
                <i className="fa-solid fa-right-long fa-shake mr-[20px]"></i>Tìm
                Ca Sân
              </a>
            </p>
            <a href="tel:0775292262" className="btn-call">
              <button>GỌI TỚI CHỦ SÂN</button>
            </a>
          </div>

          <div className="maps bg-[#fff] mt-[50px] shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9631506304613!2d105.7677671750488!3d21.034160387593463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b9df6626ef%3A0xbadd9b53272fd8c1!2zMjEgxJAuIEzDqiDEkOG7qWMgVGjhu40sIE3hu7kgxJDDrG5oLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1698378147194!5m2!1sen!2s"
              loading="lazy"
              className="w-[100%]"
            ></iframe>
            <a href="https://maps.app.goo.gl/bMpLZc9tXFTEAEMLA" target="_blank">
              <button className="my-[10px] text-[#3a75da]"> Chỉ Đường</button>{" "}
            </a>
          </div>
        </div>
      </div>
      {/* thôn tin sân và đặt lịch ở đây  */}
      <div className="container flex justify-between mx-auto my-[50px] mt-[100px]">
        <div className="info-pitch">
          <h1 className="text-pitch">{Pitch.name}</h1>
          <p>
            <Rate allowHalf defaultValue={5} /> <span> ( 2 Reviews )</span>
          </p>
        </div>
      </div>
      <div
        id="timca"
        className="container mx-auto booking_detail grid grid-cols-7 gap-10"
      >
        {/* khu vực hiển thị ca sân  */}
        <div className="left_booking col-span-5">
          <div className="grid grid-cols-2 gap-[40px] list_shift">
            {!isLoading
              ? childrenPitchs?.map((item: any, index: number) => (
                  <div
                    className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden"
                    key={index}
                  >
                    <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
                      Sân {item.code_chirldren_pitch}
                    </h3>
                    {/* <p className="mx-[20px] mt-[20px]">
                  Thời Gian: 7:00
                  <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
                </p>
                <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p> */}
                    <p className="mx-[20px] mt-[20px]">
                      Ca Sân :
                      <div className="flex flex-wrap justify-between my-[20px]">
                        {item.shifts?.map((shift: any, index: number) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleComfirmBookShift({
                                id_chirlden_pitch: item._id,
                                id_pitch: item.idParentPitch,
                                number_shift: shift.number_shift,
                                start_time: shift.start_time,
                                end_time: shift.end_time,
                                price: shift.price,
                                date: format(
                                  parseISO(shift.date),
                                  "yyyy-MM-dd"
                                ),
                              })
                            }
                            className={`border rounded-lg border-[#1fd392] py-[5px] px-[10px] ${
                              shift.status ? "distable" : ""
                            }`}
                          >
                            {shift.status ? "asdas" : ""}
                            Ca {shift.number_shift}
                            <p>
                              {shift.start_time} - {shift.end_time}
                            </p>
                            <p>{shift.price}</p>
                          </button>
                        ))}
                      </div>
                    </p>
                    <div className="grid grid-cols-2 border mt-[20px] ">
                      <button className="justify-center mx-auto flex border-r py-3 w-full items-center">
                        <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                        Đặt Sân
                      </button>
                      <button>
                        <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
                        Tìm Đối
                      </button>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
        {/* khu vực lọc theo tìm kiếm */}
        <div className="right_booking col-span-2 p-[20px] bg-[#fff] shadow-md rounded-[12px]">
          <h1 className="text-center mb-[20px] text-[25px] font-[700] font-body ">
            TÌM NHANH
          </h1>
          {/* lichj */}
          <div className="calendar">
            <Form>
              <Form.Item>
                <div className="flex items-center justify-between">
                  <p className="text-20px font-[600] w-max mr-[10px]">
                    <i className="fa-regular fa-calendar mr-[10px]"></i>CHỌN
                    LỊCH NGÀY :
                  </p>
                  <Space direction="vertical">
                    <DatePicker
                      onChange={(_, dateString) => setSelectedDate(dateString)}
                    />
                  </Space>
                </div>
              </Form.Item>
            </Form>
          </div>
          <p className="text-20px font-[600] w-max mr-[10px]">
            Các ca ngày: {selectedDate}
          </p>
          {/* mã số sân */}
          {/* <div className="code_childrent_pitch">
            <Form>
              <Form.Item>
                <div className="flex items-center justify-between">
                  <p className="text-20px font-[600] w-max mr-[10px]">
                    <i className="fa-regular fa-calendar mr-[20px]"></i>CHỌN SÂN
                    :
                  </p>
                  <Select labelInValue style={{ width: "60%" }} />
                </div>
              </Form.Item>
            </Form>
          </div> */}
          {/* giá sân */}
          {/* <div className="price_pitch">
            <Form.Item>
              <div className="flex items-center">
                <p className="text-20px font-[600] w-max mr-[30px]">
                  <i className="fa-regular fa-calendar mr-[20px]"></i>CHỌN LỊCH
                  NGÀY :
                </p>
                <Space direction="vertical" size={12}>
                  <DatePicker defaultValue={today} format={dateFormatList} />
                </Space>
              </div>
            </Form.Item>
            <Form.Item></Form.Item>
          </div> */}
        </div>

        {/* <Form.Item>
          <Space style={{ width: "100%" }} direction="vertical">
            <IntegerStep />
          </Space>
        </Form.Item> */}
      </div>
      {/* button submit form tìm đối */}
      <div className="submit_form text-center mt-5 border-b border-b-[#1fd392] pb-[20px]">
        <Button className="px-[10px] py-[5px] bg-[#1fd392] border rounded-md text-[#fff]">
          Tìm Nhanh
        </Button>
      </div>
      <h3 className="my-[30px]">Hoặc bạn có thể :</h3>
      {/* form đặt nhiều hoặc đăng ký theo tháng */}
      <div className="flex justify-between">
        <button
          onClick={showModal}
          className="px-[10px] py-[5px] bg-[#1fd392] border rounded-md text-[#fff]"
        >
          Đặt Nhiều Sân
        </button>
        <button className="px-[10px] py-[5px] bg-[#1fd392] border rounded-md text-[#fff]">
          Đăng Ký Gói Tháng
        </button>

        <Modal
          title="ĐẶT NHIỀU SÂN"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <div className="flex items-center gap-10">
              <Form.Item
                label="Chọn Ngày"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn ngày!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Chọn Sân"
                name="pitch"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn sân!",
                  },
                ]}
              >
                <Select
                  style={{ width: "120px" }}
                  options={[
                    { value: "1", label: "Sân 1" },
                    { value: "2", label: "Sân 2" },
                    { value: "3", label: "Sân 3" },
                    {
                      value: "disabled",
                      label: "Disabled",
                      disabled: true,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Chọn Ca"
                name="shift"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn sân!",
                  },
                ]}
              >
                <Select
                  style={{ width: "120px" }}
                  options={[
                    { value: "1", label: "Sân 1" },
                    { value: "2", label: "Sân 2" },
                    { value: "3", label: "Sân 3" },
                    {
                      value: "disabled",
                      label: "Disabled",
                      disabled: true,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Giá Sân" name="price">
                <Input />
              </Form.Item>
              <Button className="rounded-[50%] border-[#f71515bb]"> X </Button>
            </div>
            <div>
              <Button className="rounded-[50%] bg-[#1fd392] text-[#fff] w-[25px] h-[25px] flex justify-center items-center">
                +
              </Button>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Thông tin đặt lịch"
          open={modalBookShift}
          onOk={() => setModalBookShift(false)}
          onCancel={() => setModalBookShift(false)}
          footer={null}
        >
          <Form
            form={form}
            initialValues={{
              id_chirlden_pitch: dataBookShift?.id_chirlden_pitch,
              id_pitch: dataBookShift?.id_pitch,
              number_shift: dataBookShift?.number_shift,
              start_time: dataBookShift?.start_time,
              end_time: dataBookShift?.end_time,
              price: dataBookShift?.price,
              date: dataBookShift?.date,
            }}
            onFinish={onFinishModalBookShift}
            onFinishFailed={onFinishFailedModalBookShift}
          >
            <div className="flex items-center gap-10">
              <Form.Item
                className="hidden"
                label="Id Sân con"
                name="id_chirlden_pitch"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item className="hidden" label="Id Sân cha" name="id_pitch">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Ca sân" name="number_shift">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Thời gian bắt đầu" name="start_time">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Thời gian kết thúc" name="end_time">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Giá" name="price">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Ngày" name="date">
                <Input disabled />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit">
              Đặt lịch
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
    /* các sân bongs ưu tiên */
  );
};

export default PitchDetailPage;
