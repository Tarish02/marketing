import React from "react";
import { ThemeProvider, CssBaseline, Button, Typography } from "@mui/material";
import theme from "./components/style/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" color="primary">
        </Typography>
       
      </div>
    </ThemeProvider>
  );
}

export default App;
