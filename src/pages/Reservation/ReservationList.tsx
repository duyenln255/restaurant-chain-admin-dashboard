import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Header from '../../components/Header/Header';
import ReservationTable from './ReservationTable';
import type { ReservationItem } from '../../types/ReservationItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchReservations } from '../../redux/slices/reservationSlice';
import type { RootState } from '../../redux/store';



const ReservationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawReservations, loading, error } = useAppSelector((state: RootState) => state.reservations);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const reservations = useMemo<ReservationItem[]>(
    () =>
      rawReservations.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        phoneNumber: r.phone,
        dateTime: `${new Date(r.reservation_date).toLocaleDateString()} ${r.reservation_time}`,
        location: r.branch_id, // Bạn có thể custom sau nếu muốn map branch
        people: r.number_of_customer,
        inOutdoor: r.place,
        status: r.status,
      })),
    [rawReservations]
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">

      <div className="flex-1">
        <div className="mx-auto dashboard-body p-6">
          <div className="mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Reservation Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">Add New Reservation</button>
            </div>

            <FilterBar />

            {loading && <p>Loading reservations...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && reservations.length === 0 && <p>No reservations found.</p>}

            <ReservationTable items={reservations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;