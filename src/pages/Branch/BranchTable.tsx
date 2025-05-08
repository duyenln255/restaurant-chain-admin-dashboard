import React from 'react';
import type { BranchItem } from '../../types/BranchItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BranchTableProps {
  items: BranchItem[];
}

const CustomerTable: React.FC<BranchTableProps> = ({ items }) => {

  const handleEdit = (item: BranchItem) => {
      console.log('Edit:', item);
    };
  
    const handleDelete = (item: BranchItem) => {
      console.log('Delete:', item);
    };
    
    const columns: { key: keyof BranchItem | 'action'; label: string; width?: string; render?: (item: BranchItem) => React.ReactNode }[] = [
      { key: "name", label: "NAME", width: "200px" },
      { key: "location", label: "LOCATION", width: "150px" },
      { key: "address", label: "ADDRESS", width: "300px" },
      { key: "manager", label: "MANAGER", width: "200px" },
      { key: "employees", label: "EMPLOYEES", width: "100px"},
      { key: "brand", label: "BRAND", width: "200px" },
      { key: 'status', label: 'Status' },
      { 
              key: 'action', 
              label: 'Action', 
              width: '100px', 
              render: (item: BranchItem) => (
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
      <GenericTable<BranchItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default CustomerTable;
