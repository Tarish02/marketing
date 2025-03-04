import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSectorData,
  fetchChartData,
  selectSector,
  closePanel,
} from "../../redux/hotSectorSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Drawer,
  Typography,
  CircularProgress,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const cellStyle = {
  color: "#fff",
  fontFamily: '"AktivGrotesk-Regular",sans-serif',
  fontSize: "11px",
  lineHeight: "11px",
};

const HotSectorPage = () => {
  const dispatch = useDispatch();
  const { sectors, chartData, selectedSector, isPanelOpen, isLoading } =
    useSelector((state) => state.hotSector);

  useEffect(() => {
    dispatch(fetchSectorData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSector) {
      dispatch(fetchChartData(selectedSector));
    }
  }, [dispatch, selectedSector]);

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#272d35",
        color: "#fff",
        padding: 2,
        marginTop:"-25px"
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: "#272d35",
          padding: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginRight: 1,
            backgroundColor: "#444",
            height: "36px",
            width: "188.5px",
            fontSize: "16px",
            // fontFamily: "AktivGrotesk-Medium",
            borderRadius: "0%",
            backgroundColor: "#183c74",
            marginTop:"-20px",
            marginBottom:"-16px"
          }}
        >
          Sector
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#666",
            height: "36px",
            width: "188.5px",
            fontSize: "14px",
            // fontFamily: "AktivGrotesk-Medium",
            borderRadius: "0%",
            backgroundColor: "#232932",
            marginTop:"-20px",
            marginBottom:"-16px"
          }}
        >
          Sub-Sector
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#222",
            maxHeight: "35vh",
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "white", margin: "auto" }} />
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyle}></TableCell>
                  <TableCell sx={cellStyle}></TableCell>
                  <TableCell sx={cellStyle}></TableCell>
                  <TableCell sx={cellStyle}></TableCell>
                  <TableCell sx={cellStyle}></TableCell>
                  <TableCell
                    sx={{
                      ...cellStyle,
                      borderRight: "1px solid #444",
                      borderLeft: "1px solid #444",
                       fontSize: "11px", lineHeight: "2px", color: "#8c8cec"
                    }}
                    colSpan={3}
                    align="center"
                  >
                    Constituents Trend Rank
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "2px", color: "#8c8cec" }}
                    colSpan={3}
                    align="center"
                  >
                    Nifty Relative Return Rank
                  </TableCell>
                  <TableCell sx={{...cellStyle, fontSize: "11px", lineHeight: "2px", color: "#8c8cec"}} colSpan={3} align="center">
                    Activity Count
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    Sectors
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    No. Of Stocks
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    Index Value
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    Index Trend
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    52 high index ran
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 day rank
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 week rank
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 month rank
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 day rank rsi
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 week rank rsi
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 month rank rsi
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 day del.
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                  >
                    1 week del.
                  </TableCell>
                  <TableCell sx={cellStyle}>1 month del.</TableCell>{" "}
                </TableRow>
              </TableHead>

              <TableBody>
                {sectors.map((sector) => (
                  <TableRow
                    key={sector.id}
                    onClick={() => dispatch(selectSector(sector.id))}
                    sx={{ cursor: "pointer",  }}
                  >
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                    >
                      {sector.sector}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px" }}
                    >
                      {sector.stocks}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.indexValue}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.indexTrend}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.highIndexRan}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rank1Day}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rank1Week}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rank1Month}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rsi1Day}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rsi1Week}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.rsi1Month}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.activity1Day}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", borderRight: "1px solid #444", fontSize: "11px", lineHeight: "15px", }}
                    >
                      {sector.activity1Week}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {sector.activity1Month}
                    </TableCell>{" "}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>

      {/* Chart Section */}
      <Box sx={{ height: "43vh", marginTop: -3 }}>
  {chartData && chartData.categories?.length > 0 ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { type: "line", backgroundColor: "#111" },
        title: { 
          text: selectedSector || "Sector Data", 
          style: { color: "#fff", fontSize: "16px" } 
        },
        xAxis: { 
          categories: chartData.categories || [], 
          labels: { style: { color: "#fff" } }, 
          gridLineColor: "#444" 
        },
        yAxis: { 
          title: { text: "Value", style: { color: "#fff" } }, 
          gridLineColor: "#444" 
        },
        tooltip: { backgroundColor: "#000", style: { color: "#fff" } },
        series: [{
          name: selectedSector || "Sector",
          data: chartData.values || [],
          color: "yellow",
          marker: { enabled: true, radius: 3 }
        }]
      }}
    />
  ) : (
    <Typography sx={{ color: "#fff", textAlign: "center", marginTop: 2 }}>
      No Data Available
    </Typography>
  )}
</Box>

      

      <Drawer
        anchor="right"
        open={isPanelOpen}
        onClose={() => dispatch(closePanel())}
        PaperProps={{
          sx: {
            width: "91%",
            marginLeft: "2%",
            marginTop: "105px",
            padding: 2,
            backgroundColor: "#222",
            color: "#fff",
            transition: "margin-left 0.3s ease-in-out",
            overflowY: "auto",
            height: "36vh",
          },
        }}
      >
        <Typography variant="h6">Details for {selectedSector}</Typography>
        <p>More details about {selectedSector}...</p>
      </Drawer>
    </Box>
    
  );
};

export default HotSectorPage;
