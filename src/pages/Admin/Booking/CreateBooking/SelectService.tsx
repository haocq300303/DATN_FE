import { Dispatch, useState } from 'react';
import { DataBookingType, ServiceType } from '.';
import { useGetServicesByPitchIdQuery } from '~/Redux/service/service.api';
import { Show } from '~/components/Show';
import { Checkbox } from 'antd';
import { IService } from '~/interfaces/service';
import { useAppSelector } from '~/Redux/hook';

const ServiceItem = ({ name, image, price }: IService) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="grid grid-cols-[1fr_2fr_1fr_1fr] border border-gray-500  rounded-md cursor-pointer hover:bg-red-100 px-4 py-2"
    >
      <div className="w-20">
        <img src={image} className="aspect-square w-full rounded-sm" />
      </div>

      <div className="text-xl font-medium">{name}</div>

      <div className="text-base text-red-600 flex items-center">{price?.toLocaleString()} VNĐ</div>

      <div className="flex justify-end items-center">
        <Checkbox value={1} checked={checked} />
      </div>
    </div>
  );
};

const SelectService = ({ setDataBooking, dataBooking }: { setDataBooking: Dispatch<DataBookingType>; dataBooking: DataBookingType }) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const { data, isFetching } = useGetServicesByPitchIdQuery(user?.values?._id || '');

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);

  const handleSelectService = (service: ServiceType) => {
    const isMatch = [...selectedServices].some((item) => item._id === service._id);
    const _dataBooking = [...dataBooking];

    if (isMatch) {
      const _selectedServices = [...selectedServices].filter((item) => item._id !== service._id);
      setSelectedServices(_selectedServices);

      _dataBooking[3] = _selectedServices;

      setDataBooking(_dataBooking as DataBookingType);
    } else {
      const _selectedServices = [...selectedServices, service];
      setSelectedServices(_selectedServices);

      _dataBooking[3] = _selectedServices;

      setDataBooking(_dataBooking as DataBookingType);
    }
  };

  return (
    <div>
      <div className="flex">
        <h2 className="text-xl font-medium leading-3">Chọn dịch vụ đi kèm</h2>
      </div>

      <hr className="my-3" />

      <Show when={isFetching}>
        <p>Loading....</p>
      </Show>
      <Show when={!isFetching}>
        <div className="space-y-2">
          {data?.data.map((service: any) => (
            <div className="" onClick={() => handleSelectService(service)} key={service._id}>
              <ServiceItem {...service} />
            </div>
          ))}
        </div>
      </Show>
    </div>
  );
};

export default SelectService;
