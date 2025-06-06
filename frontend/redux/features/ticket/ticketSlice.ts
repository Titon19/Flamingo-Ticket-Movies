import type { MovieDetails } from "@/services/global/global.type";
import type { Theater } from "@/services/theaters/theater.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Ticket = {
  theater?: Theater;
  time?: string;
  seat?: string;
};

export interface TicketState {
  step?: "DETAIL" | "THEATER" | "TIME" | "SEAT";
  detail?: Ticket | null;
  movie?: MovieDetails | null;
}

const InitialState: TicketState = {
  step: "DETAIL",
  detail: null,
  movie: null,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: InitialState,
  reducers: {
    setStep: (state, action: PayloadAction<TicketState>) => {
      state.step = action.payload.step;
    },
    setTicketDetail: (state, action: PayloadAction<Ticket>) => {
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },
    setMovieDetail: (state, action: PayloadAction<MovieDetails>) => {
      state.movie = action.payload;
    },
  },
});

export const { setStep, setTicketDetail, setMovieDetail } = ticketSlice.actions;

export const ticketReducer = ticketSlice.reducer;
