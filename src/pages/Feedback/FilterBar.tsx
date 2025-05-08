import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackEmployee, setFeedbackEmployee] = useState('');
  const [feedbackBranch, setFeedbackBranch] = useState('');

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

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[180px]"
      />

      {/* Feedback Type Dropdown */}
      <select
        value={feedbackType}
        onChange={(e) => setFeedbackType(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Feedback Types ---</option>
        <option value="KHIẾU NẠI">KHIẾU NẠI</option>
        <option value="GÓP Ý">GÓP Ý</option>
      </select>

      {/* Employee responsible Dropdown */}
      <select
        value={feedbackEmployee}
        onChange={(e) => setFeedbackEmployee(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Employees ---</option>
      </select>

      {/* Branch responsible Dropdown */}
      <select
        value={feedbackBranch}
        onChange={(e) => setFeedbackBranch(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Branches ---</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">--- All Status ---</option>
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
        <option value="Cancel">Cancel</option>
        <option value="Verify">Verify</option>
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
            setFeedbackType('');
            setFeedbackEmployee('');
            setFeedbackBranch('');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
