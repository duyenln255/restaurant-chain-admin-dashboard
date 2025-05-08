import React from 'react';
import type { BrandItem } from '../../types/BrandItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFileAlt, faLink } from "@fortawesome/free-solid-svg-icons";

interface BrandTableProps {
  items: BrandItem[];
}

const BrandTable: React.FC<BrandTableProps> = ({ items }) => {
  const handleEdit = (item: BrandItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: BrandItem) => {
    console.log('Delete:', item);
  };

  const handleCreateBlog = (item: BrandItem) => {
    console.log("Create Blog for:", item);
  };

  const renderStatus = (status: BrandItem['status']) => {
    const colorMap: Record<string, string> = {
      Active: 'bg-green-100 text-green-700',
      Inactive: 'bg-gray-200 text-gray-600',
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status] || 'bg-gray-200 text-gray-600'} whitespace-nowrap`}>
        {status}
      </span>
    );
  };

  const renderHour = (hour: string, type: "open" | "close") => {
    const color = type === "open" ? "text-green-600" : "text-red-600";
    return <span className={`font-medium ${color}`}>{hour}</span>;
  };

  const columns: {
    key: keyof BrandItem | 'action' | '_index';
    label: string;
    align?: 'center' | 'left' | 'right';
    render?: (item: BrandItem) => React.ReactNode;
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'center',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    {
      key: "logo",
      label: "Logo",
      align: 'center',
      render: (item) => (
        <div className="flex justify-center text-center">
          <img src={item.logo} alt="Brand Logo" className="w-12 h-12 object-contain rounded-md" />
        </div>
      ),
    },
    {
      key: "name",
      label: "Brand Name",
      render: (item) => (
        <div className="text-sm font-semibold">{item.name}</div>
      ),
    },
    {
      key: "link",
      label: "Link",
      render: (item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faLink} size="sm" />
        </a>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (item) => (
        <div className="text-sm">{item.description}</div>
      ),
    },
    {
      key: "opening_hours",
      label: "Opening",
      render: (item) => renderHour(item.opening_hours, "open"),
    },
    {
      key: "closed_hours",
      label: "Closed",
      render: (item) => renderHour(item.closed_hours, "close"),
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
          <button onClick={() => handleCreateBlog(item)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faFileAlt} size="sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <GenericTable<BrandItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default BrandTable;
