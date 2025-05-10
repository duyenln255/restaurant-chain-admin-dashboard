import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [door, setDoor] = useState('');

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 "
      />

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      />

      {/* Location Dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 "
      >
        <option value="">--- All Locations ---</option>
      </select>

      {/* INOUTDOR Dropdown */}
      <select
        value={door}
        onChange={(e) => setDoor(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 "
      >
        <option value="">--- All IN/OUTDOOR ---</option>
        <option value="INDOOR">INDOOR</option>
        <option value="OUTDOOR">OUTDOOR</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 "
      >
        <option value="">--- All Status ---</option>
        <option value="Active">Active</option>
        <option value="Waiting">Waiting</option>
        <option value="Cancel">Cancel</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            setKeyword('');
            setDate('');
            setStatus('');
            setLocation('');
            setDoor('');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
