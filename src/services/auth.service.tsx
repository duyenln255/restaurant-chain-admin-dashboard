import axiosInstance from "../lib/axiosInstance";

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    full_name: string;
    role: string;
    brand_id: string | null;
    rcms_id: string;
  };
}

// API: Login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/login", {
    username,
    password,
  });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Lưu thêm user nếu cần
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};