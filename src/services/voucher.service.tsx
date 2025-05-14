import axiosInstance from "../lib/axiosInstance";

export interface Voucher {
  id: string;
  display_id: string;
  title: string;
  discount_percent: number;
  name: string;
  code: string;
  status: string;
  start_date: string;
  end_date: string;
  type: string;
  discount_type: string;
  description: string;
  brand_id: string;
  date_added: string;
}

export const getAllVouchers = async (): Promise<Voucher[]> => {
  const response = await axiosInstance.get<{ voucher: Voucher[] }>("/voucher");
  return response.data.voucher;
};

export const getVoucherById = async (id: string): Promise<Voucher> => {
  const response = await axiosInstance.get<{ voucher: Voucher }>(`/voucher/${id}`);
  return response.data.voucher;
};

export const updateVoucher = async (id: string, voucher: Voucher): Promise<Voucher> => {
  const response = await axiosInstance.put<{ voucher: Voucher }>(`/voucher/${id}`, voucher);
  return response.data.voucher;
};

export const deleteVoucher = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/voucher/${id}`);
};

export const createVoucher = async (voucher: Voucher): Promise<Voucher> => {
  const response = await axiosInstance.post<{ voucher: Voucher }>("/voucher", voucher);
  return response.data.voucher;
};