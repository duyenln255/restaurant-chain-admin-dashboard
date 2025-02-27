import React from 'react';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="flex z-0 gap-6 items-center self-stretch my-auto text-center min-w-[240px] text-neutral-800 w-[436px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d6d960a10517c834ff4c002bd22ee5095cf2a874e52e9b42bb1d8917189f477?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013"
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        alt=""
      />
      <form className="flex flex-1 shrink gap-4 items-start self-stretch px-4 py-2.5 my-auto border border-solid basis-0 bg-slate-100 border-neutral-300 min-h-[38px] min-w-[240px] rounded-[50px]">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="gap-2.5 self-stretch bg-blend-normal w-full bg-transparent border-none focus:outline-none"
        />
      </form>
    </div>
  );
};

export default SearchBar;