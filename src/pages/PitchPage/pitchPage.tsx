import { useState, useEffect, ChangeEventHandler } from 'react';
import axios from 'axios';
import {
  Select,
  Rate,
  Form,
  Checkbox,
  InputNumber,
  Empty,
  Pagination,
  Button,
} from 'antd';
import { Input } from '@material-tailwind/react';
import './pitchPage.css';
import 'swiper/css';
import banner from '../../assets/img/Web/banner1.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { fetchAllPitch, search } from '~/Redux/Slices/pitchSlice';
import IPitch from '~/interfaces/pitch';
import { getAllServiceMid } from '~/Redux/Slices/serviceSlice';
import {
  PitchPagination,
  filterFeedbackPitch,
  getAllPitch,
  searchPitch,
} from '~/api/pitch';
import { totalStarByPitch } from '~/api/feedback';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

const fixedOptions = [
  { value: 'bong-da', label: 'Bóng đá' },
  { value: 'bong-chuyen', label: 'Bóng chuyền' },
  { value: 'gym', label: 'Gym' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'tennis', label: 'Tennis' },
];
const handleChange = (value: ChangeEventHandler) => {
  console.log(`selected ${value}`);
};

const PitchPage = () => {
  const [form] = Form.useForm();
  const host = 'http://localhost:8080/api/location/';
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [totalItems, setTotalItems] = useState(Number); //phantrang
  const [currentPage, setCurrentPage] = useState(1); //phantrang
  const [totalStar, setTotalStar] = useState<any>(Number);

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
    dispatch(fetchAllPitch(''));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllServiceMid());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPitch(); // Gửi yêu cầu GET đến URL_API
        const allItemsPitch = response?.data?.data?.totalDocs;
        setTotalItems(allItemsPitch);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // xứ lí start
  useEffect(() => {
    const fetchTotalStars = async () => {
      const stars = [];

      for (let i = 0; i < pitchs.length; i++) {
        try {
          const response = await totalStarByPitch(pitchs[i]?._id);
          const { data } = response.data;
          stars.push(data);
        } catch (error) {
          console.log(error);
          stars.push(0); // Nếu có lỗi, thêm giá trị mặc định (0) vào mảng stars
        }
      }

      setTotalStar(stars);
    };

    fetchTotalStars();
  }, [pitchs]);
  // console.log({ totalStar });

  // pitchs.forEach((item: any, index: any) => {
  //   console.log(`TotalStar${item.name}`, totalStar[index]);
  // });
  const handleServiceChange = (serviceValue: string) => {
    const updatedServices = selectedServices.includes(serviceValue)
      ? selectedServices.filter((service) => service !== serviceValue)
      : [...selectedServices, serviceValue];
    setSelectedServices(updatedServices);
  };

  const filteredPitchs = pitchs.filter((pitch: any) => {
    // console.log("Pitch Services:", pitch.services);
    return selectedServices.every((service) =>
      pitch.services.some((item: any) => item._id === service)
    );
  });

  const handleCityChange = async (value: string) => {
    setSelectedCity(value);

    if (value !== '') {
      const response = await axios.get(`${host}districts?parent=${value}`);
      setDistricts(response.data);
    }
  };

  const handleDistrictChange = async (value: string) => {
    setSelectedDistrict(value);

    if (value !== '') {
      const response = await axios.get(`${host}wards?parent=${value}`);
      setWards(response.data);
    }
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };
  // nếu ai muốn lấy
  const printResult = () => {
    if (selectedCity !== '' && selectedDistrict !== '' && selectedWard !== '') {
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
    return '';
  };

  const onHandleSubmitSearch = async () => {
    if (selectedWard === '' || selectedWard === undefined) {
      if (selectedDistrict === '' || selectedDistrict === undefined) {
        await dispatch(fetchAllPitch(``));
      } else {
        await dispatch(fetchAllPitch(`?districtId=${selectedDistrict}`));
      }
    } else {
      await dispatch(fetchAllPitch(`?wardId=${selectedWard}`));
    }
  };
  //lọc theo giá
  const onFinishFilterPrice = async (values: any) => {
    if (values) {
      const response = await searchPitch({
        paramPrice: {
          minPrice: values.min,
          maxPrice: values.max,
        },
        searchText: valueSearch,
      });
      console.log('checkFIllPrice', response);

      await dispatch(search(response?.data?.data?.data));
      if (response) {
        setTotalItems(response?.data?.data?.data?.length);
      }
    }
  };

  // Tìm Kiếm Theo sân
  const handlefil = async (value: string) => {
    setValueSearch(value);
    const response = await searchPitch({ searchText: value });
    console.log('searchHandfill', response?.data);
    dispatch(search(response?.data?.data?.data));
    if (response) {
      setTotalItems(response?.data?.data?.data?.length);
    }
  };
  // phân trang
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const response = await PitchPagination(pageNumber);
    console.log('phantrang', response?.data);
    const totalItems = response?.data?.data?.totalDocs;
    console.log('téttsst', totalItems);
    if (totalItems) {
      setTotalItems(totalItems);
    }
    dispatch(search(response?.data?.data?.data));
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };
  // xử lí lọc theo feedback
  const handleFeedbackChange = async (value: number) => {
    console.log('Đã chọn giá trị:', value);
    const response = await filterFeedbackPitch(value, 5);
    console.log('Fillter Feedback Pitch', response?.data);
    dispatch(search(response?.data?.data?.data));
  };

  //xử lí reset tìm kiếm
  const handleResetFilter = async () => {
    dispatch(fetchAllPitch(''));
    dispatch(getAllServiceMid());
    const response = await getAllPitch();
    const allItemsPitch = response?.data?.data?.totalDocs;
    setTotalItems(allItemsPitch);
    form.resetFields(['min', 'max']);
    setValueSearch('');
    setSelectedServices([]);
  };

  // xử lí sân bóng 5 sao

  return (
    <div className="bg-[#f3f3f5] pb-[40px]">
      <div className="bannerPpitchPage relative ">
        {/* banner cấc thứ */}
        <div className="video relative">
          <img src={banner} style={{ height: 400, width: '100%' }} />
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

      <div className=" container flex justify-center w-full mx-auto ">
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
                <button className="my-[10px] text-[#3a75da]"> Chỉ Đường</button>{' '}
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
                  value={valueSearch}
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
                <div>
                  <div onClick={() => handleFeedbackChange(5)}>
                    <button>
                      <Rate disabled defaultValue={5} />
                    </button>
                  </div>
                  <div onClick={() => handleFeedbackChange(4)}>
                    <button className="hover:text-blue-500">
                      <Rate disabled defaultValue={4} />
                      <span className="text-[16px] font-[500] pl-[5px]">
                        {' '}
                        trở Lên
                      </span>
                    </button>
                  </div>
                  <div onClick={() => handleFeedbackChange(3)}>
                    <button className="hover:text-blue-500">
                      <Rate disabled defaultValue={3} />
                      <span className="text-[16px] font-[500] pl-[5px]">
                        {' '}
                        trở Lên
                      </span>
                    </button>
                  </div>
                  <div onClick={() => handleFeedbackChange(2)}>
                    <button className="hover:text-blue-500">
                      <Rate disabled defaultValue={2} />
                      <span className="text-[16px] font-[500] pl-[5px]">
                        {' '}
                        trở Lên
                      </span>
                    </button>
                  </div>
                  <div onClick={() => handleFeedbackChange(1)}>
                    <button className="hover:text-blue-500">
                      <Rate disabled defaultValue={1} />
                      <span className="text-[16px] font-[500] pl-[5px]">
                        {' '}
                        trở Lên
                      </span>
                    </button>
                  </div>
                  <div onClick={() => handleFeedbackChange(0)}>
                    <button className="hover:text-blue-500">
                      <Rate disabled defaultValue={0} />
                      <span className="text-[16px] font-[500] pl-[5px]">
                        {' '}
                        trở Lên
                      </span>
                    </button>
                  </div>
                </div>
              </Form.Item>
              <div className="style-header-pitch my-[30px]"></div>
            </Form>
            <Form form={form} onFinish={onFinishFilterPrice}>
              <p className="mb-[10px] text-[23px] font-[600]">Lọc theo giá</p>

              <div className="flex gap-[5px] w-full">
                <Form.Item
                  name="min"
                  rules={[{ required: true, message: 'min!' }]}
                >
                  <InputNumber
                    style={{ width: 100 }}
                    min={0}
                    placeholder=" đTừ"
                  />
                </Form.Item>
                <div className="pt-[5px]">
                  <DoubleLeftOutlined /> <DoubleRightOutlined />
                </div>
                <Form.Item
                  name="max"
                  rules={[{ required: true, message: 'max!' }]}
                >
                  <InputNumber
                    style={{ width: 100 }}
                    min={0}
                    placeholder="đ Đến"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  style={{ width: 240 }}
                  type="primary"
                  className=" text-center bg-blue-600"
                  htmlType="submit"
                >
                  Áp Dụng
                </Button>
              </Form.Item>
            </Form>
            <div className="style-header-pitch my-[30px]"></div>
            <Button
              className="text-center"
              style={{ width: 240 }}
              onClick={handleResetFilter}
            >
              Xoá Tất Cả
            </Button>
          </div>

          {/* sân bóng ở đây */}
          <div className="right-pitch xl:w-[950px] max-w-5xl">
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
                  style={{ width: '25%' }}
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
                filteredPitchs.map((pitch: IPitch, index: any) => (
                  <div className="list-pitch mt-[40px]" key={index}>
                    <Link to={`/pitch/detail/${pitch._id}`}>
                      <div className="grid grid-cols-12 gap-[40px] shadow-lg my-[40px] item-pitch pr-[15px] bg-[white] rounded-[15px]">
                        <div className="imgae-item-pitch col-span-5">
                          <img
                            src={pitch.avatar}
                            className="rounded-l-[20px] h-[100%] object-cover"
                            width="100%"
                            alt=""
                          />
                        </div>

                        <div className="text-item-pitch col-span-7 ml-[20px]">
                          <h3 className=" text-[23px] font-[600] font-sans">
                            {pitch.name}
                          </h3>
                          <Rate
                            disabled
                            allowHalf
                            value={
                              totalStar[index]?.averageRating?.toFixed(1) ?? ''
                            }
                          />
                          <span>( {pitch?.feedback_id?.length} Review)</span>
                          <p className="my-[5px]">Kiểu Sân : Sân 7 Người</p>
                          <p>Số Sân Trống : 3/4</p>
                          <p className="flex justify-between my-[10px]">
                            Dịch Vụ :
                            {pitch.services.map((data: any) => {
                              // console.log("data Sê vít", data);
                              const service = services.find(
                                (item) => item._id == data._id
                              );
                              return (
                                <span key={data._id!}>
                                  <i className="fa-solid fa-check"></i>{' '}
                                  {service ? service.name : 'Chưa có dịch vụ'}
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
                              {pitch.deposit_price.toLocaleString('vi-VN')} -
                              850.000
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
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={5}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* các sân bongs 5 sao */}
      {/* <PitchStar /> */}
    </div>
  );
};

export default PitchPage;
