import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import {
  Select,
  Rate,
  Form,
  Checkbox,
  Row,
  Col,
  Slider,
  InputNumber,
  Space,
} from "antd";
import { Input } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./pitchPage.css";
import "swiper/css";
import banner from "../../assets/img/Web/bannerr.mp4";
import item1 from "../../assets/img/Web/itempitch.jpg";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { Link } from "react-router-dom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

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
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
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
      const ward: any = wards.find((w: any) => w.code === selectedWard);
      if (city && district && ward) {
        const result = `Khu Vực ${city.name} | ${district.name} | ${ward.name}`;
        return result;
      }
    }
    return "";
  };

  const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);

    const onChangePrice = (newValue: number | null) => {
      if (newValue !== null) {
        setInputValue(newValue);
      }
    };
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={200000}
            onChange={onChangePrice}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            min={1}
            max={20}
            style={{ margin: "0 16px" }}
            value={inputValue}
            onChange={onChangePrice}
          />
        </Col>
      </Row>
    );
  };

  return (
    <div className="bg-[#f3f3f5]">
      <div className="bannerPpitchPage relative ">
        {/* banner cấc thứ */}
        <div className="video relative">
          <video autoPlay loop muted>
            <source src={banner} />
          </video>
          <div className="absolute book-banner w-[70%] right-0 top-[50%] left-0 mx-auto">
            <h1 className="h1-banner container text-[32px] leading-[40px] mt-[-50px] mb-[30px] font-sans text-[#fff] font-bold tracking-wide">
              TÌM KIẾM SÂN BÓNG PHÙ HỢP VỚI BẠN
            </h1>
            <div className="items-center flex-wrap flex  min-w-0 mx-auto justify-between w-full max-w-screen-2xl">
              <Select
                className="w-[25%] h-[45px]"
                placeholder="Thành Phố"
                value={selectedCity}
                onChange={handleCityChange}
                showSearch
              >
                {cities.map((city: any) => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
              </Select>

              <Select
                className="w-[25%] h-[45px]"
                placeholder="Quận Huyện"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                defaultValue={""}
              >
                {districts.map((district: any) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
              <Select
                className="w-[25%] h-[45px]"
                placeholder="Phường Xã"
                value={selectedWard}
                onChange={handleWardChange}
                defaultValue={undefined}
              >
                {wards.map((ward: any) => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
              </Select>

              <button
                type="submit"
                className="bg-[#128277] hover:bg-[#004d47] hover:text-white text-white rounded-[30px] py-[13px] px-[18px]"
              >
                Search <i className="fa-brands fa-searchengin ml-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
        {/* chọn địa điêrm ở đây */}
      </div>

      <div className="container">
        <div className="pitch flex gap-[30px] mt-[40px]">
          <div className="sidebar-pitch xl:w-[25%] md:w-[100%]">
            <div className="maps bg-[#fff]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9631506304613!2d105.7677671750488!3d21.034160387593463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b9df6626ef%3A0xbadd9b53272fd8c1!2zMjEgxJAuIEzDqiDEkOG7qWMgVGjhu40sIE3hu7kgxJDDrG5oLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1698378147194!5m2!1sen!2s"
                loading="lazy"
                className="w-[100%]"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/bMpLZc9tXFTEAEMLA"
                target="_blank"
              >
                <button className="my-[10px] text-[#3a75da]"> Chỉ Đường</button>{" "}
              </a>
            </div>
            <div className="style-header-pitch my-[30px]"></div>
            <Form>
              <Form.Item>
                <p className="mb-[15px] text-[23px] font-[600]">
                  Tìm kiếm theo tên
                </p>
                <Input
                  label="Tìm Tên Sân ..."
                  className=" bg-[white]"
                  crossOrigin="anonymous"
                />
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>
              <Form.Item>
                <p className="mb-[10px] text-[23px] font-[600]">
                  Lọc theo dịch vụ
                </p>
                <span className="font-[600]">Bộ lọc phổ biến nhất</span>
                <div className="grid mt-4 gap-[10px]">
                  <div>
                    <Checkbox onChange={onChange}>Wifi</Checkbox>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>Thuê áo bít</Checkbox>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>Canteen</Checkbox>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>Thuê bóng</Checkbox>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>Cổ vũ</Checkbox>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>Nước hỗ trợ</Checkbox>
                  </div>
                </div>
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>
              <Form.Item>
                <p className="mb-[10px] text-[23px] font-[600]">
                  Lọc theo đánh giá
                </p>
                <Rate allowHalf defaultValue={2.5} />
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>

              <Form.Item>
                <p className="mb-[10px] text-[23px] font-[600]">Lọc theo giá</p>

                <Space style={{ width: "100%" }} direction="vertical">
                  <IntegerStep />
                </Space>
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>
            </Form>
          </div>

          {/* sân bóng ở đây */}
          <div className="right-pitch xl:w-[75%]">
            <div className="header-pitch">
              <div className="container mx-auto flex justify-between">
                <div>
                  <p>
                    <span>2368</span> Kết quả :
                  </p>
                  <h1 className="text-[23px] font-sans text-[#343434] relative font-[600]">
                    Kết quả tìm kiếm : <span>{printResult()}</span>
                  </h1>
                </div>

                <Select
                  mode="tags"
                  style={{ width: "25%" }}
                  placeholder="Môn thể thao"
                  onChange={handleChange}
                >
                  {fixedOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="content-pitch container mx-auto max-w-screen-2xl">
              <div className="list-pitch mt-[40px]">
                <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>
                <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>
                <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>  <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>
                <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>
                <Link to="detail" >
                  <div className="grid grid-cols-12 gap-[40px] shadow-lg shad4w-lg my-[30px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                    <div className="imgae-item-pitch col-span-5">
                      <img src={item1}className="rounded-l-[20px]" width="100%"  alt="" />
                    </div>

                    <div className="text-item-pitch col-span-7 ml-[20px]">
                      <h3 className=" text-[23px] font-[600] font-sans">SÂN BÓNG MẠNH CƯỜNG</h3>
                      <Rate  defaultValue={4.5} />
                      <span>( 1 Review)</span>
                      <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                      <p>Số Sân Trống : 3/4</p>
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
                  </div>
                </Link>   
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* các sân bongs ưu tiên */}
      <div className="hot-pitch mx-auto max-w-screen-2xl xl px-[30px]">
        <h1>CÓ THỂ BẠN KHUM THÍCH</h1>
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
