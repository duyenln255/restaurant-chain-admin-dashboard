import React from 'react'
import type { FeedbackItem } from '../../types/FeedbackItem'
import GenericTable from '../../components/Table/GenericTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../components/ui/tooltip'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
      align: 'left',
      render: (item) => (
        <span className="text-gray-600 text-xs sm:text-sm">
          {items.findIndex((i) => i.id === item.id) + 1}
        </span>
      )
    },
    {
      key: 'displayId',
      label: 'Display ID',
      render: (item) => (
        <div className="truncate text-xs sm:text-sm font-mono sm:w-auto" title={item.displayId}>
          {item.displayId}
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      align: 'center',
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
      label: 'Customer',
      align: 'center',
      render: (item) => (
        <div className="truncate text-xs sm:text-sm" title={item.fullName}>
          {item.fullName}
        </div>
      )
    },
    {
      key: 'phoneNumber',
      label: 'Phone',
      render: (item) => (
        <div className="truncate text-xs sm:text-sm" title={item.phoneNumber}>
          {item.phoneNumber}
        </div>
      )
    },
    {
      key: 'responsible',
      label: 'Responsible',
      render: (item) => (
        <div className="text-xs sm:text-sm leading-snug space-y-1">
          {item.brandName && (
            <div>
              <span className="font-semibold text-blue-600">Brand:</span>{' '}
              {item.brandName}
            </div>
          )}
          {item.branchAddress && (
            <div>
              <span className="font-semibold text-gray-600 max-w-20"></span>
              {item.branchAddress}
            </div>
          )}
          {item.staffName && (
            <div>
              <span className="font-semibold text-orange-500">Staff:</span>{' '}
              {item.staffName}
            </div>
          )}
        </div>
      )
    },
    // {
    //   key: 'feedback',
    //   label: 'Feedback',
    //   align: 'center',
    //   render: (item) => (
    //     <div className="break-words text-xs sm:text-sm min-w-60 text-wrap" title={item.feedback}>
    //       {item.feedback}
    //     </div>
    //   )
    // },
    {
      key: 'feedback',
      label: 'Feedback',
      render: (item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer text-gray-500 hover:text-gray-700 flex justify-center">
                <FontAwesomeIcon icon={faInfoCircle} size="sm" />
              </div>
            </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="max-w-50 p-2 bg-white text-black border-1 border-gray-300 rounded text-sm text-center space-y-1">
              {item.feedback}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },    
    {
      key: 'createAt',
      label: 'Created At',
      render: (item) => {
        const [date, time] = item.createAt.split(', ')
        return (
          <div className="text-center leading-snug text-xs sm:text-sm">
            <div>{date}</div>
            <div className="text-gray-500">{time}</div>
          </div>
        )
      }
    },
    {
      key: 'updateAt',
      label: 'Updated At',
      render: (item) => {
        if (!item.updateAt) return <div className="text-center text-xs text-gray-400">-</div>
        const [date, time] = item.updateAt.split(', ')
        return (
          <div className="text-center leading-snug text-xs sm:text-sm">
            <div>{date}</div>
            <div className="text-gray-500">{time}</div>
          </div>
        )
      }
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
