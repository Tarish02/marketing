import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toggleDrawer } from "../../../redux/slices/uiSlice";
import { fetchDrawerData } from "../../../redux/slices/drawerSlice";

const DrawerComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedSector } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.drawer);

  useEffect(() => {
    if (isOpen && selectedSector) {
      dispatch(fetchDrawerData(selectedSector));
    }
  }, [isOpen, selectedSector, dispatch]);

  const handleClose = () => {
    dispatch(toggleDrawer(false));
  };

  const cellStyle = {
    fontSize: "11px",
    color: "#E2E5E9",
    borderBottom: "1px solid #E2E5E9",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      transitionDuration={500}
      sx={{ "& .MuiDrawer-paper": { width: 1380, height: 270, marginTop: 9, backgroundColor: "#272D35" } }}
    >
      <Box sx={{ padding: 1, color: "#E2E5E9" }}>
        <Typography variant="h6">{selectedSector || "Sector Details"}</Typography>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && data.length === 0 && (
          <Typography>No data found for this sector.</Typography>
        )}

        {!loading && !error && data.length > 0 && (
          <TableContainer component={Paper} sx={{ backgroundColor: "#272D35" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Symbol", "Delivery Percentage", "Adjusted Close", "Adjusted Close Strength", "Count (1 Day)", "Avg (1 Day)", "Count (1 Week)", "Avg (1 Week)", "Count (1 Month)", "Avg (1 Month)", "Count (3 Months)", "Avg (3 Months)", "Count (6 Months)", "Avg (6 Months)", "Market Cap EMA", "Total Stocks", "RSI (10)", "RSI (10) Yesterday", "RSI (10) 1 Week", "RSI (10) 2 Weeks", "RSI (10) 3 Weeks", "Adjusted Close RSI (10) Status", "RSI (100)", "RSI (100) Yesterday", "RSI (100) 1 Week", "RSI (100) 2 Weeks", "RSI (100) 3 Weeks", "Adjusted Close RSI (100) Status", "Net Profit (Qtr)", "Price to Book Value", "PE TTM (P/E)", "Industry PBV", "Debt to Equity"].map((header) => (
                    <TableCell key={header} sx={cellStyle}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.symbol}>
                    {[item.symbol, item.delivery_percentage, item.adj_close, item.adj_close_strength, item.count_1day, item.avg_1day, item.count_1week, item.avg_1week, item.count_1month, item.avg_1month, item.count_3month, item.avg_3month, item.count_6month, item.avg_6month, item.market_cap_ema, item.total_stocks, item.rsi_10, item.rsi_10_yesterday, item.rsi_10_1week, item.rsi_10_2week, item.rsi_10_3week, item.adjusted_close_rsi_10_status, item.rsi_100, item.rsi_100_yesterday, item.rsi_100_1week, item.rsi_100_2week, item.rsi_100_3week, item.adjusted_close_rsi_100_status, item["Net Profit Qtr"], item["Price to Book Value"], item["PE TTM Price to Earnings"], item.Industry_PBV, item.Debt_to_equity].map((value, index) => (
                      <TableCell key={index} sx={cellStyle}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
