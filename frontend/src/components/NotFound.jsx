import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext.jsx';

const NotFound = () => {
  const {isDarkMode} = useDarkMode();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="text-center p-10 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
        <div className="mb-6">
          <FaExclamationTriangle className="text-6xl text-red-500 animate-pulse duration-100" />
        </div>

        {/* Text Content */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg mb-6">
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