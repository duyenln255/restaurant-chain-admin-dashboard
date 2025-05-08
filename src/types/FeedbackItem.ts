export interface FeedbackItem {
  id: string;
  type: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  responsible?: {
    branchResponsible: string;
    employeeResponsible?: string;
  };
  feedback: string;
  createAt: string;
  updateAt?: string;
  status: string;
}