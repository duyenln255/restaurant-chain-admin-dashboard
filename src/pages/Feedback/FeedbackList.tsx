import React, { useState } from 'react';
import FilterBar from './FilterBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import FeedbackTable from './FeedbackTable';
import type { FeedbackItem } from '../../types/FeedbackItem';

const feedbacks: FeedbackItem[] = [
  {
    id: '001',
    type: 'KHIẾU NẠI',
    fullName: 'Fleming Kevin',
    email: 'jaskolski@gmail.com',
    phoneNumber: '077-XXX-XXXX',
    responsible: {
      branchResponsible: '123 Âu Cơ',
    },
    feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ..',
    createAt: '21/12/2024 11:11',
    updateAt: '21/12/2024 11:11',
    status: 'Pending',
  },
  {
    id: '002',
    type: 'GÓP Ý',
    fullName: 'Rosie Pearson',
    email: 'test@gmail.com',
    phoneNumber: '077-XXX-XXXX',
    responsible: {
      branchResponsible: '123 Âu Cơ',
      employeeResponsible: 'Lenora Benson',
    },
    feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ..',
    createAt: '20/12/2024 11:11',
    updateAt: '20/12/2024 15:44',
    updatedBy: 'Lenora Benson',
    status: 'Done',
  },
];

const FeedbackList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            
            {/* Header + Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Feedback Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Feedback
              </button>
            </div>

            {/* FilterBar */}
            <FilterBar />

            {/* Feedback Table */}
            <FeedbackTable items={feedbacks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
