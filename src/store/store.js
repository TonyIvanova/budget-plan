import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channelsSlice";
import budgetsReducer from "../features/budgetsSlice";
import budgetDistributionsReducer from "../features/budgetDistributionsSlice";

export default configureStore({
  reducer: { channelReducer, budgetsReducer, budgetDistributionsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
