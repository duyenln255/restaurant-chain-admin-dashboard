import axiosInstance from "../lib/axiosInstance";

// API: Login
export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });

  // Lưu token vào localStorage (hoặc sessionStorage tùy nhu cầu)
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// API: Logout
export const logout = () => {
  // Xóa token khỏi localStorage
  localStorage.removeItem("token");

  // Optional: Redirect về trang login sau logout
  window.location.href = "/login";
};

// API: Get Profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile"); // hoặc "/user/profile" tùy backend

  return response.data;
};
