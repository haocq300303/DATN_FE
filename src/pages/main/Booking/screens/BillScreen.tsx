import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useGetBookingByFieldQuery } from '~/Redux/booking/bookingApi';
import BillBanking from '~/components/BillBanking';
import { hideLoader, showLoader } from '~/components/LoaderAllPage';
import { BillBankingProps } from '~/interfaces/payment.type';

const BillScreen = () => {
  const [searchParams] = useSearchParams();
  const { data, isFetching } = useGetBookingByFieldQuery(
    { payment_id: searchParams.get('payment_id') as string },
    { skip: !searchParams.get('payment_id') }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isFetching]);

  const handleConfirmBill = () => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn chắc chắn với thông tin trên chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success('Cảm ơn bạn đã đặt sân trên hệ thống của chúng tôi !!!');
        navigate('/booking/history');
      }
    });
  };

  const billData: BillBankingProps = {
    payment_id: data?.data?.payment_id as string,
    payment: data?.data?.payment,
    infoBooking: {
      children_pitch: data?.data?.childrenPitch?.code_chirldren_pitch,
      pitch_name: data?.data?.pitch?.name as string,
      pitch_address: data?.data?.pitch?.address as string,
      booking_day: `${data?.data?.shift?.start_time}h - ${data?.data?.shift?.end_time}h`,
      price: data?.data?.shift?.price as number,
      number_shift: data?.data?.shift?.number_shift,
      is_booking_month: data?.data?.shift?.is_booking_month,
      services: data?.data?.services,
      user_booking: data?.data?.user_booking,
      createdAt: data?.data?.createdAt,
      date: data?.data?.shift?.date,
    } as any,
  };
  return (
    <div>
      {data?.data ? (
        <BillBanking {...billData} />
      ) : isFetching ? null : (
        <div className="min-h-[400px] mt-8 ">Hóa đơn thanh toán không hợp lệ !!</div>
      )}

      <div className="mt-6 flex justify-end gap-x-3">
        <button
          onClick={handleConfirmBill}
          className="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 bg-green-600 border-none text-white"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default BillScreen;
