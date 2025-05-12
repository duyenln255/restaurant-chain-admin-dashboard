// file: orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllOrdersApi } from '../../services/order.service';
import type { Order } from '../../services/order.service';
interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return await fetchAllOrdersApi();
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      });
  },
});

export default orderSlice.reducer;
