import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNewBookingAfterPayMutation } from '~/Redux/booking/bookingApi';
import { sendMail } from '~/api/email';
import { bookChildrenPicthFullMonth, bookMultipleDay, bookOneShiftFullMonth, getCreatShift } from '~/api/shift';
import { hideLoader, showLoader } from '~/components/LoaderAllPage';
import { socket } from '~/config/socket';
import templateEmailBill from '~/config/templateEmailBill';
import { IInfoBooking } from '~/interfaces/booking.type';
import IShift from '~/interfaces/shift';

type UseCreateBookingProps = {
  infoBooking: IInfoBooking;
  currentUser: any;
  setCurrent: React.Dispatch<number>;
  price_received: any;
};

const useCreateBooking = ({ infoBooking, currentUser, setCurrent, price_received }: UseCreateBookingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [newBooking] = useNewBookingAfterPayMutation();

  useEffect(() => {
    const handleNewBooking = async () => {
      const paymentId = searchParams.get('payment_id');
      const serviceIds = infoBooking?.services?.map((service) => service._id);

      if (paymentId) {
        // Show Loading
        showLoader();

        const _infoBooking = {
          pitch_id: infoBooking?.pitch?._id,
          user_id: currentUser?.values?._id,
          shift_id: '',
          children_pitch_id: infoBooking?.children_pitch?._id,
          payment_id: paymentId,
          service_ids: serviceIds,
        };

        if (infoBooking?.type === 'singleDay') {
          const dataBooking: IShift = {
            id_pitch: infoBooking?.pitch?._id,
            id_chirlden_pitch: infoBooking?.children_pitch?._id,
            number_shift: infoBooking?.shift?.number_shift,
            start_time: infoBooking?.shift?.start_time,
            end_time: infoBooking?.shift?.end_time,
            price: infoBooking?.shift?.price,
            status_shift: true,
            date: infoBooking?.shift?.date,
            find_opponent: infoBooking?.shift?.find_opponent,
          };

          const { data } = await getCreatShift(dataBooking);

          _infoBooking.shift_id = data?.data?._id;
        } else if (infoBooking?.type === 'multipleDay') {
          const dataBooking: IShift = {
            id_pitch: infoBooking?.pitch?._id,
            id_chirlden_pitch: infoBooking?.children_pitch?._id,
            number_shift: infoBooking?.shift?.number_shift,
            start_time: infoBooking?.shift?.start_time,
            end_time: infoBooking?.shift?.end_time,
            price: infoBooking?.shift?.price,
            status_shift: true,
            date: infoBooking?.shift?.date,
          };

          const { data } = await bookMultipleDay(dataBooking);

          _infoBooking.shift_id = data?.data?._id;
        } else if (infoBooking?.type === 'bookOneShiftFullMonth') {
          const dataBooking: IShift = {
            id_pitch: infoBooking?.pitch?._id,
            id_chirlden_pitch: infoBooking?.children_pitch?._id,
            number_shift: infoBooking?.shift?.number_shift,
            start_time: infoBooking?.shift?.start_time,
            end_time: infoBooking?.shift?.end_time,
            price: infoBooking?.shift?.price,
            status_shift: true,
            is_booking_month: true,
          };

          const { data } = await bookOneShiftFullMonth(dataBooking);

          _infoBooking.shift_id = data?.data?._id;
        } else if (infoBooking?.type === 'bookChildrenPicthFullMonth') {
          const dataBooking: IShift = {
            id_pitch: infoBooking?.pitch?._id,
            id_chirlden_pitch: infoBooking?.children_pitch?._id,
            number_shift: null,
            start_time: null,
            end_time: null,
            price: infoBooking?.shift?.price,
            status_shift: true,
            is_booking_month: true,
          };

          const { data } = await bookChildrenPicthFullMonth(dataBooking);

          _infoBooking.shift_id = data?.data?._id;
        } else {
          toast.error('Không có kiểu đặt lịch !!!');
        }

        // relatime
        socket.emit('booking-success', _infoBooking.shift_id);

        newBooking(_infoBooking as any)
          .unwrap()
          .then((result) => {
            // Send build to user
            sendMail({
              email_to: currentUser?.values?.email,
              subject: 'FSport send bill to!!',
              content: 'Nội dung',
              html: templateEmailBill({ ...infoBooking, payment_id: result?.data?._id, currentUser, price_received }),
            });

            toast.success(`Chúng tôi đã gửi bill thanh toán về email của quý khách, vui lòng kiểm tra(${currentUser?.values?.email})!`);

            setSearchParams({
              mode: 'check',
              code: searchParams.get('code') as string,
              payment_id: searchParams.get('payment_id') as string,
            });

            setCurrent(2);
            sessionStorage.removeItem('infoBooking');
            toast.success(result.message);
          })
          .catch((error) => {
            toast.error('Booking thất bại ' + error.message);
          })
          .finally(() => {
            // Hide loading
            hideLoader();
          });
      }
    };
    handleNewBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('payment_id')]);

  return null;
};

export default useCreateBooking;
