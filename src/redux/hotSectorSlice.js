import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching sector data
export const fetchSectorData = createAsyncThunk(
  "hotSector/fetchSectorData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/hot-sector");
      console.log("Fetched Sectors Data:", response.data); 
      return Array.isArray(response.data) ? response.data : []; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching sectors");
    }
  }
);

// Async thunk for fetching chart data
export const fetchChartData = createAsyncThunk(
  "hotSector/fetchChartData",
  async (sectorName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/hot-sector-chart?sector=${sectorName}`
      );
      console.log(`Fetched Chart Data for ${sectorName}:`, response.data);
      return response.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching chart data");
    }
  }
);


const hotSectorSlice = createSlice({
  name: "hotSector",
  initialState: {
    sectors: [],
    chartData: null,
    selectedSector: null,
    isLoading: false,
    error: null,
    isPanelOpen: false,
  },
  reducers: {
    selectSector: (state, action) => {
      state.selectedSector = action.payload;
      state.isPanelOpen = true;
    },
    closePanel: (state) => {
      state.isPanelOpen = false;
      state.selectedSector = null;
      state.chartData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectorData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSectorData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sectors = action.payload; 
      })
      .addCase(fetchSectorData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.sectors = [];
      })
      .addCase(fetchChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { selectSector, closePanel } = hotSectorSlice.actions;
export default hotSectorSlice.reducer;
