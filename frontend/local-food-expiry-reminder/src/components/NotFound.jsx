import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const NotFound = () => {
  const navigate = useNavigate();
  const {isDarkMode} = useDarkMode();

  const handleGoHome = () => {
    navigate("/home"); // Redirect to the home page
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="text-center space-y-6">
        {/* Decorative Animation */}
        <div className="relative">
          <div
            className={`w-40 h-40 rounded-full animate-bounce ${
              isDarkMode ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-yellow-400 to-orange-500"
            }`}
          ></div>
          <div className="absolute top-10 left-10 text-6xl font-bold">
            <span
              className={`${
                isDarkMode ? "text-gray-900" : "text-gray-100"
              } select-none`}
            >
              404
            </span>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-extrabold tracking-tight">
          Oops! Page Not Found
        </h1>
        <p className="text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleGoHome}
          className={`px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-transform duration-300 ${
            isDarkMode
              ? "bg-purple-500 hover:bg-purple-700 text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
