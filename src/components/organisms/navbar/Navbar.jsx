import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, InputBase, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.neutral[800],
  padding: "4px 10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "250px",
}));

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#191E24", padding: "5px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo & Sidebar Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            LOGO
          </Typography>
        </Box>

        {/* Center: Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Indices", "Insider Trades", "FII/DII Data", "Alerts", "Big Players", "Watchlist", "IPO Dashboard"].map(
            (item) => (
              <Typography
                key={item}
                variant="body1"
                sx={{ color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
              >
                {item}
              </Typography> 
            )
          )}
        </Box>

        {/* Right: Search & Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Search>
            <SearchIcon sx={{ marginRight: 1, color: "#ccc" }} />
            <InputBase placeholder="Search stocks and sectors etc." sx={{ color: "#fff", width: "100%" }} />
          </Search>
          <Button variant="contained" sx={{ backgroundColor: "#0033FF", color: "#fff", fontWeight: 600 }}>
            Login
          </Button>
          <Button variant="outlined" sx={{ borderColor: "#ccc", color: "#fff", fontWeight: 600 }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
