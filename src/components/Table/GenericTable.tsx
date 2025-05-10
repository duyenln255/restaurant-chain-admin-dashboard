import React, { useState } from 'react';

interface TableProps<T extends Record<string, any>> {
  items: T[];
  columns: { 
    key: keyof T | 'action' | '_index'; 
    label: string; 
    width?: string; 
    align?: 'left' | 'center' | 'right'; 
    render?: (item: T) => React.ReactNode;
  }[];
  itemsPerPage?: number;
}

const GenericTable = <T extends Record<string, any>>({ items, columns, itemsPerPage = 10 }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden p-4 shadow-md">
      {/* ⚡️ Scroll ngang nếu cần */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className={`p-4 ${
                    ['quantity', 'amount', 'status', 'totalOrder', 'totalReservation', 'action', 'people', 'discountType', 'discountValue', 'logo'].includes(col.key as string)
                      ? 'text-center'
                      : 'text-left'
                  }`}
                  style={{ minWidth: col.width || 'auto' }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={index} className="border-t border-neutral-300">
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`p-4 ${
                      ['quantity', 'amount', 'status', 'totalOrder', 'totalReservation', 'action', 'people', 'discountType', 'discountValue'].includes(col.key as string)
                        ? 'text-center'
                        : 'text-left'
                    }`}
                  >
                    {col.render ? (
                      col.render(item)
                    ) : col.key === 'status' ? (
                      <div className="flex justify-center">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-md ${
                            ['completed', 'done', 'active'].includes((item[col.key] as string).toLowerCase())
                              ? 'bg-green-100 text-green-800'
                              : ['processing', 'verify'].includes((item[col.key] as string).toLowerCase())
                              ? 'bg-blue-100 text-blue-800'
                              : ['rejected', 'cancel', 'inactive', 'stop'].includes((item[col.key] as string).toLowerCase())
                              ? 'bg-red-100 text-red-800'
                              : ['on hold', 'pending',  'prepare', 'waiting', 'expired'].includes((item[col.key] as string).toLowerCase())
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {String(item[col.key])}
                        </span>
                      </div>
                    ) : col.key === 'orderType' ? (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-md ${
                          (item[col.key] as string).toLowerCase() === 'at store'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {String(item[col.key])}
                      </span>
                    ) : col.key === 'inOutdoor' ? (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-md ${
                          (item[col.key] as string).toLowerCase() === 'indoor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {String(item[col.key])}
                      </span>
                    ) : col.key === 'responsible' ? (
                      <div className="text-left">
                        {item[col.key]?.branchResponsible && (
                          <div className="text-red-500 font-semibold">
                            Branch responsible:
                            <span className="text-black ml-1">{item[col.key].branchResponsible}</span>
                          </div>
                        )}
                        {item[col.key]?.employeeResponsible && (
                          <div className="text-orange-600 font-semibold">
                            Employee responsible:
                            <span className="text-black ml-1">{item[col.key].employeeResponsible}</span>
                          </div>
                        )}
                      </div>
                    ) : col.key === 'updateAt' ? (
                      <div className="text-left">
                        <div>{String(item[col.key])}</div>
                        {item.updatedBy ? (
                          <div className="text-blue-600 font-semibold text-xs">
                            Updated by: <span className="text-black">{item.updatedBy}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No updates</span>
                        )}
                      </div>
                    ) : (
                      String(item[col.key])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length > itemsPerPage && (
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <span>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, items.length)} -{' '}
            {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}
          </span>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 border border-neutral-300 rounded-md ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-300'
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              ◀
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border border-neutral-300 rounded-md ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-300'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border border-neutral-300 rounded-md ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-300'
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTable;
