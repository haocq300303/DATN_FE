import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getShiftBookedByChildPitchAndNumberShift } from "~/api/shift";
import Loading from "~/components/Loading";

interface ISelectDate {
  setDataBooking: any;
  dataBooking: any;
}

const SelectDate = ({ setDataBooking, dataBooking }: ISelectDate) => {
  const [days, setDays] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shifts, setShifts] = useState([]);
  const idChilPitch = dataBooking[0]?._id;
  const number_shift = dataBooking[1]?.number_shift;

  useEffect(() => {
    setSelectedDates([]);
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(
      currentYear,
      currentDate.getMonth(),
      currentDate.getDate() - currentDayIndex
    );

    const newDays: any[] = [];

    for (let i = 0; i < 30 + currentDayIndex; i++) {
      const nextDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const day = nextDate.toLocaleString("en-US", { day: "2-digit" });
      const month = nextDate.getMonth() + 1;

      const isCurrentDay =
        nextDate.toDateString() === currentDate.toDateString();
      const isPastDay = nextDate < currentDate;
      newDays.push({ day, isCurrentDay, isPastDay, month, year: currentYear });
    }

    const dates = newDays.map((item: any) => {
      const targetDate = `${item.year}-${item.month}-${item.day}`;

      const isBooked = shifts.some((shift: any) => {
        if (shift?.is_booking_month === true) {
          const startDate = shift?.date[0];
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 30);

          return isWithin30Days(startDate, endDate, targetDate);
        } else {
          return shift?.date.includes(targetDate);
        }
      });

      return {
        ...item,
        isBooked,
      };
    });

    setDays(dates);
  }, [shifts]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getShiftBookedByChildPitchAndNumberShift(
        idChilPitch,
        number_shift
      );

      setShifts(data.data);
      setIsLoading(false);
    })();
  }, [idChilPitch, number_shift]);

  const isWithin30Days = (startDate: any, endDate: any, targetDate: any) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const targetDateObj = new Date(targetDate);

    return startDateObj <= targetDateObj && targetDateObj <= endDateObj;
  };

  const handleDateClick = (day: any, month: any, year: any) => {
    const selectedDate = { day, month, year };

    const isDateSelected = selectedDates.some(
      (date) =>
        date.day === selectedDate.day &&
        date.month === selectedDate.month &&
        date.year === selectedDate.year
    );

    if (isDateSelected) {
      setSelectedDates(
        selectedDates.filter(
          (date) =>
            !(
              date.day === selectedDate.day &&
              date.month === selectedDate.month &&
              date.year === selectedDate.year
            )
        )
      );
    } else {
      setSelectedDates([...selectedDates, selectedDate]);
    }
  };

  const handleConfirmDate = () => {
    if (selectedDates.length > 0) {
      const newDates = selectedDates.map(
        (item: any) => `${item.year}-${item.month}-${item.day}`
      );
      const _dataBooking = [...dataBooking];

      _dataBooking[2] = newDates;
      setDataBooking(_dataBooking);
    } else {
      toast.warning("Bạn phải chọn ít nhất một ngày!");
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium leading-3">Chọn ngày đá</h2>
      <hr className="my-3" />
      {isLoading ? (
        <div className="flex align-center mt-[80px] justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-7 gap-3 pt-4 max-w-screen-md mx-auto">
        {!isLoading &&
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index} className="col-span-1 text-center font-semibold">
                {day}
              </div>
            )
          )}
        {!isLoading &&
          days.map((day, index) => (
            <div
              key={index}
              onClick={() => {
                if (!day?.isBooked && !(day.isPastDay && !day.isCurrentDay)) {
                  handleDateClick(day.day, day.month, day.year);
                }
              }}
              className={`col-span-1 text-center border p-2 ${
                day.isPastDay && !day.isCurrentDay
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }
        ${
          !day?.isBooked &&
          selectedDates.some(
            (date) =>
              date.day === day.day &&
              date.month === day.month &&
              date.year === day.year
          )
            ? "!bg-[#e6f4ff] !text-[#1677ff]"
            : ""
        } ${
                day?.isBooked && !(day.isPastDay && !day.isCurrentDay)
                  ? "!bg-red-500 !cursor-default"
                  : ""
              }`}
            >
              <div className="text-lg font-bold">{day.day}</div>
              <div className="text-sm text-gray-500">
                {day.month}/{day.year}
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handleConfirmDate}
        className={`absolute right-[50px] bottom-[36px] bg-[#228e8a] text-white px-4 flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1`}
      >
        Xác nhận
      </button>
    </>
  );
};

export default SelectDate;
