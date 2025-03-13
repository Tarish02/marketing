import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMarketBreathData = createAsyncThunk("marketBreath/fetchData", async () => {
  const response = await fetch("http://localhost:5000/api/chartData");
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
});

const marketBreathSlice = createSlice({
  name: "marketBreath",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketBreathData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketBreathData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMarketBreathData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marketBreathSlice.reducer;
