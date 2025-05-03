import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import FilterBar from './FilterBar';
import BranchTable from './BranchTable';
import '../Dashboard/Dashboard.css';
import { BranchItem } from '../../types/BranchItem';

const branchs: BranchItem[] = [
  { id: "001", name: "Chi Nhánh Sài Gòn 1", location: "Sài Gòn", address: "123 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Trần Trung Hiếu", employees: 17, brand: "Phuc Long Company", status: "Active" },
  { id: "002", name: "Chi Nhánh Sài Gòn 2", location: "Sài Gòn", address: "246 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Nguyễn Văn A", employees: 17, brand: "Star Buck Company", status: "Prepare" },
  { id: "003", name: "Chi Nhánh Sài Gòn 3", location: "Sài Gòn", address: "538 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Nguyễn Văn B", employees: 17, brand: "Highland Company", status: "Stop" },
  { id: "004", name: "Chi Nhánh Sài Gòn 4", location: "Sài Gòn", address: "29 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Nguyễn Văn C", employees: 17, brand: "Phuc Long Company", status: "Active" },
  { id: "005", name: "Chi Nhánh Sài Gòn 5", location: "Sài Gòn", address: "10 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Nguyễn Văn D", employees: 17, brand: "Phuc Long Company", status: "Prepare" },
  { id: "006", name: "Chi Nhánh Sài Gòn 6", location: "Sài Gòn", address: "21 Âu Cơ, Phú Thọ Hòa, Tân Phú", manager: "Nguyễn Văn E", employees: 17, brand: "Phuc Long Company", status: "Active" },
];

const BranchList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            
            {/* Header + Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Branch Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Branch
              </button>
            </div>

            {/* FilterBar */}
            <FilterBar />

            {/* Branch Table */}
            <BranchTable items={branchs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
