import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
const DashboardPitchPage = () => {
  // thống kê doanh thu hàng tháng
  const monthlyPrices = [
    100000, 120000, 130000, 110000, 150000, 140000, 160000, 170000, 180000,
    175000, 160000, 150000,
  ];

  const datamonthlyPrices = {
    chart: {
      height: 350,
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    yaxis: {
      title: {
        text: "Doanh thu (VNĐ)",
      },
    },
    title: {
      text: "Biểu đồ doanh thu hàng tháng",
    },
  };

  const series = [
    {
      name: "Giá",
      data: monthlyPrices,
    },
  ];
  //  thị phần doan số
  const donutOptions = {
    series: [200, 55, 41, 17, 15],
    chart: {
      width: 380,
      type: "donut",
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
      type: "gradient",
    },
    legend: {
      formatter: function (val: any,opts:any) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex]+ '%';
      },
    },
    labels: ["Đặt sân", "Thuê trọng tài", "Thuê Khán Giả","Đặt Áo"," Nước"], 
    title: {
      text: "Thị phần doanh số",
    },
  
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const [lineChart, setLineChart] = useState(null);
  const [donutChart, setDonutChart] = useState(null);

  useEffect(() => {
    if (lineChart === null) {
      setLineChart(
        <Chart
          options={datamonthlyPrices}
          series={series}
          type="line"
          height={350}
        />
      );
    }
    if (donutChart === null) {
      setDonutChart(
        <Chart
          options={donutOptions}
          series={donutOptions.series}
          type="donut"
        />
      );
    }
  }, [lineChart, donutChart]);

  return (
    <div className="w-[100%]">
      <div className="content bg-[#fbfafc] rounded-md p-[40px] w-[100%]">
        <div className="header">
          <div className="text flex justify-between items-center my-[20px]">
            <h1 className="text-[30px]">Số Liệu Thống Kê</h1>
            <input type="date" />
          </div>
          <div className="content-header grid-cols-4 grid gap-3 ">
            <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
              <img
                className="rounded-lg w-[50px]"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p className="my-[20px]">Thuê Bóng</p>
              <p className="font-[600] text-[20px]">10.000.000 VND</p>
            </div>
            <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
              <img
                className="rounded-lg w-[50px]"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p className="my-[20px]">Thuê Bóng</p>
              <p className="font-[600] text-[20px]">10.000.000 VND</p>
            </div>
            <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
              <img
                className="rounded-lg w-[50px]"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p className="my-[20px]">Đặt Sân</p>
              <p className="font-[600] text-[20px]">300.000.000 VND</p>
            </div>
            <div className="item bg-[#ffffff] rounded-lg shadow-lg p-[30px] my-[10px]">
              <img
                className="rounded-lg w-[50px]"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p className="my-[20px]">Đặt Sân</p>
              <p className="font-[600] text-[20px]">300.000.000 VND</p>
            </div>
          </div>
        </div>
        <div className=" main flex gap-[30px]">
          <div
            id="chart"
            className="w-[65%] bg-[#ffffff] p-[30px] rounded-md shadow-lg"
          >
            {lineChart}
          </div>
          <div className="w-[34%]  bg-[#ffffff] p-[30px] rounded-md shadow-lg">
            {donutChart}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPitchPage;
