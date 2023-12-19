import { useEffect, useState } from 'react';
import { matchOpponent, getAllShiftFindOpponentByPitch } from '~/api/shift';
import IShift from '~/interfaces/shift';
import { toast } from 'react-toastify';
import { Button, Form, Input, Modal } from 'antd';
import { useAppSelector } from '~/Redux/hook';

const FindOpponent = ({ idPitch }: { idPitch: string }) => {
  const [shifts, setShifts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [dataMatchOpponent, setDataMatchOpponent] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user: any = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    (async () => {
      const { data } = await getAllShiftFindOpponentByPitch(idPitch);
      setShifts(data.data);
    })();
  }, [idPitch]);

  const handleComfirm = (data: any) => {
    setDataMatchOpponent(data);

    setIsModal(true);
  };

  const onHandleSubmit = async () => {
    try {
      if (!user?.values?.phone_number && !user?.values?.email && !user?.values?.name) {
        if (!email && !phoneNumber && !errorName) {
          setErrorEmail('Vui lòng nhập email!');
          setErrorPhone('Vui lòng nhập số điện thoại!');
          setErrorName('Vui lòng nhập Tên!');
          return;
        }
      }

      if (!user?.values?.phone_number) {
        const phoneRegex = /^[0-9]{10,}$/;

        if (!phoneNumber) {
          setErrorPhone('Vui lòng nhập số điện thoại!');
          return;
        }

        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
          setErrorPhone('Vui lòng nhập số điện thoại hợp lệ');
          return;
        }

        setErrorPhone('');
      }

      if (!user?.values?.email) {
        const emailRegex = /\S+@\S+\.\S+/;

        if (!email) {
          setErrorEmail('Vui lòng nhập email!');
          return;
        }

        if (email && !emailRegex.test(email)) {
          setErrorEmail('Vui lòng nhập địa chỉ email hợp lệ');
          return;
        }

        setErrorEmail('');
      }

      if (!user?.values?.name) {
        if (!name) {
          setErrorName('Vui lòng nhập Họ Tên!');
          return;
        }

        setErrorEmail('');
      }

      setIsLoading(true);

      const data = {
        idUserFindOpponent: dataMatchOpponent?.user?._id,
        email: dataMatchOpponent?.user?.email,
        phone_number: dataMatchOpponent?.user?.phone_number,
        nameUserFindOpponent: dataMatchOpponent?.user?.name,
        currentUserEmail: user?.values?.email ? user?.values?.email : email,
        currentUserPhone: user?.values?.phone_number ? user?.values?.phone_number : phoneNumber,
        currentUserName: user?.values?.name ? user?.values?.name : name,
        currentUserId: user?.values?._id ? user?.values?._id : '',
      };

      await matchOpponent(data);
      setIsLoading(false);
      toast(`🦄 Ghép kèo thành công. Thông tin đối đã được gửi về ${user?.values?.email ? user?.values?.email : email}!`, {
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
    <div className="content-pitch container mx-auto max-w-screen-2xl">
      <div className="flex flex-wrap gap-[30px] mt-[40px]">
        {shifts?.map((item: IShift) => (
          <div
            key={item._id}
            className="relative w-[50%] flex max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="block font-bold font-sans text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                  {item?.id_pitch?.name}
                </h5>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 mb-[4px]">
                <span className="text-pink-500">Vị trí:</span> {item?.id_pitch?.address}
              </p>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 mb-[4px]">
                <span className="text-pink-500">Giá sân:</span> {`${item.price.toLocaleString('vi-VN')}vnđ`}
              </p>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 mb-[4px]">
                <span className="text-pink-500"> Ca sân:</span> Ca {item.number_shift}
                {` (${item.start_time}h - ${item.end_time}h)`}
              </p>
              <div className="flex items-center justify-between mb-[4px]">
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-pink-500">Tài khoản đặt sân:</p>
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
                Chi tiết
              </button>
            </div>
          </div>
        ))}
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
              <div className={`${!user?.values?.phone_number ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[160px] text-[16px] font-semibold mb-[8px]">Vui lòng nhập số điện thoại của bạn</span>
                {!user?.values?.phone_number && (
                  <Form.Item validateStatus={errorPhone ? 'error' : ''} help={errorPhone}>
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
              <div className={`${!user?.values?.email ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[160px] text-[16px] font-semibold mb-[8px]">Vui lòng nhập email của bạn</span>
                {!user?.values?.email && (
                  <Form.Item validateStatus={errorEmail ? 'error' : ''} help={errorEmail}>
                    <Input
                      size="large"
                      className="w-[75%]"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>
              <div className={`${!user?.values?.name ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[160px] text-[16px] font-semibold mb-[8px]">Vui lòng nhập tên của bạn</span>
                {!user?.values?.name && (
                  <Form.Item validateStatus={errorName ? 'error' : ''} help={errorName}>
                    <Input
                      size="large"
                      className="w-[75%]"
                      placeholder="Nhập Họ Tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onHandleSubmit}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-[3px] border-[#333] border-solid rounded-full animate-spin"></div>
              </span>
            ) : (
              'Ghép kèo'
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FindOpponent;
