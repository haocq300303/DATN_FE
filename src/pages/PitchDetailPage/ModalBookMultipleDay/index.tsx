import { Modal } from 'antd';
import { Dispatch, useState } from 'react';
import SelectChildrenPitch from './SelectChildrenPitch';
import SelectShift from './SelectShift';
import SelectService from './SelectService';
import SelectDate from './SelectDate';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface IModalBookMultipleDay {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  pitchId: string;
  namePitch: string;
  address: string;
  phone?: string;
  avatar?: string;
  idAdminPitch?: string;
  nameAdminPitch?: string;
}

const ModalBookMultipleDay = ({
  isOpen,
  setOpen,
  pitchId,
  namePitch,
  address,
  phone,
  avatar,
  idAdminPitch,
  nameAdminPitch,
}: IModalBookMultipleDay) => {
  const [dataBooking, setDataBooking] = useState<any[]>([]);
  const navigate = useNavigate();

  const totalPrice =
    (dataBooking[2]?.length > 0 ? dataBooking[1]?.price * dataBooking[2]?.length : dataBooking[1]?.price) +
    (dataBooking[3]?.reduce((total: any, service: any) => total + service.price, 0) || 0) * dataBooking[2]?.length;

  const handleSubmitBooking = () => {
    Swal.fire({
      title: 'Vui Lòng Xác Nhận Đặt Lịch!',
      showDenyButton: true,
      confirmButtonText: 'Xác nhận',
      denyButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem(
          'infoBooking',
          JSON.stringify({
            pitch: {
              _id: pitchId,
              name: namePitch,
              image: avatar,
              address: address,
            },
            admin_pitch: {
              _id: idAdminPitch,
              name: nameAdminPitch,
              phone,
            },
            children_pitch: {
              _id: dataBooking[0]?._id,
              children_pitch_code: dataBooking[0]?.code_chirldren_pitch,
            },
            shift: {
              price: dataBooking[1]?.price,
              totalPrice,
              shift_day: `${dataBooking[1]?.start_time} - ${dataBooking[1]?.end_time} | Các ngày ${dataBooking[2].join(', ')}`,
              date: dataBooking[2],
              numberDate: dataBooking[2].length || 0,
              start_time: dataBooking[1]?.start_time,
              end_time: dataBooking[1]?.end_time,
              number_shift: dataBooking[1]?.number_shift,
              status_shift: true,
              find_opponent: 'NotFind',
            },
            services: dataBooking[3] || [],
            type: 'multipleDay',
          })
        );
        navigate('/checkout');
      }
    });
  };

  const handleBackPick = () => {
    const _dataBooking = [...dataBooking];

    setDataBooking(_dataBooking.slice(0, -1));
  };
  return (
    <div>
      <Modal open={isOpen} onCancel={() => setOpen(false)} width="1024px" footer={null}>
        <div className="flex text-[#003553] min-h-[400px] gap-[28px]">
          <div className="w-[35%] rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#1fd392,#00e0ff)] p-2 text-white text-center font-bold">
              Thông tin đặt lịch
            </h3>
            <div className="px-4 py-6">
              <p className="text-[18px] font-semibold mt-[-4px] mb-[10px]">
                <span className="inline-block min-w-[90px]">Sân bóng: </span>
                <span className="font-bold">{namePitch}</span>
              </p>
              <p className="text-[14px] font-normal mt-[-4px] mb-[16px]">{address}</p>
              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${phone ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px]">Điện thoại:</span>
                <span className="font-bold">{phone}</span>
              </p>
              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${dataBooking[0] ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px]">Sân: </span>
                <span className="font-bold">{dataBooking[0]?.code_chirldren_pitch}</span>
              </p>
              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${dataBooking[1] ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px]">Ca: </span>
                <span className="font-bold">{dataBooking[1]?.number_shift}</span>
              </p>
              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${dataBooking[1] ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px]">Thời gian: </span>
                <span className="font-bold">
                  ({dataBooking[1]?.start_time}h - {dataBooking[1]?.end_time}h)
                </span>
              </p>

              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${dataBooking[1] ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px]">Giá: </span>
                <span className="font-bold">
                  {dataBooking[1]?.price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] flex ${
                  dataBooking[2] && dataBooking[2]?.length > 0 ? '' : 'hidden'
                }`}
              >
                <span className="inline-block min-w-[90px]">Ngày: </span>
                <span className="block">
                  {dataBooking[2]?.map((item: string) => (
                    <span key={item} className="font-bold">
                      {item},{' '}
                    </span>
                  ))}
                </span>
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] flex ${
                  dataBooking[3] && dataBooking[3]?.length > 0 ? '' : 'hidden'
                }`}
              >
                <span className="inline-block min-w-[90px]">Dịch vụ: </span>
                <span className="block">
                  {dataBooking[3]?.map((item: any) => (
                    <span key={item?._id} className="font-bold">
                      {item.name},{' '}
                    </span>
                  ))}
                </span>
              </p>
              <p className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${dataBooking[2]?.length > 0 ? '' : 'hidden'}`}>
                <span className="inline-block min-w-[90px] font-bold">Tổng tiền:</span>
                <span className="font-bold">
                  {totalPrice?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="w-[65%] rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#1fd392,#00e0ff)] p-2 text-white text-center font-bold">Thông tin sân</h3>
            <div className="px-4 py-6 overflow-y-auto h-[390px]">
              {!dataBooking[0] ? <SelectChildrenPitch dataBooking={dataBooking} setDataBooking={setDataBooking} pitchId={pitchId} /> : ''}

              {!!dataBooking[0] && !dataBooking[1] ? (
                <SelectShift dataBooking={dataBooking} setDataBooking={setDataBooking} pitchId={pitchId} />
              ) : (
                ''
              )}
              {!!dataBooking[0] && !!dataBooking[1] && !dataBooking[2] ? (
                <SelectDate dataBooking={dataBooking} setDataBooking={setDataBooking} />
              ) : (
                ''
              )}
              {!!dataBooking[0] && !!dataBooking[1] && !!dataBooking[2] ? (
                <SelectService dataBooking={dataBooking} setDataBooking={setDataBooking} pitchId={pitchId} />
              ) : (
                ''
              )}
            </div>
            <div className="flex items-center justify-between px-[16px] mb-[16px]">
              <button
                onClick={handleBackPick}
                className={`flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1 px-2 ${
                  dataBooking.length > 0 ? '' : 'hidden'
                }`}
              >
                Quay lại
                <svg
                  className="ml-2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  color="#003553"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"></path>
                  </g>
                </svg>
              </button>

              <button
                onClick={handleSubmitBooking}
                className={`bg-[#228e8a] text-white px-4 flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1 ${
                  dataBooking[2] ? '' : 'hidden'
                }`}
              >
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalBookMultipleDay;
