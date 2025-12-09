import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Wrench, Car, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION DES LIENS SERVICES ---
const servicesLinks = [
  { name: "Mécanique Générale", path: "/service/mecanique-generale", icon: Wrench },
  { name: "Carrosserie & Peinture", path: "/service/carrosserie-peinture", icon: Car },
  { name: "Pare-Brise", path: "/service/pare-brise", icon: ShieldCheck },
  { name: "Dépannage 24/7", path: "/service/depannage-24-7", icon: Truck },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Menu Mobile
  const [showServices, setShowServices] = useState(false); // Dropdown Desktop
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // Dropdown Mobile
  
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileServicesOpen(false); // Reset sous-menu mobile à la fermeture
  };

  // Fonction pour scroller vers une section (Pour les liens d'ancrage)
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
    setIsOpen(false);
  };

  // Styles des liens simples
  const linkClasses = (sectionId) => `
    text-sm font-medium transition-colors duration-200 cursor-pointer relative
    ${activeSection === sectionId ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-red-600'}
  `;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50 font-sans">
      <nav className="max-w-7xl mx-auto bg-white rounded-full px-8 py-4 shadow-xl shadow-gray-200/50 flex items-center justify-between relative">
        
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 outline-none">
            <div className="flex flex-col leading-none">
               <img className='h-12 object-contain' src="/Logo.png" alt="Logo" />
            </div>
          </button>
        </div>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden lg:flex items-center space-x-8">
          
          <button onClick={() => scrollToSection('about')} className={linkClasses('about')}>
            À Propos de Nous
          </button>

          {/* === DROPDOWN SERVICES (DESKTOP) === */}
          <div 
            className="relative"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button 
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${showServices ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
              onClick={() => scrollToSection('services')} // Clic direct va à la section services générale
            >
              Nos Services
              <ChevronDown size={16} className={`transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
            </button>

            {/* Le Menu Déroulant */}
            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-64"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                    {servicesLinks.map((service, index) => (
                      <Link 
                        key={index} 
                        to={service.path}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group"
                      >
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <service.icon size={18} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">
                          {service.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* === FIN DROPDOWN === */}

          <button onClick={() => scrollToSection('transparence')} className={linkClasses('transparence')}>
            Notre Engagement
          </button>
          <button onClick={() => scrollToSection('faq')} className={linkClasses('faq')}>
            FAQS
          </button>
          <button onClick={() => scrollToSection('avis')} className={linkClasses('avis')}>
            Avis
          </button>
          <button onClick={() => scrollToSection('contact')} className={linkClasses('contact')}>
            Contactez Nous
          </button>
        </div>

        {/* Partie Droite (Numéro + Bouton) */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="tel:+33143886162" 
            className="text-[#B91C1C] font-bold text-lg hover:text-red-800 transition-colors"
          >
            +33 1 43 88 61 62
          </a>

          <button 
            onClick={() => scrollToSection('contact')} 
            className="bg-[#B91C1C] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-black transition-all"
          >
            Appeler pour Réserver
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </nav>

      {/* --- MENU MOBILE --- */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-xl p-6 flex flex-col space-y-2 md:hidden border border-gray-100 animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
          
          <button onClick={() => scrollToSection('about')} className="text-lg py-3 border-b border-gray-50 text-left font-medium">À Propos</button>
          
          {/* ACCORDÉON SERVICES MOBILE */}
          <div className="border-b border-gray-50">
            <button 
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between text-lg py-3 text-left font-medium"
            >
              <span>Nos Services</span>
              <ChevronDown size={20} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`} />
            </button>
            
            {/* Sous-liens mobile */}
            {isMobileServicesOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="pl-4 pb-2 space-y-2"
              >
                {servicesLinks.map((service, index) => (
                  <Link 
                    key={index}
                    to={service.path}
                    onClick={() => setIsOpen(false)} // Ferme le menu au clic
                    className="flex items-center gap-3 p-2 text-gray-600 hover:text-red-600"
                  >
                    <service.icon size={16} />
                    <span className="text-sm">{service.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          <button onClick={() => scrollToSection('transparence')} className="text-lg py-3 border-b border-gray-50 text-left font-medium">Transparence</button>
          <button onClick={() => scrollToSection('faq')} className="text-lg py-3 border-b border-gray-50 text-left font-medium">FAQ</button>
          <button onClick={() => scrollToSection('avis')} className="text-lg py-3 border-b border-gray-50 text-left font-medium">Avis</button>
          
          <div className="pt-6 flex flex-col space-y-3">
             <a href="tel:+33143886162" className="text-center text-[#B91C1C] font-bold text-xl">
                +33 1 43 88 61 62
             </a>
             <button onClick={() => scrollToSection('contact')} className="w-full text-center bg-[#1F2937] text-white font-medium py-4 rounded-xl shadow-lg">
                Devis Gratuit
             </button>
          </div>
        </div>
      )}
    </div>
  );
}