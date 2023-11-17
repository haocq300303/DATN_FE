import React, { useEffect } from "react";
// import { Carousel } from 'antd';
import "./Banner.css";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { getAllBannerMid } from "~/Redux/Slices/bannerSlice";
import IBanner from "~/interfaces/Banner";

// const contentStyle: React.CSSProperties = {
//     overflow: 'hidden',

// };
const Banner = () => {
  const dispatch = useAppDispatch();
  const banner = useAppSelector((state) => state.banner.banners);
  useEffect(() => {
    dispatch(getAllBannerMid());
  }, [dispatch]);
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-28">
      <div className="flex flex-col lg:flex-row">
      {banner?.map((banner: IBanner) => (
      <>
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0 ">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">{ banner.title }</h1>
          <p className="max-w-[480px] mb-8">
          { banner.content }
          </p>
        </div>
        <div className="flex-1 lg:rounded-tl-full overflow-hidden">
            <img className="w-full" src={ banner.url } alt="" />
        </div>
      </>
      ))}
      </div>
    </section>
  );
};

export default Banner;
