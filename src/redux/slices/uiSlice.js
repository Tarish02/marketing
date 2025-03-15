import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedSector: null,
  selectedStock: null, // Store the selected stock dynamically
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.isOpen = action.payload;
    },
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload;
    },
    setSelectedStock: (state, action) => { // Store the selected stock
      state.selectedStock = action.payload;
    },
  },
});

export const { toggleDrawer, setSelectedSector, setSelectedStock } = uiSlice.actions;
export default uiSlice.reducer;
