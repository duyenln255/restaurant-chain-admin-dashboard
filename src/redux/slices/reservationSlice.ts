import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllReservations } from "../../services/reservation.service";
import type { Reservation } from "../../services/reservation.service";

interface ReservationState {
  items: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async () => {
    const response = await getAllReservations();
    return response;
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch reservations";
      });
  },
});

export default reservationSlice.reducer;
