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
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="dashboard-body p-6">
          <div className="mx-auto space-y-4">        
            <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order Lists</h1>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
            Add New Order
          </button>
        </div>

        <FilterBar />

        {error && <p className="text-red-500">{error}</p>}

        <OrderTable items={orders} />
      </div>
    </div>
    </div>
    </div>
  );
};

export default OrderList;
