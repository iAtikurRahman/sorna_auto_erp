import React, { useState } from 'react';
import Link from 'next/link';

const ErpHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center"> 
      <h1 className="text-lg font-bold">
        <Link href="/dashboard">
          ERP System
        </Link>
      </h1>
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
          <span>Admin</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-10">
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200 text-left">
              Profile
            </Link>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-200 text-left">
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default ErpHeader;
