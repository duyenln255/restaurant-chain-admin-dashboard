import axiosInstance from "../lib/axiosInstance";

export interface Brand {
  id: string;
  rcms_id: string;
  name: string;
  description: string;
  opening_hours: string;
  closed_hours: string;
  logo_url: string;
  website_url: string;
  status: string;
  date_added: string;
}

export const getAllBrands = async (): Promise<Brand[]> => {
  const response = await axiosInstance.get<{ brand: Brand[] }>("/brand");
  const data = response.data.brand;

  return Array.isArray(data) ? data : [data];  
};
