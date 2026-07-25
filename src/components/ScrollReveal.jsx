import React from 'react';

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  distance = 30,
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'scale':
        return { scale: 0.8, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const StaggerContainer = ({ children, staggerDelay = 0.1, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const StaggerItem = ({ children, direction = 'up', distance = 30, duration = 0.6 }) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'scale':
        return { scale: 0.8, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <div>
      {children}
    </div>
  );
};

export default ScrollReveal;
