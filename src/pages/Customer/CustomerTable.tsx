import React from 'react';
import type { CustomerItem } from '../../types/CustomerItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CustomerTableProps {
  items: CustomerItem[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ items }) => {

  const handleEdit = (item: CustomerItem) => {
      console.log('Edit:', item);
    };
  
    const handleDelete = (item: CustomerItem) => {
      console.log('Delete:', item);
    };
    
    const columns: { key: keyof CustomerItem | 'action'; label: string; width?: string; render?: (item: CustomerItem) => React.ReactNode }[] = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'totalOrder', label: 'Total Order' },
    { key: 'totalReservation', label: 'Total Reservation' },
    { key: 'status', label: 'Status' },
    { 
              key: 'action', 
              label: 'Action', 
              width: '100px', 
              render: (item: CustomerItem) => (
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
      <GenericTable<CustomerItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default CustomerTable;
