import axiosInstance from "../lib/axiosInstance";

export interface Blog {
  id: string;
  staff_id: string;
  title: string;
  content: string;
  photo: string;
  date_added: string;
  status: string;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await axiosInstance.get<{ blog: Blog[] }>("/blog");
  return response.data.blog;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await axiosInstance.get<{ blog: Blog }>(`/blog/${id}`);
  return response.data.blog;
};