import axiosInstance from "../lib/axiosInstance";

export interface Branch {
  id: string;
  brand_id: string;
  address: string;
  phone: string;
  status: string;
  date_added: string;
}

export const getAllBranches = async (): Promise<Branch[]> => {
    const response = await axiosInstance.get<{ branch: Branch | Branch[] }>("/branch");
  
    const data = response.data.branch;
  
    return Array.isArray(data) ? data : [data];
  };
  