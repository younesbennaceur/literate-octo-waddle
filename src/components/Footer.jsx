import React from 'react';
import { Phone, MapPin, Mail, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-8 font-sans border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* --- PARTIE 1 : APPEL À L'ACTION (CTA) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center border-b border-gray-800 pb-16 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-oswald">
            Prêt à découvrir la différence EYFEL ?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Contactez-nous dès maintenant pour un devis gratuit. Transparence, rapidité et expertise sont au rendez-vous.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Bouton Rouge */}
            <Link to="/contact">
                <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-red-900/20 transition-all w-full sm:w-auto"
                >
                Demander un Devis
                </motion.button>
            </Link>

            {/* Bouton Blanc */}
            <a href="tel:+33143886162">
                <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                >
                <Phone size={18} className="text-[#B91C1C]" />
                <span>+33 1 43 88 61 62</span>
                </motion.button>
            </a>
          </div>
        </motion.div>


        {/* --- PARTIE 2 : GRILLE D'INFORMATIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1 : Marque & Description */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wide font-oswald">EYFEL TOUR & SERVICES</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'entretien, la réparation et le dépannage de votre véhicule. Expertise et transparence garanties.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
            </div>
          </div>

          {/* Col 2 : Nos Services (AVEC LES LIENS) */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-oswald">Nos Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink text="Mécanique générale" to="/service/mecanique-generale" />
              <FooterLink text="Carrosserie & Peinture" to="/service/carrosserie-peinture" />
              <FooterLink text="Pare-brise" to="/service/pare-brise" />
              <FooterLink text="Dépannage 24h/7j" to="/service/depannage-24-7" />
            </ul>
          </div>

          {/* Col 3 : Horaires */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-oswald">Horaires</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-white font-medium">08h00 - 19h00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-white font-medium">09h00 - 17h00</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Dimanche</span>
                <span className="text-[#B91C1C] text-xs font-bold uppercase bg-red-900/10 px-2 py-1 rounded">Dépannage uniquement</span>
              </li>
            </ul>
          </div>

          {/* Col 4 : Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-oswald">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#B91C1C] flex-shrink-0 mt-1" size={18} />
                <span>183 Av. Aristide Briand, <br/>93190 Livry-Gargan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#B91C1C] flex-shrink-0" size={18} />
                <a href="tel:+33143886162" className="hover:text-white transition-colors cursor-pointer">+33 1 43 88 61 62</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#B91C1C] flex-shrink-0" size={18} />
                <a href="mailto:contact@eyfel-services.fr" className="hover:text-white transition-colors cursor-pointer">contact@eyfel-services.fr</a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- PARTIE 3 : COPYRIGHT --- */}
        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-600 text-xs">
            © 2025 EYFEL TOUR & SERVICES. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  );
}

// --- SOUS-COMPOSANTS ---

// Lien avec animation de flèche au survol (AVEC LINK)
function FooterLink({ text, to }) {
  return (
    <motion.li 
      className="group"
      whileHover={{ x: 5 }}
    >
      <Link to={to} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-[#B91C1C] transition-opacity" />
        <span>{text}</span>
      </Link>
    </motion.li>
  );
}

// Icône Social avec effet de fond
function SocialIcon({ Icon }) {
  return (
    <motion.div 
      whileHover={{ y: -3, backgroundColor: "#B91C1C", color: "white" }}
      className="w-10 h-10 rounded-full bg-gray-900 text-gray-400 flex items-center justify-center cursor-pointer transition-colors border border-gray-800"
    >
      <Icon size={20} />
    </motion.div>
  );
}