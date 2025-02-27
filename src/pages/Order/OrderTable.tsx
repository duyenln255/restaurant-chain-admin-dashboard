import React from 'react';
import { OrderItem } from '../../types/OrderItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OrderTableProps {
  items: OrderItem[];
}
const OrderTable: React.FC<OrderTableProps> = ({ items }) => {
  const handleEdit = (item: OrderItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: OrderItem) => {
    console.log('Delete:', item);
  };
  
  const columns: { key: keyof OrderItem | 'action'; label: string; width?: string; render?: (item: OrderItem) => React.ReactNode }[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'date', label: 'Date' },
    { key: 'productName', label: 'Product Name' },
    { key: 'orderType', label: 'Order Type' }, // Thêm Order Type
    { key: 'status', label: 'Status' }, // Trạng thái đơn hàng
    { 
          key: 'action', 
          label: 'Action', 
          width: '100px', 
          render: (item: OrderItem) => (
            <div className="flex justify-center space-x-4">
              <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
              <FontAwesomeIcon icon={faPen} size="lg" />
            </button>
            <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
    
            </div>
          )
        }
  ];

  return (
    <div className="space-y-4">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Customer List</h2>
      </div> */}
      <GenericTable<OrderItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default OrderTable;
