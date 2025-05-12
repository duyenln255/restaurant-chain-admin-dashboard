import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
import FilterBarBlog from './Blog/FilterBarBlog';
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
  const brands = useMemo<BrandItem[]>(
    () =>
      rawBrands.map((b) => ({
        id: b.id,
        displayId: b.display_id, // thêm dòng này
        logo: b.logo_url,
        name: b.name,
        link: b.website_url,
        description: b.description,
        status: b.status,
        opening_hours: b.opening_hours?.slice(0, 5), // "08:30"
        closed_hours: b.closed_hours?.slice(0, 5),   // "22:00"
        date_added: new Date(b.date_added).toLocaleDateString() // ví dụ 11/5/2025
      })),
    [rawBrands]
  );
  

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Brand Lists</h1>
            <Button
              onClick={() => navigate("/brand/add")}
              className="bg-blue-500 text-white text-sm sm:text-base px-4 py-2 rounded-md"
            >
              Add New Brand
            </Button>
          </div>
  
          {/* Filter */}
          <FilterBar />
  
          {/* States */}
          {loading && <p className="text-sm">Loading brands...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && brands.length === 0 && (
            <p className="text-sm text-gray-500">No brands found.</p>
          )}
  
          {/* Table */}
          <BrandTable items={brands} />
        </div>
      </div>
    </div>
  )
  
};

export default BrandList;
