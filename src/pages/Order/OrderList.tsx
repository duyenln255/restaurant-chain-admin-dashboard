import React, { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import FilterBar from './FilterBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import OrderTable from './OrderTable';
import { OrderItem } from '../../types/OrderItem';

const orders: OrderItem[] = [
  { id: '00001', name: 'Christine Brooks', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '04 Sep 2019', productName: 'Coffee Mocha', orderType: 'AT STORE', status: 'Completed' },
  { id: '00002', name: 'Rosie Pearson', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '28 May 2019', productName: 'Mango Cake', orderType: 'ONLINE', status: 'Processing' },
  { id: '00003', name: 'Darrell Caldwell', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '23 Nov 2019', productName: 'Juice', orderType: 'AT STORE', status: 'Rejected' },
  { id: '00004', name: 'Gilbert Johnston', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '05 Feb 2019', productName: 'Ice Cream Sundaes', orderType: 'ONLINE', status: 'Completed' },
  { id: '00005', name: 'Alan Cain', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '29 Jul 2019', productName: 'Pepsi', orderType: 'AT STORE', status: 'Processing' },
  { id: '00006', name: 'Alfred Murray', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '15 Aug 2019', productName: 'Coffee Mocha', orderType: 'ONLINE', status: 'Completed' },
  { id: '00007', name: 'Maggie Sullivan', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '21 Dec 2019', productName: 'Coffee Mocha', orderType: 'AT STORE', status: 'Processing' },
  { id: '00008', name: 'Rosie Todd', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '30 Apr 2019', productName: 'Coffee Mocha', orderType: 'ONLINE', status: 'On Hold' },
  { id: '00009', name: 'Dollie Hines', address: '123 Âu Cơ, Phú Thọ Hòa, Tân Phú', date: '09 Jan 2019', productName: 'Coffee Mocha', orderType: 'AT STORE', status: 'In Transit' },
];

const OrderList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with toggle */}
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
              <h1 className="text-2xl font-bold text-neutral-800">Order Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Order
              </button>
            </div>

            {/* FilterBar */}
            <FilterBar />

            {/* Order Table */}
            <OrderTable items={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
