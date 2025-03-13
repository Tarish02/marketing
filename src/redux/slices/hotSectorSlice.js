import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHotSectorDetails = createAsyncThunk(
  "hotSector/fetchHotSectorDetails",
  async (sector) => {
    const response = await axios.get(`/api/sector-details?sector=${sector}`);
    return response.data;
  }
);

const hotSectorSlice = createSlice({
  name: "hotSector",
  initialState: { sectorData: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotSectorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotSectorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.sectorData = action.payload;
      })
      .addCase(fetchHotSectorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hotSectorSlice.reducer;
// export { fetchHotSectorDetails }; 