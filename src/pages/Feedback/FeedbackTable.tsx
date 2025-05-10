import React from 'react'
import type { FeedbackItem } from '../../types/FeedbackItem'
import GenericTable from '../../components/Table/GenericTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

interface FeedbackTableProps {
  items: FeedbackItem[]
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ items }) => {
  const handleEdit = (item: FeedbackItem) => {
    console.log('Edit:', item)
  }

  const handleDelete = (item: FeedbackItem) => {
    console.log('Delete:', item)
  }

  const renderStatus = (status: FeedbackItem['status']) => {
    const colorMap: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Done: 'bg-green-100 text-green-700',
      Resolved: 'bg-green-100 text-green-700'
    }

    return (
      <span
        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${colorMap[status] || 'bg-gray-200 text-gray-600'}`}
      >
        {status}
      </span>
    )
  }

  const columns: {
    key: keyof FeedbackItem | 'action' | '_index'
    label: string
    align?: 'center' | 'left' | 'right'
    render?: (item: FeedbackItem) => React.ReactNode
  }[] = [
    {
      key: '_index',
      label: 'No.',
      align: 'center',
      render: (item) => (
        <span className="text-gray-600 text-xs sm:text-sm">
          {items.findIndex((i) => i.id === item.id) + 1}
        </span>
      )
    },
    {
      key: 'id',
      label: 'ID',
      render: (item) => (
        <div
          className="truncate text-xs sm:text-sm font-medium w-[100px] sm:w-auto"
          title={item.id}
        >
          {item.id}
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (item) => {
        const typeColorMap: Record<string, string> = {
          Complaint: 'bg-red-100 text-red-700',
          Suggestion: 'bg-blue-100 text-blue-700'
        }

        return (
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
              typeColorMap[item.type] || 'bg-gray-200 text-gray-600'
            }`}
          >
            {item.type}
          </span>
        )
      }
    },
    {
      key: 'fullName',
      label: 'Full Name',
      render: (item) => (
        <div
          className="truncate text-xs sm:text-sm max-w-[150px] sm:max-w-none"
          title={item.fullName}
        >
          {item.fullName}
        </div>
      )
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      render: (item) => (
        <div
          className="truncate text-xs sm:text-sm"
          title={item.phoneNumber}
        >
          {item.phoneNumber}
        </div>
      )
    },
    {
      key: 'responsible',
      label: 'Responsible',
      render: (item) => (
        <div className="text-xs sm:text-sm leading-snug space-y-1">
          {item.responsible?.branchResponsible && (
            <div>
              <span className="font-semibold text-red-500">Branch:</span>{' '}
              {item.responsible.branchResponsible}
            </div>
          )}
          {item.responsible?.employeeResponsible && (
            <div>
              <span className="font-semibold text-orange-500">Staff:</span>{' '}
              {item.responsible.employeeResponsible}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'feedback',
      label: 'Feedback',
      render: (item) => (
        <div
          className="break-words text-xs sm:text-sm max-w-[300px] sm:max-w-none"
          title={item.feedback}
        >
          {item.feedback}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => renderStatus(item.status)
    },
    {
      key: 'createAt',
      label: 'Created At',
      render: (item) => (
        <div className="text-xs sm:text-sm">{item.createAt}</div>
      )
    },
    {
      key: 'updateAt',
      label: 'Updated At',
      render: (item) => (
        <div className="text-xs sm:text-sm">{item.updateAt || '-'}</div>
      )
    },
    {
      key: 'action',
      label: 'Action',
      align: 'center',

      render: (item) => (
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => handleEdit(item)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faPen} size="sm" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <GenericTable<FeedbackItem>
        items={items}
        columns={columns}
        itemsPerPage={5}
      />
    </div>
  )
}

export default FeedbackTable
