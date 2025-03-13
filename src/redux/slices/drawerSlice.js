import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDrawerData = createAsyncThunk(
  "drawer/fetchDrawerData",
  async (sector, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/drawer");
      const filteredData = response.data.filter((item) => item.sector_name === sector);

      if (!filteredData.length) {
        return rejectWithValue(`No data found for sector: ${sector}`);
      }

      return filteredData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data.");
    }
  }
);

const drawerSlice = createSlice({
  name: "drawer",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrawerData.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(fetchDrawerData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDrawerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching data.";
        state.data = [];
      });
  },
});

export default drawerSlice.reducer;

