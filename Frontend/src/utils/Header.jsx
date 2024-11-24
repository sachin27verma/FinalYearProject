import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className=" shadow-md">
      <div className=" container py-3 mx-auto bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-6 flex justify-between items-center">
        {/* Logo and Institute Name */}
        <div className="flex items-center mb-4 sm:mb-0">
          <Image
            src="./svnitlogo.svg"
            alt="Institute Logo"
            width={50}
            height={50}
            className="mr-3"
          />
          <h1 className="text-xl font-bold  drop-shadow-md">
            Sardar Vallabhbhai National Institute of Technology, Surat
          </h1>
        </div>

        {/* Project Topic and Subtitle */}
        <div className="text-center sm:text-right">
          <h2 className="text-lg font-semibold text-gray-400 drop-shadow-md">
            Final Year Project Topic
          </h2>
          <p className="text-sm text-gray-300">
           - Fake News Detection using Machine Learning
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
