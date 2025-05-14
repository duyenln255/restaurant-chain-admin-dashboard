import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomerById
} from "../../services/customer.service";
import type { Customer } from "../../services/customer.service";

interface CustomerState {
  items: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  selectedCustomer: null,
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

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id: string) => {
    const response = await getCustomerById(id);
    return response;
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer: Omit<Customer, "id" | "date_added" | "cart">) => {
    const response = await createCustomer(customer);
    return response;
  }
);

export const editCustomer = createAsyncThunk(
  "customers/editCustomer",
  async ({ id, customer }: { id: string; customer: Partial<Omit<Customer, "id" | "date_added" | "cart">> }) => {
    const response = await updateCustomer(id, customer);
    return response;
  }
);

export const removeCustomer = createAsyncThunk(
  "customers/removeCustomer",
  async (id: string) => {
    await deleteCustomerById(id);
    return id;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all customers
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
      })

      // Fetch customer by ID
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomerById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch customer";
      })

      // Add customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addCustomer.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add customer";
      })

      // Edit customer
      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedCustomer = action.payload;
        state.loading = false;
      })
      .addCase(editCustomer.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update customer";
      })

      // Remove customer
      .addCase(removeCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(removeCustomer.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete customer";
      });
  },
});

export default customerSlice.reducer;
