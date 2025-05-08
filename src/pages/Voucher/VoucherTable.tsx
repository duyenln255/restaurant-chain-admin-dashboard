import React from 'react';
import type { VoucherItem } from '../../types/VoucherItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface VoucherTableProps {
  items: VoucherItem[];
}
const VoucherTable: React.FC<VoucherTableProps> = ({ items }) => {
  const handleEdit = (item: VoucherItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: VoucherItem) => {
    console.log('Delete:', item);
  };
  
  const columns: { key: keyof VoucherItem | 'action'; label: string; width?: string; render?: (item: VoucherItem) => React.ReactNode }[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "type", label: "TYPE", width: "120px" },
    { key: "title", label: "TITLE", width: "250px" },
    { key: "code", label: "CODE (COUPON)", width: "180px", render: (item: VoucherItem) => (item.code ? item.code : <span className="text-gray-400 italic">N/A</span>), },
    { key: "brand", label: "BRAND", width: "200px" },
    { key: "description", label: "DESCRIPTION", width: "400x" },
    { key: "discountType", label: "DISCOUNT_TYPE", width: "150px", render: (item: VoucherItem) => (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-md ${
          item.discountType.toLowerCase() === "percentage"
            ? "bg-green-200 text-green-800"
            : item.discountType.toLowerCase() === "fixed amount"
            ? "bg-red-200 text-red-800"
            : "bg-blue-200 text-blue-800"
        }`}
      >
        {item.discountType}
      </span>
    ),},
    { key: "discountValue", label: "DISCOUNT_VALUE", width: "100px"},
    { key: "startDate", label: "START DATE", width: "150px" },
    { key: "endDate", label: "END DATE", width: "150px" },
    { key: 'status', label: 'Status' }, // Trạng thái đơn hàng
    { 
          key: 'action', 
          label: 'Action', 
          width: '100px', 
          render: (item: VoucherItem) => (
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
      <GenericTable<VoucherItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default VoucherTable;
