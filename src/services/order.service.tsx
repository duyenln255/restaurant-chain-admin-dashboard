import axiosInstance from "../lib/axiosInstance";
import type { OrderItem } from "../types/OrderItem";

export interface OrderItemAPI {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface APIOrderResponse {
  order: {
    display_id: string;
    id: string;
    customer_id: string;
    branch_id: string;
    status: string;
    type: string;
    preorder_time: string;
    late: boolean;
    resolved: boolean;
    payment_method: string;
    cart: {
      items: OrderItemAPI[];
      total_price: number;
    };
    date_added: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    branch_address: string;
    brand_name: string;
  };
}

export interface OrderCreateRequest {
  full_name: string;
  address: string;
  type: string;
  status: string;
  cart: {
    items: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
}

export interface OrderUpdateRequest {
  full_name?: string;
  address?: string;
  type?: string;
  status?: string;
  cart?: {
    items: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
}

export const fetchAllOrdersApi = async (): Promise<
  APIOrderResponse["order"][]
> => {
  try {
    const response = await axiosInstance.get("/order");
    // API trả về { "order": [...] }
    return Array.isArray(response.data.order) ? response.data.order : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getOrderById = async (id: string): Promise<APIOrderResponse> => {
  try {
    const response = await axiosInstance.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (
  order: OrderCreateRequest
): Promise<APIOrderResponse> => {
  try {
    const response = await axiosInstance.post("/order", order);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrder = async (
  id: string,
  order: OrderUpdateRequest
): Promise<APIOrderResponse> => {
  try {
    const response = await axiosInstance.put(`/order/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/order/${id}`);
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};
