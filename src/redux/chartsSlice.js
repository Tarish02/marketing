import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSectorChartData = createAsyncThunk(
  "charts/fetchSectorChartData",
  async (sector) => {
    const response = await axios.get(`http://localhost:5000/hot-chart?sector=${sector}`);
    return response.data;
  }
);

const chartsSlice = createSlice({
  name: "charts",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectorChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSectorChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSectorChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chartsSlice.reducer;
