import { CheckOutlined } from "@ant-design/icons";
import "./Home.css";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { useEffect } from "react";
import { getAllPostMid } from "~/Redux/Slices/postSlice";
import IPost from "~/interfaces/post";
// import { Link } from 'react-router-dom';
const Home = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);

  return (
    <>
      <div className="about_style__one lg:pt-30 pt-24 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-base items-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1696593834/ImageOther/pngtree-silhouette-soccer-player-png-image_4124265-removebg-preview_dg9dhc.png"
                alt="img"
              />
            </div>
            <div className="div">
              <h2 className="section-title-v1 max-w-xl">
                Chào mừng bạn đến với Fsport website đặt lịch hàng đầu{" "}
              </h2>
              <div className="mt-7 xl:pl-24 lg:pl-20 relative before:content-[''] before:left-0 before:top-4 before:bg-[#d9d9d9] before:w-[10%] before:h-[1px] lg:before:absolute">
                <p className="regular-text-v1">
                  Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn
                  toàn có thể đặt sân ở bất kì đâu có internet
                </p>
              </div>
              <ul className="pt-6 lg:text-md text-base">
                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 flex-shrink-0 text-2md">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">
                    <CheckOutlined /> Giao diện thân thiện với người dùng.
                  </span>
                </li>
                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 flex-shrink-0 text-2md">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">
                    <CheckOutlined /> Trang web tương thích với mọi thiết bị
                  </span>
                </li>
                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 flex-shrink-0 text-2md">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">
                    <CheckOutlined /> Đội ngũ nhân viên Fsport luôn sẵn sàng hỗ
                    trợ kỹ thuật
                  </span>
                </li>
              </ul>
              <div className="mt-10">
                <a href="about.html" className="btn_primary__v1">
                  Đặt sân ngay
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.42505 16.5999L12.8584 11.1666C13.5 10.5249 13.5 9.4749 12.8584 8.83324L7.42505 3.3999"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog_style_one relative z-1 lg:pt-30 pt-24">
        <div className="container">
          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1">TIN TỨC MỚI NHẤT</h5>
            <h2 className="section-title-v1">
              Dưới đây là những tin bóng đá mới nhất
            </h2>
          </div>
          <div className="container grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 blog-box-grid">
            {posts?.map((item: IPost) => (
              <div className="blog_card__one group wow fadeInUp rounded-lg">
                <div className="overflow-hidden w-full rounded-lg">
                  <a href="blog-details.html">
                    <img
                      src={item?.images[0]}
                      alt="blog-image"
                      className="w-full hover:scale-105 duration-300"
                    />
                  </a>
                </div>
                <div className="mt-2 pl-2 pb-2">
                  <ul className="flex items-center text-[13px] font-medium text-dark-2">
                    <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
                      <i className="bi bi-calendar-date text-[15px]"></i>
                      <span className="">24 Sep 2022 · 6:30 PM</span>
                    </li>
                    <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 ">
                      By Admin
                    </li>
                  </ul>
                  <h3 className="card-title-alpha mt-4">
                    <a href="blog-details.html">{item?.title}</a>
                  </h3>

                  <a
                    href="blog-details.html"
                    className="group btn-news-home ease-in hover:text-primary-1 duration-200 inline-flex items-center mt-2 lg:text-md text-base text-dark-1 font-medium hover:px-4 py-2 rounded-lg"
                  >
                    <span className="mr-2">Xem Ngay</span>
                    <svg
                      className="group-hover:translate-x-2 duration-200 "
                      width="27"
                      height="14"
                      viewBox="0 0 27 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.217443 6.25H18.4827C18.6276 6.25 18.7001 6.30263 18.7001 6.40789V7.59211C18.7001 7.69737 18.6276 7.75 18.4827 7.75H0.217443C0.0724811 7.75 0 7.69737 0 7.59211V6.40789C0 6.30263 0.0724811 6.25 0.217443 6.25Z"
                        fill="currentColor"
                      />
                      <path
                        d="M20.7001 12.2802L25.0467 7.93355C25.5601 7.42021 25.5601 6.58021 25.0467 6.06688L20.7001 1.72021"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
