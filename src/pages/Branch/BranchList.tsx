import React, { useState, useEffect, useMemo } from 'react';
import AddBranch from './AddBranch'
import EditBranch from './EditBranch'
import FilterBar from './FilterBar';
import BranchTable from './BranchTable';
import '../Dashboard/Dashboard.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBranches } from '../../redux/slices/branchSlice';
import type { RootState } from '../../redux/store';
import type { BranchItem } from '../../types/BranchItem';
import { useNavigate } from "react-router-dom";

const BranchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawBranches, loading, error } = useAppSelector((state: RootState) => state.branches);

  const branches = useMemo<BranchItem[]>(() => {
    const data = Array.isArray(rawBranches) ? rawBranches : [rawBranches];
  
    return data.map((b) => ({
      id: b.id,
      name: b.display_id,
      location: b.address,
      address: b.address,
      phone: b.phone,
      brandId: b.brand_id,
      brand: b.brand_name || "-",
      employees: parseInt(b.total_employees || "0"),
      manager: `${b.total_managers}`, // hoặc lấy tên cụ thể nếu có sau này
      status: b.status,
      date_added: b.date_added,
    }));
  }, [rawBranches]);
  
  

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Branch Lists</h1>
            <AddBranch />
          </div>
  
          {/* Filter */}
          <FilterBar />
  
          {/* States */}
          {loading && <p className="text-sm">Loading branches...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && branches.length === 0 && (
            <p className="text-sm text-gray-500">No branches found.</p>
          )}
  
          {/* Table */}
          <BranchTable items={branches} />
        </div>
      </div>
    </div>
  )
};

export default BranchList;
