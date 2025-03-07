import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { toggleDrawer } from "../../redux/uiSlice";
import { fetchDrawerData } from "../../redux/drawerSlice";

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

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      transitionDuration={500}
      sx={{ "& .MuiDrawer-paper": { width: 1550, height: 315, marginTop: 9, backgroundColor: "black" } }}
    >
      <Box sx={{ padding: 2, color: "white" }}>
        <Typography variant="h6">{selectedSector || "Sector Details"}</Typography>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        
        {!loading && !error && data.length === 0 && (
          <Typography>No data found for this sector.</Typography>
        )}

        {!loading && !error && data.length > 0 && (
          <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
            <Table>
            <TableHead>
                <TableRow>
                  {[
                    "Symbol",
                    "Sector Name",
                    "Delivery Percentage",
                    "Adjusted Close",
                    "Adjusted Close Strength",
                    "Count (1 Day)",
                    "Avg (1 Day)",
                    "Count (1 Week)",
                    "Avg (1 Week)",
                    "Count (1 Month)",
                    "Avg (1 Month)",
                    "Count (3 Months)",
                    "Avg (3 Months)",
                    "Count (6 Months)",
                    "Avg (6 Months)",
                    "Market Cap EMA",
                    "Total Stocks",
                    "RSI (10)",
                    "RSI (10) Yesterday",
                    "RSI (10) 1 Week",
                    "RSI (10) 2 Weeks",
                    "RSI (10) 3 Weeks",
                    "Adjusted Close RSI (10) Status",
                    "RSI (100)",
                    "RSI (100) Yesterday",
                    "RSI (100) 1 Week",
                    "RSI (100) 2 Weeks",
                    "RSI (100) 3 Weeks",
                    "Adjusted Close RSI (100) Status",
                    "Net Profit (Qtr)",
                    "Price to Book Value",
                    "PE TTM (P/E)",
                    "Industry PBV",
                    "Debt to Equity",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        color: "white",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        minWidth: "150px",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.symbol}>
                    <TableCell style={{ color: "white" }}>{item.symbol}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.sector_name}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.delivery_percentage}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.adj_close}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.adj_close_strength}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.count_1day}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.avg_1day}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.count_1week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.avg_1week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.count_1month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.avg_1month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.count_3month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.avg_3month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.count_6month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.avg_6month}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.market_cap_ema}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.total_stocks}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_10}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_10_yesterday}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_10_1week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_10_2week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_10_3week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.adjusted_close_rsi_10_status}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_100}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_100_yesterday}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_100_1week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_100_2week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.rsi_100_3week}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.adjusted_close_rsi_100_status}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.Net_Profit_Qtr}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.Price_to_Book_Value}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.PE_TTM_Price_to_Earnings}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.Industry_PBV}</TableCell>
                    <TableCell style={{ color: "white" }}>{item.Debt_to_equity}</TableCell>
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
