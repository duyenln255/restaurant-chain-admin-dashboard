import axiosInstance from "../lib/axiosInstance";

export interface Feedback {
  id: string;
  customer_id: string;
  branch_id: string;
  type: string;
  content: string;
  status: string;
  solved_by: string | null;
  updated_at: string | null;
  date_added: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  const response = await axiosInstance.get<{ feedback: Feedback[] }>("/feedback");
  return response.data.feedback;
};
