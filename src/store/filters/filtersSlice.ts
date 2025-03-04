import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilter {
  id: number;
  title: string;
}

export interface IFilterState {
  filters: IFilter[];
}

const initialState: IFilterState = {
  filters: []
  // filters: [
  //   { id: 0, title: "All" },
  //   { id: 1, title: "Personal" },
  //   { id: 2, title: "Sport" },
  //   { id: 3, title: "Business" },
  // ],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    getFilters(state, action: PayloadAction<IFilter[]>) {
      action.payload.forEach((filter) => state.filters.push(filter));
    },
    addFilter(state, action: PayloadAction<IFilter>) {
      state.filters.push(action.payload);
      const tg = Telegram.WebApp;
      const db = tg.CloudStorage;
      db.setItem("filters", JSON.stringify(state.filters));
    },
    removeFilter(state, action: PayloadAction<IFilter>) {
      state.filters = state.filters.filter((fil) => fil !== action.payload);
      const tg = Telegram.WebApp;
      const db = tg.CloudStorage;
      db.setItem("filters", JSON.stringify(state.filters));
    },
    editFilter(state, action: PayloadAction<{ id: number; text: string }>) {
      const filter = state.filters.find((filter) => filter.id === action.payload.id);
      if (filter) {
        filter!.title = action.payload.text;
      }
      const tg = Telegram.WebApp;
      const db = tg.CloudStorage;
      db.setItem("filters", JSON.stringify(state.filters));
    },
    deleteFilter(state, action: PayloadAction<{ filterId: number }>) {
      state.filters = state.filters.filter((filter: IFilter) => filter.id !== action.payload.filterId);
      const tg = Telegram.WebApp;
      const db = tg.CloudStorage;
      db.setItem("filters", JSON.stringify(state.filters));
    },
  },
});
export const { getFilters, addFilter, removeFilter, editFilter, deleteFilter } = filterSlice.actions;
export default filterSlice.reducer;
