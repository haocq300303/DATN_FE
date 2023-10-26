import React from "react";
// import { Carousel } from 'antd';
import "./Banner.css";

// const contentStyle: React.CSSProperties = {
//     overflow: 'hidden',

// };
const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-28">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0 ">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">Chào Mừng Đến Với Website quản lí bóng đá hàng đầu</h1>
          <p className="max-w-[480px] mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            voluptatem consectetur sed odio accusantium, expedita laudantium
            saepe hic mollitia aspernatur commodi provident autem ab
            reprehenderit quidem quos voluptates beatae nobis?
          </p>
        </div>
        <div className="flex-1 rounded-tl-full overflow-hidden">
            <img src="https://images.pexels.com/photos/10923070/pexels-photo-10923070.jpeg?cs=srgb&dl=pexels-gonzalo-acu%C3%B1a-10923070.jpg&fm=jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
