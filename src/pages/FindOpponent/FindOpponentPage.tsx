import { useState, useEffect } from "react";
import axios from "axios";
import { Select, Rate, Form, Row, Col, Slider, InputNumber, Space } from "antd";
import { Input } from "@material-tailwind/react";
import banner from "../../assets/img/Web/bannerr.mp4";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { fetchAllPitch } from "~/Redux/Slices/pitchSlice";
import { toast } from "react-toastify";
import {
  fetchAllShiftFindOpponent,
  fetchFindOpponent,
} from "~/Redux/Slices/shiftSlice";
import IShift from "~/interfaces/shift";
import { matchOpponent } from "~/api/shift";

const FindOpponentPage = () => {
  const host = "http://localhost:8080/api/location/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state) => state.shift.shift);

  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${host}provinces`);
      setCities(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchAllShiftFindOpponent());
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

  const onHandleSubmit = async (idShift: any) => {
    try {
      const data = {
        idUserFindOpponent: "65131393f8698962d691cd12",
        phone_number: "0987957355",
        nameUserFindOpponent: "Phạm Anh Tuấn",
      };
      const value = { find_opponent: false };

      await matchOpponent(data);
      await dispatch(fetchFindOpponent({ idShift, value }));

      toast(
        "🦄 Ghép kèo thành công. Thông tin đối thủ đã được gửi về sms của bạn!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error("🦄 Lỗi Server!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
              TÌM KIẾM ĐỐI THEO KHU VỰC
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

      <div className="container flex justify-center mx-auto pb-20">
        <div className="pitch flex gap-[30px] mt-[40px] w-full">
          <div className="sidebar-pitch xl:w-[25%] md:w-[100%]">
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
              </div>
            </div>
            <div className="content-pitch container mx-auto max-w-screen-2xl">
              <div className="flex flex-wrap gap-[30px] mt-[40px]">
                {shifts?.map((item: IShift) => (
                  <div
                    key={item._id}
                    className="relative w-[50%] flex max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
                  >
                    <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                      <img
                        src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                        alt="ui/ux review check"
                      />
                      <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="block font-bold font-sans text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                          Sân Bóng FPoly
                        </h5>
                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          5.0
                        </p>
                      </div>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        <span className="text-pink-500">Vị trí:</span> Số 1,
                        Trịnh Văn Bô, Hà Nội
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        <span className="text-pink-500">Giá sân:</span>{" "}
                        {`${item.price.toLocaleString("vi-VN")}vnđ`}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        <span className="text-pink-500"> Ca sân:</span> Ca{" "}
                        {item.number_shift}
                        {`(${item.time_start} - ${item.time_end})`}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-pink-500">
                          Tài khoản đặt sân:
                        </p>
                        <div className="cursor-pointer">
                          <img
                            className="inline-block h-8 w-8 rounded-full object-cover object-center mr-2"
                            alt="Image placeholder"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          />
                          <p className="inline-block font-sans text-sm font-medium leading-normal text-blue-gray-900">
                            Phạm Tuấn
                          </p>
                        </div>
                      </div>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        <span className="text-pink-500">Ngày:</span> {item.date}
                      </p>
                    </div>
                    <div className="px-6 pb-4 pt-0">
                      <button
                        onClick={() => onHandleSubmit(item._id)}
                        className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Ghép kèo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindOpponentPage;
