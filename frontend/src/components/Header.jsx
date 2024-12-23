import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useDarkMode } from "../context/DarkModeContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={`relative md:fixed md:top-0 w-full text-sm py-3 shadow-sm ${isDarkMode ? 'bg-gray-800 text-white shadow-gray-700 transition-all duration-300' : 'bg-white text-gray-800 shadow-gray-200 transition-all duration-300'}`}>
        <nav className="max-w-[85rem] mx-auto px-4">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <Logo/>
            <div className="flex gap-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isDarkMode ? 'white' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 hover:text-green-500 cursor-pointer"
                onClick={toggleDarkMode}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
              <Link
                to="/home"
                className={`font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDarkMode ? 'text-white hover:text-green-600 transition-all duration-300' : 'text-gray-600 hover:text-green-600 transition-all duration-300'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="text-sm">
                Home
                </span>
              </Link>
              <Link
                to="/home"
                className={`font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDarkMode ? 'text-white hover:text-green-600 transition-all duration-300' : 'text-gray-600 hover:text-green-600 transition-all duration-300'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                <span className="text-sm">
                My List
                </span>
              </Link>
            </div>
          </div>

          {/* Navbar Links */}
         
        </nav>
      </header>
    </>
  );
}

export default Header;
