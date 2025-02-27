import React from 'react';
import { FeedbackItem } from '../../types/FeedbackItem';
import GenericTable from '../../components/Table/GenericTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";  // Regular icon

interface FeedbackTableProps {
  items: FeedbackItem[];
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ items }) => {
  const handleEdit = (item: FeedbackItem) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: FeedbackItem) => {
    console.log('Delete:', item);
  };

  const columns: { key: keyof FeedbackItem | 'action'; label: string; width?: string; render?: (item: FeedbackItem) => React.ReactNode }[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'type', label: 'Type', width: '120px' },
    { key: 'fullName', label: 'Full Name', width: '150px' },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'phoneNumber', label: 'Phone Number', width: '150px' },
    { key: 'responsible', label: 'Responsible', width: '400px' },
    { key: 'feedback', label: 'Feedback', width: '500px' },
    { key: 'createAt', label: 'Create At', width: '250px' },
    { key: 'updateAt', label: 'Update At', width: '250px' },
    { key: 'status', label: 'Status', width: '120px' },
    { 
      key: 'action', 
      label: 'Action', 
      width: '100px', 
      render: (item: FeedbackItem) => (
        <div className="flex justify-center space-x-4">
          <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
          <FontAwesomeIcon icon={faPen} size="lg" />
        </button>

        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <GenericTable<FeedbackItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default FeedbackTable;
