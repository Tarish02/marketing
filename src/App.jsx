import React from "react";
import { ThemeProvider, CssBaseline, Button, Typography } from "@mui/material";
import theme from "./components/style/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" color="primary">
          Primary Color Example
        </Typography>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="contained" sx={{ bgcolor: theme.palette.button.main, color: theme.palette.button.contrastText }}>
          Custom Button
        </Button>
        <Button variant="contained" sx={{ bgcolor: theme.palette.loginButton.main, color: theme.palette.loginButton.contrastText }}>
          Login Button
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
