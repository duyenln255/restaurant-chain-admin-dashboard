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
  staff_id: string;
  comment: string;
  product_id: string;
  order_id: string;
}
interface FeedbackCreateInput {
  customer_id: string;
  branch_id: string;
  type: "Complaint" | "Suggestion";
  content: string;
}

interface FeedbackUpdateInput {
  staff_id: string;
}

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  const response = await axiosInstance.get<{ feedback: Feedback[] }>("/feedback");
  return response.data.feedback;
};

export const getFeedbackById = async (id: string): Promise<Feedback> => {
  const response = await axiosInstance.get<{ feedback: Feedback }>(`/feedback/${id}`);
  return response.data.feedback;
};

export const createFeedback = async (feedback: FeedbackCreateInput): Promise<Feedback> => {
  const response = await axiosInstance.post<{ feedback: Feedback }>("/feedback", feedback);
  return response.data.feedback;
};

export const updateFeedback = async (id: string, data: FeedbackUpdateInput): Promise<Feedback> => {
  const response = await axiosInstance.put<{ feedback: Feedback }>(`/feedback/${id}`, data);
  return response.data.feedback;
};

export const deleteFeedback = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/feedback/${id}`);
};