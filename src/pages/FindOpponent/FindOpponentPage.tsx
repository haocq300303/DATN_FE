import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import banner from '../../assets/img/Web/banner1.png';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { fetchAllPitch } from '~/Redux/Slices/pitchSlice';
import { toast } from 'react-toastify';
import { fetchAllShiftFindOpponent } from '~/Redux/Slices/shiftSlice';
import IShift from '~/interfaces/shift';
import { matchOpponent } from '~/api/shift';
import { sendMail } from '~/api/email';

const FindOpponentPage = () => {
  const host = 'http://localhost:8080/api/location/';
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [dataMatchOpponent, setDataMatchOpponent] = useState<any>({});

  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state) => state.shift.shift);
  const user: any = useAppSelector((state) => state.user.currentUser);

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

  const handleComfirm = (data: any) => {
    setDataMatchOpponent(data);

    setIsModal(true);
  };

  const printResult = () => {
    if (selectedCity !== '' && selectedDistrict !== '' && selectedWard !== '') {
      const city: any = cities.find((c: any) => c.id === selectedCity);
      const district: any = districts.find((d: any) => d.id === selectedDistrict);
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

  const onHandleSubmit = async () => {
    try {
      if (!user?.values?.phone_number) {
        const phoneRegex = /^[0-9]{10,}$/;

        if (!phoneNumber) {
          setError('Vui lòng nhập số điện thoại!');
          return;
        }

        if (!phoneRegex.test(phoneNumber)) {
          setError('Vui lòng nhập số điện thoại hợp lệ');
          return;
        }

        setError('');
      }

      const data = {
        idUserFindOpponent: dataMatchOpponent?.user?._id,
        email: dataMatchOpponent?.user?.email,
        phone_number: dataMatchOpponent?.user?.phone_number,
        nameUserFindOpponent: dataMatchOpponent?.user?.name,
      };
      const dataSendEmail = {
        email_to: dataMatchOpponent?.user?.email,
        subject: ` Thông Báo Ghép kèo Thành Công !`,
        content: ` Sân Bóng ${dataMatchOpponent?.id_pitch?.name} - Thời Gian : ${dataMatchOpponent?.start_time} - ${dataMatchOpponent?.end_time}`,
        html: ` Xin chúc mừng bạn đã ghép kèo thành công !`
      }

      await matchOpponent(data);
      await sendMail(dataSendEmail);
      toast('🦄 Ghép kèo thành công. Thông tin đối đã được gửi về email của bạn!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setIsModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className="bg-[#f3f3f5]">
      <div className="bannerPpitchPage relative ">
        {/* banner cấc thứ */}
        <div className="video relative">
          <img src={banner} style={{ height: 300, width: '100%' }} />
          <div className="absolute book-banner w-[70%] right-0 top-[50%] left-0 mx-auto">
            <h1 className="h1-banner container text-[32px] leading-[40px] mt-[-50px] mb-[30px] font-sans text-[#fff] font-bold tracking-wide">
              TÌM KIẾM ĐỐI THEO KHU VỰC
            </h1>
            <div className="items-center flex-wrap flex  min-w-0 mx-auto justify-between w-full max-w-screen-2xl">
              <Select className="w-[25%] h-[45px]" placeholder="Thành Phố" onChange={handleCityChange} allowClear showSearch>
                {cities?.map((city: { id: string; name: string }) => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))}
              </Select>

              <Select className="w-[25%] h-[45px]" placeholder="Quận Huyện" onChange={handleDistrictChange}>
                {districts?.map((district: { id: string; name: string }) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
              <Select className="w-[25%] h-[45px]" placeholder="Phường Xã" onChange={handleWardChange}>
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
        <div className="pitch mt-[40px] w-full">
          {/* sân bóng ở đây */}
          <div className="right-pitch">
            <div className="header-pitch">
              <div className="container mx-auto flex justify-between">
                <div>
                  {/* <p>
                    <span>2368</span> Kết quả :
                  </p> */}
                  <h1 className="text-[23px] font-sans text-[#343434] relative font-[600]">
                    Kết quả tìm kiếm : <span>{printResult()}</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="content-pitch container mx-auto max-w-screen-2xl">
              <div className="flex flex-wrap mt-[40px] mx-[-8px]">
                {shifts?.map((item: IShift) => (
                  <div key={item._id} className="w-[33%] px-[8px] mb-[24px]">
                    <div className="relative flex max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                      <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                        <img src={item?.id_pitch?.avatar} alt="ui/ux review check" />
                        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                      </div>
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="block font-bold font-sans text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                            {item?.id_pitch?.name}
                          </h5>
                        </div>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                          <span className="text-pink-500">Vị trí:</span> {item?.id_pitch?.address}
                        </p>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                          <span className="text-pink-500">Giá sân:</span> {`${item.price.toLocaleString('vi-VN')}vnđ`}
                        </p>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                          <span className="text-pink-500"> Ca sân:</span> Ca {item.number_shift}
                          {` (${item.start_time}h - ${item.end_time}h)`}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="block font-sans text-base antialiased font-light leading-relaxed text-pink-500">
                            Tài khoản đặt sân:
                          </p>
                          <div className="cursor-pointer">
                            <img
                              className="inline-block h-8 w-8 rounded-full object-cover object-center mr-2"
                              alt="Image placeholder"
                              src="https://res.cloudinary.com/dn3jydehx/image/upload/v1702435936/no-user-image_gkpyv1.jpg"
                            />
                            <p className="inline-block font-sans text-sm font-medium leading-normal text-blue-gray-900">
                              {item?.user ? item?.user?.name : 'Thằng nào xóa booking rồi'}
                            </p>
                          </div>
                        </div>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                          <span className="text-pink-500">Ngày:</span> {item.date[0]}
                        </p>
                      </div>
                      <div className="px-6 pb-4 pt-0">
                        <button
                          onClick={() => handleComfirm(item)}
                          className="block w-full select-none rounded-lg bg-pink-500 py-3 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          Ghép kèo
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModal} onOk={() => setIsModal(false)} onCancel={() => setIsModal(false)} width="500px" footer={null}>
        <div className="flex text-[#003553] min-h-[400px] gap-[28px]">
          <div className="mb-[8px] w-full rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#1fd392,#00e0ff)] p-2 text-white text-center font-bold">
              Thông tin sân bóng
            </h3>

            <div className="px-8 py-6">
              <p className="text-[18px] font-semibold mt-[-4px] mb-[10px]">
                <span className="inline-block min-w-[160px]">Sân bóng: </span>
                <span className="font-bold">{dataMatchOpponent?.id_pitch?.name}</span>
              </p>
              {/* <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[100px]">Địa chỉ: </span>
                <span className="font-bold">{dataMatchOpponent?.id_pitch?.address}</span>
              </p> */}
              <p className="text-[14px] font-normal mt-[-4px] mb-[16px]">{dataMatchOpponent?.id_pitch?.address}</p>
              <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[160px]">Ca: </span>
                <span className="font-bold">{dataMatchOpponent?.number_shift}</span>
              </p>
              <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[160px]">Thời gian: </span>
                <span className="font-bold">
                  ( {dataMatchOpponent?.start_time}h - {dataMatchOpponent?.end_time}h )
                </span>
              </p>
              <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[160px]">Ngày: </span>
                <span className="font-bold">{dataMatchOpponent?.date && dataMatchOpponent?.date[0]}</span>
              </p>
              <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[160px]">Giá: </span>
                <span className="font-bold">
                  {dataMatchOpponent?.price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>

              <p className="text-[18px] font-semibold mt-[-4px] mb-[16px]">
                <span className="inline-block min-w-[160px]">Tài khoản đặt sân: </span>
                <span className="font-bold"> {dataMatchOpponent?.user?.name}</span>
              </p>
              <div className={`mb-[8px] ${!user?.values?.phone_number ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[160px] text-[16px] font-semibold mb-[8px]">Vui lòng nhập số điện thoại của bạn</span>
                {!user?.values?.phone_number && (
                  <Form.Item validateStatus={error ? 'error' : ''} help={error}>
                    <Input
                      size="large"
                      className="w-[75%]"
                      placeholder="Nhập số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onHandleSubmit}>Xác nhận</Button>
        </div>
      </Modal>
    </div>
  );
};

export default FindOpponentPage;
