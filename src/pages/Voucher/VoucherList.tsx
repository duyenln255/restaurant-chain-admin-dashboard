import React, { useState } from 'react';
import FilterBar from './FilterBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import VoucherTable from './VoucherTable';
import type { VoucherItem } from '../../types/VoucherItem';

const vouchers: VoucherItem[] = [
  {
    id: 1,
    type: "PROMOTION",
    title: "Lorem Ipsum",
    useLimit: 1,
    brand: "Phuc Long Company",
    description: "Lorem Ipsum is simply dummy text of the printing.",
    discountType: "Percentage",
    discountValue: "5%",
    startDate: "10/12/2024",
    endDate: "21/12/2024",
    status: "Expired",
  },
  {
    id: 2,
    type: "COUPON",
    title: "Lorem Ipsum",
    useLimit: 1,
    code: "ABCDXYZ0001",
    brand: "Star Buck Company",
    description: "Lorem Ipsum is simply dummy text of the printing.",
    discountType: "Free Shipping",
    discountValue: "100%",
    startDate: "10/12/2024",
    endDate: "20/12/2024",
    status: "Active",
  },
  {
    id: 3,
    type: "PROMOTION",
    title: "Lorem Ipsum",
    useLimit: 1,
    brand: "Highland Company",
    description: "Lorem Ipsum is simply dummy text of the printing.",
    discountType: "Fixed Amount",
    discountValue: "5%",
    startDate: "10/12/2024",
    endDate: "11/12/2024",
    status: "Inactive",
  },
];

const VoucherList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            {/* Header + Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Voucher Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Voucher
              </button>
            </div>

            {/* Filter */}
            <FilterBar />

            {/* Table */}
            <VoucherTable items={vouchers as VoucherItem[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
