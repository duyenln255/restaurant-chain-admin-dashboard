import axiosInstance from "../lib/axiosInstance";

export interface Customer {
  id: string;
  display_id: string;
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
  brand_name: string;
  status: string;
  cart: {
    items: any[];
    total_price: number;
  };
  reset_token: string;
  reset_token_expires: string;
  reset_code: string;
  reset_code_expires: string;
  avatar: string;
}

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await axiosInstance.get<{ customer: Customer[] }>("/customer");
  return response.data.customer;
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const response = await axiosInstance.get<{ customer: Customer }>(`/customer/${id}`);
  return response.data.customer;
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await axiosInstance.post<{ customer: Customer }>("/customer", customer);
  return response.data.customer;
};

export const updateCustomer = async (id: string, customer: Customer): Promise<Customer> => {
  const response = await axiosInstance.put<{ customer: Customer }>(`/customer/${id}`, customer);
  return response.data.customer;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/customer/${id}`);
};
