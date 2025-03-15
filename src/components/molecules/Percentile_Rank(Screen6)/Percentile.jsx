import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

const data = [
  { label: "P/E", value: 20, color: "green" },
  { label: "P/BV", value: 35, color: "green" },
  { label: "ROE", value: 21, color: "red" },
  { label: "OPM", value: 70, color: "green" },
  { label: "P/E", value: 45, color: "green" },
  { label: "P/BV", value: 55, color: "green" },
  { label: "ROE", value: 30, color: "red" },
  { label: "OPM", value: 80, color: "green" },
];

const getPosition = (value) => {
  return { bottom: `${(value / 100) * 90}px` };
};

const PercentileRankChart = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#272D35",
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "bold" }}>
          Percentile Rank (over 10 years Period)
        </Typography>
        <Tooltip title="This represents the percentile ranking of financial metrics over a 10-year period">
          <Typography sx={{ color: "#ffffff", fontSize: "14px", marginLeft: "6px" }}>?</Typography>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height:"231px",
          position: "relative",
          borderBottom: "2px solid white",
          paddingBottom: "16px",
          background: "#272D35",
        }}
      >
        {data.map((item, index) => {
          const position = getPosition(item.value);

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                height: "193px",
              }}
            >
              <Box
                sx={{
                  width: "2px",
                  height: "193px",
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  bottom: "0",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  ...position,
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "0px",
                    height: "0px",
                    borderLeft: "20px solid transparent",
                    borderRight: "20px solid transparent",
                    borderBottom: item.color === "green" ? `30px solid #4ADE80` : "none",
                    borderTop: item.color === "red" ? "30px solid red" : "none",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      left: "2px",
                      transform: "translateX(-50%)",
                      fontSize: "9px",
                      fontWeight: "bold",
                      lineHeight: "15px",
                      color: item.color === "green" ? "red" : "#FFF",
                      bottom: item.color === "green" ? "-28px" : "auto", 
                      top: item.color === "red" ? "-28px" : "auto",
                    }}
                  >
                    {item.value}%
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  color: "#A3A3A3",
                  fontSize: "12px",
                  position: "absolute",
                  bottom: "-20px",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PercentileRankChart;
