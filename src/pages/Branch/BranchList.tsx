import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import FilterBar from './FilterBar';
import BranchTable from './BranchTable';
import '../Dashboard/Dashboard.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBranches } from '../../redux/slices/branchSlice';
import type { RootState } from '../../redux/store';
import type { BranchItem } from '../../types/BranchItem';

const BranchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawBranches, loading, error } = useAppSelector((state: RootState) => state.branches);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const branches = useMemo<BranchItem[]>(() => {
    const data = Array.isArray(rawBranches) ? rawBranches : [rawBranches];
  
    return data.map((b) => ({
      id: b.id,
      name: "-",
      location: b.address, // ✅ => có location
      address: b.address,
      phone: b.phone,
      brandId: b.brand_id,
      brand: "-", // ✅ Tạm thời chưa có API brand name thì để "-"
      employees: 0, // ✅ Tạm thời chưa có API -> mặc định 0
      manager: "-", // ✅ Tạm thời chưa có API -> mặc định "-"
      status: b.status,
      date_added: b.date_added,
    }));
  }, [rawBranches]);
  

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Branch Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">Add New Branch</button>
            </div>

            <FilterBar />

            {loading && <p>Loading branches...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && branches.length === 0 && <p>No branches found.</p>}

            <BranchTable items={branches} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
