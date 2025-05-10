// // src/pages/Brand/EditBrand.tsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import type { BrandItem } from "../../types/BrandItem";
// import { mockBrands } from "../../mocks/mockBrand";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Header from "../../components/Header/Header";

// const EditBrand: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [brand, setBrand] = useState<BrandItem | null>(null);
//   const [name, setName] = useState('');
//   const [link, setLink] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
//   const [logo, setLogo] = useState<File | null>(null);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const found = mockBrands.find(b => b.id === id);
//     if (found) {
//       setBrand(found);
//       setName(found.name);
//       setLink(found.link);
//       setDescription(found.description);
//       setStatus(found.status as 'Active' | 'Inactive');
//     }
//   }, [id]);

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!name.trim()) newErrors.name = 'Required';
//     if (!link.trim()) newErrors.link = 'Required';
//     if (!description.trim()) newErrors.description = 'Required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     console.log({
//       id,
//       name,
//       link,
//       description,
//       status,
//       logo
//     });

//     navigate("/brand");
//   };

//   return (
//     <div className="dashboard">
//       <div className="dashboard-content">
//         <Sidebar />
//         <div className="main-content">
//           <Header />
//           <div className="dashboard-body p-6">
//             <div className="max-w-[800px] mx-auto space-y-6">
//               <div className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate("/brand")}>
//                 ← Back to Brand List
//               </div>

//               <h1 className="text-3xl font-bold text-neutral-800">Edit Brand</h1>

//               <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md space-y-6">

//                 {/* Upload Logo */}
//                 <div className="flex flex-col items-center space-y-2">
//                   <label htmlFor="logo-upload" className="cursor-pointer">
//                     <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
//                       {logo ? (
//                         <img
//                           src={URL.createObjectURL(logo)}
//                           alt="Preview"
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       ) : (
//                         <img
//                           src={brand?.logo}
//                           alt="Current Logo"
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       )}
//                     </div>
//                     <input
//                       id="logo-upload"
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => setLogo(e.target.files?.[0] || null)}
//                     />
//                   </label>
//                   <span className="text-sm text-blue-600 font-medium">Upload Logo <span className="text-red-500">*</span></span>
//                 </div>

//                 {/* Name */}
//                 <div>
//                     <div className="flex justify-between items-center">
//                         <label className="text-sm font-medium">Brand Name <span className="text-red-500">*</span></label>
//                         {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
//                     </div>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
//                     />
//                 </div>

//                 {/* Link */}
//                 <div>
//                     <div className="flex justify-between items-center">
//                         <label className="text-sm font-medium">Website Link <span className="text-red-500">*</span></label>
//                         {errors.link && <span className="text-red-500 text-xs">{errors.link}</span>}
//                     </div>
//                     <input
//                         type="text"
//                         value={link}
//                         onChange={(e) => setLink(e.target.value)}
//                         className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
//                     />
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <div className="flex justify-between items-center">
//                         <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
//                         {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
//                     </div>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
//                     />
//                 </div>


//                 {/* Status */}
//                 <div>
//                   <label className="text-sm font-medium">Status <span className="text-red-500">*</span></label>
//                   <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
//                     className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 bg-white custom-select"
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div className="text-center pt-4">
//                   <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBrand;
