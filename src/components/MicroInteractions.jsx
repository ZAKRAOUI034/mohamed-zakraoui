import React from 'react';
import { motion } from 'framer-motion';

// Composant pour les cartes avec effet de levée subtil
export const HoverCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Composant pour les boutons avec effet tactile
export const TactileButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'medium'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        mass: 0.5
      }}
      className={`rounded-xl font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// Composant pour les badges animés
export const AnimatedBadge = ({ children, className = '', color = 'indigo' }) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    green: 'bg-green-100 text-green-700 border border-green-200',
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    yellow: 'bg-yellow-100 text-yellow-700 border border-yellow-200'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        rotate: [0, 2, -2, 0],
        transition: { duration: 0.3 }
      }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[color]} ${className}`}
    >
      {children}
    </motion.span>
  );
};

// Composant pour les icônes avec effet de pulsation
export const PulseIcon = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      animate={{
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut"
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Composant pour les cartes de statistiques avec effet de comptage
export const CountingStat = ({ number, label, icon, duration = 2, className = '' }) => {
  const [displayNumber, setDisplayNumber] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && number > 0) {
      const increment = number / (duration * 60); // 60 fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setDisplayNumber(number);
          clearInterval(timer);
        } else {
          setDisplayNumber(Math.floor(current));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isVisible, number, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className={`text-center p-6 rounded-xl ${className}`}
    >
      {icon && (
        <div className="text-3xl mb-3">
          <PulseIcon delay={0.5}>{icon}</PulseIcon>
        </div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {typeof number === 'string' ? number : displayNumber}
      </div>
      
      <div className="text-sm font-medium text-gray-600">
        {label}
      </div>
    </motion.div>
  );
};

// Composant pour les liens avec effet de soulignement animé
export const AnimatedLink = ({ children, href, className = '' }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-block font-medium transition-colors duration-300 hover:text-indigo-600 ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.a>
  );
};

// Composant pour les sections avec effet de parallaxe subtil
export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{ y: scrollY * speed }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
