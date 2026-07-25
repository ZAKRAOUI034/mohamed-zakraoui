import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
    >
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 ${isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      />
      
      <div
        className={`relative z-10 transition-all duration-300 ${isDark ? 'rotate-180 scale-80' : 'rotate-0 scale-100'}`}
      >
        {isDark ? (
          <FiMoon className="text-white text-xl" />
        ) : (
          <FiSun className="text-white text-xl" />
        )}
      </div>
      
      {/* Effet de brillance */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-200" />
    </button>
  );
};

export default ThemeToggle;
