export interface OrderItem {
  id: string;
  name: string;
  address: string;
  date: string;
  orderType: 'AT STORE' | 'ONLINE';
  status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';

  // Thêm cart
  cart?: {
    items: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
}