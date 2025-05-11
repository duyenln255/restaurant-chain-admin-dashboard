import React from 'react';
import type { OrderItem } from '../../types/OrderItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../components/ui/tooltip";
import { FaInfoCircle } from "react-icons/fa";

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

  const renderOrderType = (orderType: OrderItem['orderType']) => {
    return (
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap">
        {orderType}
      </span>
    );
  };

  const renderStatus = (status: OrderItem['status']) => {
    const colorMap: Record<OrderItem['status'], string> = {
      Completed: 'bg-green-100 text-green-700',
      Processing: 'bg-yellow-100 text-yellow-700',
      Rejected: 'bg-red-100 text-red-700',
      'On Hold': 'bg-orange-100 text-orange-700',
      'In Transit': 'bg-purple-100 text-purple-700',
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status]} whitespace-nowrap`}>
        {status}
      </span>
    );
  };

  const columns: {
    key: keyof OrderItem | 'action' | '_index';
    label: string;
    width?: string;
    align?: 'center' | 'left' | 'right';
    render?: ((item: OrderItem) => React.ReactNode);
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'center',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    { 
      key: 'id', 
      label: 'ID',
      render: (item) => (
        <div className="max-w-20 font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.id}>
          {item.id}
        </div>
      ),
     },
    { 
      key: 'name', 
      label: 'Name',
      render: (item) => (
        <div className="max-w-28 font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.name}>
          {item.name}
        </div>
      ),
     },
    {
      key: 'address',
      label: 'Address',
      render: (item) => (
        <div className="truncate text-xs sm:text-sm max-w-40 sm:max-w-none" title={item.address}>
          {item.address}
        </div>
      ),
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.address}>
          {item.date}
        </div>
      ), },
    {
      key: 'cart',
      label: 'Products',
      render: (item) => {
        const cartItems = item.cart?.items;
    
        if (!cartItems || cartItems.length === 0)
          return <span className="text-gray-400 italic">No Products</span>;
    
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer text-gray-500 hover:text-gray-700 flex justify-center">
                  <FaInfoCircle size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="p-2 bg-white text-black border-1 border-gray-300 rounded text-sm space-y-1">
                {cartItems.map((p) => (
                  <div key={p.id}>{`${p.quantity} x ${p.name}`}</div>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      key: 'orderType',
      label: 'Order Type',
      render: (item) => renderOrderType(item.orderType),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => renderStatus(item.status),
    },
    {
      key: 'action',
      label: 'Action',
      align: 'center',
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
      <GenericTable<OrderItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default OrderTable;
