// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotSector } from "../../redux/hotSectorSlice";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Drawer,
//   IconButton,
//   Button,
//   ButtonGroup,
// } from "@mui/material";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import CloseIcon from "@mui/icons-material/Close";

// const HotSector = () => {
//   const dispatch = useDispatch();
//   const { data, status } = useSelector((state) => state.hotSector);
//   const [selectedSector, setSelectedSector] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Sectors");

//   useEffect(() => {
//     dispatch(fetchHotSector());
//   }, [dispatch]);

//   if (status === "loading") return <CircularProgress sx={{ color: "white" }} />;
//   if (status === "failed") return <p style={{ color: "red" }}>Error loading data</p>;

//   const getChartOptions = (sector) => ({
//     chart: { type: "line", backgroundColor: "black" },
//     title: { text: `${sector.gic_industry} - RSI Trends`, style: { color: "white" } },
//     xAxis: { categories: ["Now", "1 Week", "2 Weeks", "3 Weeks"], labels: { style: { color: "white" } } },
//     yAxis: { title: { text: "RSI Value", style: { color: "white" } }, labels: { style: { color: "white" } } },
//     series: [
//       {
//         name: "RSI 10/25",
//         data: [sector["rsi_10/25.0"], sector["rsi_10/25.0_1week"], sector["rsi_10/25.0_2week"], sector["rsi_10/25.0_3week"]],
//         color: "cyan",
//       },
//       {
//         name: "RSI 10/35",
//         data: [sector["rsi_10/35.0"], sector["rsi_10/35.0_1week"], sector["rsi_10/35.0_2week"], sector["rsi_10/35.0_3week"]],
//         color: "yellow",
//       },
//       {
//         name: "RSI 100/50",
//         data: [sector["rsi_100/50.0"], sector["rsi_100/50.0_1week"], sector["rsi_100/50.0_2week"], sector["rsi_100/50.0_3week"]],
//         color: "red",
//       },
//     ],
//   });

//   const handleSectorClick = (sector) => {
//     setSelectedSector(sector);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "90vh", backgroundColor: "#272D35", color: "white" }}>
      
//       {/* Toggle Buttons */}
//       <ButtonGroup sx={{  }}>
//         <Button variant={activeTab === "Sectors" ? "contained" : "outlined"} onClick={() => setActiveTab("Sectors")} sx={{backgroundColor: "#183C74", borderRadius: "0%", height: "19px", font: 400}}>
//           Sectors
//         </Button>
//         <Button variant={activeTab === "Sub-Sectors" ? "contained" : "outlined"} onClick={() => setActiveTab("Sub-Sectors")} sx={{height: "19px", font: 400, color: "white", backgroundColor: "#232932", borderRadius: "0%"}}>
//           Sub-Sectors
//         </Button>
//       </ButtonGroup>

//       {/* Table Section */}
//       <TableContainer component={Paper} sx={{ backgroundColor: "#272D35", color: "white", flex: 1 }}>
//         <Table>
//           <TableHead>
//           {/* Headings Row */}
//           <TableRow sx={{ height: "30px" }}> 
//             <TableCell sx={{ border: "none", padding: "4px" }}></TableCell>
//             <TableCell sx={{ border: "none", padding: "4px" }}></TableCell>
//             <TableCell sx={{ border: "none", padding: "4px" }}></TableCell>
//             <TableCell sx={{ border: "none", padding: "4px" }}></TableCell>
//             <TableCell sx={{ border: "none", padding: "4px" }}></TableCell>
        
//             <TableCell colSpan={3} sx={{ color: "#6A8EC9", fontSize: "12px", textAlign: "center", border: "none", borderLeft: "white 1px solid", padding: "4px" }}>
//             Constituents Trend Rank
//              </TableCell>
//             <TableCell colSpan={3} sx={{ color: "#6A8EC9", fontSize: "12px", textAlign: "center", border: "none", borderLeft: "white 1px solid", padding: "4px" }}>
//             Nifty Relative Return Rank
//              </TableCell>
//             <TableCell colSpan={3} sx={{ color: "#6A8EC9", fontSize: "12px", textAlign: "center", border: "none", borderLeft: "white 1px solid", padding: "4px" }}>
//             Activity Count
//              </TableCell>
//         </TableRow>

//           {/* Data in Single Row */}
//           <TableRow sx={{height: "2px"}}>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>Sector</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>No. of stocks</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>Index value</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>Index trend</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>52 high index rank</TableCell>
        
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Day Rank</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Week Rank</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Month Rank</TableCell>
        
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Day Rank RSI</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Week Rank RSI</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Month Rank RSI</TableCell>
        
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Day Del.</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Week Del.</TableCell>
//             <TableCell sx={{ color: "white", fontSize: "11px", border: "1px solid white" }}>1 Month Del.</TableCell>
//           </TableRow>
//         </TableHead>
        
//           <TableBody>
//             {activeTab === "Sectors" ? (
//               data.map((sector, index) => (
//                 <TableRow
//                   key={index}
//                   onClick={() => handleSectorClick(sector)}
//                   sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#272D35" } }}
//                 >
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector.gic_industry}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_10/25.0"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_10/25.0_1week"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_10/25.0_2week"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_10/25.0_3week"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_10/35.0"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rsi_100/50.0"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector.rs_1month}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector.rs_3month}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector.rs_6month}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector.total_stocks}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rank_rsi_10/25.0"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rank_rsi_10/35.0"]}</TableCell>
//                 <TableCell sx={{ color: "white", fontSize: "11px", borderRight: "1px white solid" }}>{sector["rank_rsi_100/50.0"]}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={14} sx={{ color: "gray", textAlign: "center", fontSize: "11px" }}>
//                   No data available for Sub-Sectors
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Chart Section */}
//       <div style={{ flex: 1 }}>
//         {selectedSector && <HighchartsReact highcharts={Highcharts} options={getChartOptions(selectedSector)} />}
//       </div>

//       {/* Drawer Section */}
//       <Drawer
//   anchor="right"
//   open={isDrawerOpen}
//   onClose={() => setIsDrawerOpen(false)}
//   sx={{
//     "& .MuiDrawer-paper": {
//       width: "1550px",
//       backgroundColor: "#272D35",
//       color: "white",
//       padding: "16px",
//       height: "270px",
//       marginTop: "6%",
//     },
//   }}
// >
//   <IconButton onClick={() => setIsDrawerOpen(false)} sx={{ color: "white", position: "absolute", right: 8, top: 8 }}>
//     <CloseIcon />
//   </IconButton>

//   {selectedSector && (
//     <TableContainer component={Paper} sx={{ backgroundColor: "#272D35", color: "white", marginTop: "40px" }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>Field</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>Value</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>Sector Name</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.gic_industry}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>No. of Stocks</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.total_stocks}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>Index Value</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.index_value}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>Index Trend</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.index_trend}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>52 High Index Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_52high}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Day Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_1day}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Week Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_1week}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Month Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_1month}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Day RSI Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_rsi_1day}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Week RSI Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_rsi_1week}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>1 Month RSI Rank</TableCell>
//             <TableCell sx={{ color: "white" }}>{selectedSector.rank_rsi_1month}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )}
// </Drawer>

//     </div>
//   );
// };

// export default HotSector;


import React from "react";
import SectorTable from "../organisms/Table";
import Charts from "../organisms/Charts";
import Drawer from "../organisms/Drawer";
import { useDispatch } from "react-redux";
import { setSelectedSector, toggleDrawer } from "../../redux/uiSlice";
import { fetchDrawerData } from "../../redux/drawerSlice";

const HotSector = () => {
  const dispatch = useDispatch();

  const handleSectorClick = (sector) => {
    dispatch(setSelectedSector(sector)); 
    dispatch(fetchDrawerData(sector)); 
    dispatch(toggleDrawer(true)); 
  };

  return (
    <div>
      <SectorTable onSectorClick={handleSectorClick} /> 
      <Charts />
      <Drawer />
    </div>
  );
};

export default HotSector;


