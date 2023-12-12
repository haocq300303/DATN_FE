import { Modal } from "antd";
import { Dispatch, useState } from "react";
import SelectChildrenPitch from "./SelectChildrenPitch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";

interface IModalBookPitchFullMonth {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  pitchId: string;
  namePitch: string;
  address: string;
  phone?: string;
  avatar?: string;
  idAdminPitch?: string;
  nameAdminPitch?: string;
  averagePrice?: number;
}

const ModalBookPitchFullMonth = ({
  isOpen,
  setOpen,
  pitchId,
  namePitch,
  address,
  phone,
  avatar,
  idAdminPitch,
  nameAdminPitch,
  averagePrice,
}: IModalBookPitchFullMonth) => {
  const [dataBooking, setDataBooking] = useState<any[]>([]);
  const navigate = useNavigate();
  // Ngày hiện tại
  const currentDate = new Date();

  // Ngày sau 30 ngày
  const futureDate = addDays(currentDate, 29);

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const formattedFutureDate = format(futureDate, "yyyy-MM-dd");

  const handleSubmitBooking = () => {
    Swal.fire({
      title: "Vui Lòng Xác Nhận Đặt Lịch!",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem(
          "infoBooking",
          JSON.stringify({
            pitch: {
              _id: pitchId,
              name: namePitch,
              image: avatar,
              address: address,
            },
            admin_pitch: {
              _id: idAdminPitch,
              name: nameAdminPitch,
              phone,
            },
            children_pitch: {
              _id: dataBooking[0]?._id,
              children_pitch_code: dataBooking[0]?.code_chirldren_pitch,
            },
            shift: {
              price: averagePrice,
              shift_day: `Từ ${formattedCurrentDate} - ${formattedFutureDate}`,
              start_time: null,
              end_time: null,
              number_shift: null,
              date: [],
              status_shift: true,
              is_booking_month: true,
            },
            services: [],
            type: "bookChildrenPicthFullMonth",
          })
        );
        navigate("/checkout");
      }
    });
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setOpen(false)}
        width="1024px"
        footer={null}
      >
        <div className="flex text-[#003553] min-h-[400px] gap-[28px]">
          <div className="w-[35%] rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#1fd392,#00e0ff)] p-2 text-white text-center font-bold">
              Thông tin đặt lịch
            </h3>
            <div className="px-4 py-6">
              <p className="text-[18px] font-semibold mt-[-4px] mb-[10px]">
                <span className="inline-block min-w-[90px]">Sân bóng: </span>
                <span className="font-bold">{namePitch}</span>
              </p>
              <p className="text-[14px] font-normal mt-[-4px] mb-[16px]">
                {address}
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${
                  phone ? "" : "hidden"
                }`}
              >
                <span className="inline-block min-w-[90px]">Điện thoại:</span>
                <span className="font-bold">{phone}</span>
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${
                  dataBooking[0] ? "" : "hidden"
                }`}
              >
                <span className="inline-block min-w-[90px]">Sân: </span>
                <span className="font-bold">
                  {dataBooking[0]?.code_chirldren_pitch}
                </span>
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] flex ${
                  dataBooking[0] ? "" : "hidden"
                }`}
              >
                <span className="block">
                  Bắt đầu từ ngày
                  <span className="font-bold"> {formattedCurrentDate}</span> đến
                  hết ngày
                  <span className="font-bold"> {formattedFutureDate}</span>
                </span>
              </p>
              <p
                className={`text-[18px] font-semibold mt-[-4px] mb-[16px] ${
                  dataBooking[0] ? "" : "hidden"
                }`}
              >
                <span className="inline-block min-w-[90px] font-bold">
                  Tổng tiền:
                </span>
                <span className="font-bold">
                  {(200000 * 30).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="w-[65%] rounded-xl shadow-md bg-white overflow-hidden">
            <h3 className="text-xl  bg-[linear-gradient(36deg,#1fd392,#00e0ff)] p-2 text-white text-center font-bold">
              Thông tin sân
            </h3>
            <div className="px-4 py-6 overflow-y-auto h-[390px]">
              <SelectChildrenPitch
                dataBooking={dataBooking}
                setDataBooking={setDataBooking}
                pitchId={pitchId}
              />
            </div>
            <div className="flex items-center justify-end px-[16px] mb-[16px]">
              <button
                onClick={handleSubmitBooking}
                className={`bg-[#228e8a] text-white px-4 flex text-base items-center hover:bg-[rgba(0,0,0,0.08)] rounded-md py-1 ${
                  dataBooking[0] ? "" : "hidden"
                }`}
              >
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalBookPitchFullMonth;
