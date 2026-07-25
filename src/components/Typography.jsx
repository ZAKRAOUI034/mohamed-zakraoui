import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

// Composant pour les titres de section
export const SectionTitle = ({ children, subtitle, className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {children}
        </span>
      </h2>
      
      {subtitle && (
        <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {subtitle}
        </p>
      )}
      
      {/* Ligne décorative */}
      <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-6 rounded-full" />
    </div>
  );
};

// Composant pour les cartes de contenu
export const ContentCard = ({ 
  children, 
  title, 
  icon, 
  className = '', 
  hover = true,
  delay = 0 
}) => {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`rounded-2xl shadow-lg border p-6 transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-100 hover:bg-gray-50'
      } ${hover ? 'hover:-translate-y-1 hover:scale-[1.02]' : ''} ${className}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              {icon}
            </div>
          )}
          <h3 className={`text-xl font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
      )}
      
      {children}
    </div>
  );
};

// Composant pour les badges
export const Badge = ({ children, variant = 'primary', size = 'medium', className = '' }) => {
  const variants = {
    primary: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    secondary: 'bg-purple-100 text-purple-700 border border-purple-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200'
  };
  
  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

// Composant pour les statistiques
export const StatCard = ({ number, label, icon, trend, className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`text-center p-6 rounded-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } ${className}`}>
      {icon && (
        <div className="text-3xl mb-3">{icon}</div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      
      <div className={`text-sm font-medium ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}
      </div>
      
      {trend && (
        <div className={`mt-2 text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
          {trend === 'up' ? <FiTrendingUp className="inline w-3 h-3" /> : 
           trend === 'down' ? <FiTrendingDown className="inline w-3 h-3" /> : 
           <FiMinus className="inline w-3 h-3" />}
        </div>
      )}
    </div>
  );
};

// Composant pour les listes améliorées
export const EnhancedList = ({ items, className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex items-start gap-3 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default SectionTitle;
