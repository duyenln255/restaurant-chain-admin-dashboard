import React from 'react';
import type { ReservationItem } from '../../types/ReservationItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReservationTableProps {
  items: ReservationItem[];
}
const ReservationTable: React.FC<ReservationTableProps> = ({ items }) => {
  const handleEdit = (item: ReservationItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: ReservationItem) => {
    console.log('Delete:', item);
  };
  
  const columns: { key: keyof ReservationItem | 'action'; label: string; width?: string; render?: (item: ReservationItem) => React.ReactNode }[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "fullName", label: "FULL NAME", width: "200px" },
    { key: "email", label: "EMAIL", width: "250px" },
    { key: "phoneNumber", label: "PHONE NUMBER", width: "180px" },
    { key: "dateTime", label: "DATETIME", width: "200px" },
    { key: "location", label: "LOCATION", width: "200px" },
    { key: "people", label: "PEOPLE", width: "100px"},
    { key: "inOutdoor", label: "IN/OUTDOOR"},
    { key: 'status', label: 'Status' }, // Trạng thái đơn hàng
    { 
          key: 'action', 
          label: 'Action', 
          width: '100px', 
          render: (item: ReservationItem) => (
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
      <GenericTable<ReservationItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default ReservationTable;
