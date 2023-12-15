import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios';

const DashboardPitchPage = () => {
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [datamonthlyPrices, setDatamonthlyPrices] = useState({
    chart: {
      height: 450,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Doanh thu (VNĐ)',
      },
    },
    title: {
      text: 'Biểu đồ doanh thu hàng tháng',
    }
  
  });

  const fetchData = async (apiUrl:any) => {
    try {
      const response = await axios.get(apiUrl);
      const apiData = response.data;
      console.log(apiData.data);
      const monthsFromAPI = apiData.data.months;
      const updatedMonthlyPrices = monthsFromAPI.map((month:any) => month.totalPrice);
      const updatedCategories = monthsFromAPI.map((month:any) => `Tháng ${month.month}`);

      setMonthlyPrices(updatedMonthlyPrices);
      setDatamonthlyPrices((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState.xaxis,
          categories: updatedCategories,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // Sau khi thay đổi onChange
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    if (dateString) {
      const apiUrl = `http://localhost:8080/api/statistical/revenue?year=${dateString}`;
      fetchData(apiUrl);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="content bg-[#ececec6e] rounded-md p-[40px] w-[100%]">
        <div className="header">
          <div className="text flex justify-between items-center my-[20px]">
            <h1 className="text-[30px]">Số Liệu Thống Kê Năm </h1>
            <DatePicker className="w-[300px] rounded-lg shadow-md" onChange={onChange} picker="year" />
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={0.5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img className="rounded-lg w-[50px]" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                <p className="my-[20px]">Thuê Bóng</p>
                <p className="font-[600] text-[20px]">10.000.000 VND</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className=" main flex gap-[30px]">
          <div id="chart" className="w-[65%] bg-[#ffffff] p-[30px] rounded-md shadow-lg">
           
            <Chart options={datamonthlyPrices} series={[{ name: 'Tổng doanh thu', data: monthlyPrices }]} type="area" height={350} />
          </div>
          <div className="w-[34%]  bg-[#ffffff] p-[30px] rounded-md shadow-lg">

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPitchPage;
