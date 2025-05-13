import React from 'react';
import type { VoucherItem } from '../../types/VoucherItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../../components/ui/tooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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

  const renderStatus = (status: VoucherItem['status']) => {
    const colorMap: Record<string, string> = {
      Active: 'bg-green-100 text-green-700',
      Expired: 'bg-gray-200 text-gray-600',
      Inactive: 'bg-yellow-100 text-yellow-700',
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status] || 'bg-gray-100 text-gray-500'} whitespace-nowrap`}>
        {status}
      </span>
    );
  };

  const columns: {
    key: keyof VoucherItem | 'action' | '_index';
    label: string;
    align?: 'center' | 'left' | 'right';
    render?: (item: VoucherItem) => React.ReactNode;
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'left',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    // {
    //   key: "id",
    //   label: "ID",
    //   render: (item) => (
    //     <div className="max-w-20 font-medium text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.id}>
    //       {item.displayId}
    //     </div>
    //   ),
    // },
    {
      key: "type",
      label: "Type",
      align: 'center',
      render: (item) => (
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-blue-100 text-blue-700 whitespace-nowrap">
          {item.type}
        </span>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.title}>
          {item.title}
        </div>
      ),
    },
    {
      key: "code",
      label: "Code (Coupon)",
      render: (item) => (
        <span className="text-sm">{item.code ? item.code : <span className="text-gray-400 italic">N/A</span>}</span>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      render: (item) => (
        <div className="max-w-40 text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.brand}>
          {item.brand}
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer text-gray-500 hover:text-gray-700 flex justify-center">
                <FontAwesomeIcon icon={faInfoCircle} size="sm" />
              </div>
            </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="p-2 bg-white text-black border-1 border-gray-300 rounded text-sm space-y-1">
              {item.description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },    
    {
      key: "discountType",
      label: "Discount Type",
      render: (item) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${
            item.discountType.toLowerCase() === "drink"
              ? "bg-green-100 text-green-700"
              : item.discountType.toLowerCase() === "food"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.discountType}
        </span>
      ),
    },
    {
      key: "discountValue",
      label: "Discount",
      render: (item) => (
        <span className="text-sm font-semibold">{item.discountValue}</span>
      ),
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (item) => (
        <span className="text-sm text-blue-500">{item.startDate}</span>
      ),
    },
    {
      key: "endDate",
      label: "End Date",
      render: (item) => (
        <span className="text-sm text-red-500">{item.endDate}</span>
      ),
    },
    {
      key: "dateAdded",
      label: "Date Added",
      render: (item) => (
        <span className="text-sm text-gray-500">{item.dateAdded}</span>
      ),
    },    
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (item) => renderStatus(item.status),
    },
    {
      key: 'action',
      label: 'Action',
      align: "center",
      render: (item) => (
        <div className="flex justify-center space-x-4">
          <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={faPen} size="sm" />
          </button>
          <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700">
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <GenericTable<VoucherItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default VoucherTable;
