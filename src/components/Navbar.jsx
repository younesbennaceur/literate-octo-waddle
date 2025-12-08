import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour scroller vers une section
  const scrollToSection = (sectionId) => {
    // Si on n'est pas sur la page d'accueil, on y va d'abord
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
      // Si on est déjà sur l'accueil, on scroll direct
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
    setIsOpen(false); // Ferme le menu mobile après clic
  };

  // Styles des liens
  const linkClasses = (sectionId) => `
    text-sm font-medium transition-colors duration-200 cursor-pointer
    ${activeSection === sectionId ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-red-600'}
  `;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50 font-sans">
      <nav className="max-w-7xl mx-auto bg-white rounded-full px-8 py-4 shadow-xl shadow-gray-200/50 flex items-center justify-between">
        
        {/* Logo (Scroll vers le haut) */}
        <div className="flex items-center shrink-0">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 outline-none">
            <div className="flex flex-col leading-none">
               <img className='h-12 object-contain' src="./Logo.png" alt="Logo" />
            </div>
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about')} className={linkClasses('about')}>
            À Propos de Nous
          </button>
          <button onClick={() => scrollToSection('services')} className={linkClasses('services')}>
            Nos Services
          </button>
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

        {/* Partie Droite (Numéro + Bouton Noir) */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="tel:0123456789" 
            className="text-[#B91C1C] font-bold text-lg hover:text-red-800 transition-colors"
          >
            01 23 45 67 89
          </a>

          <button 
            onClick={() => scrollToSection('contact')} 
            className="bg-[#B91C1C] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-black transition-all"
          >
            Prendre Rendez-vous
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-xl p-6 flex flex-col space-y-4 md:hidden border border-gray-100 animate-in slide-in-from-top-5">
          <button onClick={() => scrollToSection('about')} className="text-lg py-2 border-b border-gray-50 text-left">À Propos</button>
          <button onClick={() => scrollToSection('services')} className="text-lg py-2 border-b border-gray-50 text-left">Services</button>
          <button onClick={() => scrollToSection('transparence')} className="text-lg py-2 border-b border-gray-50 text-left">Transparence</button>
          <button onClick={() => scrollToSection('faq')} className="text-lg py-2 border-b border-gray-50 text-left">FAQ</button>
          <button onClick={() => scrollToSection('avis')} className="text-lg py-2 border-b border-gray-50 text-left">Avis</button>
          
          <div className="pt-4 flex flex-col space-y-3">
             <a href="tel:0123456789" className="text-center text-[#B91C1C] font-bold text-xl">
                01 23 45 67 89
             </a>
             <button onClick={() => scrollToSection('contact')} className="w-full text-center bg-[#1F2937] text-white font-medium py-3 rounded-xl">
                Devis Gratuit
             </button>
          </div>
        </div>
      )}
    </div>
  );
}