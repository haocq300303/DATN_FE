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
  Empty,
} from "antd";
import { Input } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./pitchPage.css";
import "swiper/css";
import banner from "../../assets/img/Web/bannerr.mp4";
import item2 from "../../assets/img/Web/stadium1.jfif";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { fetchAllPitch, filter, filterPrice } from "~/Redux/Slices/pitchSlice";
import IPitch from "~/interfaces/pitch";
import { getAllServiceMid } from "~/Redux/Slices/serviceSlice";

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
  const host = "http://localhost:8080/api/location/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const pitchs = useAppSelector((state) => state.pitch.pitchs);
  const services = useAppSelector((state) => state.service.services);
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

  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);

  // const servicesForPitch = services.filter(
  //   (service: IService) => service?.id_Pitch?._id === Pitch._id
  // );
  // console.log(servicesForPitch);

  const handleServiceChange = (serviceValue: string) => {
    const updatedServices = selectedServices.includes(serviceValue)
      ? selectedServices.filter((service) => service !== serviceValue)
      : [...selectedServices, serviceValue];
    setSelectedServices(updatedServices);
    console.log("Fillter Service", updatedServices);
  };

  const filteredPitchs = pitchs.filter((pitch: any) => {
    console.log("Pitch Services:", pitch.services);
    return selectedServices.every((service) =>
      pitch.services.some((item: any) => item._id === service)
    );
  });

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

  const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);
    console.log("valueInput", inputValue);
    const maxPrice = useAppSelector(
      (state) => state.pitch.filterPrice?.maxPrice
    );
    console.log("maxPrice", maxPrice);

    const onChangePrice = (newValue: number | null) => {
      if (newValue !== null) {
        setInputValue(newValue);
        dispatch(filterPrice({ minPrice: 1, maxPrice: newValue }));
      }
    };
    useEffect(() => {
      if (typeof maxPrice === "number") {
        return setInputValue(maxPrice);
      }
    }, [maxPrice]);

    return (
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={850000}
            onChange={onChangePrice}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            min={1}
            max={850000}
            style={{ margin: "0 16px" }}
            value={inputValue}
            onChange={onChangePrice}
          />
        </Col>
      </Row>
    );
  };
  // Tìm Kiếm Theo sân
  const handlefil = (value: any) => {
    const filteredItems = pitchs.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredItems);
    if (value === "") {
      dispatch(fetchAllPitch(""));
    }
    dispatch(filter(value.trim()));
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
                onChange={handleCityChange}
                allowClear
                showSearch
              >
                {cities?.map((city: { id: string; name: string }) => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))}
              </Select>

              <Select
                className="w-[25%] h-[45px]"
                placeholder="Quận Huyện"
                onChange={handleDistrictChange}
              >
                {districts?.map((district: { id: string; name: string }) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
              <Select
                className="w-[25%] h-[45px]"
                placeholder="Phường Xã"
                onChange={handleWardChange}
              >
                {wards?.map((ward: { id: string; name: string }) => (
                  <Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>

              <button
                type="submit"
                onClick={onHandleSubmitSearch}
                className="bg-[#128277] hover:bg-[#004d47] hover:text-white text-white rounded-[30px] py-[13px] px-[18px]"
              >
                Search <i className="fa-brands fa-searchengin ml-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
        {/* chọn địa điêrm ở đây */}
      </div>

      <div className=" container flex justify-center w-full mx-auto">
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
                  onChange={(e) => handlefil(e.target.value)}
                />
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>
              <Form.Item>
                <p className="mb-[10px] text-[23px] font-[600]">
                  Lọc theo dịch vụ
                </p>
                <span className="font-[600]">Bộ lọc phổ biến nhất</span>
                <div className="grid mt-4 gap-[10px]">
                  {services.map((service: any) => (
                    <div key={service._id}>
                      <Checkbox
                        onChange={() => handleServiceChange(service._id)}
                      >
                        {service.name}
                      </Checkbox>
                    </div>
                  ))}
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
                  {fixedOptions?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="content-pitch container mx-auto max-w-screen-2xl">
              {filteredPitchs && filteredPitchs.length > 0 ? (
                filteredPitchs.map((pitch: IPitch) => (
                  <div className="list-pitch mt-[40px]" key={pitch._id}>
                    <Link to={`/pitch/detail/${pitch._id}`}>
                      <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                        <div className="imgae-item-pitch col-span-5">
                          <img
                            src={pitch.avatar}
                            className="rounded-l-[20px]"
                            width="100%"
                            alt=""
                          />
                        </div>

                        <div className="text-item-pitch col-span-7 ml-[20px]">
                          <h3 className=" text-[23px] font-[600] font-sans">
                            {pitch.name}
                          </h3>
                          <Rate defaultValue={4.5} />
                          <span>( 1 Review)</span>
                          <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                          <p>Số Sân Trống : 3/4</p>
                          <p className="flex justify-between my-[10px]">
                            Dịch Vụ :
                            {pitch.services.map((data: any) => {
                              console.log(data);
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
                                300.000-1.200.000
                              </del>
                            </span>
                            <span className="text-[23px] text-[#ffb932] text-bold">
                              {pitch.deposit_price} - 850.000
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <Empty />
                </div>
              )}
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
