import React, { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const FixedModal = ({ heading, button, children, btnClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {isDarkMode} = useDarkMode();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className={btnClass ? btnClass : 'text-gray-800 font-medium rounded hover:text-green-600'}
      >
        {button}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${isDarkMode ? 'bg-opacity-80 transition-all duration-300' : 'bg-opacity-60 transition-all duration-300'}`}
          onClick={closeModal} 
        >
          <div
            className={`rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg p-6 relative ${isDarkMode ? 'bg-gray-800 text-white transition-all duration-300' : 'bg-white text-gray-800 transition-all duration-300'}`}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
            <div></div>
              <h2 className="text-xl font-semibold">{heading}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-gray-700">{React.cloneElement(children, { closeModal })}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedModal;
