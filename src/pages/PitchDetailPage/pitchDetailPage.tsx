import { Button, Carousel, DatePicker, Form, Image } from "antd";
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
import { Rate, Space, Table } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ColumnsType } from "antd/es/table";
import img1 from "../../assets/img/Web/banner1.png";
import { Link, useParams } from "react-router-dom";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { useEffect, useState } from "react";
import { fetchAllShift } from "../../Redux/Slices/shiftSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";
import { IService } from "~/interfaces/service";
import IShift from "~/interfaces/shift";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import IPitch from "~/interfaces/pitch";
import { getOnePitch } from "~/api/pitch";
dayjs.extend(customParseFormat);


const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const today = dayjs();
const PitchDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const services = useAppSelector((state) => state.service.services);
  console.log(services);

  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);


  const shifts = useAppSelector((state) => state.shift.shift);
  console.log(shifts);
  const dataTable = shifts.map((item: IShift, index: number) => ({
    ...item,
    key: index,
  }));

  // xử lí detailPitch
  const [Pitch, setPitch] = useState<IPitch>({} as IPitch);
  useEffect(() => {
    getOnePitch(String(id)).then(({ data: { data } }) => setPitch(data));
  }, [])
  console.log('detailPitch', Pitch);
  //end detailPitch
  useEffect(() => {
    dispatch(fetchAllShift());
  }, [dispatch]);

  const handleButtonClick = (id: any) => {
    const selectedShift = shifts.find((shift: any) => shift._id === id);
    if (selectedShift) {
      console.log("id: ", selectedShift._id);
    }
  };
  const columns: ColumnsType<IShift> = [
    {
      title: "Ca Sân",
      dataIndex: "number_shift",
      key: "number_shift",
      render: (text) => <span> Ca {text} </span>,
    },
    {
      title: "Giờ Bắt Đầu",
      dataIndex: "time_start",
      key: "time_start",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giờ Kết Thúc",
      dataIndex: "time_end",
      key: "time_end",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Số Sân Trống",
      dataIndex: "number_remain",
      key: "number_remain",
      render: (text) => (
        <span>
          <Space>{text} / 4</Space>
        </span>
      ),
    },
    {
      title: "Giá Sân",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Trạng Thái Sân",
      dataIndex: "statusPitch",
      key: "statusPitch",
      render: (text) => (
        <span
          className={
            text
              ? "text-[#fff] bg-green-600 p-[10px] rounded-[10px]"
              : "p-[10px] rounded-[10px] text-[#fff] bg-red-600"
          }
        >
          {text ? "Sân Trống" : "Sân Bận"}
        </span>
      ),
    },
    {
      title: "Đặt Sân",
      render: (record) => (
        <Button onClick={() => handleButtonClick(record._id)}>
          Đặt Sân Ca {record.number_shift}
        </Button>
      ),
    },
  ];
  const data = [
    {
      label: "THÔNG TIN CƠ BẢN",
      value: "html",
      desc: (
        <>
          <div className="flex img-pitch gap-[20px]">
            <div className="left-img w-[65%] md:w-[100%]">
              <Image.PreviewGroup
                items={[`${Pitch.images}`, `${Pitch.images}`, `${Pitch.images}`, `${Pitch.images}`]}
              >
                {Pitch?.images && Pitch.images.length > 0 && (
                  <Image className="w-[100%] h-[100%]" src={Pitch.images[0]} />
                )}
              </Image.PreviewGroup>
            </div>
            {Pitch?.images && Pitch.images.length > 0 && (
              <div className="right-img w-[30%] xl:grid md:hidden">
                <img src={Pitch?.images[1]} alt="No Image 1" className="w-[100%] h-[100%]" />
                <img src={Pitch?.images[2]} alt="No Image 2" className="w-[100%] h-[100%]" />
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
            <Card className="mt-6 w-48 md:w-1/2 lg:w-1/4 px-4 mb-4" key={service._id}>
              <CardHeader color="blue-gray" className="relative h-36 w-full">
                <img
                  src={service.image}
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
                <Typography color="blue-gray" className="mb-2 text-base font-bold w-max">
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
              <span className="text-[#ffb932]">{Pitch.deposit_price}</span> -{" "}
              <span className="text-[#fd9e4b]">850.000</span>
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
                {" "}
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
      <div className="container flex justify-between my-[50px]">
        <div className="info-pitch">
          <h1 className="text-pitch">{Pitch.name}</h1>
          <p>
            <Rate allowHalf defaultValue={5} /> <span> ( 2 Reviews )</span>
          </p>
        </div>
        <div className="calendar">
          <Form>
            <Form.Item>
              <div className="flex items-center">
                <p className="text-20px font-[600] w-max mr-[30px]">
                  <i className="fa-regular fa-calendar mr-[20px]"></i>CHỌN LỊCH
                  NGÀY :
                </p>
                <Space
                  direction="vertical"
                  size={12}
                >
                  <DatePicker defaultValue={today} format={dateFormatList} />
                </Space>
              </div>
            </Form.Item>
            <Form.Item></Form.Item>
          </Form>
        </div>
      </div>
      <div id="timca" className="container booking_detail items-center">
        <div className="left_booking">
          <Table
            pagination={{ pageSize: 8 }}
            columns={columns}
            dataSource={dataTable}
          />
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