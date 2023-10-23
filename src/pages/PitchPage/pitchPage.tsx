import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import { Select, Button, Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
// import type { DotPosition } from "antd/es/carousel";
import { SearchOutlined } from "@ant-design/icons";
import "./pitchPage.css";
import "swiper/css";
import banner from "../../assets/img/Web/bannerr.mp4";
import item1 from "../../assets/img/Web/itempitch.jpg";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { Link } from "react-router-dom";
const fixedOptions = [
  { value: "bong-da", label: "Bóng đá" },
  { value: "bong-chuyen", label: "Bóng chuyền" },
  { value: "gym", label: "Gym" },
  { value: "yoga", label: "Yoga" },
  { value: "tennis", label: "Tennis" },
];
const handleChange = (value: ChangeEventHandler) => {
  console.log(`selected ${value}`);
};
const PitchPage = () => {
  const host = "https://provinces.open-api.vn/api/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  // const [dotPosition, setDotPosition] = useState<DotPosition>("right");

  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${host}?depth=1`);
      setCities(response.data);
    };
    fetchData();
  }, []);

  const handleCityChange = async (value: string) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    setSelectedWard("");

    if (value !== "") {
      const response = await axios.get(`${host}p/${value}?depth=2`);
      console.log(response.data.name);
      setDistricts(response.data.districts);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = async (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard("");

    if (value !== "") {
      const response = await axios.get(`${host}d/${value}?depth=2`);
      setWards(response.data.wards);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };
  // nếu ai muốn lấy
  const printResult = () => {
    if (selectedCity !== "" && selectedDistrict !== "" && selectedWard !== "") {
      const city: any = cities.find((c: any) => c.code === selectedCity);
      const district: any = districts.find(
        (d: any) => d.code === selectedDistrict
      );
      const ward:any = wards.find((w: any) => w.code === selectedWard);
      if (city && district && ward) {
        const result = `Khu Vực ${city.name} | ${district.name} | ${ward.name}`;
        return result;
      }
    }
    return "";
  };

  return (
    <div>
      <div className="bannerPpitchPage relative ">
        {/* banner cấc thứ */}
        <div className="video">
          <video autoPlay loop muted>
            <source src={banner} />
          </video>
        </div>
        {/* chọn địa điêrm ở đây */}
        <div className="absolute book-banner  left-0 right-0 bottom-[-90px]">
          <h1 className="mx-auto text-center h1-banner"> CHỌN KHU VỰC</h1>
          <div className="flex  gap-3 items-center flex-wrap  min-w-0 mx-auto justify-center w-full max-w-screen-2xl">
            <Select
              style={{ width: "20%" }}
              placeholder="Thành Phố"
              value={selectedCity}
              onChange={handleCityChange}
              allowClear
              showSearch
            >
              {cities.map((city:any) => (
                <Option key={city.code} value={city.code}>
                  {city.name}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: "20%" }}
              placeholder="Quận Huyện"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              defaultValue={""}
            >
              {districts.map((district:any) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: "20%" }}
              placeholder="Phường Xã"
              value={selectedWard}
              onChange={handleWardChange}
              defaultValue={undefined}
            >
              {wards.map((ward:any) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
            <Select
              mode="tags"
              style={{ width: "15%" }}
              placeholder="Môn thể thao"
              onChange={handleChange}
            >
              {fixedOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Button
              className="bg-[#fd9e4b] hover:bg-[#fdaa4b] hover:text-white text-white"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* sân bóng ở đây */}
      <div className="pitch">
        <div className="header-pitch">
          <div className="style-header-pitch"></div>
          <div className="container mx-auto max-w-screen-2xl">
            <h1>
              DANH SÁCH CÁC SÂN THỂ THAO <span>{printResult()}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="content-pitch container mx-auto max-w-screen-2xl">
          <div className="list-pitch grid gap-[60px] px-[20px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
            <div className="item-pitch px-[15px] ">
              <Link to="detail">
                <div className="imgae-item-pitch">
                  <img src={item1} width="100%" alt="" />
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
          </div>
        </div>
      </div>

      {/* các sân bongs ưu tiên */}
      <div className="hot-pitch mx-auto max-w-screen-2xl xl px-[30px]">
        <h1>CÓ THỂ BẠN ĐÉO THÍCH</h1>
        <Swiper
          spaceBetween={80}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
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

export default PitchPage;
