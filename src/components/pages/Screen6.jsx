import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import StockChart from "../organisms/StockChart";
import { fetchStockDetails } from "../../redux/slices/drawerSlice";

const StockDashboard = () => {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.ui.selectedStock);
  const { data, loading, error } = useSelector((state) => state.drawer);

  useEffect(() => {
    if (selectedStock) {
      dispatch(fetchStockDetails(selectedStock));
    }
  }, [selectedStock, dispatch]);

  return (
    <Box display="flex" height="80vh" color="#fff">
      <Box width="50%" p={1} borderRight="2px solid #272D35">
        <Typography variant="h6" mb={1} fontSize={14}>
          {selectedStock ? `${selectedStock} - Stock Details` : "Stock Dashboard"}
        </Typography>
        <StockChart />
      </Box>

      <Box width="50%" p={1} sx={{ height: "80vh", overflowY: "auto" }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && data && (
          <Typography>Stock Details: {JSON.stringify(data, null, 2)}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StockDashboard;
