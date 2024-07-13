import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modals/modalReducer";
import goalsSlice from "./goals/goalsSlice";
import filtersSlice from "./filters/filtersSlice";

export const store = configureStore({
  reducer: { modal: modalReducer, goals: goalsSlice, filters: filtersSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
