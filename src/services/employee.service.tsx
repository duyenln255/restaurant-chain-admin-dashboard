import axiosInstance from "../lib/axiosInstance";

export interface Employee {
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
  branch_id: string;
  position: string | null;
  salary: number;
}

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axiosInstance.get<{ staff: Employee[] }>("/staff");
  return response.data.staff;
};
