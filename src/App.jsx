import React from "react";
import { ThemeProvider, CssBaseline, Button, Typography } from "@mui/material";
import theme from "./components/style/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <Typography variant="h1">Welcome to MUI Theme</Typography>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
