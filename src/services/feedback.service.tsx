import axiosInstance from "../lib/axiosInstance";

export interface Feedback {
  id: string;
  display_id: string;
  customer_id: string;
  customer_name: string;
  branch_id: string;
  type: string;
  content: string;
  status: string;
  solved_by: string | null;
  updated_at: string | null;
  date_added: string;
  full_name: string;
  email: string;
  customer_phone: string;
  address: string;
  staff_name: string;
  branch_address: string;
  brand_name: string;

}

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  const response = await axiosInstance.get<{ feedback: Feedback[] }>("/feedback");
  return response.data.feedback;
};
