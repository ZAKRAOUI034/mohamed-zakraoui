import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Placeholder avec animation de loading */}
      {!isLoaded && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 ${className}`}
          animate={{ opacity: isInView ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 1.5, repeat: isInView ? Infinity : 0 }}
        />
      )}
      
      {/* Image avec fade-in */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
