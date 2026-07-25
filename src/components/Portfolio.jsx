// src/components/Portfolio.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiMail, FiPhone, FiExternalLink, FiGithub, FiArrowUp, FiMenu, FiX, FiBriefcase, FiCalendar, FiPackage, FiTarget, FiSend, FiAlertCircle, FiMap, FiUsers, FiAward, FiBook, FiHeart } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaTools, FaGraduationCap, FaCertificate, FaStar, FaMicrochip } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './LazyImage';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import ScrollIndicator from './ScrollIndicator';

const featuredProjects = [
  {
    id: "digitalization",
    title: "Digitalisation du processus — Briqueterie Jbel Annour",
    summary: "Application web pour digitaliser le suivi de production et intégrer QHSE.",
    image: "/assets/project-digitalization.jpg",
    tech: ["React", "Tailwind", "API"],
    details: "Développement d'une solution complète pour la collecte des données de production en temps réel, création de tableaux de bord KPI personnalisés, et mise en place d'un système d'amélioration continue intégré à la gestion QHSE.",
    link: "https://processus-briquetrie-jbelannour.netlify.app",
    featured: true
  },
  {
    id: "cfd",
    title: "Simulation CFD — Échangeur de chaleur",
    summary: "Simulation numérique sous ANSYS Fluent d'un échangeur de chaleur à calandre et serpentin.",
    image: "/assets/project-cfd.jpg",
    tech: ["ANSYS Fluent", "CFD", "Thermodynamique"],
    details: "Analyse complète de la dynamique des fluides et des transferts thermiques pour optimiser la conception de l'échangeur. Validation des résultats par comparaison avec les données expérimentales.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_cfd-ansys-fluent-activity-7341911140664270850-QmjZ",
    featured: true
  },
  {
    id: "maintenance-web",
    title: "Plateforme de gestion maintenance",
    summary: "Application web pour la gestion des équipements et interventions industriels.",
    image: "/assets/project-maintenance.jpg",
    tech: ["JavaScript", "Netlify", "Vercel", "Neon"],
    details: "Architecture cloud complète avec déploiement multi-plateforme. Système de suivi des interventions en temps réel, gestion des stocks de pièces détachées, et planification préventive.",
    link: "https://lighthearted-tanuki-c23b06.netlify.app/app",
    featured: true
  },
  {
    id: "aspen",
    title: "Simulation de procédés (ASPEN Plus)",
    summary: "Modélisation des opérations de séchage et distillation pour optimisation industrielle.",
    image: "/assets/project-aspen.jpg",
    tech: ["ASPEN Plus", "Excel"],
    details: "Définition des schémas de procédés complets, calcul des bilans matière et énergie, et optimisation des paramètres opératoires pour maximiser l'efficacité.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_aspenplus-simulationdeprocaezdaezs-gaezniedesprocaezdaezs-activity-7324255012086312960-Qij_"
  },
  {
    id: "unifac",
    title: "Estimation paramètres UNIFAC",
    summary: "Développement de modèle thermodynamique pour le calcul des coefficients d'activité.",
    image: "/assets/project-unifac.jpg",
    tech: ["Python", "MATLAB"],
    details: "Collecte et traitement des données expérimentales, calibration du modèle UNIFAC, et validation par comparaison avec les mesures de laboratoire.",
    link: null
  },
  {
    id: "n8n",
    title: "Surveillance automatisée des paramètres de procédé",
    summary: "Système de monitoring temps réel pour le suivi des paramètres critiques de production.",
    image: "/assets/n8nandgp.jpg",
    tech: ["n8n", "API", "Tableaux de bord"],
    details: "Développement d'un système de surveillance continue des paramètres de procédé avec alertes automatiques et visualisation des tendances pour faciliter la prise de décision.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_n8n-automation-geniedesprocedes-activity-7383585907276414977-VLCl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwqsD8B1ejiJJ20WVhiCfE_UP8ZveahckA",
    featured: true
  },
  {
    id: "evaporation-cristallisation",
    title: "Simulateur Avancé — Évaporation & Cristallisation",
    summary: "Application web complète pour la simulation et l'optimisation de procédés industriels de sucre.",
    image: "/assets/project-evaporation.png",
    tech: ["Streamlit", "Python", "Docker", "Plotly", "Render"],
    details: "Conception et simulation d'une unité intégrée d'évaporation à triple effet et de cristallisation batch. Interface utilisateur interactive avec visualisations des données en temps réel et export des résultats.",
    link: "https://simulateur-evaporation-latest.onrender.com",
    github: "https://github.com/ZAKRAOUI036/simulateur-evaporation-cristallisation.git",
    docker: "https://hub.docker.com/r/kawtarelidrissi/simulateur-evaporation",
    featured: false
  }
];

const experiences = [
  {
    id: 1,
    company: "STMicroelectronics",
    role: "Ingénieur Procédés & Qualité",
    period: "2025 - Actuel",
    location: "Rabat",
    description: "Conception et optimisation de procédés industriels pour la fabrication de semi-conducteurs. Analyse des paramètres critiques, mise en place de plans d'expériences, et amélioration continue des processus de production.",
    skills: ["ASPEN Plus", "Qualité", "DOE", "Statistiques", "GMP"],
    current: true
  },
  {
    id: 2,
    company: "Club CTDE - FST Settat",
    role: "Trésorier",
    period: "2023 - 2024",
    location: "Settat",
    description: "Gestion budgétaire et financière du club scientifique. Élaboration des prévisions, suivi des dépenses, optimisation des ressources, et organisation d'événements scientifiques avec un budget de [montant] MAD.",
    skills: ["Gestion budgétaire", "Planification financière", "Communication", "Leadership", "Événementiel"],
    current: false
  },
  {
    id: 3,
    company: "Briqueterie Jbel Annour",
    role: "Stagiaire Ingénieur Procédés",
    period: "2024",
    location: "Settat",
    description: "Digitalisation du processus de production, mise en place d'un système de suivi KPI, et intégration des normes QHSE. Réduction des déchets de 15% et amélioration de la productivité.",
    skills: ["Digitalisation", "QHSE", "KPI", "Optimisation", "Analyse"],
    current: false
  },
  {
    id: "copag",
    company: "COPAG",
    logo: "/assets/logos/copag.png",
    role: "Stagiaire",
    period: "Juil. 2024 · 1 mois",
    location: "Taroudant, Souss-Massa, Maroc",
    description: [
      "Découverte des procédés industriels et participation au suivi de la production."
    ],
    skills: ["Processus industriels", "Travail en équipe"]
  },
  {
    id: "onssa",
    company: "ONSSA",
    logo: "/assets/logos/onssa.png",
    role: "Stagiaire",
    period: "Mai 2023 - Juil. 2023 · 3 mois",
    location: "Agadir, Souss-Massa, Maroc",
    description: [
      "Contrôle de la qualité microbiologique des denrées alimentaires dans un cadre réglementaire.",
      "Gestion documentaire rigoureuse et suivi de la traçabilité."
    ],
    skills: ["Analyses microbiologiques", "Techniques de laboratoire", "Documentation qualité"]
  }
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProjects = activeFilter === "all" 
    ? featuredProjects 
    : featuredProjects.filter(project => project.featured);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`} style={{ zoom: '80%' }}>
      {/* Indicateur de scroll et navigation */}
      <ScrollIndicator />
      {/* En-tête minimaliste - Logo et boutons essentiels seulement */}
      <header className={`fixed w-full backdrop-blur-xl z-50 transition-all duration-300 ${
        isDark ? 'bg-gray-900/90 border-gray-800/50' : 'bg-white/90 border-gray-200/50'
      } border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo et branding simplifié */}
            <motion.a 
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                  MZ
                </div>
                {/* Effet de brillance */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                  Mohamed Zakraoui
                </h1>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ingénieur Procédés</p>
              </div>
            </motion.a>
            
            {/* Boutons essentiels seulement */}
            <div className="flex items-center gap-2">
              {/* Bouton Contact */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Contact</span>
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              
              {/* ThemeToggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1"
              >
                <ThemeToggle />
              </motion.div>

              {/* Menu mobile */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2 rounded-lg transition-all duration-300 sm:hidden ${
                  isDark ? 'text-gray-300 hover:bg-gray-800/50' : 'text-gray-700 hover:bg-gray-100/50'
                }`}
              >
                <div className="relative w-4 h-4">
                  <motion.div
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 5 : 0
                    }}
                    className="absolute w-4 h-0.5 bg-current transition-all duration-300"
                  />
                  <motion.div
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1
                    }}
                    className="absolute w-4 h-0.5 bg-current top-1.5 transition-all duration-300"
                  />
                  <motion.div
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -5 : 0
                    }}
                    className="absolute w-4 h-0.5 bg-current top-3 transition-all duration-300"
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`sm:hidden mt-3 pt-3 border-t transition-colors ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <nav className="space-y-1">
                  {[
                    { id: "about", label: "À propos" },
                    { id: "projects", label: "Projets" },
                    { id: "experience", label: "Expériences" },
                    { id: "skills", label: "Compétences" },
                    { id: "certifications", label: "Certifications" },
                    { id: "contact", label: "Contact" }
                  ].map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-800/50 hover:text-indigo-400' 
                          : 'text-gray-700 hover:bg-gray-100/50 hover:text-indigo-600'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="pt-20 max-w-7xl mx-auto px-6 space-y-24">
        {/* Hero Section améliorée */}
        <section id="home" className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <FaStar className="text-yellow-500" />
              Ingénieur diplômé à la recherche d'opportunités
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ingénieur Procédés
              </span>
              <br />
              <span className={isDark ? "text-gray-100" : "text-gray-900"}>& Assurance Qualité</span>
            </h1>
            
            <p className={`mt-6 text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              J'optimise les procédés industriels, digitalise les opérations, et garantis la conformité qualité. 
              Passionné par l'innovation technologique et l'amélioration continue.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/CV_Zakraoui_Mohamed.pdf"
                className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 border-2 border-indigo-500 text-indigo-400 hover:bg-gray-700' 
                    : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <FiDownload /> Télécharger CV
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Voir mes projets
              </motion.a>
            </div>
            
            <div className="mt-8 flex gap-6">
              {[
                { icon: FiMail, link: "mailto:mohamed_zakraoui@hotmail.com", label: "Email" },
                { icon: FiPhone, link: "tel:+212651447184", label: "Téléphone" },
                { icon: FiGithub, link: "https://github.com", label: "GitHub" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={item.link}
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <item.icon /> {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <LazyImage 
                  src="/assets/photo.jpg" 
                  alt="Mohamed Zakraoui" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges flottants */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border"
              >
                <span className="text-sm font-semibold text-indigo-600">Stagiaire PFE chez STMicroelectronics</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-full shadow-lg border"
              >
                <span className="text-sm font-semibold text-purple-600">Disponible</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* À propos de moi - Version Masterpiece */}
        <section id="about" className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background décoratif */}
            <div className={`absolute inset-0 rounded-3xl transform rotate-1 -z-10 ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20' 
                : 'bg-gradient-to-br from-indigo-50/30 to-purple-50/30'
            }`}></div>
            
            <div className={`relative rounded-3xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700' 
                : 'bg-white/90 border-white'
            }`}>
              {/* En-tête avec pattern */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="pattern-dots pattern-indigo-100 pattern-size-2 pattern-opacity-100 w-full h-full"></div>
                </div>
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl font-bold text-white mb-4"
                >
                  About Me
                </motion.h2>
                <div className="w-32 h-1 bg-white/50 mx-auto rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Colonne gauche - Photo et parcours académique */}
                <div className={`p-12 transition-colors duration-300 ${
                  isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse blur-xl opacity-30"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                        <LazyImage 
                          src="/assets/photo.jpg" 
                          alt="Mohamed Zakraoui" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Badge flottant - Diplômé */}
                      <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full shadow-lg"
                      >
                        <span className="text-sm font-bold flex items-center gap-1">
                        <FaGraduationCap className="text-xs" /> Diplômé
                      </span>
                      </motion.div>
                    </div>

                    {/* Stats rapides */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        { number: "5", label: "Stages" },
                        { number: "2", label: "PFE" },
                        { number: "5", label: "Années" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="text-center p-3"
                        >
                          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {stat.number}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Colonne droite - Parcours académique et expérience */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="p-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Mon Parcours</h3>
                  </div>

                  {/* Parcours académique */}
                  <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-indigo-50'}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FaGraduationCap className="text-indigo-600" />
                      <span className="text-indigo-600">Parcours Académique</span>
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Ingénieur en procédés industriels diplômé de la FST Settat. Spécialisé en simulation, digitalisation et optimisation des processus industriels avec une approche orientée vers l'innovation technologique et l'amélioration continue.
                    </p>
                  </div>

                  {/* Stages */}
                  <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-purple-50'}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FiBriefcase className="text-purple-600" />
                      <span className="text-purple-600">Expérience Professionnelle</span>
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>5 stages</strong> réalisés dans diverses entreprises industrielles, dont <strong>2 Projets de Fin d'Études (PFE)</strong> dont un chez STMicroelectronics. Ces expériences m'ont permis de développer des compétences pratiques en simulation, gestion de projet et travail en équipe.
                    </p>
                  </div>

                  {/* Leadership Club CTDE */}
                  <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-green-50'}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FiTarget className="text-green-600" />
                      <span className="text-green-600">Leadership Associatif</span>
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Trésorier du Club CTDE</strong> à la FST Settat. J'ai géré le budget complet, élaboré des prévisions financières et optimisé les ressources pour nos événements scientifiques et activités sociales, développant ainsi des compétences en gestion budgétaire et leadership étudiant.
                    </p>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex gap-4"
                  >
                    <a 
                      href="#contact" 
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      Discutons de votre projet
                    </a>
                    <a 
                      href="/assets/CV_Zakraoui_Mohamed.pdf"
                      className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300"
                    >
                      Télécharger CV
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Engagement Bénévole */}
        <section id="benevolat" className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium mb-6"
              >
                <FiTarget className="text-lg" />
                Engagement Social & Humanitaire
              </motion.div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Mon Engagement Bénévole
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Contribution active au développement social et humanitaire à travers diverses initiatives communautaires
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Colonne gauche - Statistiques et activités */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Statistiques */}
                <div className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
                }`}>
                  {[
                    { number: "20+", label: "Activités" },
                    { number: "100+", label: "Jours d'action" },
                    { number: "1000+", label: "Personnes aidées" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Liste des activités */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'}`}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>Activités réalisées</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: FiMap, text: "Caravane humanitaire (forage de puits, distribution paniers, réaménagement écoles et mosquées)" },
                      { icon: FiPackage, text: "Paniers de Ramadan" },
                      { icon: FaStar, text: "Kharouf l'Aid" },
                      { icon: FiCalendar, text: "Iftar Saaim" },
                      { icon: FiUsers, text: "Visites sociales" },
                      { icon: FiAward, text: "Compétition et forum social" },
                      { icon: FiTarget, text: "Projet durable" },
                      { icon: FiBook, text: "Caravane éducative" },
                      { icon: FiHeart, text: "Dons du sang" }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          isDark ? 'bg-gray-700/30' : 'bg-gray-50'
                        }`}
                      >
                        <activity.icon className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{activity.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Colonne droite - Image collage */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center"
              >
                <div className={`w-full p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'}`}>
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>Galerie d'actions</span>
                    </h3>
                  </div>
                  
                  {/* Image collage */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 border-2 border-green-200 dark:border-gray-500">
                    <img 
                      src="/assets/benevolat-collage.jpg" 
                      alt="Collage activités bénévoles" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image not found:', e.target.src);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <strong>Club CTDE</strong> & Initiatives communautaires
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Expériences professionnelles améliorées */}
        <section id="experience" className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-xl border p-8 lg:p-12 transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700' 
                : 'bg-white/80 backdrop-blur-sm border-white'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Parcours Professionnel
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
              {/* Ligne timeline */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                isDark ? 'bg-gradient-to-b from-indigo-800 to-purple-800' : 'bg-gradient-to-b from-indigo-200 to-purple-200'
              }`}></div>
              
              <div className="space-y-12">
                {[
                  {
                    id: "stmicroelectronics",
                    company: "STMicroelectronics",
                    logo: "/assets/logos/stmicroelectronics.png",
                    role: "Ingénieur Procédés & Qualité",
                    period: "Mars 2025 - Présent · 4+ mois",
                    location: "Bouskoura, Maroc",
                    description: [
                      "Participation à un projet de réduction des pertes de matière (glue et leadframe) sur procédé Die Attach.",
                      "Rédaction des OPLs (One Point Lessons) pour la standardisation des bonnes pratiques.",
                      "Utilisation de la méthodologie DMAIC et de l'outil AMDEC (FMEA) pour l'analyse des risques et des causes.",
                      "Suivi des indicateurs de performance et reporting technique."
                    ],
                    skills: ["DMAIC", "Process Engineering", "Analyse statistique", "Qualité industrielle"],
                    current: true
                  },
                  {
                    id: "briqueterie",
                    company: "Briqueterie Jbel Annour",
                    logo: "/assets/logos/briqueterie.png",
                    role: "Stagiaire",
                    period: "Juil. 2025 - Août 2025 · 2 mois",
                    location: "Mohammédia, Casablanca-Settat, Maroc",
                    description: [
                      "Digitalisation du processus de fabrication de briques via la conception et le développement d'une application web.",
                      "Intégré au service QHSE et Processus.",
                      "Analyse et traitement des procédés de production.",
                      "Participation à l'amélioration continue des processus selon les exigences QHSE."
                    ],
                    skills: ["Applications web", "Normes ISO", "Amélioration continue"],
                    current: false
                  },
                  {
                    id: "copag",
                    company: "COPAG",
                    logo: "/assets/logos/copag.png",
                    role: "Stagiaire",
                    period: "Juil. 2024 · 1 mois",
                    location: "Taroudant, Souss-Massa, Maroc",
                    description: [
                      "Découverte des procédés industriels et participation au suivi de la production."
                    ],
                    skills: ["Processus industriels", "Travail en équipe"]
                  },
                  {
                    id: "onssa",
                    company: "ONSSA",
                    logo: "/assets/logos/onssa.png",
                    role: "Stagiaire",
                    period: "Mai 2023 - Juil. 2023 · 3 mois",
                    location: "Agadir, Souss-Massa, Maroc",
                    description: [
                      "Contrôle de la qualité microbiologique des denrées alimentaires dans un cadre réglementaire.",
                      "Gestion documentaire rigoureuse et suivi de la traçabilité."
                    ],
                    skills: ["Analyses microbiologiques", "Techniques de laboratoire", "Documentation qualité"]
                  },
                  {
                    id: "hsb",
                    company: "Les Huileries du Souss Belhassan (HSB)",
                    logo: "/assets/logos/hsb.png",
                    role: "Stagiaire",
                    period: "Mars 2023 - Avr. 2023 · 2 mois",
                    location: "Agadir, Souss-Massa, Maroc",
                    description: [
                      "Étude du procédé de raffinage de l'huile de palme et mise à jour du système HACCP.",
                      "Participation à la gestion et optimisation des procédés industriels."
                    ],
                    skills: ["HACCP", "Normes de sécurité alimentaire", "Gestion de production", "Optimisation procédés"]
                  },
                  {
                    id: "rafii",
                    company: "RAFII",
                    logo: "/assets/logos/rafii.png",
                    role: "Stagiaire",
                    period: "Août 2022 · 1 mois",
                    location: "Ait Melloul, Souss-Massa, Maroc",
                    description: [
                      "Découverte du processus de fabrication du yaourt ferme et réalisation d'analyses physico-chimiques."
                    ],
                    skills: [
                      "Fabrication produits laitiers fermentés",
                      "Analyses physico-chimiques", 
                      "Contrôle qualité"
                    ]
                  }
                ].map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex gap-8"
                  >
                    {/* Point sur la timeline */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl border-4 border-white shadow-lg flex items-center justify-center ${
                        exp.current ? 'bg-gradient-to-r from-green-400 to-blue-400' : 
                        index === 0 ? 'bg-gradient-to-r from-indigo-400 to-purple-400' :
                        index === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                        index === 2 ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                        index === 3 ? 'bg-gradient-to-r from-orange-400 to-red-400' :
                        'bg-gradient-to-r from-green-400 to-emerald-400'
                      }`}>
                        <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain" />
                      </div>
                      {exp.current && (
                        <div className="absolute -top-2 -right-2">
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold animate-pulse">
                            Actuel
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Carte expérience */}
                    <div className={`flex-1 rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow duration-300 group ${
                      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}>
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className={`font-bold text-xl group-hover:text-indigo-600 transition-colors ${
                            isDark ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {exp.company}
                          </h3>
                          <p className="text-indigo-600 font-semibold">{exp.role}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {exp.period}
                          </span>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.location}</p>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className={`flex items-start gap-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <span className="text-indigo-500 mt-1.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bannière statistiques des expériences */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl text-white p-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { number: "5", label: "Expériences", icon: <FiBriefcase className="text-3xl" /> },
                  { number: "12+", label: "Mois cumulés", icon: <FiCalendar className="text-3xl" /> },
                  { number: "5", label: "Secteurs", icon: <FiPackage className="text-3xl" /> },
                  { number: "18+", label: "Compétences", icon: <FiTarget className="text-3xl" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-indigo-100 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section Certifications */}
        <section id="certifications" className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mes Certifications
              </h2>
              <p className="text-gray-600 mt-4">Formations et certifications attestant de mes compétences</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Sécurité Industrielle",
                  issuer: "MC CCP",
                  category: "Sécurité",
                  icon: FaTools,
                  featured: true
                },
                {
                  title: "Six Sigma Green Belt",
                  issuer: "LinkedIn Learning",
                  category: "Qualité",
                  icon: FaGraduationCap,
                  featured: true
                },
                {
                  title: "Les fondements de l'amélioration des processus",
                  issuer: "LinkedIn Learning & PMI",
                  category: "Management",
                  icon: FaCertificate,
                  featured: true
                },
                {
                  title: "ISO 9001",
                  issuer: "Norme Internationale",
                  category: "Management Qualité",
                  icon: FaCertificate
                },
                {
                  title: "ISO 45001",
                  issuer: "Norme Internationale",
                  category: "Sécurité au Travail",
                  icon: FaCertificate
                },
                {
                  title: "IATF 16949:2016",
                  issuer: "ALISON",
                  category: "Automobile",
                  icon: FaCertificate
                }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
                >
                  {/* Badge featured pour les certifications importantes */}
                  {cert.featured && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <FaStar className="text-xs" /> Phare
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">
                        <cert.icon />
                      </div>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                        {cert.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-gray-600">{cert.issuer}</span>
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <FaCertificate className="text-sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Certification validée</span>
                      <span>✓</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bannière statistiques mise à jour */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl text-white p-8 text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "6+", label: "Certifications" },
                  { number: "4+", label: "Domaines" },
                  { number: "100%", label: "Complétées" },
                  { number: "3", label: "Certifications phares" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-indigo-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Projets améliorés avec filtres */}
        <section id="projects" className="py-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mes Projets
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Découvrez une sélection de mes réalisations en simulation, développement web et optimisation de procédés
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <StaggerItem key={project.id} direction="up" distance={30}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`group rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-white/90 backdrop-blur text-xs rounded-full font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                          <FaStar className="text-xs mr-1" /> Phare
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {project.summary}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <button 
                        onClick={() => setActiveProject(project)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                        aria-label={`Voir les détails du projet ${project.title}`}
                      >
                        Voir détails
                      </button>
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                          aria-label={`Voir le projet ${project.title} dans un nouvel onglet`}
                        >
                          <FiExternalLink className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Compétences améliorées */}
        <SkillsSection />

        {/* Contact amélioré */}
        <ContactSection />
      </main>

      {/* Modal projet */}
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

      {/* Bouton scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer amélioré */}
      <Footer />
    </div>
  );
}

// ------------------------------------------------------------------
// SkillsSection (remplacée et nettoyée : pas de "AI/IA", icons React)
// ------------------------------------------------------------------
function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* En-tête simple et professionnel */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Compétences Techniques
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Ensemble de compétences techniques et professionnelles acquises durant ma formation et mes expériences
          </p>
        </div>

        {/* Grid principale des compétences */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne gauche - Simulation & Développement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Carte Simulation Industrielle */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <FaMicrochip />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Simulation & Procédés</h3>
                  <p className="text-green-600 text-sm">Optimisation scientifique</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { tool: "ASPEN Plus", application: "Simulation de procédés", expertise: "Avancé" },
                  { tool: "ANSYS Fluent", application: "Dynamique des fluides", expertise: "Avancé" },
                  { tool: "CFD Analysis", application: "Transferts thermiques", expertise: "Avancé" },
                  { tool: "MATLAB/Python", application: "Modélisation numérique", expertise: "Intermédiaire" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="font-semibold text-gray-800">{item.tool}</div>
                      <div className="text-sm text-gray-600">{item.application}</div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.expertise}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte Développement Digital */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <FiDownload />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Développement Digital</h3>
                  <p className="text-blue-600 text-sm">Applications web modernes</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { technology: "React.js", purpose: "Interfaces utilisateur", projects: "x assistés" },
                  { technology: "Tailwind CSS", purpose: "Design responsive", projects: "x assistés" },
                  { technology: "Node.js/API", purpose: "Backend & intégration", projects: "x assistés" },
                  { technology: "Bases de données", purpose: "Gestion des données", projects: "Cloud & local" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800">{item.technology}</div>
                      <div className="text-xs text-gray-600">{item.purpose}</div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {item.projects}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Colonne droite - Gestion & Qualité */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Carte Gestion de Projet */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <FiTarget />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Gestion de Projet</h3>
                  <p className="text-purple-600 text-sm">Méthodologies & Outils</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { method: "DMAIC", application: "Amélioration continue", expertise: "Green Belt" },
                  { method: "Agile", application: "Gestion itérative", expertise: "Intermédiaire" },
                  { method: "Planification", application: "Gantt & Roadmap", expertise: "Avancé" },
                  { method: "Reporting", application: "KPI & Dashboard", expertise: "Avancé" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800">{item.method}</div>
                      <div className="text-xs text-gray-600">{item.application}</div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {item.expertise}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte Qualité & Management */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <FaTools />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Qualité & Management</h3>
                  <p className="text-orange-600 text-sm">Excellence opérationnelle</p>
                </div>
              </div>
              
              <div className="grid gap-3">
                {[
                  { standard: "HACCP", domain: "Sécurité alimentaire", level: "Maîtrise" },
                  { standard: "ISO 9001/45001/14001", domain: "Management qualité", level: "Maîtrise" },
                  { standard: "Six Sigma", domain: "Amélioration continue", level: "Green Belt" },
                  { standard: "IATF 16949", domain: "Automobile", level: "Certifié" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800">{item.standard}</div>
                      <div className="text-xs text-gray-600">{item.domain}</div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// ContactSection (inchangé dans la logique, mais textes conservés)
// ------------------------------------------------------------------
function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Configuration sécurisée avec valeurs par défaut
  const getEmailJSConfig = () => {
    try {
      return {
        SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service_id',
        TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template_id',
        PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_public_key'
      };
    } catch (error) {
      console.error('Erreur de configuration EmailJS:', error);
      return {
        SERVICE_ID: 'default_service_id',
        TEMPLATE_ID: 'default_template_id', 
        PUBLIC_KEY: 'default_public_key'
      };
    }
  };

  const EMAILJS_CONFIG = getEmailJSConfig();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Tentative d\'envoi du formulaire...');
    
    setIsSubmitting(true);
  
    try {
      // Configuration EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email, 
        message: formData.message
      };
  
      console.log('Envoi EmailJS en cours...');
  
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
  
      console.log('EmailJS envoyé avec succès:', result);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
      
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      
      alert('EmailJS n\'est pas configuré. Vous allez être redirigé vers votre client email.');
      
      const subject = `Contact Portfolio - ${formData.name || 'Visiteur'}`;
      const body = `Bonjour Mohamed,
  
Je vous contacte via votre portfolio :
  
"${formData.message}"
  
---
Cordialement,
${formData.name || 'Anonyme'}
${formData.email ? `Email: ${formData.email}` : ''}
  
[Message envoyé depuis le portfolio mohamedzakraoui.com]`;
  
      window.location.href = `mailto:mohamed_zakraoui@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl text-white p-8 lg:p-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Travaillons ensemble</h2>
          <p className="text-indigo-100 mt-4">Disponible pour des opportunités professionnelles</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Informations de contact */}
          <div>
            <div className="space-y-4">
              {[
                { 
                  icon: FiMail, 
                  label: "Email", 
                  value: "mohamed_zakraoui@hotmail.com", 
                  link: "mailto:mohamed_zakraoui@hotmail.com"
                },
                { 
                  icon: FiPhone, 
                  label: "Téléphone", 
                  value: "+212 6 51 44 71 84", 
                  link: "tel:+212651447184"
                },
                { 
                  icon: FiGithub, 
                  label: "GitHub", 
                  value: "github.com/ZAKRAOUI034", 
                  link: "https://github.com/ZAKRAOUI034"
                }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <item.icon className="text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-indigo-100">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white/10 rounded-xl p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-400 text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                <p className="text-indigo-100">
                  Merci pour votre message. Je vous répondrai rapidement.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom" 
                  required
                  className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70 border border-white/30 focus:border-white focus:outline-none"
                  disabled={isSubmitting}
                />
                
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Votre email" 
                  required
                  className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70 border border-white/30 focus:border-white focus:outline-none"
                  disabled={isSubmitting}
                />
                
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Votre message" 
                  rows="4"
                  required
                  className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70 border border-white/30 focus:border-white focus:outline-none resize-none"
                  disabled={isSubmitting}
                ></textarea>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// Footer, ProjectModal
// ------------------------------------------------------------------
function Footer() {
  return (
    <footer className="mt-20 py-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            MZ
          </div>
          <div className="text-left">
            <div className="font-bold">Mohamed Zakraoui</div>
            <div className="text-gray-400 text-sm">Ingénieur Procédés & Qualité</div>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mb-6">
          {[FiMail, FiPhone, FiGithub].map((Icon, index) => (
            <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Icon className="text-xl" />
            </a>
          ))}
        </div>
        
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Mohamed Zakraoui. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <LazyImage 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
            {project.featured && (
              <span className="px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold flex items-center gap-1">
                <FaStar /> Projet phare
              </span>
            )}
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed">{project.details}</p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map(tech => (
              <span key={tech} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
          
          {project.link && (
            <div className="mt-8">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              >
                <FiExternalLink /> Voir le projet
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
