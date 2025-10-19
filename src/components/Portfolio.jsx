// src/components/Portfolio.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiMail, FiPhone, FiExternalLink, FiGithub, FiArrowUp } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaTools, FaGraduationCap, FaCertificate, FaStar, FaMicrochip } from "react-icons/fa";
import { RiRobot2Line, RiChatSmile3Line } from "react-icons/ri";
import { LuCpu } from "react-icons/lu";
import emailjs from '@emailjs/browser';

// ------------------------------------------------------------------
// Données projets (reformulations et nettoyage des mentions "AI/IA")
// ------------------------------------------------------------------
const featuredProjects = [
  {
    id: "digitalization",
    title: "Digitalisation du processus — Briqueterie Jbel Annour",
    summary: "Application web pour digitaliser le suivi de production et intégrer QHSE.",
    image: "/assets/project-digitalization.jpg",
    tech: ["React", "Tailwind", "API"],
    details: "Collecte temps réel, tableaux de bord KPI, amélioration continue, gestion QHSE.",
    link: "https://processus-briquetrie-jbelannour.netlify.app",
    featured: true
  },
  {
    id: "cfd",
    title: "Simulation CFD — Échangeur de chaleur",
    summary: "Simulation numérique sous ANSYS Fluent d'un échangeur de chaleur à calandre et serpentin.",
    image: "/assets/project-cfd.jpg",
    tech: ["ANSYS Fluent", "CFD", "Thermodynamique"],
    details: "Modélisation CFD complète pour analyser la dynamique des fluides, les transferts thermiques et optimiser la conception de l'échangeur.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_cfd-ansys-fluent-activity-7341911140664270850-QmjZ",
    featured: true
  },
  {
    id: "maintenance-web",
    title: "Application web — Gestion de maintenance",
    summary: "Plateforme pour la gestion des machines et interventions, déployée sur Netlify, Vercel et Neon.",
    image: "/assets/project-maintenance.jpg",
    tech: ["JavaScript", "Netlify", "Vercel", "Neon"],
    details: "Développement complet d'une application web avec architecture cloud, intégrant la gestion en temps réel des interventions et des machines.",
    link: "https://lighthearted-tanuki-c23b06.netlify.app/app",
    featured: true
  },
  {
    id: "aspen",
    title: "Simulation de procédés (ASPEN Plus)",
    summary: "Séchage & distillation modélisés pour optimiser les conditions opératoires.",
    image: "/assets/project-aspen.jpg",
    tech: ["ASPEN Plus", "Excel"],
    details: "Définition schémas de procédés, bilans matière/énergie, optimisation.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_aspenplus-simulationdeprocaezdaezs-gaezniedesprocaezdaezs-activity-7324255012086312960-Qij_"
  },
  {
    id: "unifac",
    title: "Estimation paramètres UNIFAC",
    summary: "Modèle thermodynamique pour transfert de matière.",
    image: "/assets/project-unifac.jpg",
    tech: ["Python", "MATLAB"],
    details: "Collecte données, calibration modèle, comparaison expérimentale.",
    link: null
  },
  {
    id: "n8n",
    title: "n8n — Surveillance automatisée des paramètres de procédé",
    summary: "Fusion du génie des procédés et de l’automatisation pour détecter les déviations critiques.",
    image: "/assets/n8nandgp.jpg",
    tech: ["n8n", "GP", "Agent d'automatisation intelligente"],
    details: "Système d'alerte continue des paramètres procédés, intégration notifications et tableaux de bord.",
    link: "https://www.linkedin.com/posts/mohamed-zakraoui-a036t_n8n-automation-geniedesprocedes-activity-7383585907276414977-VLCl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwqsD8B1ejiJJ20WVhiCfE_UP8ZveahckA",
    featured: true
  }
];

// ------------------------------------------------------------------
// Expériences (inchangées en contenu, présentes dans le portfolio)
// ------------------------------------------------------------------
const experiences = [
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
    current: true
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

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 antialiased">
      {/* Navigation améliorée */}
      <header className="fixed w-full bg-white/90 backdrop-blur-lg z-50 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              MZ
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mohamed Zakraoui
              </h1>
              <p className="text-sm text-gray-600">Ingénieur Procédés & Qualité</p>
            </div>
          </motion.div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {["about", "projects", "experience", "skills", "certifications", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group"
              >
                {item === "about" ? "À propos" : 
                 item === "projects" ? "Projets" :
                 item === "experience" ? "Expériences" :
                 item === "skills" ? "Compétences" :
                 item === "certifications" ? "Certifications" : "Contact"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero Section améliorée */}
        <section id="home" className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <FaStar className="text-yellow-500" />
              À la recherche d'un PFE stimulant
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Futur Ingénieur Procédés
              </span>
              <br />
              <span className="text-gray-900">& Assurance Qualité</span>
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              J'optimise les procédés industriels, digitalise les opérations, et garantis la conformité qualité. 
              Passionné par l'innovation technologique et l'amélioration continue.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/CV_Zakraoui_Mohamed.pdf"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
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
                <img 
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
                <span className="text-sm font-semibold text-indigo-600">+5 Projets</span>
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
        <section id="about" className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background décoratif */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-3xl transform rotate-1 -z-10"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white overflow-hidden">
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
                  Passionné par l'Excellence Industrielle
                </motion.h2>
                <div className="w-32 h-1 bg-white/50 mx-auto rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Colonne gauche - Photo et stats */}
                <div className="p-12 bg-gradient-to-br from-gray-50 to-white">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse blur-xl opacity-30"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                        <img 
                          src="/assets/photo.jpg" 
                          alt="Mohamed Zakraoui" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Badge flottant */}
                      <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full shadow-lg"
                      >
                        <span className="text-sm font-bold">🔬 Ingénieur PFE</span>
                      </motion.div>
                    </div>

                    {/* Stats rapides */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        { number: "5+", label: "Projets" },
                        { number: "5", label: "Stages" },
                        { number: "9", label: "Certifs" }
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

                {/* Colonne droite - Contenu */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="p-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Mon Parcours</h3>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    <span className="font-semibold text-indigo-600">Ingénieur en procédés industriels</span> passionné par l'innovation technologique et l'amélioration continue. Je mobilise mes compétences en simulation et en digitalisation pour contribuer à l’optimisation et à la modernisation des processus industriels.
                  </p>

                  {/* Points forts (icônes React + textes) */}
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: LuCpu, text: "Digitalisation des processus industriels" },
                      { icon: FaMicrochip, text: "Simulation et modélisation" }, 
                      { icon: RiChatSmile3Line, text: "Management qualité et normes ISO" },
                      { icon: RiRobot2Line, text: "Développement d'applications web assisté par technologies intelligentes" }
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-6 h-6 text-indigo-600"><point.icon /></div>
                        <div>{point.text}</div>
                      </motion.div>
                    ))}
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

        {/* Section Certifications */}
        <section id="certifications" className="mt-32">
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
                  title: "Digital Manufacturing & Industry 4.0",
                  issuer: "ALISON",
                  category: "Industrie 4.0",
                  icon: LuCpu,
                  featured: true
                },
                {
                  title: "Création d'applications SaaS intelligentes sans code",
                  issuer: "UDEMY",
                  category: "Applications SaaS",
                  icon: RiRobot2Line,
                  featured: true
                },
                {
                  title: "Sécurité Industrielle",
                  issuer: "MC CCP",
                  category: "Sécurité",
                  icon: FaTools,
                  featured: true
                },
                {
                  title: "Six Sigma Yellow Belt",
                  issuer: "ALISON",
                  category: "Qualité",
                  icon: FaGraduationCap,
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
                },
                {
                  title: "Machine Learning for beginners",
                  issuer: "365 Data Science",
                  category: "Data Science",
                  icon: FaMicrochip
                },
                {
                  title: "n8n — Conception d'agents d'automatisation sans code",
                  issuer: "Udemy",
                  category: "Automatisation",
                  icon: RiRobot2Line
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
                  { number: "9", label: "Certifications" },
                  { number: "6+", label: "Domaines" },
                  { number: "100%", label: "Complétées" },
                  { number: "4", label: "Certifications phares" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-indigo-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Section spéciale Industry 4.0 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl">🏭</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry 4.0 </h3>
                  <p className="text-gray-700">
                    La certification <strong>Digital Manufacturing & Industry 4.0</strong> atteste mes connaissances de base en transformation 
                    digitale des processus industriels
                  </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-blue-600 font-semibold">ALISON Certified</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Projets améliorés avec filtres */}
        <section id="projects" className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mes Projets
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Découvrez une sélection de mes réalisations en simulation, développement web et optimisation de procédés
              </p>
              
              {/* Filtres */}
              <div className="flex justify-center gap-4 mt-8">
                {["all", "featured"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100 border"
                    }`}
                  >
                    {filter === "all" ? "Tous les projets" : "Projets phares"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
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
                          <FaStar className="text-xs" /> Phare
                        </span>

                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setActiveProject(project)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                      >
                        Voir détails
                      </button>
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                        >
                          <FiExternalLink className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Expériences professionnelles améliorées */}
        <section id="experience" className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Parcours Professionnel
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
              {/* Ligne timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
              
              <div className="space-y-12">
                {[
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
                    current: true
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
                    <div className="flex-1 bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow duration-300 group">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-indigo-600 font-semibold">{exp.role}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {exp.period}
                          </span>
                          <p className="text-gray-500 text-sm mt-1">{exp.location}</p>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-indigo-500 mt-1.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
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
                  { number: "5", label: "Expériences", icon: "💼" },
                  { number: "9+", label: "Mois cumulés", icon: "📅" },
                  { number: "4", label: "Secteurs", icon: "🏭" },
                  { number: "15+", label: "Compétences", icon: "🎯" }
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
    <section id="skills" className="mt-32">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* En-tête avec icône React */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold shadow-lg mb-6"
          >
            <RiRobot2Line className="text-xl" />
            Assisté par technologies intelligentes & Digital Transformer
            <LuCpu className="text-xl" />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Stack Technologique & Approche Numérique
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            J'utilise des outils numériques avancés et des approches d'automatisation intelligente pour digitaliser et optimiser les processus industriels.
          </p>
        </div>

        {/* Grid principale des compétences */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne gauche - Outils & No-code / low-code */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Carte Outils numériques */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <RiRobot2Line />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Outils numériques & No-Code</h3>
                  <p className="text-purple-600 text-sm">Transformation digitale accélérée</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Assistants conversationnels & Copilots", level: "Avancé", icon: RiChatSmile3Line, usage: "Génération d'aide & code" },
                  { name: "Constructeurs SaaS sans code", level: "Intermédiaire", icon: RiRobot2Line, usage: "Prototypage rapide" },
                  { name: "AutoML & outils d'analyse", level: "Intermédiaire", icon: FaMicrochip, usage: "Exploration et modèles simples" },
                  { name: "Outils RPA/no-code", level: "Débutant avancé", icon: LuCpu, usage: "Automatisation des tâches" }
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-3 shadow-sm border hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl"><tool.icon /></span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {tool.level}
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-gray-800">{tool.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{tool.usage}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carte Développement Digital (formulation neutre) */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  <FiDownload />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Développement Digital assisté</h3>
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

          {/* Colonne droite - Simulation & Industrie */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Carte Simulation Industrielle */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  🔬
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
                  { standard: "Six Sigma", domain: "Amélioration continue", level: "Yellow Belt" },
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

        {/* Bannière Processus de Digitalisation assistée */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 to-purple-900 rounded-2xl shadow-2xl text-white p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">🚀 Mon Processus de Digitalisation assistée</h3>
            <p className="text-purple-200">Comment je transforme les défis industriels en solutions digitales et automatisées</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Analyse & Conception", description: "Identification des besoins", icon: "🔍" },
              { step: "2", title: "Prototypage", description: "No-code pour validation rapide", icon: "🧪" },
              { step: "3", title: "Développement", description: "Développement assisté & intégration systèmes", icon: "💻" },
              { step: "4", title: "Optimisation", description: "Analyse de données et amélioration continue", icon: "📈" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  {item.icon}
                </div>
                <div className="text-lg font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-purple-200">{item.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section Témoignage — Digitalisation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200 p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4"></div>
            <blockquote className="text-xl font-semibold text-gray-800 mb-4">
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-600 font-medium"></span>
            </div>
          </div>
        </motion.div>
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
    
    console.log('🚀 Tentative d\'envoi EmailJS...');
    
    setIsSubmitting(true);
  
    try {
      // Paramètres SIMPLES - juste les variables basiques du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email, 
        message: formData.message
      };
  
      console.log('📤 Paramètres envoyés:', templateParams);
  
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
  
      console.log('🎉 SUCCÈS EmailJS!', result);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      alert('✅ Message envoyé avec succès ! Je vous répondrai sous 24h.');
      
    } catch (error) {
      console.error('❌ Échec EmailJS:', error);
      
      alert(`📧 EmailJS n'est pas encore configuré.\n\nVous allez être redirigé vers votre client email pour m'envoyer votre message directement.`);
      
      const subject = `📧 Contact Portfolio - ${formData.name || 'Visiteur'}`;
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
    <section id="contact" className="mt-32">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl text-white p-8 lg:p-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Travaillons ensemble</h2>
          <p className="text-indigo-100 mt-4">Disponible pour un projet de fin d'études stimulant</p>
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
            <div className="text-gray-400 text-sm">Futur Ingénieur Procédés & Qualité</div>
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
          <img 
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
