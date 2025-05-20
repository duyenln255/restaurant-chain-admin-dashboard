// services/rcms.service.ts

import axiosInstance from "../lib/axiosInstance";

// Interface theo kiểu Employee nhưng dành cho UTOPIA Staff
export interface RcmsStaff {
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
  avatar: string;
  dob: string;
  salary: number;
  position: string | null;
  branch_id: string;
  brand_id: string;
}

// [GET] /rcms/rcms_staff – Lấy toàn bộ UTOPIA Staff
export const getAllRcmsStaffs = async (): Promise<RcmsStaff[]> => {
  const response = await axiosInstance.get<{ rcms_staff: RcmsStaff[] }>("/rcms/rcms_staff");
  return response.data.rcms_staff;
};

// [GET] /rcms/rcms_staff/:id – Lấy 1 staff theo id
export const getRcmsStaffById = async (id: string): Promise<RcmsStaff> => {
  const response = await axiosInstance.get<{ rcms_staff: RcmsStaff }>(`/rcms/rcms_staff/${id}`);
  return response.data.rcms_staff;
};

// [POST] /register/staff – Tạo staff mới
export const createRcmsStaff = async (staff: Partial<RcmsStaff>): Promise<RcmsStaff> => {
  const response = await axiosInstance.post<{ staff: RcmsStaff }>(
    "/register/staff",
    staff
  );
  return response.data.staff;
};

// [PUT] /rcms/rcms_staff/:id – Cập nhật thông tin staff
export const updateRcmsStaff = async (
  id: string,
  staff: Partial<RcmsStaff>
): Promise<RcmsStaff> => {
  const response = await axiosInstance.put<{ rcms_staff: RcmsStaff }>(
    `/rcms/rcms_staff/${id}`,
    staff
  );
  return response.data.rcms_staff;
};

// [DELETE] /rcms/rcms_staff/:id – Xóa staff
export const deleteRcmsStaff = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/rcms/rcms_staff/${id}`);
};
