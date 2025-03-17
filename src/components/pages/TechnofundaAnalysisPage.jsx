import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { Fullscreen, FullscreenExit, Close } from "@mui/icons-material";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchStockDetails } from "../../redux/slices/stockSlice";
import Balancesheet from "../molecules/Technofunda Analysis/Balancesheet";
import Percentile from "../molecules/Percentile_Rank(Screen6)/Percentile";
import Quaterlyttm from "../molecules/Quaterly TTM/Quaterlyttm";
import MarketCap from "../molecules/marketcap/MarketCap";

const TechnofoudaAnalysisPage = () => {
  const { stockSymbol } = useParams();
  const dispatch = useDispatch();
  const { stockData, loading, error } = useSelector((state) => state.stock);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (stockSymbol) {
      dispatch(fetchStockDetails(stockSymbol));
    }
  }, [stockSymbol, dispatch]);

  const stockDetails = typeof stockData === "object" ? stockData : {};

  const candlestickData =
    stockDetails.date && stockDetails.open && stockDetails.high && stockDetails.low && stockDetails.close
      ? Object.keys(stockDetails.date).map((key) => [
          new Date(stockDetails.date[key]).getTime(),
          stockDetails.open[key],
          stockDetails.high[key],
          stockDetails.low[key],
          stockDetails.close[key],
        ])
      : [];

  const volumeData =
    stockDetails.date && stockDetails.volume
      ? Object.keys(stockDetails.date).map((key) => [
          new Date(stockDetails.date[key]).getTime(),
          stockDetails.volume[key],
        ])
      : [];

  const deliveryQtyData =
    stockDetails.date && stockDetails.delivery_qty
      ? Object.keys(stockDetails.date).map((key) => [
          new Date(stockDetails.date[key]).getTime(),
          stockDetails.delivery_qty[key],
        ])
      : [];

  const handleZoom = (event) => {
    if (event.trigger !== "sync") {
      const { min, max } = event.target.getExtremes();
      Highcharts.charts.forEach((chart) => {
        if (chart && chart.xAxis[0]) {
          chart.xAxis[0].setExtremes(min, max, true, false, { trigger: "sync" });
        }
      });
    }
  };

  const commonXAxis = {
    type: "datetime",
    labels: { enabled: false },
    gridLineWidth: 0,
    events: { afterSetExtremes: handleZoom },
  };

  const candlestickOptions = {
    chart: { type: "candlestick", backgroundColor: "#191E24", height: expanded ? "250vh" : "250px", zooming: { type: "x" } },
    title: { text: "" },
    xAxis: commonXAxis,
    yAxis: { title: { text: "" }, labels: { style: { color: "#FFFFFF" } }, gridLineWidth: 0 },
    legend: { enabled: false },
    series: [{ type: "candlestick", name: "", data: candlestickData, color: "red", upColor: "green", showInLegend: false }],
  };

  const volumeOptions = {
    chart: { 
      type: "column", 
      backgroundColor: "#191E24", 
      height: expanded ? "250px" : "140px",
    },
    title: { text: "Volume", style: { color: "#FFFFFF", fontSize: "10px" }, align: "left" },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { year: "%Y" },
      labels: {
        style: { color: "#FFFFFF" },
        format: "{value:%Y}"
      },
      tickInterval: 365 * 24 * 3600 * 1000, 
      gridLineWidth: 0,
      events: { afterSetExtremes: handleZoom }
    },
    yAxis: { title: { text: "" }, labels: { style: { color: "#FFFFFF" } }, gridLineWidth: 0 },
    legend: { enabled: false },
    series: [{ name: "Volume", data: volumeData, color: "purple", showInLegend: false }]
  };

  const deliveryQtyOptions = {
    chart: { 
      type: "column",  
      backgroundColor: "#191E24", 
      height: expanded ? "150px" : "125px", 
      marginTop: 3 
    },
    title: { 
      text: "Delivery QTY", 
      style: { color: "#FFFFFF", fontSize: "10px" }, 
      align: "left" 
    },
    xAxis: commonXAxis,
    yAxis: { 
      title: { text: "" }, 
      labels: { style: { color: "#FFFFFF" } }, 
      gridLineWidth: 0 
    },
    legend: { enabled: false },
    series: [{ 
      type: "column",  
      name: "Delivery Quantity", 
      data: deliveryQtyData, 
      color: "yellow", 
      showInLegend: false 
    }],
  };
  
  

  return (
    <Box 
  sx={{
    position: "absolute",
    top: 0, 
    left: expanded ? "5%" : 55,  
    right: expanded ? "5%" : "auto", 
    marginTop: "4.3%",
    width: expanded ? "90vw" : "92vw",
    height: "90vh", 
    backgroundColor: "#272D35",
    zIndex: 1000,
    display: "flex",
    flexDirection: expanded ? "column" : "row",
    overflow: "hidden",
  }}
>

      <IconButton
        onClick={() => setExpanded(!expanded)}
        sx={{ position: "absolute", top: 138, left: 640, zIndex: 2 }}
      >
        {expanded ? "" : <Fullscreen />}
      </IconButton>
      {expanded && (
        <IconButton
          onClick={() => setExpanded(false)}
          sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "#fff", color: "#000", zIndex: 2 }}
        >
          <Close />
        </IconButton>
      )}
      <Box sx={{ width: expanded ? "100%" : "45vw", height: "100vh", display: "flex", flexDirection: "column", gap: 1 }}>
        {!expanded && <MarketCap />}
        <HighchartsReact highcharts={Highcharts} options={candlestickOptions} />
          <Box sx={{ marginTop: "-1%" }}>
           <HighchartsReact highcharts={Highcharts} options={deliveryQtyOptions} />
          </Box>
          <Box sx={{ marginTop: expanded ? "-1%" : "-2%" }}> 
           <HighchartsReact highcharts={Highcharts} options={volumeOptions} />
          </Box>
      </Box>
      {!expanded && (
        <Box sx={{ width: "47vw", height: "100vh", overflowY: "auto", marginLeft: "0.5%" }}>
          <Quaterlyttm />
          <Percentile />
          <Balancesheet />
        </Box>
      )}
    </Box>
  );
};

export default TechnofoudaAnalysisPage;
