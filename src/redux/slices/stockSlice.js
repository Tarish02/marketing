import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {},
  rawMaterial: {},
  otherOperatingExpenses: {}, 
  grossProfit: {}, 
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setRawMaterial: (state, action) => {
      state.rawMaterial = action.payload;
    },
    setOtherOperatingExpenses: (state, action) => { 
      state.otherOperatingExpenses = action.payload;
    },
    setGrossProfit: (state, action) => { 
      state.grossProfit = action.payload;
    }
  }
});

export const { setSummary, setRawMaterial, setOtherOperatingExpenses, setGrossProfit } = stockSlice.actions;
export default stockSlice.reducer;
