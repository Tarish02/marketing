import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHotSector = createAsyncThunk("hotSector/fetch", async () => {
  const response = await fetch("http://localhost:5000/hot-sector"); 
  return response.json();
});

const hotSectorSlice = createSlice({
  name: "hotSector",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotSector.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHotSector.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHotSector.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default hotSectorSlice.reducer;
