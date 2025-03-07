import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isOpen: false, selectedSector: null },
  reducers: {
    toggleDrawer: (state, action) => {
      state.isOpen = action.payload;
    },
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload;
    },
  },
});

export const { toggleDrawer, setSelectedSector } = uiSlice.actions;
export default uiSlice.reducer;
