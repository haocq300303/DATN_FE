import { useRef } from 'react';
import { Carousel, Col, Row } from 'antd';
import './About.css';
import banner from '../../assets/img/Web/banner1.png';
const contentStyle = {
  height: '240px',
  width: '100%',
};

const About = () => {
  const carouselRef = useRef(null);

  // const onChange = (slideIndex: any) => {
  //   if (carouselRef.current) {
  //     carouselRef.current?.goTo(slideIndex);
  //   }
  // };

  return (
    <div className="">
      <div className="bannerPpitchPage relative ">
        {/* banner cấc thứ */}
        <div className="video relative">
          <img src={banner} style={{ height: 400, width: '100%' }} />
          <div className="absolute book-banner w-[70%] right-0 top-[50%] left-0 mx-auto"></div>
        </div>
        {/* chọn địa điêrm ở đây */}
      </div>
      {/* <div className="banner-about relative flex flex-col justify-center items-center">
        <span className="block text-2xl font-semibold text-primary text-center text-white absolute z-10">
          ABOUT US
        </span>
        <img src="/img/banner-single.jpg" alt="" className="h-52 w-full" style={{ filter: "brightness(0.4)" }} />
      </div> */}
      <div className="container mx-auto max-w-screen-2xl pt-28 relative">
        <Row className="bg-white ">
          <Col span={12}>
            <div className=" ">
              <div className="box-intro-about ">
                <div className="box-intro-text mr-24">
                  <h2 className="text-[32px] uppercase font-bold text-lime-50 sm:text-[40px] lg:text-[36px] xl:text-[30px] pb-6 flex">
                    <div className="bg-black text-black py-3 w-1 "></div>
                    <span className="bg-lime-600 py-3">Chào mừng bạn đến với club </span>
                  </h2>
                  <p>
                    <strong>PRO SOCCER FC .inc</strong> Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in
                    volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin
                    viverra, vel varius eget sit mollis. Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis
                    nisl porttitor, vel eleifend odio ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat
                    vestibulum sit feugiat, voluptates dui eros libero. Etiam vestibulum at lectus.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Carousel autoplay>
              <div>
                <img
                  src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301913/DATN/slide-1_dvhmph.jpg"
                  style={contentStyle}
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301913/DATN/slide-2_wcipdv.jpg"
                  style={contentStyle}
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301912/DATN/slide-3_ce9aan.jpg"
                  style={contentStyle}
                  alt=""
                />
              </div>
            </Carousel>
          </Col>
        </Row>

        <div className="my-28 banner-team h-[600px] relative flex justify-center" style={{ filter: 'brightness(0.9)' }}>
          <h2 className="text-[32px] uppercase font-bold text-lime-50 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 text-center ">
            đồng sáng lập
          </h2>
          <div className="image-team-about absolute z-10 w-[70%] h-[60%] bg-center bg-cover my-36"></div>
        </div>

        <div className="history-about-team">
          <h2 className="text-[32px] uppercase font-bold text-lime-600 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 text-center ">
            Lịch sử
          </h2>
          <div>
            <div className="relative">
              <div className="line w-[80%] h-2 bg-lime-200 absolute top-[50%] left-[10%] transform-translate-x-[-50%] "></div>
              <div className="box-row pl-[15%] py-12">
                <Row gutter={16} className="w-[100%] ">
                  <Col className="gutter-row" span={6}>
                    <div
                      className="relative w-20 h-20 bg-lime-800 rounded-full flex justify-center items-center text-center p-4 shadow-xl cursor-pointer transition  hover:scale-[1.1] hover:bg-lime-600 "
                      // onClick={() => onChange(0)}
                    >
                      <span className="absolute text-7xl left-0 top-0 text-lime-400">"</span>
                      <h5 className=" uppercase font-bold text-white  text-center ">1</h5>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div
                      className="relative w-20 h-20 bg-lime-800 rounded-full flex justify-center items-center text-center p-4 shadow-xl cursor-pointer transition  hover:scale-[1.1] hover:bg-lime-600 "
                      // onClick={() => onChange(1)}
                    >
                      <span className="absolute text-7xl left-0 top-0 text-lime-400">"</span>
                      <h5 className=" uppercase font-bold text-white  text-center ">2</h5>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div
                      className="relative w-20 h-20 bg-lime-800 rounded-full flex justify-center items-center text-center p-4 shadow-xl cursor-pointer transition  hover:scale-[1.1] hover:bg-lime-600 "
                      // onClick={() => onChange(2)}
                    >
                      <span className="absolute text-7xl left-0 top-0 text-lime-400">"</span>
                      <h5 className=" uppercase font-bold text-white  text-center ">3</h5>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div
                      className="relative w-20 h-20 bg-lime-800 rounded-full flex justify-center items-center text-center p-4 shadow-xl cursor-pointer transition  hover:scale-[1.1] hover:bg-lime-600 "
                      // onClick={() => onChange(3)}
                    >
                      <span className="absolute text-7xl left-0 top-0 text-lime-400">"</span>
                      <h5 className=" uppercase font-bold text-white  text-center ">4</h5>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <Carousel ref={carouselRef} className="  ">
              <div className="pl-32">
                <div className="flex gap-10 w-[90%] border p-6 ">
                  <img
                    src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301970/DATN/history-1_t1jxw9.jpg"
                    alt=""
                    className="w-80"
                  />
                  <p>
                    <h2 className="text-[32px] uppercase font-bold text-lime-800 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 ">
                      HISTORY1
                    </h2>
                    Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio
                    ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui
                    eros libero. Etiam vestibulum at lectus.
                  </p>
                </div>
              </div>
              <div className="pl-32">
                <div className="flex gap-10 w-[90%] border p-6">
                  <img
                    src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301970/DATN/history-1_t1jxw9.jpg"
                    alt=""
                    className="w-80"
                  />
                  <p>
                    <h2 className="text-[32px] uppercase font-bold text-lime-800 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 ">
                      HISTORY2
                    </h2>
                    Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio
                    ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui
                    eros libero. Etiam vestibulum at lectus.
                  </p>
                </div>
              </div>
              <div className="pl-32">
                <div className="flex gap-10 w-[90%] border p-6">
                  <img
                    src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301970/DATN/history-1_t1jxw9.jpg"
                    alt=""
                    className="w-80"
                  />
                  <p>
                    <h2 className="text-[32px] uppercase font-bold text-lime-800 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 ">
                      HISTORY3
                    </h2>
                    Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio
                    ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui
                    eros libero. Etiam vestibulum at lectus.
                  </p>
                </div>
              </div>
              <div className="pl-32">
                <div className="flex gap-10 w-[9t0%] border p-6">
                  <img
                    src="https://res.cloudinary.com/dqyffo8rx/image/upload/v1697301970/DATN/history-1_t1jxw9.jpg"
                    alt=""
                    className="w-80"
                  />
                  <p>
                    <h2 className="text-[32px] uppercase font-bold text-lime-800 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-6 ">
                      HISTORY4
                    </h2>
                    Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio
                    ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui
                    eros libero. Etiam vestibulum at lectus.
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="video-about-end">
          <h2 className="text-[32px] uppercase font-bold text-lime-700 sm:text-[40px] lg:text-[36px] xl:text-[30px] py-12 text-center ">
            Video về các trận bóng
          </h2>
          <div className="video-youtube flex justify-center  ">
            <iframe
              width="1190"
              height="445"
              src="https://www.youtube.com/embed/oHdg9H6CdOE"
              title="YouTube video player"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
