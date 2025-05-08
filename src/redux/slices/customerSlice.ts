import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCustomers } from "../../services/customer.service";
import type { Customer } from "../../services/customer.service";

interface CustomerState {
  items: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await getAllCustomers();
    return response;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch customers";
      });
  },
});

export default customerSlice.reducer;
