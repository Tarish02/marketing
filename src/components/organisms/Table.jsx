import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData } from "../../redux/tableSlice";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const SectorTable = ({ onSectorClick }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const safeData = Array.isArray(data) ? data : [];

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#272D35", height: "40vh" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {[
              "Sector", "No. of Stocks", "Index Value", "Index Trend", "52 High Index Rank", 
              "1 Day Rank", "1 Week Rank", "1 Month Rank", "1 Day Rank RSI", 
              "1 Week Rank RSI", "1 Month Rank RSI", "1 Day Del.", 
              "1 Week Del.", "1 Month Del."
            ].map((header, index) => (
              <TableCell
                key={index}
                sx={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#272D35",
                  borderBottom: "1px solid white",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeData.map((item, index) => (
            <TableRow 
              key={index} 
              onClick={() => onSectorClick(item.gic_industry)} 
              sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#1E242B" } }} 
            >
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.gic_industry}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.total_stocks}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>N/A</TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>N/A</TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>N/A</TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.count_1day}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.count_1week}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.count_1month}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item["rank_rsi_10/25.0"]}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item["rank_rsi_10/25.0_1week"]}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item["rank_rsi_10/25.0_3week"]}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.rsi_10_positive_percentage}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.rsi_10_negative_percentage}
              </TableCell>
              <TableCell sx={{ fontSize: "11px", color: "white", borderBottom: "1px solid white" }}>
                {item.rsi_100_positive_percentage}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectorTable;
