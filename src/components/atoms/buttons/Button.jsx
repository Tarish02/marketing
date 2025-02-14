import React from "react";
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Button = ({ variant = "primary", children, onClick, disabled }) => {
  const theme = useTheme();
  
  // Define button color mapping based on the theme
  const buttonColors = {
    login: theme.palette.loginButton.main,
    signup: theme.palette.success.main,
    logout: theme.palette.error.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  };

  return (
    <MuiButton
      variant="contained"
      style={{
        backgroundColor: buttonColors[variant] || theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
