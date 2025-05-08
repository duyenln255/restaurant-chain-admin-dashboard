import axiosInstance from "../lib/axiosInstance";

export interface APIOrderResponse {
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
    total_price: number;
  };
  date_added: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export const fetchAllOrdersApi = async (): Promise<APIOrderResponse[]> => {
  const response = await axiosInstance.get("/order");
  return response.data.order;
};
