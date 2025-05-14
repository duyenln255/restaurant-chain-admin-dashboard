import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import type { BrandItem } from '../../types/BrandItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFileAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import BlogListModal from "./Blog/BlogListModal";  
import { deleteBrand } from "../../services/brand.service";
import { useAppDispatch } from "../../redux/hooks";         
import { fetchBrands } from "../../redux/slices/brandSlice";
import { LuImageUp } from "react-icons/lu";
import { Share2 } from "lucide-react"; // 
import { toast } from "react-toastify";

interface BrandTableProps {
  items: BrandItem[];
}

const BrandTable: React.FC<BrandTableProps> = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showBlogModal, setShowBlogModal] = useState(false);

  const handleEdit = (item: BrandItem) => {
    navigate(`/brand/edit/${item.id}`);
  };

  const handleDelete = async (item: BrandItem) => {
    const confirmed = window.confirm(`Do you really want to delete brand "${item.name}"?`);
    if (!confirmed) return;

    try {
      await deleteBrand(item.id);
      toast.success(`Deleted brand "${item.name}" successfully!`);
      dispatch(fetchBrands());
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete brand.");
    }
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
      align: 'left',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    {
      key: "displayId",
      label: "ID",
      align: "center",
      render: (item) => (
        <span className="text-gray-700 text-sm font-mono">{item.displayId}</span>
      ),
    },
    {
      key: "logo",
      label: "Logo",
      align: 'center',
      render: (item) => (
        <div className="flex justify-center w-12 h-12">
          {item.logo ? (
            <img
              src={item.logo}
              alt="Brand Logo"
              className="object-contain rounded-md"
            />
          ) : (
            <LuImageUp className="text-gray-400 w-6 h-6" />
          )}
        </div>
      )
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
      render: (item) => (
        <span className="font-medium text-green-600">{item.opening_hours}</span>
      ),
    },
    {
      key: "closed_hours",
      label: "Closed",
      render: (item) => (
        <span className="font-medium text-red-600">{item.closed_hours}</span>
      ),
    },
    {
      key: "date_added",
      label: "Created Date",
      align: "center",
      render: (item) => (
        <span className="text-sm text-gray-700">
          {new Date(item.date_added).toLocaleDateString()}
        </span>
      ),
    },    
    {
      key: "status",
      label: "Status",
      render: (item) => {
        const colorMap: Record<string, string> = {
          Active: 'bg-green-100 text-green-700',
          Inactive: 'bg-gray-200 text-gray-600',
        };
        return (
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[item.status] || 'bg-gray-200 text-gray-600'} whitespace-nowrap`}>
            {item.status}
          </span>
        );
      },
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
    
          <button onClick={() => setShowBlogModal(true)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faFileAlt} size="sm" />
          </button>
    
          <button
            onClick={() => navigate(`/branch?brandId=${item.id}`)}
            className="text-green-600 hover:text-green-800"
            title="Go to Branch"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }
    
  ];

  return (
    <div className="space-y-4">
      <GenericTable<BrandItem> items={items} columns={columns} itemsPerPage={10} />
      <BlogListModal open={showBlogModal} onClose={() => setShowBlogModal(false)} />
    </div>
  );
};

export default BrandTable;
