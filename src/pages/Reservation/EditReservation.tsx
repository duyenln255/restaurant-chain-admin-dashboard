// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { fetchReservationById, editReservation } from '../../redux/slices/reservationSlice';
// import { fetchBranches } from '../../redux/slices/branchSlice';
// import { useLoading } from '../../contexts/LoadingContext';
// import type { RootState } from '../../redux/store';

// const EditReservation: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { setLoading } = useLoading();
//   const { selectedReservation, loading, error } = useAppSelector((state: RootState) => state.reservations);
//   const { items: branches } = useAppSelector((state: RootState) => state.branches);

//   const [customerName, setCustomerName] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [branchId, setBranchId] = useState('');
//   const [reservationDate, setReservationDate] = useState('');
//   const [reservationTime, setReservationTime] = useState('');
//   const [partySize, setPartySize] = useState(1);
//   const [specialRequests, setSpecialRequests] = useState('');
//   const [status, setStatus] = useState<'confirmed' | 'pending' | 'cancelled' | 'completed'>('pending');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     dispatch(fetchBranches());
    
//     if (id) {
//       setLoading(true);
//       dispatch(fetchReservationById(id))
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [id, dispatch, setLoading]);

//   useEffect(() => {
//     if (selectedReservation) {
//       setCustomerName(selectedReservation.customer_name || '');
//       setCustomerId(selectedReservation.customer_id);
//       setBranchId(selectedReservation.branch_id);
//       setReservationDate(selectedReservation.reservation_date.split('T')[0]);
//       setReservationTime(selectedReservation.reservation_time);
//       setPartySize(selectedReservation.party_size);
//       setSpecialRequests(selectedReservation.special_requests || '');
//       setStatus(selectedReservation.status);
//     }
//   }, [selectedReservation]);

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!customerName.trim()) newErrors.customerName = 'Required';
//     if (!customerId.trim()) newErrors.customerId = 'Required';
//     if (!branchId) newErrors.branchId = 'Required';
//     if (!reservationDate) newErrors.reservationDate = 'Required';
//     if (!reservationTime) newErrors.reservationTime = 'Required';
//     if (partySize < 1) newErrors.partySize = 'Must be at least 1';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm() || !id) return;
    
//     try {
//       setLoading(true);
      
//       await dispatch(editReservation({
//         id,
//         reservation: {
//           customer_id: customerId,
//           branch_id: branchId,
//           reservation_date: reservationDate,
//           reservation_time: reservationTime,
//           party_size: partySize,
//           status,
//           special_requests: specialRequests,
//           customer_name: customerName
//         }
//       })).unwrap();
      
//       navigate('/reservation');
//     } catch (error) {
//       console.error('Failed to update reservation:', error);
//       alert('Failed to update reservation. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (!selectedReservation && !loading) return <div className="p-4 text-red-500">Reservation not found.</div>;

//   return (
//     <div className="dashboard">
//       <div className="dashboard-content">
//         <div className="main-content">
//           <div className="dashboard-body p-6">
//             <div className="mx-auto space-y-6">
//               <div className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate('/reservation')}>
//                 ← Back to Reservation List
//               </div>

//               <h1 className="text-3xl font-bold text-neutral-800">Edit Reservation</h1>

//               <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Customer Name */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Customer Name <span className="text-red-500">*</span></label>
//                         {errors.customerName && <span className="text-red-500 text-xs">{errors.customerName}</span>}
//                       </div>
//                       <input
//                         type="text"
//                         value={customerName}
//                         onChange={(e) => setCustomerName(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder="Enter customer name"
//                       />
//                     </div>

//                     {/* Customer ID */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Customer ID <span className="text-red-500">*</span></label>
//                         {errors.customerId && <span className="text-red-500 text-xs">{errors.customerId}</span>}
//                       </div>
//                       <input
//                         type="text"
//                         value={customerId}
//                         onChange={(e) => setCustomerId(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder="Enter customer ID"
//                       />
//                     </div>

//                     {/* Branch */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Branch <span className="text-red-500">*</span></label>
//                         {errors.branchId && <span className="text-red-500 text-xs">{errors.branchId}</span>}
//                       </div>
//                       <select
//                         value={branchId}
//                         onChange={(e) => setBranchId(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
//                       >
//                         <option value="">Select a branch</option>
//                         {branches.map((branch) => (
//                           <option key={branch.id} value={branch.id}>
//                             {branch.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Party Size */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Party Size <span className="text-red-500">*</span></label>
//                         {errors.partySize && <span className="text-red-500 text-xs">{errors.partySize}</span>}
//                       </div>
//                       <input
//                         type="number"
//                         value={partySize}
//                         onChange={(e) => setPartySize(Number(e.target.value))}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         min="1"
//                       />
//                     </div>

//                     {/* Reservation Date */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Reservation Date <span className="text-red-500">*</span></label>
//                         {errors.reservationDate && <span className="text-red-500 text-xs">{errors.reservationDate}</span>}
//                       </div>
//                       <input
//                         type="date"
//                         value={reservationDate}
//                         onChange={(e) => setReservationDate(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                       />
//                     </div>

//                     {/* Reservation Time */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Reservation Time <span className="text-red-500">*</span></label>
//                         {errors.reservationTime && <span className="text-red-500 text-xs">{errors.reservationTime}</span>}
//                       </div>
//                       <input
//                         type="time"
//                         value={reservationTime}
//                         onChange={(e) => setReservationTime(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                       />
//                     </div>

//                     {/* Status */}
//                     <div>
//                       <label className="block text-sm mb-1 font-medium">Status</label>
//                       <select
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value as 'confirmed' | 'pending' | 'cancelled' | 'completed')}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="confirmed">Confirmed</option>
//                         <option value="cancelled">Cancelled</option>
//                         <option value="completed">Completed</option>
//                       </select>
//                     </div>

//                     {/* Special Requests */}
//                     <div className="md:col-span-2">
//                       <label className="block text-sm mb-1 font-medium">Special Requests</label>
//                       <textarea
//                         value={specialRequests}
//                         onChange={(e) => setSpecialRequests(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 h-32"
//                         placeholder="Enter any special requests or notes"
//                       />
//                     </div>
//                   </div>

//                   <div className="text-center pt-4">
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
//                     >
//                       Save Changes
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReservation;
