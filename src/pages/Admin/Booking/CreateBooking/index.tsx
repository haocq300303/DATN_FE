import { Modal } from 'antd';
import { Dispatch, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNewPaymentMutation } from '~/Redux/payment/paymentApi';
import { hideLoader, showLoader } from '~/components/LoaderAllPage';
import { Show } from '~/components/Show';
import InfoBooking from './InfoBooking';
import InfoUser from './InfoUser';
import SelectChildrenPitch from './SelectChildrenPitch';
import SelectService from './SelectService';
import SelectShift from './SelectShift';
import { toast } from 'react-toastify';
import { useGetAllBookingByUserIdQuery, useNewBookingAffterPayMutation } from '~/Redux/booking/bookingApi';
import { getCreatShift } from '~/api/shift';

type FormCreateBookingProps = {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
};

export type PitchInfoType = {
  name: string;
  address: string;
};

export type ShiftInfoType = {
  _id?: string;
  name: string;
  shiftDay: string;
  shiftTime: string;
  price: number;
};

export type PitchChildrenInfoType = {
  name: string;
  _id: string;
};

export type ServiceType = {
  _id: string;
  name: string;
  image: string;
  price: number;
};

export type UserBookingType = {
  _id?: string;
  fullName: string;
  phone: string;
  email: string;
};

export type DataBookingType = [UserBookingType?, PitchChildrenInfoType?, ShiftInfoType?, ServiceType[]?];

const FormCreateBooking = ({ isOpen, setOpen }: FormCreateBookingProps) => {
  const [dataBooking, setDataBooking] = useState<DataBookingType>([]);
  // Get redux store
  const currentUser: any = {
    _id: '655c53ed6c0689551d7528a3',
    phone: '0788062634',
    fullname: 'Trương Minh Hiếu',
    email: 'hahuu02dev@gmail.com',
  };
  const currentPitch: any = {
    _id: '653ca30f5d70cbab41a2e5d0',
  };

  const infoPitch = {
    name: 'Sân Bóng Trần Hữu Dực',
    address: 'Số 6, Trần Hữu Dực, Nam Từ Liêm, Hà Nội',
  };

  const [newPayment, { isLoading: isLoadingPayment }] = useNewPaymentMutation();
  const [newBooking, { isLoading: isLoadingBooking }] = useNewBookingAffterPayMutation();
  const { refetch } = useGetAllBookingByUserIdQuery(null);

  const handleBackPick = () => {
    const _dataBooking = [...dataBooking];

    setDataBooking(_dataBooking.slice(0, -1) as DataBookingType);
  };

  const handleConfirmBooking = () => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn xác nhận thanh toán chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      try {
        if (result) {
          const userBooking = dataBooking[0];
          const childrenPitchBooking = dataBooking[1];
          const shiftBooking: any = dataBooking[2];
          const servicesBooking = dataBooking[3];
          const totalService = servicesBooking?.reduce((total, service) => total + service.price, 0) || 0;
          const serviceIds = servicesBooking?.map((service) => service._id);
          const totalPrice = totalService + (shiftBooking as any)?.price;

          const _infoPayment = {
            payment_method: 'cash',
            user_bank: userBooking?._id,
            user_receiver: currentUser?._id,
            price_received: totalPrice,
            total_received: totalPrice,
            status: 'success',
            message: userBooking?.fullName + ' thanh toán đặt sân',
          };

          const resultPayment = await newPayment(_infoPayment as any).unwrap();

          const newShiftBooking = {
            id_pitch: shiftBooking?.id_pitch,
            id_chirlden_pitch: shiftBooking?.id_chirlden_pitch,
            number_shift: shiftBooking?.number_shift,
            start_time: shiftBooking?.start_time,
            end_time: shiftBooking?.end_time,
            price: shiftBooking?.price,
            status_shift: true,
            date: [shiftBooking?.shiftDay],
          };

          if (!resultPayment) return;

          const { data } = await getCreatShift(newShiftBooking);
          const _dataBooking: any = {
            pitch_id: currentPitch._id,
            user_id: userBooking?._id,
            shift_id: data?.data?._id,
            children_pitch_id: childrenPitchBooking?._id,
            payment_id: resultPayment?.data?._id,
            service_ids: serviceIds,
          };
          newBooking(_dataBooking)
            .unwrap()
            .then(() => {
              refetch();
              setOpen(false);
              setDataBooking([]);
              toast.success('Tạo mới một lần đặt sân thành công');
            });
        }
      } catch (error: any) {
        toast.error('Lỗi ' + error.message);
      }
    });
  };

  useEffect(() => {
    if (isLoadingPayment || isLoadingBooking) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoadingPayment, isLoadingBooking]);

  return (
    <div className="">
      <Modal centered open={isOpen} onCancel={() => setOpen(false)} width="1024px" footer={false}>
        <div className="grid grid-cols-[1.1fr_2fr] gap-6 text-[#003553] min-h-[500px]">
          <div className="rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#00b5f1,#00e0ff)] p-2 text-white text-center font-bold">Thông tin đặt lịch</h3>

            <InfoBooking dataBooking={dataBooking} infoPitch={infoPitch} />
          </div>

          <div className="rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  font-bold bg-[linear-gradient(36deg,#00b5f1,#00e0ff)] p-2 text-white text-center">Thông tin sân và giá tiền</h3>

            <div className="max-h-[440px] overflow-y-auto px-4 py-5">
              <Show when={!dataBooking[0]}>
                <InfoUser dataBooking={dataBooking} setDataBooking={setDataBooking} />
              </Show>
              <Show when={!!dataBooking[0] && !dataBooking[1]}>
                <SelectChildrenPitch dataBooking={dataBooking} setDataBooking={setDataBooking} />
              </Show>
              <Show when={!!dataBooking[0] && !!dataBooking[1] && !dataBooking[2]}>
                <SelectShift dataBooking={dataBooking} setDataBooking={setDataBooking} />
              </Show>
              <Show when={!!dataBooking[0] && !!dataBooking[1] && !!dataBooking[2]}>
                <SelectService dataBooking={dataBooking} setDataBooking={setDataBooking} />
              </Show>
            </div>

            <div className="px-4 mt-4 flex space-x-6 mb-6">
              <Show when={dataBooking.length > 0}>
                <button onClick={handleBackPick} className="flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1 px-2">
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
              </Show>

              <Show when={!!dataBooking[2]}>
                <button
                  onClick={handleConfirmBooking}
                  className="bg-[#228e8a] text-white px-4 flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1"
                >
                  Xác nhận
                </button>
              </Show>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormCreateBooking;
