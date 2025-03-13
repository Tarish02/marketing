import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Height } from "@mui/icons-material";

const StockChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("https://eodhd.com/api/eod/MCD.US?api_token=65eecd0d8297f5.37934867&fmt=json")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => [
          new Date(item.date).getTime(), // X-axis (timestamp)
          item.open,
          item.high,
          item.low,
          item.close,
        ]);
        setChartData(formattedData);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  }, []);

  const options = {
    chart: { type: "candlestick", backgroundColor: "#272D35", height: "350vh" },
    title: { text: "Stock Price Chart", style: { color: "#fff" } },
    xAxis: { type: "datetime", labels: { style: { color: "#fff" } } },
    yAxis: { title: { text: "Price", style: { color: "#fff" } }, labels: { style: { color: "#fff" } } },
    series: [
      {
        type: "candlestick",
        name: "Stock Price",
        data: chartData,
        color: "red", // Bearish (down)
        upColor: "green", // Bullish (up)
        lineColor: "red", // Wick color for bearish candles
        upLineColor: "green", // Wick color for bullish candles
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options}  />
    </div>
  );
};

export default StockChart;
