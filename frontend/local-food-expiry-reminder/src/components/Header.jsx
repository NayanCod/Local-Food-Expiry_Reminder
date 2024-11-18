import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Brand"
            >
              FreshTrack
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle  size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                id="hs-navbar-example-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div
            id="hs-navbar-example"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-blue-500 focus:outline-none"
                href="#"
                aria-current="page"
              >
                Home
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="#"
              >
                Add/Delete Item
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="#"
              >
                My List
              </a>
              <a
                className="relative font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="#"
              >
                Alerts
              </a>

              {/* Account */}
              <div className="inline-flex ">
                <button
                  id="hs-dropdown-custom-trigger"
                  type="button"
                  onClick={toggleDropdown}
                  className={`p-2 relative md:static border border-gray-500 rounded-full ${
                    isOpen ? "aria-expanded" : ""
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-label="Dropdown"
                >
                  <img
                    className="w-4 h-auto rounded-full"
                    src="/user-solid.svg"
                    alt="Avatar"
                  />
                  
                </button>

                {isOpen && (
                  <div className="absolute left-14 md:left-auto sm:top-14 sm:right-0 sm:left-auto md:right-0 md:top-14 w-auto bg-black rounded-md">
                    <button className="text-red-500 hover:bg-gray-600 px-4 py-2 rounded-md">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
