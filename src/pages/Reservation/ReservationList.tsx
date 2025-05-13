import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
import ReservationTable from './ReservationTable';
import type { ReservationItem } from '../../types/ReservationItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchReservations } from '../../redux/slices/reservationSlice';
import type { RootState } from '../../redux/store';
import { useNavigate } from "react-router-dom";



const ReservationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawReservations, loading, error } = useAppSelector((state: RootState) => state.reservations);
  const reservations = useMemo<ReservationItem[]>(
    () =>
      rawReservations.map((r) => ({
        id: r.id,
        displayId: r.display_id,
        fullName: r.full_name,
        phoneNumber: r.phone,
        dateTime: `${new Date(r.reservation_date).toLocaleDateString()} ${r.reservation_time}`,
        location: r.branch_id,
        branchAddress: r.branch_address,
        brandName: r.brand_name,
        number_of_customer: r.number_of_customer,
        place: r.place,
        status: r.status,
      })),
    [rawReservations]
  );
  
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Reservation Lists</h1>
            <button className="bg-blue-500 xs:w-1/5 hover:bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition">
              Add New Reservation
            </button>
          </div>
  
          {/* Filter */}
          <FilterBar />
  
          {/* States */}
          {loading && <p className="text-sm">Loading reservations...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && reservations.length === 0 && (
            <p className="text-sm text-gray-500">No reservations found.</p>
          )}
  
          {/* Table */}
          <ReservationTable items={reservations} />
        </div>
      </div>
    </div>
  )  
};

export default ReservationList;