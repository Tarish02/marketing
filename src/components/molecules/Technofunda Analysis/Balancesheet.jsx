import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchYearlyBalanceSheetData } from "../../../redux/slices/balanceSheetSlice";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const BalanceSheet = () => {
  const dispatch = useDispatch();
  const { yearlyData, loading, error } = useSelector((state) => state.balanceSheet);

  useEffect(() => {
    dispatch(fetchYearlyBalanceSheetData());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!yearlyData || Object.keys(yearlyData).length === 0) {
    return <Typography>No yearly data available.</Typography>;
  }

  const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [year, month] = dateString.split("-").map(Number);
    return `${months[month - 1]}-${year.toString().slice(-2)}`;
  };

  const allFields = new Set();
  Object.values(yearlyData).forEach(entry => {
    Object.keys(entry).forEach(key => allFields.add(key));
  });

  const dataEntries = Object.entries(yearlyData).slice(0, 9);

  return (
    <Box p={0.5}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 400, fontSize: "10px", lineHeight: "19px", color: "#8C8CEC", mb: 0.5 }}
      >
       PROFIT & LOSS
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#272D35" }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 400, fontSize: "10px", lineHeight: "19px", color: "#8C8CEC", p: 0.3,  }}>
                Year
              </TableCell>
              {dataEntries.map(([year]) => (
                <TableCell key={year} sx={{ fontWeight: 400, fontSize: "10px", lineHeight: "19px", color: "#8C8CEC", p: 0.3,  }}>
                  {formatDate(year)}
                </TableCell>
              ))}
            </TableRow>

            {[...allFields].map((field, i) => (
              <TableRow key={i}>
                <TableCell sx={{ fontWeight: 400, fontSize: "10px", lineHeight: "19px", color: "#fff", p: 0.3 }}>
                  {field}
                </TableCell>
                {dataEntries.map(([year, data], index) => (
                  <TableCell key={index} sx={{ fontWeight: 400, fontSize: "10px", lineHeight: "19px", color: "#ccc", p: 0.3 }}>
                    {data[field] !== undefined ? Math.round(data[field] / 10000000) : "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BalanceSheet;
