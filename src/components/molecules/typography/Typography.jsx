import React from "react";
import { Typography } from "@mui/material";

const TypographyMolecule = ({ variant, children, color = "primary", align = "left" }) => {
  return (
    <Typography variant={variant} color={color} align={align}>
      {children}
    </Typography>
  );
};

export default TypographyMolecule;
