// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
// import Footer from '../Footer'; 
import { useMediaQuery } from 'react-responsive';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detect if screen is smaller than 768px (mobile)
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen && !isMobile ? 'w-[240px]' : 'w-0 overflow-hidden'}`}>
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
