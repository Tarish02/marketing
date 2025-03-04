import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Drawer as MuiDrawer, Box, List, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MarketBreathIcon from "../../../assets/icons/market-breath.svg";
import HotSector from "../../../assets/icons/Hot-Sector.svg";
import SectorStocks from "../../../assets/icons/Sector-Stocks.svg";
import MyScans from "../../../assets/icons/My-Scans.svg";
import RawMaterial from "../../../assets/icons/Raw-Material.svg";
import TechnofundaAnalysis from "../../../assets/icons/Technofunda Analysis.svg";

const drawerWidth = 206;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  marginTop: "64px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `54px`,
  backgroundColor: theme.palette.primary.main,
  marginTop: "64px",
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
}));

const menuItems = [
  { text: "Market Breath", icon: MarketBreathIcon },
  { text: "Hot Sector", icon: HotSector },
  { text: "Sector Stocks", icon: SectorStocks },
  { text: "My Scans", icon: MyScans },
  { text: "Raw Material", icon: RawMaterial },
  { text: "Technofunda Analysis", icon: TechnofundaAnalysis },
];

export default function LeftSidebar({ setSelectedContent, open, toggleSidebar }) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", padding: "10px" }}>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
  {menuItems.map((item) => (
    <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          justifyContent: open ? "initial" : "center",
          color: "#fff",
          fontFamily: "AktivGrotesk-Medium, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "15px",
          letterSpacing: "0%",
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
        onClick={() => {
          setSelectedContent(item.text);
          if (item.text === "Hot Sector") {
            toggleSidebar(); // Close sidebar when "Hot Sector" is clicked
          }
        }}
      >
        <ListItemIcon sx={{ justifyContent: "center", color: "#fff", minWidth: "10px" }}>
          <img src={item.icon} alt={item.text} width="24" height="24" />
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, marginLeft: "7px" }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

    </Drawer>
  );
}
