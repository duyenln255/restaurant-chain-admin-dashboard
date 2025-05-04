// src/services/order.service.ts
import axiosInstance from '../lib/axiosInstance';

export interface APIOrderResponse {
  order: APIOrder[];
}

export interface APIOrder {
  id: string;
  customer_id: string;
  branch_id: string;
  status: string;
  type: string | null;
  preorder_time: string | null;
  late: boolean;
  resolved: boolean;
  payment_method: string;
  cart: {
    items: {
      id: string;
      name: string;
      photo: string;
      price: number;
      quantity: number;
      total_price: number;
    }[];
  };
  total_price: number;
  date_added: string;
}

/**
 * [GET] /order
 * Lấy danh sách tất cả đơn hàng
 */
export const getAllOrders = async (): Promise<APIOrder[]> => {
  const response = await axiosInstance.get<APIOrderResponse>('/order');
  return response.data.order;
};
