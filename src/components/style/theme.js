import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", 
    primary: {
      main: "#1976d2",
      50: "#000000",
      100: "#0D0F12",
      200: "#111418",
      300: "#15191E ",
      400: "#191E24",
      500: "#1D232A",
      600: "#262D36",
      700: "#3634B0",
      800: "#2A323C",
      900: "#2E3742",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#191E24",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
