import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchYearlyBalanceSheetData = createAsyncThunk(
  "balanceSheet/fetchYearlyData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://eodhd.com/api/fundamentals/RELIANCE.NSE?api_token=65eecd0d8297f5.37934867&fmt=json"
      );
      const data = await response.json();

      console.log("Full API Response:", data); 

      if (data?.Financials?.Balance_Sheet?.yearly) {
        console.log("Extracted Yearly Data:", data.Financials.Balance_Sheet.yearly); 
        return data.Financials.Balance_Sheet.yearly;
      } else {
        return rejectWithValue("No Yearly Balance Sheet data found.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const balanceSheetSlice = createSlice({
  name: "balanceSheet",
  initialState: {
    yearlyData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYearlyBalanceSheetData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYearlyBalanceSheetData.fulfilled, (state, action) => {
        state.loading = false;
        state.yearlyData = action.payload;
      })
      .addCase(fetchYearlyBalanceSheetData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default balanceSheetSlice.reducer;
