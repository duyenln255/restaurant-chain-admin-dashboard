'use client';

import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { Menu } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import UserProfile from './UserProfile';

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean; // Nhận thêm prop sidebarOpen từ MainLayout
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const [showMenu, setShowMenu] = useState<string>('');
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSelectLangClick = () => {
    setShowMenu('login');
  };

  const shouldShowMenuButton = !sidebarOpen || isMobile;

  return (
    <header className="flex flex-col text-sm whitespace-nowrap">
      <div className="flex items-center justify-between px-8 py-3.5 w-full min-h-[70px] max-md:px-5 bg-white">
        
        {/* LEFT: Menu + Search */}
        <div className="flex items-center gap-4">
          {toggleSidebar && shouldShowMenuButton && (
            <button className="block focus:outline-none" onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </button>
          )}
          <SearchBar />
        </div>

        {/* RIGHT: Bell + Language + Profile */}
        <div className="flex gap-7 items-center min-w-[240px]">
          <FaBell className="w-6 h-6" />
          <LanguageSelector
            handleClick={handleSelectLangClick}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
