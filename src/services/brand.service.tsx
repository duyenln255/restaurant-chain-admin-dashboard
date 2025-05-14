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

export interface BrandInput {
  name: string;
  description: string;
  opening_hours: string;
  closed_hours: string;
  logo_url: string;
  website_url: string;
  status: string;
}
export const getFilteredBrands = async (params: {
  brandId?: string;
  status?: string;
  dateAdded?: string;
}): Promise<Brand[]> => {
  const query = new URLSearchParams();
  if (params.brandId) query.append("brandId", params.brandId);
  if (params.status && params.status !== "all") query.append("status", params.status);
  if (params.dateAdded) query.append("date_added", params.dateAdded);

  const response = await axiosInstance.get<{ brand: Brand[] }>(
    `/brand?${query.toString()}`
  );
  return Array.isArray(response.data.brand)
    ? response.data.brand
    : [response.data.brand];
};

export const getAllBrands = async (): Promise<Brand[]> => {
  const response = await axiosInstance.get<{ brand: Brand[] }>("/brand");
  return Array.isArray(response.data.brand) ? response.data.brand : [response.data.brand];
};

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axiosInstance.get<{ brand: Brand }>(`/brand/${id}`);
  return response.data.brand;
};

export const createBrand = async (brand: BrandInput): Promise<Brand> => {
  const response = await axiosInstance.post<{ brand: Brand }>("/brand", brand);
  return response.data.brand;
};

export const updateBrand = async (id: string, brand: BrandInput): Promise<Brand> => {
  const response = await axiosInstance.put<{ brand: Brand }>(`/brand/${id}`, {
    ...brand,
    id,
  });
  return response.data.brand;
};


export const deleteBrand = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/brand/${id}`);
};
