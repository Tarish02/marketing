import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchQuarterlyTTMData } from "../../../redux/slices/QuarterlyttmSlice"; 

const QuarterlyTTMTable = () => {
  const dispatch = useDispatch();
  const quarterlyTTM = useSelector((state) => state.quarterlyttm.data);

  useEffect(() => {
    fetch(
      "https://eodhd.com/api/fundamentals/RELIANCE.NSE?api_token=65eecd0d8297f5.37934867&fmt=json" 
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.Financials?.Income_Statement?.quarterly) {
          const quarterlyData = data.Financials.Income_Statement.quarterly;
          const ttmData = {};

          Object.entries(quarterlyData).forEach(([quarter, values]) => {
            ttmData[quarter] = {
              totalRevenue: values?.totalRevenue ? Math.floor(values.totalRevenue / 10000000) : "N/A",
              costOfRevenue: values?.costOfRevenue ? Math.floor(values.costOfRevenue / 10000000) : "N/A",
              netIncome: values?.netIncome ? Math.floor(values.netIncome / 10000000) : "N/A",
            };
          });

          dispatch(setQuarterlyTTM(ttmData)); 
        }
      })
      .catch((err) => console.error("Error fetching quarterly TTM data:", err));
  }, [dispatch]);


  return (
    <Box p={2} mt={2}>
      <Typography variant="h6" color="white" sx={{ fontWeight: 600, mb: 1 }}>
        {/* Quarterly TTM Data */}
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#272D35" }}>
        <Table size="small">
          <TableBody>
            {quarterlyTTM && Object.keys(quarterlyTTM).length > 0 ? (
              Object.entries(quarterlyTTM).map(([key, values], index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#fff", fontSize: "10px" }}>{key}</TableCell>
                  {values.map((value, idx) => (
                    <TableCell key={idx} sx={{ color: "#ccc", fontSize: "10px" }}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ color: "#ccc", textAlign: "center" }}>
                  Loading data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuarterlyTTMTable;