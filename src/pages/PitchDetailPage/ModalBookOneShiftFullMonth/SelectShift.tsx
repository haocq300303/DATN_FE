import { useState } from "react";
import { useGetShiftsByChildrenPitchBookingMonthQuery } from "~/Redux/shift/shift.api";
import Loading from "~/components/Loading";
import IShift from "~/interfaces/shift";

interface ISelectShift {
  setDataBooking: any;
  dataBooking: any;
  pitchId: string;
}

const ShiftItem = ({
  number_shift,
  start_time,
  end_time,
  price,
  isSelected,
  onItemSelected,
  status_shift,
}: any) => {
  const handleItemClick = () => {
    if (!status_shift) {
      onItemSelected(number_shift);
    }
  };

  return (
    <button
      onClick={handleItemClick}
      className={`border rounded-lg border-[#1fd392] hover:bg-[#1fd392] hover:text-[#fff] py-[8px] px-[4px] text-[16px] text-[#333] ${
        isSelected ? "bg-[#1fd392] text-[#fff]" : ""
      } ${
        status_shift
          ? "bg-[#ef4444] border-[#ef4444] text-[#fff] hover:bg-[#ef4444] cursor-default"
          : ""
      }`}
    >
      <p className="font-semibold mb-[2px] text-[17px]">Ca {number_shift}</p>
      <p className="mb-[2px] font-semibold ">
        {start_time}h - {end_time}h
      </p>
      <p className="font-semibold text-[#67922c]">
        {price?.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </button>
  );
};

const SelectShift = ({
  setDataBooking,
  dataBooking,
  pitchId,
}: ISelectShift) => {
  const [selectedShift, setSelectedShift] = useState<number | null>(null);

  const { data, isFetching } = useGetShiftsByChildrenPitchBookingMonthQuery(
    {
      childrenPitchId: dataBooking[0]?._id as string,
      params: {
        id_pitch: pitchId,
      },
    },
    { skip: !dataBooking[0]?._id }
  );

  const handleItemSelected = (shiftNumber: number) => {
    setSelectedShift(shiftNumber);
  };

  const handleClickShift = ({
    number_shift,
    start_time,
    end_time,
    price,
    status_shift,
  }: IShift) => {
    if (!status_shift) {
      const _shift = {
        number_shift,
        start_time,
        end_time,
        price,
      };
      const _dataBooking = [...dataBooking];

      _dataBooking[1] = _shift;
      setDataBooking(_dataBooking);
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium leading-3">Chọn ca đá</h2>
      <hr className="my-3" />
      {isFetching ? (
        <div className="flex align-center mt-[80px] justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 pt-4">
        {data?.data?.map((shift: any) => (
          <div key={shift._id} onClick={() => handleClickShift(shift)}>
            <ShiftItem
              {...shift}
              isSelected={
                selectedShift === shift.number_shift && !!dataBooking[1]
              }
              onItemSelected={handleItemSelected}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectShift;
