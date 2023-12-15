import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { fetchServicePitch } from '~/Redux/Slices/serviceSlice';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import Loading from '~/components/Loading';
import { IService } from '~/interfaces/service';

interface ISelectService {
  setDataBooking: any;
  dataBooking: any;
  pitchId: string;
}

const ServiceItem = ({ name, image, price }: IService) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="grid grid-cols-[1fr_2fr_1fr_1fr] border border-gray-500  rounded-md cursor-pointer hover:bg-red-100 px-4 py-2 mb-4"
    >
      <div className="w-20">
        <img src={image} className="aspect-square w-full rounded-md" />
      </div>

      <div className="text-xl font-medium pt-[10px]">{name}</div>

      <div className="text-base text-red-600 flex items-center">
        {price?.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </div>

      <div className="flex justify-end items-center">
        <Checkbox checked={checked} />
      </div>
    </div>
  );
};

const SelectService = ({ setDataBooking, dataBooking, pitchId }: ISelectService) => {
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const dispatch = useAppDispatch();

  const { isLoading, services } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServicePitch(pitchId));
  }, [dispatch, pitchId]);

  const handleSelectService = (service: any) => {
    const isMatch = [...selectedServices].some((item) => item._id === service._id);
    const _dataBooking = [...dataBooking];

    if (isMatch) {
      const _selectedServices = [...selectedServices].filter((item) => item._id !== service._id);

      setSelectedServices(_selectedServices);

      _dataBooking[3] = _selectedServices;

      setDataBooking(_dataBooking);
    } else {
      const _selectedServices = [...selectedServices, service];

      setSelectedServices(_selectedServices);

      _dataBooking[3] = _selectedServices;

      setDataBooking(_dataBooking);
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium leading-3">Dịch vụ đi kèm</h2>
      <hr className="my-3" />
      {isLoading && services.length === 0 ? (
        <div className="flex align-center mt-[80px] justify-center">
          <Loading />
        </div>
      ) : (
        ''
      )}
      <div className="pt-4">
        {services?.map((item: any) => (
          <div key={item?._id} onClick={() => handleSelectService(item)}>
            <ServiceItem {...item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectService;
