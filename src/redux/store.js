import { configureStore } from "@reduxjs/toolkit";
import sectorsReducer from "./sectorsSlice";
import chartReducer from "./chartSlice";
import marketBreathReducer from "./marketBreathSlice";
import tableReducer from "../redux/tableSlice";
import chartsReducer from "../redux/chartsSlice";
import drawerReducer from "../redux/drawerSlice"; 
import uiReducer from "./uiSlice";
import hotSectorReducer from "./hotSectorSlice";

const store = configureStore({
  reducer: {
    sectors: sectorsReducer,
    chart: chartReducer, 
    marketBreath: marketBreathReducer,
    table: tableReducer,
    charts: chartsReducer,
    drawer: drawerReducer, 
    ui: uiReducer,
    hotSector: hotSectorReducer,
  },
});

export default store;
