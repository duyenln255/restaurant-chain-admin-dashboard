import axiosInstance from "../lib/axiosInstance";

export interface Branch {
  id: string;
  display_id: string;
  brand_id: string;
  address: string;
  phone: string;
  status: string;
  date_added: string;
  brand_name: string;
  total_staffs: string;
  total_employees: string;
  total_managers: string;
}

/**
 * [GET] /branch
 * Get all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const response = await axiosInstance.get("/branch");
    console.log("Raw API response for branches:", response);

    // Kiểm tra cấu trúc dữ liệu
    if (response.data && Array.isArray(response.data.branch)) {
      return response.data.branch;
    } else if (
      response.data &&
      response.data.branch &&
      !Array.isArray(response.data.branch)
    ) {
      return [response.data.branch];
    } else if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Unexpected API response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
};

/**
 * [GET] /branch/:id
 * Get branch by ID
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  try {
    const response = await axiosInstance.get(`/branch/${id}`);
    console.log(`API response for branch ${id}:`, response);

    // Kiểm tra cấu trúc dữ liệu
    if (response.data && response.data.branch) {
      return response.data.branch;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching branch with id ${id}:`, error);
    throw error;
  }
};

/**
 * [POST] /branch
 * Create new branch
 */
export interface BranchCreateRequest {
  brand_id: string;
  address: string;
  phone: string;
  status: string;
}

export const createBranch = async (
  branch: BranchCreateRequest
): Promise<Branch> => {
  try {
    const response = await axiosInstance.post("/branch", branch);
    console.log("Create branch response:", response);

    if (response.data && response.data.branch) {
      return response.data.branch;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
};

/**
 * [PUT] /branch/:id
 * Update branch by ID
 */
export interface BranchUpdateRequest {
  brand_id?: string;
  address?: string;
  phone?: string;
  status?: string;
}

export const updateBranch = async (
  id: string,
  branch: BranchUpdateRequest
): Promise<Branch> => {
  try {
    const response = await axiosInstance.put(`/branch/${id}`, branch);
    console.log(`Update branch response for id ${id}:`, response);

    if (response.data && response.data.branch) {
      return response.data.branch;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating branch with id ${id}:`, error);
    throw error;
  }
};

/**
 * [DELETE] /branch/:id
 * Delete branch by ID
 */
export const deleteBranchById = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/branch/${id}`);
    console.log(`Delete branch response for id ${id}:`, response);
  } catch (error) {
    console.error(`Error deleting branch with id ${id}:`, error);
    throw error;
  }
};
