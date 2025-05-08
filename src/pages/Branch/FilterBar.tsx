import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');
  const [brand, setBrand] = useState('');

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      />

      {/* Location Dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Locations ---</option>
      </select>

      {/* Manager Dropdown */}
      <select
        value={manager}
        onChange={(e) => setManager(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Managers ---</option>
      </select>

      {/* Brand Dropdown */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Brands ---</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Status ---</option>
        <option value="completed">Completed</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            setKeyword('');
            setStatus('');
            setLocation('');
            setManager('');
            setBrand('');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
