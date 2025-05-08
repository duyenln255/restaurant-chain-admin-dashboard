import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { Menu } from 'lucide-react';

import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import UserProfile from './UserProfile';

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showMenu, setShowMenu] = useState<string>('');

  const handleSelectLangClick = () => {
    setShowMenu('login');
  };

  return (
    <header className="flex flex-col text-sm whitespace-nowrap">
      <div className="flex items-center justify-between px-8 py-3.5 w-full min-h-[70px] max-md:px-5 bg-white">
        
        {/* Menu Button */}
        <div className="flex items-center gap-4">
          <button className="block focus:outline-none" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
          <SearchBar />
        </div>

        {/* Right */}
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
