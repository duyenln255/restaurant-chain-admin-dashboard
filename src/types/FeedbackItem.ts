export interface FeedbackItem {
  id: string;
  type: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  responsible: {
    branchResponsible?: string;
    employeeResponsible?: string;
  };
  feedback: string;
  createAt: string;
  updateAt: string;
  updatedBy?: string; // Thêm trường này để lưu thông tin người cập nhật
  status: string;
}
