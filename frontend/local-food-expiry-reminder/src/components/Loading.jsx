import React from "react";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const Loading = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="text-center space-y-6 animate-fade-in">
        {/* Progress Bar */}
        <div className="w-64 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full animate-loading-bar ${
              isDarkMode ? "bg-blue-500" : "bg-indigo-500"
            }`}
          ></div>
        </div>

        {/* Spinner */}
        <div
          className={`w-16 h-16 border-4 border-t-4 rounded-full mx-auto animate-spin ${
            isDarkMode
              ? "border-gray-700 border-t-blue-500"
              : "border-gray-300 border-t-indigo-500"
          }`}
        ></div>

        {/* Main Text */}
        <h1 className="text-2xl font-semibold">
          Hang tight, we're almost there!
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 dark:text-gray-400">
          Loading your experience... this won’t take long.
        </p>
      </div>
    </div>
  );
};

export default Loading;
