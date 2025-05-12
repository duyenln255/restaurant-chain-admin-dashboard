import React, { useEffect } from 'react';
import FilterBar from './FilterBar';
import OrderTable from './OrderTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchOrders } from '../../redux/slices/orderSlice';
import type { RootState } from '../../redux/store';

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: RootState) => state.orders.items);
  const loading = useAppSelector((state: RootState) => state.orders.loading);
  const error = useAppSelector((state: RootState) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Order Lists</h1>
            <button className="bg-blue-500 xs:w-1/5 hover:bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition">
              Add New Order
            </button>
          </div>
  
          {/* Filter */}
          <FilterBar />
  
          {/* States */}
          {loading && <p className="text-sm">Loading orders...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && orders.length === 0 && (
            <p className="text-sm text-gray-500">No orders found.</p>
          )}
  
          {/* Table */}
          <OrderTable items={orders} />
        </div>
      </div>
    </div>
  )  
};

export default OrderList;
