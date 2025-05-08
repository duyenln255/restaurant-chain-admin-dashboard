import React from 'react';
import type { BrandItem } from '../../types/BrandItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFileAlt } from "@fortawesome/free-solid-svg-icons";  // Regular icon

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

  const columns: { key: keyof BrandItem | 'action'; label: string; width?: string; render?: (item: BrandItem) => React.ReactNode }[] = [
    { key: "logo", label: "Logo", width: "80px" },
    { key: "name", label: "Brand Name", width: "180px" },
    { key: "link", label: "Link", width: "200px" },
    { key: "description", label: "Description", width: "350px" },
    { key: "status", label: "Status", width: "120px" },
    { 
      key: 'action', 
      label: 'Action', 
      width: '150px', 
      render: (item: BrandItem) => (
        <div className="flex justify-center space-x-4">
        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
          <FontAwesomeIcon icon={faPen} size="lg" />
        </button>
        <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
        <button
            onClick={() => handleCreateBlog(item)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faFileAlt} size="lg" />
        </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <GenericTable<BrandItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default BrandTable;
