export interface OrderItem {
    id: string;
    name: string;
    address: string;
    date: string;
    productName: string;
    orderType: 'AT STORE' | 'ONLINE';
    status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
  }