import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white text-sm py-3 shadow-md">
        <nav className="max-w-[85rem] mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl flex font-bold">
              <span className="relative text-green-500 drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
                Fresh
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
              <span className="ml-1 text-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                Track
              </span>
            </h1>

            {/* Mobile Menu Toggle */}
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle flex justify-center items-center gap-x-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                id="hs-navbar-example-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>

          {/* Navbar Links */}
          <div
            id="hs-navbar-example"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <Link
                to="/home"
                className="font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Home
              </Link>
              <Link
                to="/my-list"
                className="font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                My List
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
