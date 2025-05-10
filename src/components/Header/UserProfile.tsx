import React from 'react';

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  return (
    <div className="flex gap-5 justify-center items-center self-stretch my-auto font-bold text-neutral-700">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff91569b03a1f3ea05d264f6177a7ab0e8c181fb9d7738db11cfba2674e7bce0?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013"
        className="object-contain shrink-0 self-stretch my-auto w-11 aspect-square"
        alt="User avatar"
      />
      <div className="flex gap-7 items-center self-stretch my-auto">
        <div className="flex flex-col self-stretch my-auto w-[10%]">
          <div className="flex-1 shrink gap-2.5 self-stretch w-full">
            UTOPIA
          </div>
          <div className="flex-1 shrink gap-2.5 self-stretch w-full">
            Manager
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;