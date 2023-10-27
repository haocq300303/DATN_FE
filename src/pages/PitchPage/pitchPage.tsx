import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import { Select, Button, Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
// import type { DotPosition } from "antd/es/carousel";
import { SearchOutlined } from "@ant-design/icons";
import "./pitchPage.css";
import "swiper/css";
import banner from "../../assets/img/Web/bannerr.mp4";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { fetchAllPitch } from "~/Redux/Slices/pitchSlice";
import IPitch from "~/interfaces/pitch";
const fixedOptions = [
  { value: "bong-da", label: "Bóng đá" },
  { value: "bong-chuyen", label: "Bóng chuyền" },
  { value: "gym", label: "Gym" },
  { value: "yoga", label: "Yoga" },
  { value: "tennis", label: "Tennis" },
];

const PitchPage = () => {
  const host = "http://localhost:8080/api/location/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useAppDispatch();
  const pitchs = useAppSelector((state) => state.pitch.pitchs);

  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${host}provinces`);
      setCities(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchAllPitch(""));
  }, [dispatch]);

  const handleCityChange = async (value: string) => {
    setSelectedCity(value);

    if (value !== "") {
      const response = await axios.get(`${host}districts?parent=${value}`);
      setDistricts(response.data);
    }
  };

  const handleDistrictChange = async (value: string) => {
    setSelectedDistrict(value);

    if (value !== "") {
      const response = await axios.get(`${host}wards?parent=${value}`);
      setWards(response.data);
    }
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };
  // nếu ai muốn lấy
  const printResult = () => {
    if (selectedCity !== "" && selectedDistrict !== "" && selectedWard !== "") {
      const city: any = cities.find((c: any) => c.id === selectedCity);
      const district: any = districts.find(
        (d: any) => d.id === selectedDistrict
      );
      const ward: any = wards.find((w: any) => w.id === selectedWard);
      if (city && district && ward) {
        const result = `Khu Vực ${city.name} | ${district.name} | ${ward.name}`;
        return result;
      }
    }
    return "";
  };

  const handleChange = (value: ChangeEventHandler) => {
    console.log(`selected ${value}`);
  };

  const onHandleSubmitSearch = async () => {
    if (selectedWard === "" || selectedWard === undefined) {
      if (selectedDistrict === "" || selectedDistrict === undefined) {
        await dispatch(fetchAllPitch(``));
      } else {
        await dispatch(fetchAllPitch(`?districtId=${selectedDistrict}`));
      }
    } else {
      await dispatch(fetchAllPitch(`?wardId=${selectedWard}`));
    }
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
              onChange={handleCityChange}
              allowClear
              // showSearch
            >
              {cities?.map((city: { id: string; name: string }) => (
                <Option key={city.id} value={city.id}>
                  {city.name}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: "20%" }}
              placeholder="Quận Huyện"
              onChange={handleDistrictChange}
              allowClear
            >
              {districts?.map((district: { id: string; name: string }) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: "20%" }}
              placeholder="Phường Xã"
              onChange={handleWardChange}
              allowClear
            >
              {wards?.map((ward: { id: string; name: string }) => (
                <Option key={ward.id} value={ward.id}>
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
              {fixedOptions?.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Button
              onClick={onHandleSubmitSearch}
              className="bg-red-500 hover:bg-red-700 hover:text-white text-white"
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
              DANH SÁCH CÁC SÂN THỂ THAO <span>{printResult()}</span>
            </h1>
          </div>
        </div>
        <div className="content-pitch container mx-auto max-w-screen-2xl">
          <div className="list-pitch grid gap-[60px] px-[20px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {pitchs?.map((pitch: IPitch) => (
              <div className="item-pitch px-[15px] ">
                <Link to="detail">
                  <div className="imgae-item-pitch">
                    <img src={pitch.avatar} width="100%" alt="" />
                  </div>
                  <div className="text-item-pitch">
                    <Rate allowHalf defaultValue={4.5} />
                    <span>( 1 Review)</span>
                    <h3>{pitch.name}</h3>
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
            ))}
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
          // onSwiper={(swiper) => console.log(swiper)}
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
