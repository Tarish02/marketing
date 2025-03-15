import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_CONFIG from "../../config/apiConfig"; 

// Async thunk for fetching stock details
export const fetchStockDetails = createAsyncThunk(
  "stock/fetchStockDetails",
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await fetch(API_CONFIG.stockData(symbol));

      if (!response.ok) throw new Error("Failed to fetch stock data");

      const data = await response.json();
      console.log(`Fetched stock data for ${symbol}:`, data);

      // Ensure data is an object and contains the expected keys
      if (typeof data !== "object" || !data.date || !data.symbol || !data.open) {
        throw new Error("No valid stock data received from API");
      }

      return data; // Return stock data object directly
    } catch (error) {
      console.error("Stock fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stockData: {},  // Update to store an object instead of an array
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.stockData = {}; // Reset stock data on new fetch
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload; // Store fetched stock data object
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.stockData = {}; // Reset data in case of failure
      });
  },
});

export default stockSlice.reducer;
