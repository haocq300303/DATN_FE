import { Carousel } from "antd";
import "./pitchDetailPage.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Rate, Space, Table, Tag } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ColumnsType } from "antd/es/table";
import img1 from "../../assets/img/Web/banner1.png";
import { Link } from "react-router-dom";
import item2 from "../../assets/img/Web/stadium1.jfif";
interface DataType {
  key: string;
  pitch: string;
  time: string;
  address: string;
  status: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Ca sân",
    dataIndex: "pitch",
    key: "pitch",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giờ Diễn",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Số Sân",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Trạng Thái",
    key: "tags",
    dataIndex: "tags",
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status.length > 8 ? "green" : "geekblue";
          if (status === "Sân Bận") {
            color = "red";
          }
          console.log(status);

          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Hành Động",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Đặt sân {record.pitch}</a>
      </Space>
    ),
  },
];

const tableData: DataType[] = [
  {
    key: "1",
    pitch: "Ca 1",
    time: "7:00-9:00",
    address: "4",
    status: ["Tìm Đối"],
  },
  {
    key: "2",
    pitch: "Ca 2",
    time: "9:00-11:00",
    address: "4",
    status: ["Sân Trống"],
  },
  {
    key: "2",
    pitch: "Ca 3",
    time: "11:00-13:00",
    address: "4",
    status: ["Sân Bận"],
  },
];

const PitchDetailPage = () => {
  const data = [
    {
      label: "ĐẶT SÂN",
      value: "html",
      desc: (
        <>
          <div className="flex img-pitch gap-[20px]">
            <div className="left-img w-[65%] md:w-[100%]">
              <img src={img1} alt="" width="100%" />
            </div>
            <div className="right-img w-[30%] xl:grid md:hidden">
              <img src={img1} alt="" width="100%" />
              <img src={img1} alt="" width="100%" />
            </div>
          </div>
          <h1 className="text-pitch">SÂN BÓNG MẠNH CƯỜNG</h1>
          <p>
            {" "}
            <Rate allowHalf defaultValue={5} /> <span> ( 2 Reviews )</span>
          </p>
          <Table columns={columns} dataSource={tableData} />
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
      label: "DỊCH VỤ",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
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
    <div>
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
      <div className="mx-auto max-w-screen-2xl gap-10 flex md:block relative">
        {/* left */}
        <div className="sm:w-full md:w-full xl:w-[75%]">
          <Tabs id="custom-animation" value="html">
            <TabsHeader>
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
        <div className="right-detail-pitch xl:w-[25%] md:w-[100%]  md:relative md:mt-[50px] xl:absolute xl:top-[-100px] right-0 bg-white p-[40px]">
          <p className="mb-[30px] flex justify-between">
            HOT PITCH{" "}
            <span>
              <i className="text-[30px] fa-sharp fa-solid fa-star-of-david fa-spin fa-spin-reverse"></i>
            </span>
          </p>
          <p className="flex items-center justify-between">
            <i className="fa-solid fa-tag"></i>
            <span className="text-[13px]">GIÁ THUÊ CHỈ</span>
            <span className="text-[#ffb932]">150.000</span> -{" "}
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
          <a href="tel:0775292262" className="btn-call">
            <button>GỌI TỚI CHỦ SÂN</button>
          </a>
        </div>
      </div>

      {/* các sân bongs ưu tiên */}
      <div className="hot-pitch mx-auto max-w-screen-2xl xl px-[30px]">
        <h1>CÓ THỂ BẠN ĐÉO THÍCH</h1>
        <Swiper
          spaceBetween={80}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
        >
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
