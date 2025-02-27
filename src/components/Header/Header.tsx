import React from 'react';
import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import UserProfile from './UserProfile';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex flex-col text-sm whitespace-nowrap">
      <div className="flex relative gap-8 justify-between items-center px-8 py-3.5 w-full min-h-[70px] max-md:px-5 max-md:max-w-full bg-white">
        <SearchBar />
        <div className="flex z-0 gap-7 items-center self-stretch my-auto min-w-[240px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d18fe2d8d8aaceef3b347de2a8684b836bb51d3d7c97e214e4cb7adfb74e7ffc?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013"
            className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-[0.94] w-[30px]"
            alt=""
          />
          <LanguageSelector />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;