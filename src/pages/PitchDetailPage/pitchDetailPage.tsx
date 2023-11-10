import {
  Button,
  Carousel,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Select,
  Slider,
  message,
} from "antd";
import "./pitchDetailPage.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Rate, Space } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
// import img1 from "../../assets/img/Web/banner1.png";
import { Link, useParams } from "react-router-dom";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { useEffect, useState } from "react";
import { fetchAllShift } from "../../Redux/Slices/shiftSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
import { IService } from "~/interfaces/service";
// import IShift from "~/interfaces/shift";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import IPitch from "~/interfaces/pitch";
import { getOnePitch } from "~/api/pitch";
dayjs.extend(customParseFormat);

const PitchDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  // xử lí detailPitch Hải + Hiếu
  const [Pitch, setPitch] = useState<IPitch>({} as IPitch);
  useEffect(() => {
    getOnePitch(String(id)).then(({ data: { data } }) => setPitch(data));
  }, []);
  console.log("detailPitch", Pitch);
  //end detailPitch
  const services = useAppSelector((state) => state.service.services);
  console.log(services);
  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);

  // xử lý chọn ngày  Mcuong
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const dateFormatList = ["DD/MM/YYYY"];
  // list sân mặc định nếu không có data từ db gửi lên
  //   const [defaultShifts, setDefaultShifts] = useState([
  //     {
  //       number_shift: 2,
  //       time_start: "09:00",
  //       time_end: "10:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     }, // số 0 ở đây chỉ để tượng trưng thôi nhé, mục đích là số sân sẽ được gọi theo số sân trống hệ thống
  //     {
  //       number_shift: 1,
  //       time_start: "08:00",
  //       time_end: "09:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     },
  //     {
  //       number_shift: 3,
  //       time_start: "10:00",
  //       time_end: "11:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     },
  //     {
  //       number_shift: 4,
  //       time_start: "11:00",
  //       time_end: "12:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     },
  //     {
  //       number_shift: 5,
  //       time_start: "13:00",
  //       time_end: "14:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     },
  //     {
  //       number_shift: 6,
  //       time_start: "14:00",
  //       time_end: "15:00",
  //       price: "200.000",
  //       number_remain: 0,
  //     },
  //   ]);
  //   const [pitchNumberShift, setPitchNumberShift] = useState(0);
  //   console.log(pitchNumberShift);
  //   //  lấy dữ liệu sân trống khi không có ca đặt sân
  //   useEffect(() => {
  //     getOnePitch(String(id)).then(({ data: { data } }) => {
  //       setPitch(data);
  //       // Cập nhật pitchNumberShift. Mục đích là biết được số sân của doanh nghiệp đó ( nếu không có ca đặt lịch nào thì mặc định toàn bộ sân trống, tương đương mí cả số sân của doanh nghiệp đó)
  //       setPitchNumberShift(data.numberPitch);
  //       // Nếu không có data từ Redux, lấy data ở defaultShifts
  //       if (shifts.length === 0) {
  //         const updatedDefaultShifts = defaultShifts.map((shift) => ({
  //           ...shift,
  //           number_remain: data.numberPitch,
  //         }));
  //         setDefaultShifts(updatedDefaultShifts);
  //       }
  //     });
  //   }, []);

  //   console.log(defaultShifts);

  //  xử lý logic khi có sân đặt trong hệ thống
  //   const shifts = useAppSelector((state) => state.shift.shift);

  //   console.log(shifts);
  //   let shiftOptions = [];
  //   shiftOptions = defaultShifts.map((shift) => ({
  //           label: `Ca ${shift.number_shift}`,
  //           value: shift.number_shift,
  //         }));
  //   let dataTable = [];
  //   if (shifts.length > 0) {
  //     shiftOptions = shifts.map((shift: any) => {
  //       const numberRemain = shift.number_remain - 1;
  //       return {
  //         label: `Ca ${shift.number_shift}`,
  //         value: shift._id,
  //         number_remain: numberRemain,
  //       };
  //     });
  //     dataTable = shifts.map((item: IShift, index: number) => ({
  //       ...item,
  //       key: index,
  //     }));
  //   } else {
  //     shiftOptions = defaultShifts.map((shift) => ({
  //       label: `Ca ${shift.number_shift}`,
  //       value: shift.number_shift,
  //     }));

  //     dataTable = defaultShifts.map((shift, index) => ({
  //       ...shift,
  //       key: index,
  //     }));
  //   }

  console.log("====================================");
  //   console.log(dataTable);
  console.log("====================================");

  // lấy ca sân theo ngày
  const handleDateChange = (date: any, dateString: any) => {
    setSelectedDate(dayjs(dateString, "DD/MM/YYYY"));
    console.log(date);
  };

  const fetchDataByDate = async () => {
    const formattedDate = selectedDate.format("DD/MM/YYYY");
    await dispatch(fetchAllShift(`?date=${formattedDate}`));
    console.log(formattedDate);
    message.success(`Tải dữ liệu thành công ngày ${formattedDate}`);
  };
  // ==============

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  useEffect(() => {
    fetchDataByDate();
  }, [selectedDate]);

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
                  `${Pitch.images}`,
                  `${Pitch.images}`,
                  `${Pitch.images}`,
                  `${Pitch.images}`,
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
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "TIỆN ÍCH",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
    },

    {
      label: "Dịch VỤ",
      value: "angular",
      desc: (
        <div className="flex flex-wrap ">
          {services?.map((service: IService) => (
            <Card
              className="mt-6 w-48 md:w-1/2 lg:w-1/4 px-4 mb-4"
              key={service._id}
            >
              <CardHeader color="blue-gray" className="relative h-36 w-full">
                <img src={service.image} alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography
                  color="blue-gray"
                  className="mb-2 text-base font-bold w-max"
                >
                  {service.name}
                </Typography>
                <Typography>{service.price}</Typography>
              </CardBody>
            </Card>
          ))}
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
  const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);

    const onChangePrice = (newValue: number | null) => {
      if (newValue !== null) {
        setInputValue(newValue);
      }
    };
    return (
      <div className="flex items-center justify-between">
        <Slider
          className="w-[80%]"
          min={1}
          max={200000}
          onChange={onChangePrice}
          value={typeof inputValue === "number" ? inputValue : 0}
        />

        <InputNumber
          style={{ margin: "0 16px" }}
          value={inputValue}
          onChange={onChangePrice}
        />
      </div>
    );
  };
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
      <div className="mx-auto max-w-screen-2xl gap-10 flex md:block relative">
        {/* left */}
        <div className="sm:w-full md:w-full xl:w-[75%]">
          <Tabs id="custom-animation" value="html">
            <TabsHeader className="">
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
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
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        <div className="right-detail-pitch xl:w-[25%] md:w-[100%] md:relative md:mt-[10px] xl:absolute xl:top-[-120px] right-0">
          <div className=" bg-white p-[40px] rounded-[20px] shadow">
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
              </span> - <span className="text-[#fd9e4b]">1.150.000</span>
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

            
            <div className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden">
              <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
                Sân 1
              </h3>
              <p className="mx-[20px] mt-[20px]">
                Thời Gian: 7:00
                <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
              </p>
              <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p>
              <p className="mx-[20px] mt-[20px]">
                Ca Sân :
                <div className="flex flex-wrap justify-between my-[20px]">
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 1
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 2
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 3
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 4
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 5
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 6
                  </button>
                </div>
              </p>

              <div className="grid grid-cols-2 border mt-[20px] ">
                <button className=" justify-center mx-auto flex border-r py-3 w-full items-center">
                  <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                  Đặt Sân
                </button>
                <button>
                  <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
                  Tìm Đối
                </button>
              </div>
            </div>
            <div className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden">
              <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
                Sân 2
              </h3>
              <p className="mx-[20px] mt-[20px]">
                Thời Gian: 7:00
                <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
              </p>
              <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p>
              <p className="mx-[20px] mt-[20px]">
                Ca Sân :
                <div className="flex flex-wrap justify-between my-[20px]">
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px] bg-[#1fd392]">
                    Ca 1
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 2
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 3
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 4
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 5
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 6
                  </button>
                </div>
              </p>

              <div className="grid grid-cols-2 border mt-[20px] ">
                <button className=" justify-center mx-auto flex border-r py-3 w-full items-center">
                  <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                  Đặt Sân
                </button>
                <button>
                  <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
                  Tìm Đối
                </button>
              </div>
            </div>
            <div className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden">
              <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
                Sân 3
              </h3>
              <p className="mx-[20px] mt-[20px]">
                Thời Gian: 7:00
                <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
              </p>
              <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p>
              <p className="mx-[20px] mt-[20px]">
                Ca Sân :
                <div className="flex flex-wrap justify-between my-[20px]">
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 1
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 2
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 3
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 4
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 5
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 6
                  </button>
                </div>
              </p>

              <div className="grid grid-cols-2 border mt-[20px] ">
                <button className=" justify-center mx-auto flex border-r py-3 w-full items-center">
                  <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                  Đặt Sân
                </button>
                <button>
                  <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
                  Tìm Đối
                </button>
              </div>
            </div>
            <div className="rounded-[10px] border bg-[#fff] shadow-md overflow-hidden">
              <h3 className="bg-[#1fd392] text-center p-[13px] mb-[10px]">
                Sân 4
              </h3>
              <p className="mx-[20px] mt-[20px]">
                Thời Gian: 7:00
                <i className="fa-solid fa-up-down fa-rotate-90 mx-2"></i> 9:00
              </p>
              <p className="mx-[20px] mt-[20px]">Giá Sân: 100.000 VND</p>
              <p className="mx-[20px] mt-[20px]">
                Ca Sân :
                <div className="flex flex-wrap justify-between my-[20px]">
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 1
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 2
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 3
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 4
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 5
                  </button>
                  <button className="border rounded-lg border-[#1fd392] py-[5px] px-[10px]">
                    Ca 6
                  </button>
                </div>
              </p>

              <div className="grid grid-cols-2 border mt-[20px] ">
                <button className=" justify-center mx-auto flex border-r py-3 w-full items-center">
                  <i className="fa-solid fa-check mx-3 text-[#1fd392] text-[20px]"></i>
                  Đặt Sân
                </button>
                <button>
                  <i className="fa-solid fa-magnifying-glass text-[#1fd392] text-[18px] mx-3"></i>{" "}
                  Tìm Đối
                </button>
              </div>
            </div>
            
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
                      onChange={handleDateChange}
                      value={selectedDate}
                      format={dateFormatList}
                    />
                  </Space>
                </div>
              </Form.Item>
            </Form>
          </div>
          {/* mã số sân */}
          <div className="code_childrent_pitch">
            <Form>
              <Form.Item>
                <div className="flex items-center justify-between">
                  <p className="text-20px font-[600] w-max mr-[10px]">
                    <i className="fa-regular fa-calendar mr-[20px]"></i>CHỌN SÂN
                    :
                  </p>
                  <Select
                    labelInValue
                    // defaultValue={{value}}
                    style={{ width: "60%" }}
                    onChange={handleChange}
                    // options={shiftOptions}
                  />
                </div>
              </Form.Item>
            </Form>
          </div>
          {/* giá sân */}
          <div className="price_pitch">
            <Form.Item>
              <p className="mb-[10px] text-[23px] font-[600]">Lọc theo giá</p>

              <Space style={{ width: "100%" }} direction="vertical">
                <IntegerStep />
              </Space>
            </Form.Item>
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
            <button className="px-[10px] py-[5px] bg-[#1fd392] border rounded-md text-[#fff]">
              Đặt Nhiều Sân
            </button>
            <button className="px-[10px] py-[5px] bg-[#1fd392] border rounded-md text-[#fff]">
              Đăng Ký Gói Tháng
            </button>
          </div>
        </div>
      </div>

      {/* các sân bongs ưu tiên */}
      <div className="hot-pitch mt-[100px] mx-auto max-w-screen-2xl xl px-[30px]">
        <h1>CÓ THỂ BẠN KHUM THÍCH</h1>
        <Swiper spaceBetween={80} slidesPerView={3}>
          <SwiperSlide>
            <div className="item-pitch ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item2} width="100%" alt="" />
                </div>
                <div className="text-item-pitch">
                  <Rate allowHalf defaultValue={4.5} /> <span>( 1 Review)</span>
                  <h3>SÂN BÓNG MẠNH CƯỜNG</h3>
                  <p>Số Người :7 Người</p>
                  <p className="flex justify-between my-[10px]">
                    Dịch Vụ :
                    <span>
                      <i className="fa-solid fa-check"></i> WIFI
                    </span>
                    <span>
                      <i className="fa-solid fa-check"></i> CANGTEEN
                    </span>
                  </p>
                  <p className="flex justify-between">
                    Giá :
                    <span>
                      <del className="italic text-[13px]">
                        300.000-1.200.000
                      </del>
                    </span>
                    <span className="text-[23px] text-[#ffb932] text-bold">
                      150.000 - 850.000
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item-pitch">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item2} width="100%" alt="" />
                </div>
                <div className="text-item-pitch">
                  <Rate allowHalf defaultValue={4.5} /> <span>( 1 Review)</span>
                  <h3>SÂN BÓNG MẠNH CƯỜNG</h3>
                  <p>Số Người :7 Người</p>
                  <p className="flex justify-between my-[10px]">
                    Dịch Vụ :
                    <span>
                      <i className="fa-solid fa-check"></i> WIFI
                    </span>
                    <span>
                      <i className="fa-solid fa-check"></i> CANGTEEN
                    </span>
                  </p>
                  <p className="flex justify-between">
                    Giá :
                    <span>
                      <del className="italic text-[13px]">
                        300.000-1.200.000
                      </del>
                    </span>
                    <span className="text-[23px] text-[#ffb932] text-bold">
                      150.000 - 850.000
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item-pitch">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item2} width="100%" alt="" />
                </div>
                <div className="text-item-pitch">
                  <Rate allowHalf defaultValue={4.5} /> <span>( 1 Review)</span>
                  <h3>SÂN BÓNG MẠNH CƯỜNG</h3>
                  <p>Số Người :7 Người</p>
                  <p className="flex justify-between my-[10px]">
                    Dịch Vụ :
                    <span>
                      <i className="fa-solid fa-check"></i> WIFI
                    </span>
                    <span>
                      <i className="fa-solid fa-check"></i> CANGTEEN
                    </span>
                  </p>
                  <p className="flex justify-between">
                    Giá :
                    <span>
                      <del className="italic text-[13px]">
                        300.000-1.200.000
                      </del>
                    </span>
                    <span className="text-[23px] text-[#ffb932] text-bold">
                      150.000 - 850.000
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item-pitch ">
              <Link to="">
                <div className="imgae-item-pitch">
                  <img src={item2} width="100%" alt="" />
                </div>
                <div className="text-item-pitch">
                  <Rate allowHalf defaultValue={4.5} /> <span>( 1 Review)</span>
                  <h3>SÂN BÓNG MẠNH CƯỜNG</h3>
                  <p>Số Người :7 Người</p>
                  <p className="flex justify-between my-[10px]">
                    Dịch Vụ :
                    <span>
                      <i className="fa-solid fa-check"></i> WIFI
                    </span>
                    <span>
                      <i className="fa-solid fa-check"></i> CANGTEEN
                    </span>
                  </p>
                  <p className="flex justify-between">
                    Giá :
                    <span>
                      <del className="italic text-[13px]">
                        300.000-1.200.000
                      </del>
                    </span>
                    <span className="text-[23px] text-[#ffb932] text-bold">
                      150.000 - 850.000
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default PitchDetailPage;
