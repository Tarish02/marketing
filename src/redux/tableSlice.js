import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTableData = createAsyncThunk("table/fetchTableData", async () => {
  const response = await axios.get("http://localhost:5000/hot-sector"); 
  return response.data;
});

const tableSlice = createSlice({
  name: "table",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => { state.loading = true; })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : []; 
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tableSlice.reducer;
