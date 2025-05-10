import React, { useState, useEffect, useMemo } from 'react';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Header from '../../components/Header/Header';
import FilterBar from './FilterBar';
import FilterBarBlog from './FilterBarBlog';
import BrandTable from './BrandTable';
// import BlogList from './BlogList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBrands } from '../../redux/slices/brandSlice';
import type { RootState } from '../../redux/store';
import type { BrandItem } from '../../types/BrandItem';
import { useNavigate } from "react-router-dom"; 
import { Button } from "../../components/ui/button"

const BrandList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawBrands, loading, error } = useAppSelector((state: RootState) => state.brands);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const brands = useMemo<BrandItem[]>(
    () =>
      rawBrands.map((b) => ({
        id: b.id,
        logo: b.logo_url,
        name: b.name,
        link: b.website_url,
        description: b.description,
        status: b.status,
        opening_hours: b.opening_hours,
        closed_hours: b.closed_hours
      })),
    [rawBrands]
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen xs:max-w-screen xs:mx-auto">
      <div className="flex-1">
        <div className="dashboard-body p-6">
          <div className=" mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Brand Lists</h1>
              <Button 
                onClick={() => navigate("/brand/add")}
                className="bg-blue-500 text-white"
              >
                Add New Brand
              </Button>

            </div>

            <FilterBar />

            {loading && <p>Loading brands...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && brands.length === 0 && <p>No brands found.</p>}

            <BrandTable items={brands} />

            {/* Blog (nguyên như cũ) */}
            {/* <div className="flex justify-between items-center mt-10">
              <h1 className="text-2xl font-bold text-neutral-800">Blog Lists</h1>
              <button className="px-4 py-2 border border-neutral-300 rounded-md bg-red-500 text-white hover:bg-red-600">
                Delete All
              </button>
            </div> */}

            {/* <FilterBarBlog /> */}
            {/* <BlogList /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandList;
