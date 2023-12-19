// import { useEffect } from 'react';
// import { Carousel } from 'antd';
import './Banner.css';
// import { useAppDispatch, useAppSelector } from '~/Redux/hook';
// import { getAllBannerMid } from '~/Redux/Slices/bannerSlice';
// import IBanner from '~/interfaces/Banner';
import { Link } from 'react-router-dom';

// const contentStyle: React.CSSProperties = {
//     overflow: 'hidden',

// };
const Banner = () => {
  // const dispatch = useAppDispatch();
  // const banner = useAppSelector((state) => state.banner.banners);
  // useEffect(() => {
  //   dispatch(getAllBannerMid());
  // }, [dispatch]);
  return (
    <section>
      <div className="w-[100%] h-[100vh] bg_banner relative">
        <div className="absolute top-[50px] left-0 w-[100%] h-[100%] flex items-center justify-center animation1">
          <img src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1702961884/datn-img/m10_gzcbpr.png" width="70%" alt="" />
        </div>
        <div className="absolute top-[50px] left-0 w-[55%] h-[80%] flex items-center justify-center animation2">
          <img src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1702961889/datn-img/ball_dvn0bw.png" width="20%" alt="" />
        </div>
        <div className="absolute top-[150px] h-[100%] flex items-center right-[20px]  z-[1] text-right">
          <div>
            <p className="text-[#fc0205] text-[20px]">WELCOME TO</p>
            <p className="text-white text-[56px] font-[600]">FOOTIE MATCH</p>
            <p className="text-white text-[56px] font-[600]">FINDER</p>
            <p className="text-[#cecece]">
              "Đắm chìm trong nhịp điệu của trái bóng, <br /> nơi mọi khoảnh khắc trở nên huyền diệu."
            </p>
            <Link to="/pitch">
              <button className="text-white py-3 px-8 bg-[#fc0205] mt-[30px] border rounded-2xl">ĐẶT SÂN NGAY</button>
            </Link>
          </div>
        </div>
        <div className="absolute top-[100px] h-[80%] left-[100px] flex items-center justify-center text-right">
          <div>
            <p className="text-white text-[25px]">Thao Tác Dễ Dàng</p>
            <p className='italic text-[#c4c4c4] mb-[50px]'>Giao diện dễ tiếp cận</p>
            <p className="text-white text-[23px]">Tìm Sân Nhanh Chóng</p>
            <p className='italic text-[#c4c4c4] mb-[50px]'>Hệ thống sân đa sạng  khu vực</p>
            <p className="text-white text-[23px]">Tìm Đối Ghép Sân</p>
            <p className='italic text-[#c4c4c4] mb-[50px]'>Linh hoạt và tối ưu</p>
          </div>
        </div>
      </div>
      {/* <div className="h-full max-h-[640px] mb-8 mt-28">
        <div className="flex flex-col lg:flex-row">
          {banner.slice(0, 1)?.map((banner: IBanner) => (
            <>
              <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0 ">
                <h1 className="text-4xl lg:text-[58px] font-semibold mb-6 leading-[80px]">{banner.title}</h1>
                <p className="max-w-[480px] mb-8 leading-[28px]">{banner.content}</p>
              </div>
              <div className="flex-1 lg:rounded-tl-full overflow-hidden">
                <img className="w-full" src={banner.url} alt="" />
              </div>
              <div className="w-["></div>
            </>
          ))}
      </div>
        </div> */}
    </section>
  );
};

export default Banner;
