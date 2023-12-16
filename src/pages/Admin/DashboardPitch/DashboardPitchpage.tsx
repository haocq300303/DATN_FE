import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

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
      text: 'Biểu đồ doanh thu hàng năm',
      floating: false,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  });
  //  thống kê doanh thu trong năm
  const fetchData = async (apiUrl: any) => {
    try {
      const response = await axios.get(apiUrl);
      const apiData = response.data;
      console.log(apiData.data);
      const monthsFromAPI = apiData.data.months;
      const updatedMonthlyPrices = monthsFromAPI?.map((month: any) => month.totalPrice);
      const updatedCategories = monthsFromAPI.map((month: any) => `Tháng ${month.month}`);

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

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    if (dateString) {
      const apiUrl = `http://localhost:8080/api/statistical/revenue?year=${dateString}`;
      fetchData(apiUrl);
    }
  };
  // thống kê trong tháng

  const [seriesData, setSeriesData] = useState([{ name: 'Total Price', data: [] }]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    xaxis: {
      categories: [],
    },
  });

  const onChangeDate: DatePickerProps['onChange'] = async (date, dateString) => {
    if (dateString) {
      const month = dateString.split('-')[1];
      console.log(date);

      const apiUrl = `http://localhost:8080/api/statistical/revenue/${month}?year=2023&pitch_user=655c53ed6c0689551d7528a3&start_time=1&end_time=31`;

      try {
        const response = await axios.get(apiUrl);
        const apiData = response.data.data;
        const updatedSeriesData = apiData.days.map((day: any) => day.totalPrice);
        const updatedCategories = apiData.days.map((day: any) => day.day);
        console.log(updatedSeriesData, updatedCategories);

        setSeriesData([{ name: 'Total Price', data: updatedSeriesData }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: updatedCategories,
          },
          title: {
            text: 'Doanh Thu Các Ngày Trong Tháng',
            floating: false,
            align: 'center',
            style: {
              color: '#444',
            },
          },
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  //  thị phần thống kê
  const [chartData, setChartData] = useState({
    series: [
      {
        data: 85.95,
        name: 'Đặt sân',
      },
      {
        data: 5.59,
        name: 'Thuê Áo',
      },
      {
        data: 10.31,
        name: 'Thuê Trọng tài',
      },
      {
        data: 3.55,
        name: 'Thuê Bóng',
      },
    ],
    option: {
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val: any, opts: any) {
          const name = chartData.series[opts.seriesIndex].name;
          return name + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: 'Thị Phần Doanh Số',
      },
    },
  });
  console.log(setChartData);
  //  tỉ lệ đặt sân, huỷ sân
  const [cancelPitch, setCancelPitch] = useState({
    series: [
      {
        data: 96.67,
        name: 'Đặt Sân thành công',
      },
      {
        data: 3.37,
        name: 'Huỷ Sân',
      },
    ],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      title: {
        text: 'Tỉ lệ đặt sân',
      },
    },
  });
  const labels = cancelPitch.series.map((item) => item.name);
  console.log(setCancelPitch);

  return (
    <div className="w-[100%]">
      <div className="content bg-[#ececec6e] rounded-md p-[40px] w-[100%]">
        <div className="flex justify-between">
          <h1 className="text-[30px]">Thống Kê Số Liệu Tháng Này </h1>
          <DatePicker className="w-[300px] rounded-lg shadow-md" onChange={onChangeDate} picker="month" />
        </div>
        <div className="header">
          <div className="text flex justify-between items-center my-[50px]"></div>
          <Swiper spaceBetween={30} slidesPerView={4.5} onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://conhantaogreengo.com/wp-content/uploads/2022/07/chi-phi-lam-san-co-nhan-tao-bong-da-3.jpeg"
                />
                <p className="my-[20px]">Đặt sân</p>
                <p className="font-[600] text-[20px]">119.000.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://cf.shopee.vn/file/336295657902e8becdeb174f977e0e8b"
                />
                <p className="my-[20px]">Thuê bóng</p>
                <p className="font-[600] text-[20px]">1.000.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://cdn.yousport.vn/Media/Products/070318050840217/qabd-ao-bid-xanh.jpg"
                />
                <p className="my-[20px]">Thuê áo bit</p>
                <p className="font-[600] text-[20px]">5.500.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://bizweb.dktcdn.net/thumb/large/100/435/259/products/thiet-ke-chua-co-ten-2023-06-08t161419-932.png?v=1686215713957"
                />
                <p className="my-[20px]">Nước Khoáng</p>
                <p className="font-[600] text-[20px]">8.500.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://i1-thethao.vnecdn.net/2022/12/16/Argentina-v-Australia-Round-of-8972-1172-1671148658.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=QRPTtqGt58KtS73XsvP6Xw"
                />
                <p className="my-[20px]">Trọng tài</p>
                <p className="font-[600] text-[20px]">10.000.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://icdn.24h.com.vn/upload/2-2022/images/2022-05-23/anh-1-1653275651-650-width660height917.jpg"
                />
                <p className="my-[20px]">Cổ vũ</p>
                <p className="font-[600] text-[20px]">0.000.000 VND</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
                <img
                  className="rounded-lg w-[100px] h-[100px] object-cover"
                  src="https://kenh14cdn.com/d0701n3xMlC38QESbdmYKRwii2Kp9L/Image/2014/06/3-e84fa.jpg"
                />
                <p className="my-[20px]">Bình luận viên</p>
                <p className="font-[600] text-[20px]">10.000.000 VND</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="filter_day flex gap-8 mt-9">
          <div className="w-[65%] bg-[#ffffff] p-[30px] rounded-md shadow-lg]">
            <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
          </div>
          <div className="right w-[34%]  flex justify-center items-center bg-[#ffffff] p-[30px] rounded-md shadow-lg">
            <ReactApexChart options={chartData.option} series={chartData.series.map((item) => item.data)} type="donut" width={420} />
          </div>
        </div>
        <div className="flex justify-between mt-[100px] mb-[40px]">
          <h3 className="h3 text-[25px]">Doanh Thu Hằng Năm</h3>
          <DatePicker className="w-[300px] rounded-lg shadow-md" onChange={onChange} picker="year" />
        </div>
        <div className=" main flex gap-8">
          <div id="chart" className="w-[65%] bg-[#ffffff] p-[30px] rounded-md shadow-lg">
            <Chart options={datamonthlyPrices} series={[{ name: 'Tổng doanh thu', data: monthlyPrices }]} type="area" height={350} />
          </div>
          <div className="w-[34%]  flex justify-center items-center bg-[#ffffff] p-[30px] rounded-md shadow-lg">
            <ReactApexChart
              options={{ ...cancelPitch.options, labels }}
              series={cancelPitch.series.map((item) => item.data)}
              type="pie"
              width={380}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPitchPage;
