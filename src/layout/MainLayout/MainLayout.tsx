'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { useMediaQuery } from 'react-responsive';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      {!isMobile && (
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300`}>
          {sidebarOpen && <Sidebar />}
        </div>
      )}

      {/* Sidebar Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          ></div>

          <div className="fixed inset-0 z-50 bg-white shadow-lg flex flex-col w-full h-full min-h-screen min-w-screen">
            {/* ✅ truyền onClose → Sidebar biết là mobile → hiện X + đóng sidebar */}
            <Sidebar onClose={closeSidebar} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
