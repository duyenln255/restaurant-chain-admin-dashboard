import axiosInstance from "../lib/axiosInstance";

export interface Customer {
  id: string;
  full_name: string;
  username: string;
  password: string;
  role: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  date_added: string;
  member_information_id: string;
  brand_id: string;
  status: string;
  cart: {
    items: any[];
    total_price: number;
  };
}

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await axiosInstance.get<{ customer: Customer[] }>("/customer");
  return response.data.customer;
};
