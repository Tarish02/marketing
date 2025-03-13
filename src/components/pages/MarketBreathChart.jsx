import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchChartData } from "../../redux/slices/chartSlice";

const MarketBreathChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const [options, setOptions] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  useEffect(() => {
    if (!chartData || chartData.length < 2) return;

    let minClose = Math.min(...chartData.map((item) => item.close));
    let maxClose = Math.max(...chartData.map((item) => item.close));
    let minRsi = Math.min(
      ...chartData.map((item) => item["count_rsi_10_gt_35.0"] || 0),
      ...chartData.map((item) => item["count_rsi_100_gt_50.0"] || 0),
      ...chartData.map(
        (item) => item["adjusted_close_125_ema_gt_adjusted_close"] || 0
      )
    );
    let maxRsi = Math.max(
      ...chartData.map((item) => item["count_rsi_10_gt_35.0"] || 0),
      ...chartData.map((item) => item["count_rsi_100_gt_50.0"] || 0),
      ...chartData.map(
        (item) => item["adjusted_close_125_ema_gt_adjusted_close"] || 0
      )
    );

    const candlestickData = [];
    const normalizedRsi10 = [];
    const normalizedRsi100 = [];
    const normalizedEma = [];

    chartData.forEach((item, index) => {
      const date = new Date(item.date).getTime();
      const open = index === 0 ? item.close : chartData[index - 1].close;
      const close = item.close;
      const high = Math.max(open, close) + 10;
      const low = Math.min(open, close) - 10;

      candlestickData.push([date, open, high, low, close]);

      let normRsi10 =
        item["count_rsi_10_gt_35.0"] !== undefined
          ? ((item["count_rsi_10_gt_35.0"] - minRsi) / (maxRsi - minRsi)) * 100
          : null;
      let normRsi100 =
        item["count_rsi_100_gt_50.0"] !== undefined
          ? ((item["count_rsi_100_gt_50.0"] - minRsi) / (maxRsi - minRsi)) * 100
          : null;
      let normEma =
        item["adjusted_close_125_ema_gt_adjusted_close"] !== undefined
          ? ((item["adjusted_close_125_ema_gt_adjusted_close"] - minRsi) /
              (maxRsi - minRsi)) *
            100
          : null;

      normalizedRsi10.push([date, normRsi10]);
      normalizedRsi100.push([date, normRsi100]);
      normalizedEma.push([date, normEma]);
    });

    setOptions({
      chart: { backgroundColor: "#191E24", height: 500 },
      title: { text: "Market Breath Chart", style: { color: "#ffffff" } },
      rangeSelector: { enabled: false }, // 🔥 Removes buttons
  
      xAxis: {
        gridLineColor: "#181816",
        labels: { style: { color: "#ffffff" } },
      },
      yAxis: [
        {
          title: { text: "Close Price", style: { color: "#ea3d3d" } },
          labels: { style: { color: "#ffffff" }, format: "{value}" },
          min: minClose,
          max: maxClose,
          gridLineColor: "#181816",
          opposite: false,
        },
        {
          title: {
            text: "Normalized Scale (0-100)",
            style: { color: "#12dbd1" },
          },
          labels: { style: { color: "#ffffff" }, format: "{value}" },
          min: 0,
          max: 100,
          tickPositions: [0, 20, 40, 60, 80, 100],
          gridLineColor: "#181816",
          opposite: true,
        },
      ],
  
      legend: {
        enabled: true,
        itemStyle: { color: "#ffffff", fontSize: "12px" },
      },
  
      tooltip: { backgroundColor: "#000000", style: { color: "#ffffff" } },
  
      series: [
        {
          type: "candlestick",
          name: "Close Price",
          data: candlestickData,
          color: "#F23645",
          upColor: "#089981",
          lineColor: "#FF3B3B",
          upLineColor: "#089981",
          yAxis: 0,
        },
        {
          type: "line",
          name: "RSI 10 > 35",
          data: normalizedRsi10,
          color: "#089981",
          dashStyle: "Solid",
          yAxis: 1,
          connectNulls: true,
        },
        {
          type: "line",
          name: "RSI 100 > 50",
          data: normalizedRsi100,
          color: "#675FED",
          yAxis: 1,
          connectNulls: true,
        },
        {
          type: "line",
          name: "Adjusted Close 125 EMA",
          data: normalizedEma,
          color: "#F4E771",
          yAxis: 1,
          connectNulls: true,
        },
      ],
    });
  }, [chartData]);

  const updateChartRange = (range) => {
    if (!chartRef.current) return;

    const chart = chartRef.current.chart;
    const currentTime = Date.now();
    let min, max;

    if (range === "ytd") {
      min = new Date(new Date().getFullYear(), 0, 1).getTime();
      max = currentTime;
    } else if (range === "all") {
      min = new Date(chartData[0].date).getTime();
      max = new Date(chartData[chartData.length - 1].date).getTime();
    } else {
      min = currentTime - range * 24 * 60 * 60 * 1000;
      max = currentTime;
    }

    const filteredData = chartData.filter(
      (item) =>
        new Date(item.date).getTime() >= min &&
        new Date(item.date).getTime() <= max
    );
    const minCloseInRange = Math.min(...filteredData.map((item) => item.close));

    chart.xAxis[0].setExtremes(min, max);

    chart.yAxis[0].update({
      min: minCloseInRange,
    });
  };

  return options ? (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={options}
      ref={chartRef}
    />
  ) : (
    <p style={{ color: "#ffffff" }}>Loading...</p>
  );
};

export default MarketBreathChart;
