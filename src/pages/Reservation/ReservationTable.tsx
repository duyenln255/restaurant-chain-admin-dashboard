import React from 'react';
import type { ReservationItem } from '../../types/ReservationItem';
import GenericTable from '../../components/Table/GenericTable';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const renderStatus = (status: ReservationItem['status']) => {
    const colorMap: Record<ReservationItem['status'], string> = {
      Waiting: 'bg-yellow-100 text-yellow-700',
      Confirmed: 'bg-sky-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
      Active: 'bg-sky-100 text-blue-700',
      Cancel: 'bg-gray-300 text-gray-600',
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status]} whitespace-nowrap`}>
        {status}
      </span>
    );
  };

  const columns: {
    key: keyof ReservationItem | 'action' | '_index';
    label: string;
    width?: string;
    align?: 'center' | 'left' | 'right';
    render?: (item: ReservationItem) => React.ReactNode;
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'left',
      render: (item) => <span className="text-gray-600 text-sm">{items.findIndex(i => i.id === item.id) + 1}</span>,
    },
    {
      key: "id",
      label: "ID",
      render: (item) => (
        <div className="max-w-20 font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.id}>
          {item.displayId}
        </div>
      ),
    },
    {
      key: "fullName",
      label: "Full Name",
      render: (item) => (
        <div className="max-w-28 font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.fullName}>
          {item.fullName}
        </div>
      ),
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      render: (item) => (
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={item.phoneNumber}>
          {item.phoneNumber}
        </div>
      ),
    },
    {
      key: "dateTime",
      label: "Date & Time",
      render: (item) => {
        const [date, time] = item.dateTime.split(" ");
        return (
          <div className="text-xs font-bold text-center leading-snug">
            <div>{date}</div>
            <div className="text-xs font-bold text-blue-500">{time}</div>
          </div>
        );
      },
    },
    {
      key: "branchAddress",
      label: "Location",
      render: (item) => (
        <div className="max-w-60 text-sm text-etext-left">
          <div className="text-xs font-semibold text-neutral-800">{item.brandName}</div>
          <div className="text-xs text-gray-500 text-wrap">{item.branchAddress}</div>
        </div>
      ),
    },
    
    {
      key: "number_of_customer",
      label: "People",
    },
    {
      key: "place",
      label: "In/Outdoor",
      align: "center",
      render: (item) => renderStatus(item.place),

    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (item) => renderStatus(item.status),
    },
    {
      key: "action",
      label: "Action",
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
      <GenericTable<ReservationItem> items={items} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default ReservationTable;
