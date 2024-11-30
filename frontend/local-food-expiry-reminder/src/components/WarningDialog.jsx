import React, { useEffect } from "react";

const WarningDialog = ({ heading, accept, button, children }) => {
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
        className="px-4 py-1 bg-red-500 text-white font-medium rounded hover:bg-red-600"
      >
        {children}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeDialog}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-md p-6"
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
                onClick={handleAccept}
                className="w-1/2 px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={closeDialog}
                className="w-1/2 px-4 py-2 bg-red-500 text-gray-100 font-medium rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningDialog;
