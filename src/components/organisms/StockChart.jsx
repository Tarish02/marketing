import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Typography } from "@mui/material";

const StockChart = ({ chartData }) => {
  if (!chartData) {
    return <Typography>Loading chart...</Typography>;
  }

  const options = {
    title: {
      text: "Stock Price Chart",
    },
    xAxis: {
      categories: chartData.dates, // Ensure API returns an array of dates
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Stock Price",
        data: chartData.prices, // Ensure API returns an array of prices
      },
    ],
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default StockChart;
