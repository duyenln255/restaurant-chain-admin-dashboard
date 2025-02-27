import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import FilterBar from './FilterBar';
import CustomerTable from './CustomerTable'; // Import CustomerTable thay vì bảng cứng
import '../Dashboard/Dashboard.css';
import { CustomerItem } from '../../types/CustomerItem';

const customers: CustomerItem[] = [
  { id: '001', fullName: 'Fleming Kevin', email: 'jaskolski.brent@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '002', fullName: 'Rosie Pearson', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '003', fullName: 'Darrell Caldwell', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Inactive' },
  { id: '004', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '005', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '006', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '007', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '008', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '009', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '010', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '011', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
  { id: '012', fullName: 'Gilbert Johnston', email: 'test@gmail.com', dateJoined: '11-08-2023', totalOrder: 2, totalReservation: '100.000 VND', status: 'Completed' },
];


const CustomerList: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard-body p-6">
            <div className="max-w-[1140px] mx-auto space-y-4">
              
              {/* Header + Button */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800">Customer Lists</h1>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                  Add New Customer
                </button>
              </div>

              {/* FilterBar */}
              <FilterBar />

              {/* Customer Table */}
              <CustomerTable items={customers as CustomerItem[]} />

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
