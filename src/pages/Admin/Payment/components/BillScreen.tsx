import { EyeOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useGetBookingByFieldQuery } from '~/Redux/booking/bookingApi';
import BillBanking from '~/components/BillBanking';
import { hideLoader, showLoader } from '~/components/LoaderAllPage';
import { BillBankingProps } from '~/interfaces/payment.type';

const BillScreen = ({ payment_id }: { payment_id: string }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isFetching } = useGetBookingByFieldQuery({ payment_id }, { skip: !isOpenModal });

  const billData: BillBankingProps = {
    payment_id: data?.data?.payment_id as string,
    payment: data?.data?.payment,
    infoBooking: {
      pitch_name: data?.data?.pitch?.name as string,
      pitch_address: data?.data?.pitch?.address as string,
      booking_day: `${data?.data?.shift?.start_time} - ${data?.data?.shift?.end_time}`,
      price: data?.data?.shift?.price as number,
    } as any,
  };

  //console.log(billData);

  useEffect(() => {
    if (isFetching) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isFetching]);

  return (
    <div className="flex justify-center">
      <Tooltip title="Hóa đơn thanh toán">
        <EyeOutlined size={20} className="cursor-pointer" onClick={() => setIsOpenModal(!isOpenModal)} />
      </Tooltip>

      <Modal
        key={payment_id}
        open={isOpenModal}
        width="700px"
        onCancel={() => setIsOpenModal(false)}
        className="fixed inset-0 flex items-center pb-0"
      >
        <div className="mt-auto max-h-[80vh] overflow-y-auto -mr-4 pr-4">
          <BillBanking {...billData} />
        </div>
      </Modal>
    </div>
  );
};

export default BillScreen;
