import { Link, useSearchParams } from "react-router-dom";
import { useGetBookingByPaymentIdQuery } from "~/Redux/booking/bookingApi";

const BillScreen = () => {
  const [searchParams] = useSearchParams();
  const { data, isFetching } = useGetBookingByPaymentIdQuery(
    { payment_id: searchParams.get("payment_id") as string },
    { skip: !searchParams.get("payment_id") }
  );
  return (
    <div>
      {isFetching && <p>Loadind</p>}
      <div className="overflow-hidden">{JSON.stringify(data?.data)}</div>
      <body className="bg-gray-50">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl text-black">
              <div className="flex justify-between">
                <div>
                  <img
                    className="w-28 lg:w-40"
                    src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1696192598/ImageOther/z4718088485311_234f31f313ef91652f1da8c544568ddb-removebg-preview_yhtdtr.png"
                    alt=""
                  />
                </div>

                <div className="text-right">
                  <h2 className="text-2xl md:text-3xl font-semibold text-black ">
                    Hóa Đơn #
                  </h2>
                  <span className="mt-1 block text-gray-500">653a8c8eb400737987d290b3</span>

                  <address className="mt-4 not-italic text-black">
                    <p>Nguyễn Văn B</p>
                    <p>0123456789</p>
                    <p>nguyenvanb@gmail.com</p>
                  </address>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    Chuyển đến:
                  </h3>
                  <h3 className="text-lg font-semibold text-black">
                    Nguyễn Văn A
                  </h3>
                  <address className="mt-2 not-italic text-gray-500">
                  <p>0123456789</p>
                    <p>nguyenvana@gmail.com</p>
                  </address>
                </div>

                <div className="sm:text-right space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Thời gian tạo:
                      </dt>
                      <dd className="col-span-2 text-gray-500">03/10/2023</dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Hết hạn:
                      </dt>
                      <dd className="col-span-2 text-gray-500">03/11/2023</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                  <div className="hidden sm:grid sm:grid-cols-5">
                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                     Tên Sân
                    </div>
                    <div className="text-left text-xs font-medium text-gray-500 uppercase">
                     Ca Sân
                    </div>
                    <div className="text-left text-xs font-medium text-gray-500 uppercase">
                     Địa Chỉ
                    </div>
                    <div className="text-right text-xs font-medium text-gray-500 uppercase">
                    Giá Tiền
                    </div>
                    
                  </div>

                  <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Tên
                      </h5>
                      <p className="font-medium text-black">Design UX and UI</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Qty
                      </h5>
                      <p className="text-black">1</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Rate
                      </h5>
                      <p className="text-black">	
42 Trần Bình , Cầu Giấy , Hà Nội</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </h5>
                      <p className="sm:text-right text-black">$500</p>
                    </div>
                  </div>

                  <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                </div>
              </div>

              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-right space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Tổng tiền:
                      </dt>
                      <dd className="col-span-2 text-gray-500">250.000đ</dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Thuế:
                      </dt>
                      <dd className="col-span-2 text-gray-500">0đ</dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Số tiền đã trả:
                      </dt>
                      <dd className="col-span-2 text-gray-500">250.000đ</dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-black">
                        Số tiền còn nợ:
                      </dt>
                      <dd className="col-span-2 text-gray-500">0đ</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-black">Cảm ơn bản đã sử dụng dịch vụ!</h4>
                <p className="text-gray-500">
                Nếu bạn có bất kỳ câu hỏi nào liên quan đến hóa đơn này, hãy sử dụng thông tin liên hệ sau:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-black">
                    example@site.com
                  </p>
                  <p className="block text-sm font-medium text-black">
                    +84 123 098 065
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-x-3">
              <a
                className="inline-flex justify-center items-center gap-x-3 text-sm text-center hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 bg-red-500 no-underline text-white"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                PDF
              </a>
              <Link to="/booking/history">
                <button className="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 bg-green-600 border-none text-white">
                  Xác nhận
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default BillScreen;
