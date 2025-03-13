import { configureStore } from "@reduxjs/toolkit";
import sectorsReducer from "./slices/sectorsSlice";
import chartReducer from "./slices/chartSlice";
import marketBreathReducer from "./slices/marketBreathSlice";
import tableReducer from "./slices/tableSlice";
import chartsReducer from "./slices/chartsSlice";
import drawerReducer from "./slices/drawerSlice"; 
import uiReducer from "./slices/uiSlice";
import hotSectorReducer from "./slices/hotSectorSlice";
import stockReducer from "./slices/stockSlice";
import quarterlyttmReducer from "./slices/QuarterlyttmSlice";
import balanceSheetReducer from "./slices/balanceSheetSlice";

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
    stock: stockReducer,
    quarterlyttm: quarterlyttmReducer,
    balanceSheet: balanceSheetReducer,
  },
});

export default store;
