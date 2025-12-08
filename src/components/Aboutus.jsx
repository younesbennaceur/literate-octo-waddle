import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock } from 'lucide-react';

// Image placeholder (remplace par ton image de mécanicien sombre si tu l'as)
const ABOUT_IMAGE_URL = "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop";

// --- ANIMATIONS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutUs() {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-[#111111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- GAUCHE : Image avec Overlay --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 group"
          >
            {/* Image avec effet de zoom au survol */}
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={ABOUT_IMAGE_URL} 
              alt="Mécanicien Eyfel au travail" 
              className="w-full h-full object-cover"
            />
            
            {/* Dégradé sombre pour le texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Texte en bas de l'image */}
            <div className="absolute bottom-8 left-8 z-10">
              <h3 className="text-xl font-bold  text-white">L'équipe EYFEL</h3>
              <p className="text-gray-300 text-sm mt-1">Passionnés par l'automobile depuis 2010</p>
            </div>
          </motion.div>


          {/* --- DROITE : Contenu Texte --- */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col space-y-6"
          >
            
            {/* Badge "À Propos" */}
            <motion.div variants={fadeIn}>
              <span className="inline-block px-4 py-2 rounded-full bg-red-900/20 text-red-500 font-bold text-xs uppercase tracking-wider border border-red-900/30">
                À Propos de Nous
              </span>
            </motion.div>

            {/* Titre H2 */}
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-4xl font-bold  leading-tight"
            >
              Plus qu'un garage, votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">partenaire de route</span>
            </motion.h2>

            {/* Paragraphes */}
            <motion.div variants={fadeIn} className="space-y-4 text-gray-400 leading-relaxed text-base md:text-sm">
              <p>
                EYFEL TOUR & SERVICES s'est imposé comme la référence automobile locale. 
                Notre mission est simple : vous permettre de rouler en toute sérénité.
              </p>
              <p>
                Que ce soit pour une urgence au milieu de la nuit ou pour l'entretien régulier de votre véhicule familial, 
                notre équipe d'experts certifiés est là pour vous. Nous traitons chaque voiture comme si c'était la nôtre.
              </p>
            </motion.div>

            {/* Statistiques (Icônes rouges + Textes) */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6"
            >
              {/* Stat 1 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="p-3 bg-red-900/20 rounded-xl text-red-600 mb-1">
                  <Users size={24} />
                </div>
                <h4 className="text-2xl font-bold text-white">+1500</h4>
                <p className="text-sm text-gray-500">Clients Satisfaits</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="p-3 bg-red-900/20 rounded-xl text-red-600 mb-1">
                  <Award size={24} />
                </div>
                <h4 className="text-2xl font-bold text-white">15 Ans</h4>
                <p className="text-sm text-gray-500">D'expérience</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="p-3 bg-red-900/20 rounded-xl text-red-600 mb-1">
                  <Clock size={24} />
                </div>
                <h4 className="text-2xl font-bold text-white">24/7</h4>
                <p className="text-sm text-gray-500">Disponibilité</p>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}