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
  Checkbox,
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
  Space,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import "./pitchDetailPage.css";

import { getOnePitch } from "~/api/pitch";
import FindOpponent from "~/components/FindOpponent/FindOpponent";
import IPitch from "~/interfaces/pitch";
import { fetchAllPitch } from "~/Redux/Slices/pitchSlice";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import FeedBack from "~/components/Feedback/FeedBack";

const PitchDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [dataBookShift, setDataBookShift] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalBookShift, setModalBookShift] = useState(false);
  const [childrenPitchs, setShildrenPitchs] = useState([]);
  const [Pitch, setPitch] = useState<IPitch>({} as IPitch);
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [findOpponent, setFindOpponent] = useState(false);

  const pitchAll = useAppSelector((state) => state.pitch.pitchs);
  const toDay = new Date();

  const onChangeFindOpponent = (checked: boolean) => {
    setFindOpponent(checked);
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
      const { data } = await axios.post("http://localhost:8080/api/shift", {
        ...values,
        find_opponent: findOpponent ? "Find" : "NotFind",
      });
      sessionStorage.setItem(
        "infoBooking",
        JSON.stringify({
          pitch_name: Pitch.name,
          pitch_avatar: Pitch.avatar,
          admin_pitch_id: Pitch.admin_pitch_id?._id,
          admin_pitch_name: Pitch?.admin_pitch_id?.name,
          admin_pitch_phone: Pitch?.admin_pitch_id?.phone_number,
          pitch_id: Pitch._id,
          pitch_address: Pitch.address,
          children_pitch_id: data.data.id_chirlden_pitch,
          shift_id: data.data._id,
          price: data.data.price,
          booking_day: `${data.data.date} | ${values?.start_time} - ${values?.end_time}`,
          services: selectedServices,
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

  const handleServiceSelection = (serviceId: any) => {
    if (selectedServices.length === 0) {
      setSelectedServices([serviceId]);
    } else {
      selectedServices.map((item: string) => {
        if (item === serviceId) {
          const newServices = selectedServices.filter(
            (service: any) => service !== serviceId
          );
          setSelectedServices(newServices);
        } else {
          setSelectedServices([...selectedServices, serviceId]);
        }
      });
    }
  };

  // Xử lí đội bóng liên quan
  const districtsId = Pitch.districts_id; // ID của danh mục bạn muốn lọc

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

  const data = [
    {
      label: "THÔNG TIN",
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
      label: "SÂN GẦN ĐÂY",
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
                          {Pitch?.services && Pitch?.services.length > 0
                            ? Pitch?.services?.map((service: any) => (
                                <span key={service?._id}>
                                  <i className="fa-solid fa-check"></i>{" "}
                                  {service.name}
                                </span>
                              ))
                            : ""}
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
                <Empty />
              </div>
            )}
          </Swiper>
        </div>
      ),
    },

    {
      label: "TÌM ĐỐI",
      desc: <FindOpponent idPitch={id!} />,
    },

    {
      label: "DỊCH VỤ",
      value: "angular",
      desc: (
        <>
          <div className="flex h-[400px] w-[950px] overflow-x-scroll">
            {Pitch?.services && Pitch?.services.length > 0
              ? Pitch?.services?.map((service: any) => (
                  <Card className="mt-6 w-[250px] mr-2 h-60" key={service?._id}>
                    <Checkbox
                      crossOrigin={undefined}
                      onChange={() => handleServiceSelection(service?._id)}
                    />
                    <CardHeader
                      color="blue-gray"
                      className="w-[200px] h-28 pl-0 mt-"
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
                        {service?.price &&
                          service?.price.toLocaleString("vi-VN")}
                        đ
                      </Typography>
                    </CardBody>
                  </Card>
                ))
              : "Không có dịch vụ"}
          </div>
        </>
      ),
    },
    {
      label: "ĐÁNH GIÁ",
      value: "svelte",
      desc: <FeedBack idPitch={Pitch} />,
    },
  ];

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
              THÔNG TIN SÂN BÓNG
              <span className="mt-[-4px]">
                <i className="text-[30px] fa-sharp fa-solid fa-star-of-david fa-spin fa-spin-reverse"></i>
              </span>
            </p>
            <p className="flex items-center ">
              <i className="fa-solid fa-tag"></i>
              <span className="text-[14px] ml-2 leading-4 font-semibold">
                GIÁ CHỈ TỪ:{" "}
              </span>
              <span className=" text-[#ffb932] ml-2 leading-4">
                {Pitch?.deposit_price &&
                  Pitch?.deposit_price?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </p>
            <p className="my-[20px] font-semibold">
              Số điện thoại:{" "}
              <span className="text-[#ffb932]">
                {Pitch?.admin_pitch_id?.phone_number}
              </span>
            </p>
            <p className="my-[20px] font-semibold">
              Địa chỉ: <span className="text-[#ffb932]">{Pitch?.address}</span>
            </p>

            <a
              href={`tel:${Pitch?.admin_pitch_id?.phone_number}`}
              className="btn-call"
            >
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
              <button className="my-[10px] text-[#3a75da]"> Chỉ Đường</button>
            </a>
          </div>
        </div>
      </div>
      {/* thôn tin sân và đặt lịch ở đây  */}
      <div className="container flex justify-between mx-auto my-[50px] mt-[100px]">
        <div className="info-pitch">
          <h1 className="text-pitch">{Pitch.name}</h1>
          <p className="flex align-center">
            <Rate allowHalf defaultValue={5} />
            <span className="ml-2">( 2 Reviews )</span>
          </p>
        </div>
      </div>
      <div
        id="timca"
        className="container mx-auto booking_detail grid grid-cols-7 gap-10 pb-[80px]"
      >
        {/* khu vực hiển thị ca sân  */}
        <div className="left_booking col-span-5">
          <div className="grid grid-cols-2 gap-[24px] list_shift">
            {!isLoading ? (
              childrenPitchs?.map((item: any, index: number) => (
                <div
                  className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden"
                  key={index}
                >
                  <h3 className="bg-[#1fd392] text-center p-[10px] text-lg font-medium">
                    Sân {item.code_chirldren_pitch}
                  </h3>

                  <p className="mx-[16px] mt-[16px]">
                    <p className="text-base font-semibold">Ca Sân:</p>
                    <div className="flex flex-wrap justify-between mt-[8px] mb-[20px] gap-y-[16px]">
                      {item.shifts?.map((shift: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (!shift.status_shift) {
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
                              });
                            }
                          }}
                          className={`border rounded-lg border-[#1fd392] hover:bg-[#1fd392] hover:text-[#fff] py-[8px] px-[4px] w-[31%] text-[16px] text-[#333] ${
                            shift.status_shift ? "disabled" : ""
                          }`}
                        >
                          <p className="font-semibold mb-[2px] ">
                            Ca {shift.number_shift}
                          </p>
                          <p className="mb-[2px] font-semibold ">
                            {shift.start_time}h - {shift.end_time}h
                          </p>
                          <p className="font-semibold">
                            {shift.price &&
                              shift.price?.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </p>
                        </button>
                      ))}
                    </div>
                  </p>
                  {/* <div className="border-t">
                      <button className="justify-center mx-auto flex py-3 w-full items-center">
                        <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                        Đặt Sân
                      </button>
                    </div> */}
                </div>
              ))
            ) : (
              <div className="flex align-center mt-40px">Loading...</div>
            )}
          </div>
        </div>
        {/* khu vực lọc theo tìm kiếm */}
        <div className="right_booking col-span-2 px-[20px] py-[30px] bg-[#fff] shadow-md rounded-[12px] h-[60%] min-h-[400px]">
          {/* lichj */}
          <div className="calendar">
            <Form>
              <Form.Item>
                <div className="flex items-center justify-between">
                  <p className="text-20px font-[600] w-max mr-[10px]">
                    <i className="fa-regular fa-calendar mr-[10px]"></i>CHỌN
                    NGÀY :
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
          <p className="text-20px w-max flex align-center ">
            <p className="font-[600] mr-[6px] mt-[-1px]">Các ca ngày:</p>
            {selectedDate
              ? format(parseISO(selectedDate), "dd-MM-yyyy")
              : format(toDay, "dd-MM-yyyy")}
          </p>
        </div>
      </div>

      {/* Sửa */}
      <Modal
        title="Thông tin đặt lịch"
        open={modalBookShift}
        onOk={() => setModalBookShift(false)}
        onCancel={() => setModalBookShift(false)}
        footer={null}
      >
        <div className="mb-[24px]">
          <p className="text-[24px] font-semibold mt-[-4px] mb-[10px]">
            {Pitch.name}
          </p>
          <p className="text-[16px] font-semibold mt-[-4px] mb-[14px]">
            Địa chỉ: {Pitch.address}
          </p>
          <p className="text-[16px] font-semibold mt-[-4px] mb-[10px]">
            Số điện thoại: {Pitch?.admin_pitch_id?.phone_number}
          </p>
        </div>
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
          <div className="flex align-center">
            <p className="text-[16px] mr-[8px] font-semibold">
              Bạn có muốn tìm đối:
            </p>
            <Switch checked={findOpponent} onChange={onChangeFindOpponent} />
          </div>
          <p className="text-[16px] mr-[8px] font-semibold">Dịch vụ:</p>
          <div className="flex gap-[20px] align-center justify-center mb-[24px]">
            {Pitch?.services && Pitch?.services.length > 0
              ? Pitch?.services?.map((service: any) => (
                  <Card className="mt-4" key={service?._id}>
                    <Checkbox
                      crossOrigin={undefined}
                      onChange={() => handleServiceSelection(service?._id)}
                    />
                    <CardHeader
                      color="blue-gray"
                      className="w-[160px] h-28 pl-0 mt-0"
                    >
                      <img
                        className="w-full"
                        src={service?.image}
                        alt="card-image"
                      />
                    </CardHeader>
                    <CardBody className="px-[16px] py-[8px]">
                      <Typography
                        color="blue-gray"
                        className="mb-2 text-base font-bold w-max"
                      >
                        {service?.name}
                      </Typography>
                      <Typography>
                        {service?.price &&
                          service.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </Typography>
                    </CardBody>
                  </Card>
                ))
              : ""}
          </div>
          <Button htmlType="submit">Đặt lịch</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PitchDetailPage;
