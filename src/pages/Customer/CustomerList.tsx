import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
import CustomerTable from './CustomerTable';
import '../Dashboard/Dashboard.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCustomers } from '../../redux/slices/customerSlice';
import type { RootState } from '../../redux/store';
import type { CustomerItem } from '../../types/CustomerItem';
import { useNavigate } from "react-router-dom";

const CustomerList: React.FC = () => {
  const navigate = useNavigate(); // hook chuyển trang
  const dispatch = useAppDispatch();
  const { items: rawCustomers, loading, error } = useAppSelector((state: RootState) => state.customers);

  // Map API data → CustomerItem (UI)
  const customers = useMemo<CustomerItem[]>(
    () =>
      rawCustomers.map((c) => ({
        id: c.id,
        displayId: c.display_id,
        fullName: c.full_name,
        email: c.email,
        phone: c.phone,
        dateJoined: new Date(c.date_added).toLocaleDateString(),
        status: c.status,
        gender: c.gender,
        address: c.address,
        avatar: c.avatar,
        username: c.username,
        brandName: c.brand_name,
        password: c.password,
      })),
    [rawCustomers]
  );
  

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Customer Lists</h1>
            <button className="bg-blue-500 xs:w-1/5 hover:bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition">
              Add New Customer
            </button>
          </div>
  
          {/* Filter */}
          <FilterBar />
  
          {/* Status */}
          {loading && <p className="text-sm">Loading customers...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && customers.length === 0 && (
            <p className="text-sm text-gray-500">No customers found.</p>
          )}
  
          {/* Table */}
          <CustomerTable items={customers} />
        </div>
      </div>
    </div>
  )  
};

export default CustomerList;
