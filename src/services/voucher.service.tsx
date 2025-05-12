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
