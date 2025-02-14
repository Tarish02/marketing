import React from "react";
import Navbar from "./Navbar";
import { ThemeProvider } from "@mui/material";
import theme from "../../style/Theme";

export default {
  title: "Organisms/Navbar",
  component: Navbar,
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <Navbar {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
