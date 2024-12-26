import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useDarkMode } from "../context/DarkModeContext";
import WarningDialog from "./WarningDialog";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <header
        className={`relative md:fixed md:top-0 w-full text-sm py-3 shadow-sm ${
          isDarkMode
            ? "bg-gray-800 text-white shadow-gray-700 transition-all duration-300"
            : "bg-white text-gray-800 shadow-gray-200 transition-all duration-300"
        }`}
      >
        <nav className="max-w-[85rem] mx-auto px-4">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isDarkMode ? "white" : "none"}
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
                className={`font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  isDarkMode
                    ? "text-white hover:text-green-600 transition-all duration-300"
                    : "text-gray-600 hover:text-green-600 transition-all duration-300"
                }`}
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
                <span className="text-sm">Home</span>
              </Link>
              {userLoggedIn ? (
                <WarningDialog
                  heading="Are you sure, You want to logout ?"
                  accept={handleLogout}
                >
                  Logout
                </WarningDialog>
              ) : null}
            </div>
          </div>

          {/* Navbar Links */}
        </nav>
      </header>
    </>
  );
}

export default Header;
