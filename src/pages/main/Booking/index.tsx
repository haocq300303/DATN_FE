import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BillScreen from './screens/BillScreen';
import BookingScreen from './screens/BookingScreen';
import InfoScreen from './screens/InfoScreen';
import { toast } from 'react-toastify';
import { useAppSelector } from '~/Redux/hook';

const BookingPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [steps] = useState([
    {
      title: <div>Điền thông tin </div>,
      content: <InfoScreen setCurrent={setCurrent} />,
    },
    {
      title: 'Thông tin đặt',
      content: <BookingScreen setCurrent={setCurrent} />,
    },
    {
      title: 'Check bill thanh toán',
      content: <BillScreen />,
    },
  ]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useAppSelector((state) => state.user.currentUser.values);

  useEffect(() => {
    const infoBooking = sessionStorage.getItem('infoBooking');
    if (!infoBooking) {
      toast.info('Bạn chưa có thông tin đặt sân trước đó');
      navigate(-1);
      return;
    }
    const mode = searchParams.get('mode');
    if (!mode) {
      setSearchParams({ mode: 'info' });
    }
    if (mode === 'info') setCurrent(0);
    if (mode === 'order') {
      if (!currentUser) {
        setCurrent(0);
        return;
      }
      setCurrent(1);
    }
    if (mode === 'check') setCurrent(2);
  }, [searchParams, setSearchParams, navigate, currentUser]);

  const items = steps?.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="my-4 lg:my-8 px-2 max-w-[1000px] mx-auto">
      <div className="note">Giúp chúng tôi hoàn thiện thông tin đặt sân của bạn !!!</div>
      <div className="my-4">
        <Steps current={current} items={items} />
      </div>

      <div className="mt-4">{steps[current].content}</div>

      <div className="h-10"></div>
    </div>
  );
};

export default BookingPage;
