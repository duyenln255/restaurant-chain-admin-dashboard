// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { fetchVoucherById, editVoucher } from '../../redux/slices/voucherSlice';
// import { useLoading } from '../../contexts/LoadingContext';
// import type { RootState } from '../../redux/store';

// const EditVoucher: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { setLoading } = useLoading();
//   const { selectedVoucher, loading, error } = useAppSelector((state: RootState) => state.vouchers);

//   const [code, setCode] = useState('');
//   const [description, setDescription] = useState('');
//   const [discountAmount, setDiscountAmount] = useState('');
//   const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
//   const [minOrderAmount, setMinOrderAmount] = useState('');
//   const [maxDiscountAmount, setMaxDiscountAmount] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [usageLimit, setUsageLimit] = useState('');
//   const [usedCount, setUsedCount] = useState(0);
//   const [status, setStatus] = useState<'active' | 'inactive' | 'expired'>('active');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       dispatch(fetchVoucherById(id))
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [id, dispatch, setLoading]);

//   useEffect(() => {
//     if (selectedVoucher) {
//       setCode(selectedVoucher.code);
//       setDescription(selectedVoucher.description);
//       setDiscountAmount(selectedVoucher.discount_amount.toString());
//       setDiscountType(selectedVoucher.discount_type);
//       setMinOrderAmount(selectedVoucher.min_order_amount.toString());
//       setMaxDiscountAmount(selectedVoucher.max_discount_amount.toString());
//       setStartDate(selectedVoucher.start_date.split('T')[0]); // Format date for input
//       setEndDate(selectedVoucher.end_date.split('T')[0]); // Format date for input
//       setUsageLimit(selectedVoucher.usage_limit.toString());
//       setUsedCount(selectedVoucher.used_count);
//       setStatus(selectedVoucher.status);
//     }
//   }, [selectedVoucher]);

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!code.trim()) newErrors.code = 'Required';
//     if (!description.trim()) newErrors.description = 'Required';
//     if (!discountAmount.trim()) newErrors.discountAmount = 'Required';
//     if (!minOrderAmount.trim()) newErrors.minOrderAmount = 'Required';
//     if (discountType === 'percentage' && !maxDiscountAmount.trim()) newErrors.maxDiscountAmount = 'Required';
//     if (!startDate) newErrors.startDate = 'Required';
//     if (!endDate) newErrors.endDate = 'Required';
//     if (!usageLimit.trim()) newErrors.usageLimit = 'Required';
    
//     // Validate dates
//     if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//       newErrors.endDate = 'End date must be after start date';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm() || !id) return;
    
//     try {
//       setLoading(true);
      
//       await dispatch(editVoucher({
//         id,
//         voucher: {
//           code,
//           description,
//           discount_amount: Number(discountAmount),
//           discount_type: discountType,
//           min_order_amount: Number(minOrderAmount),
//           max_discount_amount: Number(maxDiscountAmount || 0),
//           start_date: startDate,
//           end_date: endDate,
//           usage_limit: Number(usageLimit),
//           status
//         }
//       })).unwrap();
      
//       navigate('/voucher');
//     } catch (error) {
//       console.error('Failed to update voucher:', error);
//       alert('Failed to update voucher. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (!selectedVoucher && !loading) return <div className="p-4 text-red-500">Voucher not found.</div>;

//   return (
//     <div className="dashboard">
//       <div className="dashboard-content">
//         <div className="main-content">
//           <div className="dashboard-body p-6">
//             <div className="mx-auto space-y-6">
//               <div className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate('/voucher')}>
//                 ← Back to Voucher List
//               </div>

//               <h1 className="text-3xl font-bold text-neutral-800">Edit Voucher</h1>

//               <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Voucher Code */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Voucher Code <span className="text-red-500">*</span></label>
//                         {errors.code && <span className="text-red-500 text-xs">{errors.code}</span>}
//                       </div>
//                       <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder="e.g. SUMMER2023"
//                       />
//                     </div>

//                     {/* Discount Type */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Discount Type <span className="text-red-500">*</span></label>
//                       </div>
//                       <select
//                         value={discountType}
//                         onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
//                       >
//                         <option value="percentage">Percentage (%)</option>
//                         <option value="fixed">Fixed Amount</option>
//                       </select>
//                     </div>

//                     {/* Discount Amount */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">
//                           {discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'} <span className="text-red-500">*</span>
//                         </label>
//                         {errors.discountAmount && <span className="text-red-500 text-xs">{errors.discountAmount}</span>}
//                       </div>
//                       <input
//                         type="number"
//                         value={discountAmount}
//                         onChange={(e) => setDiscountAmount(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder={discountType === 'percentage' ? "e.g. 10" : "e.g. 50"}
//                         min="0"
//                         max={discountType === 'percentage' ? "100" : undefined}
//                       />
//                     </div>

//                     {/* Min Order Amount */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Minimum Order Amount <span className="text-red-500">*</span></label>
//                         {errors.minOrderAmount && <span className="text-red-500 text-xs">{errors.minOrderAmount}</span>}
//                       </div>
//                       <input
//                         type="number"
//                         value={minOrderAmount}
//                         onChange={(e) => setMinOrderAmount(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder="e.g. 100"
//                         min="0"
//                       />
//                     </div>

//                     {/* Max Discount Amount (only for percentage) */}
//                     {discountType === 'percentage' && (
//                       <div>
//                         <div className="flex justify-between mb-1">
//                           <label className="text-sm font-medium">Maximum Discount Amount <span className="text-red-500">*</span></label>
//                           {errors.maxDiscountAmount && <span className="text-red-500 text-xs">{errors.maxDiscountAmount}</span>}
//                         </div>
//                         <input
//                           type="number"
//                           value={maxDiscountAmount}
//                           onChange={(e) => setMaxDiscountAmount(e.target.value)}
//                           className="w-full border border-gray-300 rounded-md px-4 py-2"
//                           placeholder="e.g. 50"
//                           min="0"
//                         />
//                       </div>
//                     )}

//                     {/* Start Date */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Start Date <span className="text-red-500">*</span></label>
//                         {errors.startDate && <span className="text-red-500 text-xs">{errors.startDate}</span>}
//                       </div>
//                       <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                       />
//                     </div>

//                     {/* End Date */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">End Date <span className="text-red-500">*</span></label>
//                         {errors.endDate && <span className="text-red-500 text-xs">{errors.endDate}</span>}
//                       </div>
//                       <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                       />
//                     </div>

//                     {/* Usage Limit */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Usage Limit <span className="text-red-500">*</span></label>
//                         {errors.usageLimit && <span className="text-red-500 text-xs">{errors.usageLimit}</span>}
//                       </div>
//                       <input
//                         type="number"
//                         value={usageLimit}
//                         onChange={(e) => setUsageLimit(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2"
//                         placeholder="e.g. 100"
//                         min="1"
//                       />
//                     </div>

//                     {/* Used Count (read-only) */}
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Used Count</label>
//                       </div>
//                       <input
//                         type="number"
//                         value={usedCount}
//                         readOnly
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
//                       />
//                     </div>

//                     {/* Status */}
//                     <div>
//                       <label className="block text-sm mb-1 font-medium">Status</label>
//                       <select
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'expired')}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
//                       >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                         <option value="expired">Expired</option>
//                       </select>
//                     </div>

//                     {/* Description */}
//                     <div className="md:col-span-2">
//                       <div className="flex justify-between mb-1">
//                         <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
//                         {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
//                       </div>
//                       <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-4 py-2 h-32"
//                         placeholder="Enter voucher description"
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

// export default EditVoucher;
