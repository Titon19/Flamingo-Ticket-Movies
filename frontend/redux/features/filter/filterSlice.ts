import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  availability?: boolean;
  genre?: string;
  city?: string;
  theaters?: string[];
}

interface DataState {
  data: filterState;
}

const initialState: DataState = {
  data: {
    availability: undefined,
    genre: undefined,
    city: undefined,
    theaters: undefined,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<DataState>) => {
      state.data = {
        ...state.data,
        ...action.payload.data,
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
