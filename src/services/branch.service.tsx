import axiosInstance from "../lib/axiosInstance";

export interface Branch {
  id: string;
  display_id: string;
  brand_id: string;
  brand_name: string;
  address: string;
  phone: string;
  status: string;
  date_added: string;
  total_staffs: string;
  total_employees: string;
  total_managers: string;
}


export const getAllBranches = async (): Promise<Branch[]> => {
  const response = await axiosInstance.get<{ branch: Branch[] }>("/branch");
  return response.data.branch;
};
export interface BrandInfo {
  brand_id: string;
  brand_name: string;
  total_branches: number;
}

export const getBrandById = async (brandId: string): Promise<BrandInfo | null> => {
  const branches = await getAllBranches();

  const brandBranches = branches.filter(b => b.brand_id === brandId);

  if (brandBranches.length === 0) return null;

  const { brand_name } = brandBranches[0];

  return {
    brand_id: brandId,
    brand_name,
    total_branches: brandBranches.length,
  };
};