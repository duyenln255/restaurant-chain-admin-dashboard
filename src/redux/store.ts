import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import customerReducer from "./slices/customerSlice";
import reservationReducer from "./slices/reservationSlice";
import feedbackReducer from "./slices/feedbackSlice";
import brandReducer from "./slices/brandSlice";
import branchReducer from "./slices/branchSlice";
import blogReducer from "./slices/blogSlice";
import voucherReducer from "./slices/voucherSlice";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer, 
    customers: customerReducer,
    reservations: reservationReducer, 
    feedbacks: feedbackReducer,
    brands: brandReducer,
    branches: branchReducer, 
    blogs: blogReducer,
    vouchers: voucherReducer,
    employees: employeeReducer
  },
});

// Types để dễ xài ở các hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
