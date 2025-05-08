export interface VoucherItem {
    id: number;
    type: string;
    title: string;
    useLimit: number;
    code?: string; // Có thể có hoặc không
    brand: string;
    description: string;
    discountType: string;
    discountValue: string;
    startDate: string;
    endDate: string;
    status: string;
  }