import React from 'react';
import { DealItem } from '../../types/DealItem';

interface DealsDetailsProps {
  items: DealItem[];
}

const DealsDetails: React.FC<DealsDetailsProps> = ({ items }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Deals Details</h2>
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
          <span className="mr-2">October</span>
          <img src="/assets/icons/chevron-down.png" alt="Dropdown" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="p-4">Product Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Date Time</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 flex items-center gap-2">
                  <img src={item.productImage} alt={item.productName} className="w-8 h-8 rounded-full" />
                  {item.productName}
                </td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">{item.dateTime}</td>
                <td className="p-4 text-center">{item.quantity}</td>
                <td className="p-4 text-center">{item.amount}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.status.toLowerCase() === 'completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsDetails;
