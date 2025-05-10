import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Header from '../../components/Header/Header';
import VoucherTable from './VoucherTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchVouchers } from '../../redux/slices/voucherSlice';
import type { RootState } from '../../redux/store';

const VoucherList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawVouchers, loading, error } = useAppSelector((state: RootState) => state.vouchers);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const vouchers = useMemo(() => rawVouchers.map((v) => ({
    id: v.id,
    type: v.type,
    title: v.title,
    code: v.code,
    brand: v.brand_id,  // nếu muốn đẹp có thể fetch brand name
    description: v.description,
    discountType: v.discount_type,
    discountValue: `${v.discount_percent}%`,
    startDate: new Date(v.start_date).toLocaleDateString(),
    endDate: new Date(v.end_date).toLocaleDateString(),
    status: v.status,
  })), [rawVouchers]);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      {/* <div className={`transition-all duration-300 ${sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div> */}

      <div className="flex-1">
        {/* <Header toggleSidebar={toggleSidebar} /> */}
        <div className="dashboard-body p-6">
          <div className=" mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Voucher Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Voucher
              </button>
            </div>

            <FilterBar />

            {loading && <p>Loading vouchers...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && vouchers.length === 0 && <p>No vouchers found.</p>}

            <VoucherTable items={vouchers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
