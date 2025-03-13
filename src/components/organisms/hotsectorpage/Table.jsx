// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTableData } from "../../../redux/slices/tableSlice";
// import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

// const SectorTable = ({ onSectorClick }) => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.table);

//   useEffect(() => {
//     dispatch(fetchTableData());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const safeData = Array.isArray(data) ? data : [];

//   const cellStyle = {
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#E2E5E9",
//     backgroundColor: "#272D35",
//     borderBottom: "1px solid #E2E5E9",
//   };

//   return (
//     <TableContainer component={Paper} sx={{ backgroundColor: "#272D35", height: "36vh" }}>
//       <Table size="small">
//       <TableHead>
//   <TableRow>
//     <TableCell sx={{backgroundColor: "#272D35",}}></TableCell>
//     <TableCell sx={{backgroundColor: "#272D35",}}></TableCell>
//     <TableCell sx={{backgroundColor: "#272D35",}}></TableCell>
//     <TableCell sx={{backgroundColor: "#272D35",}}></TableCell>
//     <TableCell sx={{backgroundColor: "#272D35",}}></TableCell>
//     <TableCell sx={{ ...cellStyle, textAlign: "center", }} colSpan={3}>
//       Constituents Trend Rank
//     </TableCell>
//     <TableCell sx={{ ...cellStyle, textAlign: "center", }} colSpan={3}>
//       Nifty Relative Return Rank
//     </TableCell>
//     <TableCell sx={{ ...cellStyle, textAlign: "center", }} colSpan={3}>
//       Activity Count
//     </TableCell>
//   </TableRow>
//   <TableRow>
//   <TableCell sx={cellStyle}>Sector</TableCell>
//     <TableCell sx={cellStyle}>No. of Stocks</TableCell>
//     <TableCell sx={cellStyle}>Index Value</TableCell>
//     <TableCell sx={cellStyle}>Index Trend</TableCell>
//     <TableCell sx={cellStyle}>52 High Index Rank</TableCell>
//     <TableCell sx={cellStyle}>1 Day</TableCell>
//     <TableCell sx={cellStyle}>1 Week</TableCell>
//     <TableCell sx={cellStyle}>1 Month</TableCell>
//     <TableCell sx={cellStyle}>1 Day Rank RSI</TableCell>
//     <TableCell sx={cellStyle}>1 Week Rank RSI</TableCell>
//     <TableCell sx={cellStyle}>1 Month Rank RSI</TableCell>
//     <TableCell sx={cellStyle}>1 Day Del.</TableCell>
//     <TableCell sx={cellStyle}>1 Week Del.</TableCell>
//     <TableCell sx={cellStyle}>1 Month Del.</TableCell>
//   </TableRow>
// </TableHead>

//         <TableBody>
//           {safeData.map((item, index) => (
//             <TableRow 
//               key={index} 
//               onClick={() => onSectorClick(item.gic_industry)} 
//               sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#1E242B" } }} 
//             >
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.gic_industry}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.total_stocks}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>N/A</TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>N/A</TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>N/A</TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.count_1day}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.count_1week}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.count_1month}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item["rank_rsi_10/25.0"]}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item["rank_rsi_10/25.0_1week"]}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item["rank_rsi_10/25.0_3week"]}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.rsi_10_positive_percentage}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.rsi_10_negative_percentage}
//               </TableCell>
//               <TableCell sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
//                 {item.rsi_100_positive_percentage}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SectorTable;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData } from "../../../redux/slices/tableSlice";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const SectorTable = ({ onSectorClick }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const safeData = Array.isArray(data) && data.length > 0 ? data : [];
  const headers = safeData.length > 0 ? Object.keys(safeData[0]) : [];

  const cellStyle = {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#E2E5E9",
    backgroundColor: "#272D35",
    borderBottom: "1px solid #E2E5E9",
    textAlign: "center",
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#272D35", height: "36vh" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={cellStyle}>
                {header.replace(/_/g, " ").toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeData.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onSectorClick(item.gic_industry)}
              sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#1E242B" } }}
            >
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex} sx={{ fontSize: "11px", color: "#E2E5E9", borderBottom: "1px solid #E2E5E9" }}>
                  {item[header] !== undefined ? item[header] : "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectorTable;