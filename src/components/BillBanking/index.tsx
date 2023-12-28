import { BillBankingProps } from '~/interfaces/payment.type';
import banner from '~/assets/img/Web/banner1.png';
import { addDays, format, parseISO } from 'date-fns';

const BillBanking = ({ payment_id, infoBooking, payment }: BillBankingProps) => {
  return (
    <>
      <div className=" w-full h-full">
        <div className="mt-7 opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-[700px] sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white rounded-xl pointer-events-auto dark:bg-gray-800">
            <div className="relative overflow-hidden h-[8rem] bg-gray-900 text-center rounded-b-3xl">
              <img src={banner} alt="" />
            </div>

            <div className="relative z-10 -mt-8">
              <span className="mx-auto flex justify-center items-center w-[62px] h-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                <svg
                  className="flex-shrink-0 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                </svg>
              </span>
            </div>

            <div className="p-4 sm:p-7 overflow-y-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Hóa Đơn Thanh Toán</h3>
                <p className="text-sm text-gray-500">#{payment_id}</p>
              </div>

              {/* <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div>
                  <span className="block text-xs uppercase text-gray-500">Người Chuyển:</span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{userBank?.fullname}</span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{userBank?.phone}</span>
                </div>

                <div>
                  <span className="block text-xs uppercase text-gray-500">Người Nhận:</span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{userReceiver?.fullname}</span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{userReceiver?.phone}</span>
                </div>

                <div>
                  <span className="block text-xs uppercase text-gray-500">Phương Thức:</span>
                  <div className="flex items-center gap-x-2">
                    <svg className="w-5 h-5" width="400" height="248" viewBox="0 0 400 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path d="M254 220.8H146V26.4H254V220.8Z" fill="#FF5F00" />
                        <path
                          d="M152.8 123.6C152.8 84.2 171.2 49 200 26.4C178.2 9.2 151.4 0 123.6 0C55.4 0 0 55.4 0 123.6C0 191.8 55.4 247.2 123.6 247.2C151.4 247.2 178.2 238 200 220.8C171.2 198.2 152.8 163 152.8 123.6Z"
                          fill="#EB001B"
                        />
                        <path
                          d="M400 123.6C400 191.8 344.6 247.2 276.4 247.2C248.6 247.2 221.8 238 200 220.8C228.8 198.2 247.2 163 247.2 123.6C247.2 84.2 228.8 49 200 26.4C221.8 9.2 248.6 0 276.4 0C344.6 0 400 55.4 400 123.6Z"
                          fill="#F79E1B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="400" height="247.2" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200"></span>
                  </div>
                </div>
              </div> */}

              <div className="mt-5 sm:mt-10">
                <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">Chi Tiết</h4>

                <ul className="mt-3 flex flex-col">
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Tên sân</span>

                      <span>{infoBooking?.pitch_name}</span>
                      {/* <span> {infoBooking?.price?.toLocaleString()} VNĐ</span> */}
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Sân số</span>

                      <span>{infoBooking?.children_pitch}</span>
                      {/* <span> {infoBooking?.price?.toLocaleString()} VNĐ</span> */}
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Giờ Đá</span>
                      <span>{infoBooking?.number_shift ? `Ca ${infoBooking?.number_shift} - ${infoBooking?.booking_day}` : 'Cả ngày'}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Ngày đá</span>
                      <span className="ml-6 line-clamp-2 overflow-hidden">
                        {infoBooking?.is_booking_month
                          ? `${infoBooking?.date[0] && format(new Date(infoBooking?.date[0]), 'dd-MM-yyyy')} đến ${format(
                              addDays(new Date(infoBooking?.date[0]), 29),
                              'dd-MM-yyyy'
                            )}`
                          : infoBooking?.date &&
                            infoBooking?.date?.length > 0 &&
                            infoBooking?.date?.map((item: string) => format(new Date(item), 'dd-MM-yyyy'))}
                      </span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Giá</span>
                      <span>
                        {infoBooking?.price?.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Địa Chỉ</span>
                      <span>{infoBooking?.pitch_address}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Ngày đặt</span>
                      <span>{infoBooking?.createdAt && format(parseISO(infoBooking?.createdAt), 'HH:mm:ss dd/MM/yyyy')}</span>
                    </div>
                  </li>
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Người đặt</span>
                      <span>
                        {infoBooking?.user_booking?.name} - {infoBooking?.user_booking?.phone_number}
                      </span>
                    </div>
                  </li>
                  {infoBooking?.services && infoBooking?.services.length > 0 && (
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                      <div className="flex items-center justify-between w-full">
                        <span>Dịch vụ</span>
                        {infoBooking?.services?.map((item: any) => (
                          <span>
                            {item.name} -{' '}
                            {item.price?.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                            <br />
                          </span>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
                <div className="mt-8 flex sm:justify-end">
                  <div className="w-full max-w-2xl sm:text-end space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Tổng tiền:</dt>
                        <dd className="col-span-2 text-gray-500"> {payment?.total_received?.toLocaleString()} VNĐ</dd>
                      </dl>

                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Còn Nợ:</dt>
                        <dd className="col-span-2 text-gray-500">
                          {((payment as any)?.total_received - (payment as any)?.price_received).toLocaleString()} VNĐ
                        </dd>
                      </dl>

                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Đã Thanh Toán:</dt>
                        <dd className="col-span-2 text-gray-500">{payment?.price_received?.toLocaleString()} VNĐ</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-10">
                <p className="text-sm text-gray-500">
                  Nếu có gì thắc mắc vui lòng liên hệ chúng tôi qua{' '}
                  <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="#">
                    fsport@gmail.com
                  </a>{' '}
                  hoặc gọi tới{' '}
                  <a
                    className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                    href="tel:+1898345492"
                  >
                    0987957355
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillBanking;
