import axiosInstance from "../lib/axiosInstance";

export interface Brand {
  id: string;
  display_id: string;
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

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axiosInstance.get<{ brand: Brand }>(`/brand/${id}`);
  return response.data.brand;
};

export const createBrand = async (brand: Brand): Promise<Brand> => {
  const response = await axiosInstance.post<{ brand: Brand }>("/brand", brand);
  return response.data.brand;
};

export const updateBrand = async (id: string, brand: Brand): Promise<Brand> => {
  const response = await axiosInstance.put<{ brand: Brand }>(`/brand/${id}`, brand);
  return response.data.brand;
};

export const deleteBrand = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/brand/${id}`);
};
