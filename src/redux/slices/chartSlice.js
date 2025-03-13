import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChartData = createAsyncThunk("chart/fetchChartData", async () => {
  const response = await fetch("http://localhost:5000/chartData");
  return response.json();
});

const chartSlice = createSlice({
  name: "chart",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chartSlice.reducer;
