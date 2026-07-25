import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiUser, FiBriefcase, FiAward, FiCode, FiTool, FiMail, FiArrowUp, FiGrid, FiSun, FiMoon } from 'react-icons/fi';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const sections = [
    { id: 'home', label: 'Accueil', icon: FiHome, color: 'from-blue-500 to-cyan-500' },
    { id: 'about', label: 'À propos', icon: FiUser, color: 'from-purple-500 to-pink-500' },
    { id: 'experience', label: 'Expériences', icon: FiBriefcase, color: 'from-green-500 to-emerald-500' },
    { id: 'certifications', label: 'Certifications', icon: FiAward, color: 'from-yellow-500 to-orange-500' },
    { id: 'projects', label: 'Projets', icon: FiCode, color: 'from-indigo-500 to-purple-500' },
    { id: 'skills', label: 'Compétences', icon: FiTool, color: 'from-red-500 to-rose-500' },
    { id: 'contact', label: 'Contact', icon: FiMail, color: 'from-teal-500 to-cyan-500' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);

      // Déterminer la section active
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Barre de progression supérieure améliorée */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-1 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Navigation latérale améliorée */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        {/* Bouton d'expansion */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`mb-4 p-2 rounded-lg transition-all duration-300 ${
            scrollProgress > 5
              ? isDark 
                ? 'bg-gray-800/90 text-gray-300 border border-gray-700' 
                : 'bg-white/90 text-gray-700 border border-gray-200'
              : 'bg-transparent border-transparent'
          }`}
        >
          <FiGrid className="w-4 h-4" />
        </motion.button>

        {/* Menu principal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col gap-3 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                scrollProgress > 5
                  ? isDark 
                    ? 'bg-gray-800/90 border-gray-700' 
                    : 'bg-white/90 border-gray-200'
                  : 'bg-transparent border-transparent'
              }`}
            >
              {/* Bouton theme */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              </motion.button>

              {/* Bouton retour en haut */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiArrowUp className="w-4 h-4" />
              </motion.button>

              {/* Séparateur */}
              <div className={`h-px w-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`} />

              {/* Liens de navigation */}
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                        : isDark 
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } ${scrollProgress <= 5 ? 'opacity-30' : 'opacity-100'}`}
                    whileHover={{ scale: activeSection === section.id ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium text-left">
                      {section.label}
                    </span>
                    
                    {/* Indicateur actif */}
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute left-0 w-1 h-full rounded-full bg-gradient-to-r ${section.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icônes compactes quand réduit */}
        {!isExpanded && (
          <div className="flex flex-col gap-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-110`
                      : isDark 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                  } ${scrollProgress <= 5 ? 'opacity-30' : 'opacity-100'}`}
                  whileHover={{ scale: activeSection === section.id ? 1.15 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  
                  {/* Tooltip amélioré */}
                  <AnimatePresence>
                    {activeSection === section.id && scrollProgress > 5 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.8 }}
                        className="absolute left-12 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`}></div>
                          {section.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation mobile améliorée */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <motion.div
          className={`flex flex-col gap-3 p-3 rounded-2xl backdrop-blur-sm border shadow-lg ${
            isDark 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/90 border-gray-200'
          }`}
        >
          {/* Bouton retour en haut mobile */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiArrowUp className="w-4 h-4" />
          </motion.button>
          
          {/* Bouton theme mobile */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default ScrollIndicator;
