import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchChartData } from "../../redux/chartSlice";

const MarketBreathChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const ohlc = [];
      const rsi10 = [];
      const rsi100 = [];
      const ema125 = [];

      chartData.forEach((item) => {
        const date = new Date(item.date).getTime(); 

        ohlc.push([date, item.close, item.close, item.close, item.close]); 
        rsi10.push([date, item["count_rsi_10_gt_35.0"]]); 
        rsi100.push([date, item["count_rsi_100_gt_50.0"]]); 
        ema125.push([date, item["adjusted_close_125_ema_gt_adjusted_close"]]);
      });

      setOptions({
        chart: { backgroundColor: "#191E24" },
        title: { text: "Market Breath Chart", style: { color: "#cccccc" } },
        rangeSelector: { selected: 1 },
        xAxis: { gridLineColor: "#181816", labels: { style: { color: "#9d9da2" } } },
        yAxis: [
          {
            title: { text: "Price", style: { color: "#cccccc" } },
            height: "40%",
            gridLineColor: "#181816",
          },
          {
            title: { text: "RSI 10 > 35", style: { color: "#12dbd1" } },
            top: "42%",
            height: "18%",
            offset: 10,
            gridLineColor: "#181816",
          },
          {
            title: { text: "RSI 100 > 50", style: { color: "#de70fa" } },
            top: "62%",
            height: "18%",
            offset: 10,
            gridLineColor: "#181816",
          },
          {
            title: { text: "Adjusted Close > 125 EMA", style: { color: "#728efd" } },
            top: "82%",
            height: "18%",
            offset: 10,
            gridLineColor: "#181816",
          },
        ],
        legend: { enabled: true },
        series: [
          {
            type: "candlestick", 
            name: "Close Price",
            data: ohlc,
            color: "#ea3d3d", 
            upColor: "#51a958", 
            lineColor: "#ea3d3d",
            upLineColor: "#51a958",
            yAxis: 0,
          },
          {
            type: "line",
            name: "RSI 10 > 35",
            data: rsi10,
            color: "#12dbd1",
            yAxis: 1,
          },
          {
            type: "line",
            name: "RSI 100 > 50",
            data: rsi100,
            color: "#de70fa",
            yAxis: 2,
          },
          {
            type: "line",
            name: "Adjusted Close > 125 EMA",
            data: ema125,
            color: "#728efd",
            yAxis: 3,
          },
        ],
      });
    }
  }, [chartData]);

  return options ? (
    <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} />
  ) : (
    <p>Loading...</p>
  );
};

export default MarketBreathChart;
