import React from 'react';

interface LanguageSelectorProps {}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  return (
    <div className="flex gap-3.5 justify-between items-center self-stretch my-auto font-semibold text-stone-500 w-[122px]">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c927916549a842e4f7eadb67ed8b929cde461d1ff7ef993f129a007cd6e71905?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013"
        className="object-contain shrink-0 self-stretch my-auto w-10 rounded-none aspect-[1.48]"
        alt=""
      />
      <button className="self-stretch my-auto bg-transparent border-none cursor-pointer">English</button>
    </div>
  );
};

export default LanguageSelector;