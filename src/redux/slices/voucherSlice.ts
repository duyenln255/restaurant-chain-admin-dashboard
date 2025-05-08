import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllVouchers } from "../../services/voucher.service";
import type { Voucher } from "../../services/voucher.service";

interface VoucherState {
  items: Voucher[];
  loading: boolean;
  error: string | null;
}

const initialState: VoucherState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchVouchers = createAsyncThunk(
  "vouchers/fetchVouchers",
  async () => {
    const response = await getAllVouchers();
    return response;
  }
);

const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchVouchers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch vouchers";
      });
  },
});

export default voucherSlice.reducer;
