import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchSectorChartData } from "../../../redux/slices/chartsSlice";
import { Height } from "@mui/icons-material";

const Charts = () => {
  const dispatch = useDispatch();
  const { selectedSector } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.charts);

  useEffect(() => {
    if (selectedSector) {
      dispatch(fetchSectorChartData(selectedSector));
    }
  }, [selectedSector, dispatch]);

  if (loading) return <p>Loading charts...</p>;
  if (error) return <p>Error: {error}</p>;

  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData.filter((item) => item.sector === selectedSector);

  const hasData = filteredData.length > 0;

  const chartOptions = {
    chart: { type: "line", backgroundColor: "#272D35", Height: "40vh" }, 
    title: { text: hasData ? `Chart for ${selectedSector}` : "No Data Found", style: { color: "#E2E5E9" } }, 
    xAxis: { 
      categories: hasData ? filteredData.map((item) => item.date) : [], 
      title: { text: "Date", style: { color: "#E2E5E9" } },
      labels: { style: { color: "#E2E5E9" } }, 
    },
    yAxis: { 
      title: { text: "Value", style: { color: "#E2E5E9" } }, 
      labels: { style: { color: "#E2E5E9" } }, 
    },
    legend: { itemStyle: { color: "#E2E5E9" } },
    tooltip: { style: { color: "black" } }, 
    series: hasData
      ? [
          { name: "Nifty Adjusted Close", data: filteredData.map((item) => item.nifty_adj_close), color: "#007bff" },
          { name: "Index Value", data: filteredData.map((item) => item.index_value), color: "#ff5733" },
        ]
      : [],
  };
  
  
  return (
    <div>
      {hasData ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : <p>No data found for {selectedSector}</p>}
    </div>
  );
};

export default Charts;
