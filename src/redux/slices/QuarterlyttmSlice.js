import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuarterlyTTMData = createAsyncThunk(
  "quarterlyttm/fetchQuarterlyTTMData",
  async () => {
    const response = await fetch("YOUR_NEW_API_URL_HERE");
    const data = await response.json();
    return data;
  }
);

const QuarterlyttmSlice = createSlice({
  name: "quarterlyttm",
  initialState: {
    quarterlyTTM: {},
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuarterlyTTMData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuarterlyTTMData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quarterlyTTM = action.payload;
      })
      .addCase(fetchQuarterlyTTMData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default QuarterlyttmSlice.reducer;
