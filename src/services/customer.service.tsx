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

/**
 * [GET] /customer
 * Get all customers
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await axiosInstance.get<{ customer: Customer[] }>(
    "/customer"
  );
  return response.data.customer;
};

/**
 * [GET] /customer/:id
 * Get customer by ID
 */
export const getCustomerById = async (id: string): Promise<Customer> => {
  const response = await axiosInstance.get<{ customer: Customer }>(
    `/customer/${id}`
  );
  return response.data.customer;
};

/**
 * [POST] /customer
 * Create new customer
 */
export const createCustomer = async (
  customer: Omit<Customer, "id" | "date_added" | "cart">
): Promise<Customer> => {
  const response = await axiosInstance.post<Customer>("/customer", customer);
  return response.data;
};

/**
 * [PUT] /customer/:id
 * Update customer by ID
 */
export const updateCustomer = async (
  id: string,
  customer: Partial<Omit<Customer, "id" | "date_added" | "cart">>
): Promise<Customer> => {
  const response = await axiosInstance.put<Customer>(
    `/customer/${id}`,
    customer
  );
  return response.data;
};

/**
 * [DELETE] /customer/:id
 * Delete customer by ID
 */
export const deleteCustomerById = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/customer/${id}`);
};
