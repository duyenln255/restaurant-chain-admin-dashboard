import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar'; 
import VoucherTable from './VoucherTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchVouchers } from '../../redux/slices/voucherSlice';
import type { RootState } from '../../redux/store';

const VoucherList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawVouchers, loading, error } = useAppSelector((state: RootState) => state.vouchers);

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
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Voucher Lists</h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition">
              Add New Voucher
            </button>
          </div>
  
          {/* Filter Section */}
          <FilterBar />
  
          {/* Status */}
          {loading && <p className="text-sm">Loading vouchers...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && vouchers.length === 0 && (
            <p className="text-sm text-gray-500">No vouchers found.</p>
          )}
  
          {/* Table */}
          <VoucherTable items={vouchers} />
        </div>
      </div>
    </div>
  )
  
};

export default VoucherList;
