import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchActiveSectors = createAsyncThunk(
  "sectors/fetchActiveSectors",
  async () => {
    const response = await fetch("http://localhost:5000/activeSectors");
    if (!response.ok) {
      throw new Error("Failed to fetch sectors");
    }
    return response.json();
  }
);

const sectorsSlice = createSlice({
  name: "sectors",
  initialState: { sectors: [], loading: false, error: null, lastUpdated: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveSectors.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors = action.payload;
        state.lastUpdated = new Date().toISOString(); 
      })
      .addCase(fetchActiveSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sectorsSlice.reducer;
