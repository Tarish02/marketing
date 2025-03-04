import { configureStore } from "@reduxjs/toolkit";
import sectorsReducer from "./sectorsSlice";
import chartReducer from "./chartSlice"
import marketBreathReducer from "./marketBreathSlice";
import hotSectorReducer from "./hotSectorSlice";

const store = configureStore({
  reducer: {
    sectors: sectorsReducer,
    chart: chartReducer,
    marketBreath: marketBreathReducer,
    hotSector: hotSectorReducer,
  },
});

export default store;
