import clsx from "clsx";
import { format } from "date-fns";
import { Dispatch, useState } from "react";
import { useGetShiftsByChildrenPitchQuery } from "~/Redux/shift/shift.api";
import DatePickerBooking from "~/components/DatePickerBooking";
import { Show } from "~/components/Show";
import IShift from "~/interfaces/shift";
import { DataBookingType } from ".";

const SelectShiftItem = ({
  number_shift,
  start_time,
  end_time,
  price,
}: IShift) => {
  return (
    <div className="flex flex-col items-center">
      <button className="items-center flex flex-col border border-[#00e0ff] hover:bg-[linear-gradient(83.63deg,#00b5f1_33.34%,#00e0ff_113.91%)] hover:text-white text-base px-5 py-2 rounded-md">
        <span>
          {start_time} - {end_time}
        </span>
        <span className="text-[#67922c] mt-2 text-base">
          ({price?.toLocaleString()} VND)
        </span>
      </button>

      <span className="text-base">Ca {number_shift}</span>
    </div>
  );
};

const SelectShift = ({
  setDataBooking,
  dataBooking,
}: {
  setDataBooking: Dispatch<DataBookingType>;
  dataBooking: DataBookingType;
}) => {
  const [datePicker, setDatePicker] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const { data, isFetching } = useGetShiftsByChildrenPitchQuery(
    {
      childrenPitchId: dataBooking[1]?._id as string,
      params: {
        id_pitch: "653ca30f5d70cbab41a2e5d0",
        date: datePicker,
      },
    },
    { skip: !dataBooking[1]?._id }
  );

  const handlePickTime = ({
    number_shift,
    start_time,
    end_time,
    price,
    ...props
  }: IShift) => {
    const _shift: any = {
      name: "Ca " + number_shift,
      shiftDay: datePicker,
      shiftTime: start_time + " - " + end_time,
      price,
      number_shift,
      start_time,
      end_time,
      ...props,
    };
    const _dataBooking = [...dataBooking];

    _dataBooking[2] = _shift;
    setDataBooking(_dataBooking as DataBookingType);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium leading-3">Chọn giờ đá</h2>

        <DatePickerBooking
          onChange={(date) => setDatePicker(date)}
          size="large"
        />
      </div>

      <hr className="my-3" />

      <div className="mt-7 grid grid-cols-3 gap-10">
        <Show when={isFetching}>
          <p>Loading....</p>
        </Show>

        <Show when={!isFetching}>
          {data?.data.map((shift) => (
            <div
              className={clsx(
                shift.status_shift &&
                  "bg-red-100 pointer-events-none rounded-sm"
              )}
              onClick={() => handlePickTime(shift)}
              key={shift._id}
            >
              <SelectShiftItem {...shift} />
            </div>
          ))}
        </Show>
      </div>
    </div>
  );
};

export default SelectShift;
