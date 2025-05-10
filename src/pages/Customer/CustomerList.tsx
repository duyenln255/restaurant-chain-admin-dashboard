import React, { useState, useEffect, useMemo } from 'react';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Header from '../../components/Header/Header';
import FilterBar from './FilterBar';
import CustomerTable from './CustomerTable';
import '../Dashboard/Dashboard.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCustomers } from '../../redux/slices/customerSlice';
import type { RootState } from '../../redux/store';
import type { CustomerItem } from '../../types/CustomerItem';

const CustomerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawCustomers, loading, error } = useAppSelector((state: RootState) => state.customers);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Map API data → CustomerItem (UI)
  const customers = useMemo<CustomerItem[]>(
    () =>
      rawCustomers.map((c) => ({
        id: c.id,
        fullName: c.full_name,
        email: c.email,
        phone: c.phone,
        dateJoined: new Date(c.date_added).toLocaleDateString(),
        totalOrder: 0, 
        totalReservation: "",
        status: c.status,
        password: c.password,
        gender: c.gender,
        dateOfBirth: "",
      })),
    [rawCustomers]
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="dashboard-body">
          <div className=" mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Customer Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">Add New Customer</button>
            </div>

            <FilterBar />

            {/* Status */}
            {loading && <p>Loading customers...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && customers.length === 0 && <p>No customers found.</p>}

            <CustomerTable items={customers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
