import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const MarketCap = () => {
  const data = [
    { label: "Market Cap", value: "₹ 51,54,854 Cr." },
    { label: "Current Price", value: "24.6"},
    { label: "High/Low", value: "24.6%" },
    { label: "Stock P/E", value: "24.6%", backgroundColor: "#191E24"  },
    { label: "Book Value", value: "-4.76%", backgroundColor: "#191E24"  },
    { label: "Dividend Yield", value: "0.40%", backgroundColor: "#191E24"  },
    { label: "ROCE", value: "9.25%" },
    { label: "ROE", value: "9.25%" },
    { label: "Face Value", value: "₹ 10" },
    { label: "Down from 52w High", value: "9.25%", backgroundColor: "#191E24"  },
    { label: "Quaterly Net Profit", value: "10.8%", backgroundColor: "#191E24"  },
    { label: "Quaterly Sales Var", value: "-0.15%", backgroundColor: "#191E24"  },
    { label: "Quaterly Profit Var", value: "-0.15%" },
    { label: "Debt to Equity", value: "0.44" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#232932",
        padding: "8px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid
            key={index}
            item
            lg={4}
            sx={{
              backgroundColor: item.backgroundColor || "transparent",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#A0A0A0",
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "100%",
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "100%",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketCap;
