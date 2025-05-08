export interface VoucherItem {
  id: string;
  type: string;
  title: string;
  code: string;
  brand: string;
  description: string;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  status: string;
  useLimit?: string;  // ✅ Thêm dấu ? để thành optional
}
