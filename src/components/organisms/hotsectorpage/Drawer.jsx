import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toggleDrawer, setSelectedStock } from "../../../redux/slices/uiSlice";
import { fetchDrawerData } from "../../../redux/slices/drawerSlice";

const DrawerComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, selectedSector } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.drawer);

  useEffect(() => {
    if (isOpen && selectedSector) {
      dispatch(fetchDrawerData(selectedSector)); // Fetch sector-specific stocks
    }
  }, [isOpen, selectedSector, dispatch]);

  const handleClose = () => {
    dispatch(toggleDrawer(false));
  };

  const handleRowClick = (stockSymbol) => {
    dispatch(setSelectedStock(stockSymbol)); // Store selected stock
    navigate(`/screen6/${stockSymbol}`); // Navigate dynamically
  };
  

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      transitionDuration={500}
      sx={{ "& .MuiDrawer-paper": { width: 1380, height: 270, marginTop: 9, backgroundColor: "#272D35" } }}
    >
      <Box sx={{ padding: 1, color: "#E2E5E9" }}>
        <Typography variant="h6">{selectedSector || "Sector Details"}</Typography>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && data.length === 0 && <Typography>No data found for this sector.</Typography>}

        {!loading && !error && data.length > 0 && (
          <TableContainer component={Paper} sx={{ backgroundColor: "#272D35" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(data[0] || {}).map((header) => (
                    <TableCell key={header} sx={{ fontSize: "11px", color: "#E2E5E9" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.symbol}
                    onClick={() => handleRowClick(item.symbol)} // Click event
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#333" } }}
                  >
                    {Object.values(item).map((value, index) => (
                      <TableCell key={index} sx={{ fontSize: "11px", color: "#E2E5E9" }}>
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
