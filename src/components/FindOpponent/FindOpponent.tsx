import { useEffect, useState } from "react";
import {
  matchOpponent,
  getAllShiftFindOpponentByPitch,
  findOpponent,
} from "~/api/shift";
import IShift from "~/interfaces/shift";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

const FindOpponent = ({ idPitch }: { idPitch: string }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllShiftFindOpponentByPitch(idPitch);
      setShifts(data.data);
    })();
  }, [idPitch]);

  const onHandleSubmit = async (idShift: any) => {
    try {
      const data = {
        idUserFindOpponent: "655f1711c3dfbd0adea3ce3e",
        email: "chuhao878@gmail.com",
        phone_number: "0347656836",
        nameUserFindOpponent: "Chu Quang Hào",
      };
      const value = { find_opponent: false };

      await matchOpponent(data);

      await findOpponent(idShift, value);
      const { data: shifts } = await getAllShiftFindOpponentByPitch(idPitch);
      setShifts(shifts.data);

      toast(
        "🦄 Ghép kèo thành công. Thông tin đối thủ đã được gửi về sms của bạn!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error("🦄 Lỗi Server!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="content-pitch container mx-auto max-w-screen-2xl">
      <div className="flex flex-wrap gap-[30px] mt-[40px]">
        {shifts?.map((item: IShift) => (
          <div
            key={item._id}
            className="relative w-[50%] flex max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img src={item?.id_pitch?.avatar} alt="ui/ux review check" />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="block font-bold font-sans text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                  {item?.id_pitch?.name}
                </h5>
                <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  5.0
                </p>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                <span className="text-pink-500">Vị trí:</span>{" "}
                {item?.id_pitch?.address}
              </p>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                <span className="text-pink-500">Giá sân:</span>{" "}
                {`${item.price.toLocaleString("vi-VN")}vnđ`}
              </p>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                <span className="text-pink-500"> Ca sân:</span> Ca{" "}
                {item.number_shift}
                {` (${item.start_time} - ${item.end_time})`}
              </p>
              <div className="flex items-center justify-between">
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-pink-500">
                  Tài khoản đặt sân:
                </p>
                <div className="cursor-pointer">
                  <img
                    className="inline-block h-8 w-8 rounded-full object-cover object-center mr-2"
                    alt="Image placeholder"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <p className="inline-block font-sans text-sm font-medium leading-normal text-blue-gray-900">
                    Chu Quang Hào
                  </p>
                </div>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                <span className="text-pink-500">Ngày:</span>{" "}
                {format(parseISO(item.date), "yyyy-MM-dd")}
              </p>
            </div>
            <div className="px-6 pb-4 pt-0">
              <button
                onClick={() => onHandleSubmit(item._id)}
                className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Ghép kèo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindOpponent;
