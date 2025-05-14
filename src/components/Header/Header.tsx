import React, { useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import LanguageSwitcher from "../LanguageSwitcher";
import UserProfile from "./UserProfile";

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      <div className="flex items-center justify-between px-8 py-3.5 w-full min-h-12 max-md:px-5">
        <div className="flex items-center gap-4">
          <button className="block focus:outline-none" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-7 items-center">
          <FaBell className="w-6 h-6" />
          <LanguageSwitcher />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
