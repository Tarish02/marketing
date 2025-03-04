import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchMarketBreathData } from "../../redux/marketBreathSlice";

const MarketBreathChart1 = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.marketBreath);
  const [chartOptions, setChartOptions] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMarketBreathData());
    
  }, [dispatch]);

  useEffect(() => {
    if (!data || data.length < 2) return;

    const processedData = data.map((item) => [new Date(item.date).getTime(), item.close]);        
    const ema10Data = data.map((item) => [new Date(item.date).getTime(), item["10_days_ema"]]);
    const ema20Data = data.map((item) => [new Date(item.date).getTime(), item["20_days_ema_high"]]);

    setChartOptions({
      chart: { backgroundColor: "#191E24", height: 500, type: "column" },
      title: { text: "Market Breath Chart", style: { color: "#ffffff" } },
      rangeSelector: {
        selected: 1,
        buttons: [
          { type: "month", count: 1, text: "1m", events: { click: () => updateChartRange(30) } },
          { type: "month", count: 3, text: "3m", events: { click: () => updateChartRange(90) } },
          { type: "month", count: 6, text: "6m", events: { click: () => updateChartRange(180) } },
          { type: "ytd", text: "YTD", events: { click: () => updateChartRange("ytd") } },
          { type: "year", count: 1, text: "1y", events: { click: () => updateChartRange(365) } },
          { type: "all", text: "All", events: { click: () => updateChartRange("all") } },
        ],
      },
      xAxis: { gridLineColor: "#181816", labels: { style: { color: "#ffffff" } }, type: "datetime" },
      yAxis: [
        { title: { text: "Close Price", style: { color: "#ea3d3d" } }, labels: { style: { color: "#ffffff" } }, opposite: false },
        { title: { text: "EMA", style: { color: "#12dbd1" } }, labels: { style: { color: "#ffffff" } }, opposite: true },
        { title: { text: "RSI", style: { color: "#f5f5f5" } }, labels: { style: { color: "#ffffff" } }, opposite: true },
      ],
      legend: {
        enabled: true,
        itemStyle: { color: "#ffffff", fontSize: "12px" },
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 0,
      },
      tooltip: { backgroundColor: "#000000", style: { color: "#ffffff" } },
      plotOptions: {
        column: {
          grouping: true,
          stacking: "normal",
        },
      },
      series: [
        {
          type: "line",
          name: "Close Price",
          data: processedData,
          color: "#FF3B3B",
          yAxis: 0,
          marker: { symbol: "circle", fillColor: "#FF3B3B" },
        },
        {
          type: "line",
          name: "10-Day EMA",
          data: ema10Data,
          color: "#4287f5",
          yAxis: 1,
          marker: { symbol: "circle", fillColor: "#4287f5" },
        },
        {
          type: "line",
          name: "20-Day EMA",
          data: ema20Data,
          color: "#f5a742",
          yAxis: 1,
          marker: { symbol: "circle", fillColor: "#f5a742" },
        },
        {
          name: "RSI Positive",
          type: "column",
          data: data.map((d) => ({
            x: new Date(d.date).getTime(),
            y: d.adjusted_close_rsi_10_status_positive_count,
            color: "#4287f5",
          })),
          yAxis: 2,
          stack: "rsi",
          marker: { symbol: "square", fillColor: "#4287f5" },
        },
        {
            name: "RSI Negative",
            type: "column",
            data: data.map((d) => ({
              x: new Date(d.date).getTime(),
              y: d.adjusted_close_rsi_10_status_negative_count,
              color: "#f54242",
            })),
            yAxis: 2,
            stack: "rsi",
            marker: { symbol: "square", fillColor: "#f54242" }, 
          }
          
      ],
    });
  }, [data]);

  const updateChartRange = (range) => {
    if (!chartRef.current) return;
    const chart = chartRef.current.chart;
    const now = Date.now();
    let min, max;

    if (range === "ytd") {
      min = new Date(new Date().getFullYear(), 0, 1).getTime();
      max = now;
    } else if (range === "all") {
      min = new Date(data[0].date).getTime();
      max = new Date(data[data.length - 1].date).getTime();
    } else {
      min = now - range * 24 * 60 * 60 * 1000;
      max = now;
    }

    chart.xAxis[0].setExtremes(min, max);
  };

  return chartOptions ? (
    <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={chartOptions} ref={chartRef} />
  ) : (
    <p style={{ color: "#ffffff" }}>Loading...</p>
  );
};

export default MarketBreathChart1;