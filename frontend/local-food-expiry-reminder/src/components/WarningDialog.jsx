import React, { useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const WarningDialog = ({ heading, accept, button, children }) => {
  const {isDarkMode} = useDarkMode();
  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleAccept = () => {
    accept(); 
    closeDialog();
  };

  useEffect(() => {
    // Disable scrolling when modal is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Button to Open Dialog */}
      <button
        onClick={openDialog}
        className="px-4 py-1 bg-red-500 text-white font-medium text-sm rounded hover:bg-red-600"
      >
        {children}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${isDarkMode ? 'bg-opacity-80 transition-all duration-300' : 'bg-opacity-60 transition-all duration-300'}`}
          onClick={closeDialog}
        >
          <div
            className={`relative rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-md p-6 ${isDarkMode ? 'bg-gray-700 transition-all duration-300' : 'bg-white transition-all duration-300'}`}
            onClick={(e) => e.stopPropagation()}
          >
          <button
                onClick={closeDialog}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            {/* Modal Heading */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-center">{heading}</h2>
            </div>

            {/* Modal Content */}
            {/* <div className="text-gray-700 mb-6">{children}</div> */}

            {/* Modal Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={closeDialog}
                className="w-1/2 px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
              >
                No, Cancel it
              </button>
              <button
                onClick={handleAccept}
                className={`w-1/2 px-4 py-2 border-2 font-medium rounded ${isDarkMode ? 'border-gray-200 text-gray-200 hover:bg-gray-700 transition-all duration-300' : 'border-gray-800 text-gray-800 hover:bg-gray-100 transition-all duration-300'}`}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningDialog;
