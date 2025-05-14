import axiosInstance from "../lib/axiosInstance";

export interface Order {
  id: string;
  display_id: string;
  branch_name: string;
  brand_address: string;
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
    total_price: number;
  };
  date_added: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export const fetchAllOrdersApi = async (): Promise<Order[]> => {
  const response = await axiosInstance.get("/order");
  return response.data.order;
};
export const fetchOrderByIdApi = async (id: string): Promise<Order> => {
  const response = await axiosInstance.get(`/order/${id}`);
  return response.data.order;
};

export const createOrderApi = async (order: Order): Promise<Order> => {
  const response = await axiosInstance.post("/order", order);
  return response.data.order;
};

export const updateOrderApi = async (id: string, order: Order): Promise<Order> => {
  const response = await axiosInstance.put(`/order/${id}`, order);
  return response.data.order;
};

export const deleteOrderApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/order/${id}`);
};
