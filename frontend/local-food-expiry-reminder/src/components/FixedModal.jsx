import React, { useState, useEffect } from "react";

const FixedModal = ({ heading, button, children }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        className="px-4 py-1.5 text-gray-800 font-medium rounded hover:text-green-600"
      >
        {button}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal} 
        >
          <div
            className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg p-6 relative"
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
