import React from 'react';

const AnimatedButton = ({ 
  children, 
  onClick, 
  href, 
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
  };
  
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-3.5 text-lg"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const Component = href ? 'a' : 'button';

  return (
    <div className="hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-transform duration-200">
      <Component
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
};

export const FloatingButton = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 hover:rotate-5 active:scale-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
