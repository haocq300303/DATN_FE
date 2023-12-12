import { useEffect, useState } from "react";
import { getShiftDefaultByPitch } from "~/api/shift";
import Loading from "~/components/Loading";
import IShift from "~/interfaces/shift";

interface ISelectShift {
  setDataBooking: any;
  dataBooking: any;
  pitchId: string;
}

const SelectShift = ({
  setDataBooking,
  dataBooking,
  pitchId,
}: ISelectShift) => {
  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getShiftDefaultByPitch(pitchId);

      setShifts(data.data);
      setIsLoading(false);
    })();
  }, [pitchId]);

  const handleClickShift = ({
    number_shift,
    start_time,
    end_time,
    price,
  }: IShift) => {
    const _shift = {
      number_shift,
      start_time,
      end_time,
      price,
    };
    const _dataBooking = [...dataBooking];

    _dataBooking[1] = _shift;
    setDataBooking(_dataBooking);
  };

  return (
    <>
      <h2 className="text-xl font-medium leading-3">Chọn ca đá</h2>
      <hr className="my-3" />
      {isLoading ? (
        <div className="flex align-center mt-[80px] justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 pt-4">
        {shifts.map((shift: any) => (
          <button
            key={shift._id}
            onClick={() => handleClickShift(shift)}
            className={`border rounded-lg border-[#1fd392] hover:bg-[#1fd392] hover:text-[#fff] py-[8px] px-[4px] text-[16px] text-[#333]`}
          >
            <p className="font-semibold mb-[2px] text-[17px]">
              Ca {shift.number_shift}
            </p>
            <p className="mb-[2px] font-semibold ">
              {shift.start_time}h - {shift.end_time}h
            </p>
            <p className="font-semibold text-[#67922c]">
              {shift.price?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default SelectShift;
