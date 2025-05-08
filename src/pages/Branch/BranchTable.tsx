import React from 'react';
import type { BranchItem } from '../../types/BranchItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface BranchTableProps {
  items: BranchItem[];
}

const BranchTable: React.FC<BranchTableProps> = ({ items }) => {

  const handleEdit = (item: BranchItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: BranchItem) => {
    console.log('Delete:', item);
  };

  const renderStatus = (status: BranchItem['status']) => {
    const colorMap: Record<string, string> = {
      Active: 'bg-green-100 text-green-700',
      Inactive: 'bg-gray-200 text-gray-600',
      Stop: 'bg-red-100 text-red-700',
      Prepare: 'bg-yellow-100 text-yellow-700',
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status] || 'bg-gray-200 text-gray-600'} whitespace-nowrap`}>
        {status}
      </span>
    );
  };

  const columns: {
    key: keyof BranchItem | 'action' | '_index';
    label: string;
    align?: 'center' | 'left' | 'right';
    render?: (item: BranchItem) => React.ReactNode;
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'center',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    {
      key: "location",
      label: "Location",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis " title={item.location}>
          {item.location}
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis " title={item.address}>
          {item.address}
        </div>
      ),
    },
    {
      key: "manager",
      label: "Manager",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.manager}>
          {item.manager}
        </div>
      ),
    },
    {
      key: "employees",
      label: "Employees",
      render: (item) => (
        <div className="text-sm">{item.employees}</div>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.brand}>
          {item.brand}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
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
      <GenericTable<BranchItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default BranchTable;
