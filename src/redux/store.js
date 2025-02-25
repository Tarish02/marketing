import { configureStore } from "@reduxjs/toolkit";
import sectorsReducer from "./sectorsSlice";
import chartReducer from "./chartSlice"

const store = configureStore({
  reducer: {
    sectors: sectorsReducer,
    chart: chartReducer,
  },
});

export default store;
