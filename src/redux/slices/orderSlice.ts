import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  fetchAllOrdersApi,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from '../../services/order.service.tsx';
import type { APIOrderResponse, OrderCreateRequest, OrderUpdateRequest } from '../../services/order.service.tsx';
import type { OrderItem } from '../../types/OrderItem';


interface OrdersState {
  items: OrderItem[];
  selectedOrder: OrderItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<OrderItem[]>(
  'orders/fetchOrders',
  async () => {
    const data = await fetchAllOrdersApi();
    console.log("API response data:", data);

    if (!data || data.length === 0) {
      console.warn("No orders returned from API");
      return [];
    }

    try {
      const mappedData = data.map((order) => ({
        id: order.id,
        name: order.full_name ?? "Unknown User",
        address: order.address ?? "Unknown Address",
        date: new Date(order.date_added).toLocaleString(),
        orderType: order.type || "AT STORE",
        status: (order.status ?? 'Processing') as OrderItem["status"],
        phone: order.phone || "",
        email: order.email || "",

        // ✅ Lưu cart.items vào luôn để dùng render
        cart: {
          items: order.cart?.items?.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            photo: item.photo || "",
            price: item.price || 0,
            total_price: item.total_price || 0
          })) || []
        }
      }));
      console.log("Mapped orders:", mappedData);
      return mappedData;
    } catch (error) {
      console.error("Error mapping orders:", error);
      return [];
    }
  }
);

export const fetchOrderById = createAsyncThunk<OrderItem, string>(
  'orders/fetchOrderById',
  async (id) => {
    const response = await getOrderById(id);
    const order = response.order; // API trả về { order: {...} }

    return {
      id: order.id,
      name: order.full_name ?? "Unknown User",
      address: order.address ?? "Unknown Address",
      date: new Date(order.date_added).toLocaleString(),
      orderType: order.type || "AT STORE",
      status: (order.status ?? 'Processing') as OrderItem["status"],
      phone: order.phone || "",
      email: order.email || "",
      cart: {
        items: order.cart.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          photo: item.photo || "",
          price: item.price || 0,
          total_price: item.total_price || 0
        }))
      }
    };
  }
);

export const addOrder = createAsyncThunk<OrderItem, OrderCreateRequest>(
  'orders/addOrder',
  async (orderData) => {
    const response = await createOrder(orderData);
    const order = response.order;

    return {
      id: order.id,
      name: order.full_name ?? "Unknown User",
      address: order.address ?? "Unknown Address",
      date: new Date(order.date_added).toLocaleString(),
      orderType: order.type || "AT STORE",
      status: (order.status ?? 'Processing') as OrderItem["status"],
      phone: order.phone || "",
      email: order.email || "",
      cart: {
        items: order.cart.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          photo: item.photo || "",
          price: item.price || 0,
          total_price: item.total_price || 0
        }))
      }
    };
  }
);

export const editOrder = createAsyncThunk<OrderItem, { id: string; order: OrderUpdateRequest }>(
  'orders/editOrder',
  async ({ id, order }) => {
    const response = await updateOrder(id, order);
    const updatedOrder = response.order;

    return {
      id: updatedOrder.id,
      name: updatedOrder.full_name ?? "Unknown User",
      address: updatedOrder.address ?? "Unknown Address",
      date: new Date(updatedOrder.date_added).toLocaleString(),
      orderType: updatedOrder.type || "AT STORE",
      status: (updatedOrder.status ?? 'Processing') as OrderItem["status"],
      phone: updatedOrder.phone || "",
      email: updatedOrder.email || "",
      cart: {
        items: updatedOrder.cart.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          photo: item.photo || "",
          price: item.price || 0,
          total_price: item.total_price || 0
        }))
      }
    };
  }
);

export const removeOrder = createAsyncThunk<string, string>(
  'orders/removeOrder',
  async (id) => {
    await deleteOrder(id);
    return id;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OrdersState>) => {
    builder
      // Fetch all orders
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
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state: OrdersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })

      // Add order
      .addCase(addOrder.pending, (state: OrdersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add order';
      })

      // Edit order
      .addCase(editOrder.pending, (state: OrdersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedOrder = action.payload;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order';
      })

      // Remove order
      .addCase(removeOrder.pending, (state: OrdersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete order';
      });
  }
});

export default orderSlice.reducer;
