import { useEffect } from 'react';
import { useAppDispatch } from '~/Redux/hook';
import { socket } from '~/config/socket';

const useBookingSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('booking-success', (data) => {
      // data shift trả về khi create booking thành công

      //   filter lại data shift và dispatch lại
      console.log(data);
      // const
    });
  }, []);

  return null;
};

export default useBookingSocket;
