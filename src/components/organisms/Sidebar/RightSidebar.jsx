import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Drawer as MuiDrawer, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  marginTop: "74px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `60px`,
  backgroundColor: theme.palette.primary.main,
  marginTop: "74px",
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

export default function RightSidebar({ open, toggleSidebar }) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" anchor="right" open={open}>
      <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", padding: "10px" }}>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}
