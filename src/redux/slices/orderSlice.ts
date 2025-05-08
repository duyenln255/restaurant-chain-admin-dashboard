import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { fetchAllOrdersApi } from '../../services/order.service';
import type { APIOrderResponse } from '../../services/order.service';

// ✅ Update lại OrderItem --> Thêm cart (giống dữ liệu thực tế)
export interface OrderItem {
  id: string;
  name: string;
  address: string;
  date: string;
  orderType: 'AT STORE' | 'ONLINE';
  status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';

  // Thêm cart
  cart?: {
    items: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
}

interface OrdersState {
  items: OrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<OrderItem[]>(
  'orders/fetchOrders',
  async () => {
    const data = await fetchAllOrdersApi();

    return data.map((order: APIOrderResponse) => ({
      id: order.id,
      name: order.full_name ?? "Unknown User",
      address: order.address ?? "Unknown Address",
      date: new Date(order.date_added).toLocaleString(),
      orderType: order.type === null ? "AT STORE" : "ONLINE",
      status: (order.status ?? 'Processing') as OrderItem["status"],

      // ✅ Lưu cart.items vào luôn để dùng render
      cart: {
        items: order.cart.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        }))
      }
    }));
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OrdersState>) => {
    builder
      .addCase(fetchOrders.pending, (state: OrdersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  }
});

export default orderSlice.reducer;
