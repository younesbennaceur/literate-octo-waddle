import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, FileText } from 'lucide-react';

// --- ANIMATIONS CONFIG ---
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
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

// Animation de flottement 3D pour le devis
const floatingCard = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 10, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.5 }
  },
  float: {
    y: [-10, 10],
    rotateX: [2, -2],
    rotateY: [-2, 2],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default function Transparence() {
  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-[#111111] text-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- COLONNE GAUCHE : Contenu Texte --- */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col space-y-8"
          >
            
            {/* Titre */}
            <div className="space-y-2">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">
                Notre Engagement :
              </motion.h2>
              <motion.h3 variants={fadeIn} className="text-4xl md:text-5xl font-bold text-red-600">
                La Transparence
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p variants={fadeIn} className="text-gray-400 text-md leading-relaxed ">
              Chez EYFEL, fini les mauvaises surprises ! Nous avons bâti notre réputation sur une relation de confiance absolue avec nos clients.
            </motion.p>

            {/* Liste des points */}
            <div className="space-y-8 pt-4">
              
              {/* Point 1 */}
              <motion.div variants={fadeIn} className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-red-900/20 rounded-xl text-red-600">
                  <Search size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold  mb-2">Prix des pièces affichés</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Nous détaillons le prix de chaque pièce détachée sur votre devis et votre facture. Aucune marge cachée.
                  </p>
                </div>
              </motion.div>

              {/* Point 2 */}
              <motion.div variants={fadeIn} className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-red-900/20 rounded-xl text-red-600">
                  <Clock size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold  mb-2">Temps de main-d'œuvre précis</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Le temps passé sur votre véhicule est comptabilisé au plus juste et clairement indiqué.
                  </p>
                </div>
              </motion.div>

              {/* Point 3 */}
              <motion.div variants={fadeIn} className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-red-900/20 rounded-xl text-red-600">
                  <FileText size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold  mb-2">Devis détaillé avant travaux</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Aucune intervention n'est réalisée sans votre accord écrit sur un devis clair et détaillé.
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>


          {/* --- COLONNE DROITE : Animation du Devis --- */}
          <div className="relative flex items-center justify-center lg:justify-end perspective-1000">
             
             {/* Conteneur Sombre Arrière-plan */}
             <div className="absolute inset-0 bg-gray-900/50 rounded-3xl transform rotate-3 scale-105 blur-xl"></div>

             {/* Carte Devis Flottante */}
             <motion.div
                variants={floatingCard}
                initial="hidden"
                whileInView="visible"
                animate="float" // Lance l'animation de flottement en boucle
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] w-full max-w-md z-10 text-gray-900"
                style={{ transformStyle: 'preserve-3d' }}
             >
                 {/* En-tête Devis */}
                 <div className="flex justify-between items-start mb-8">
                     <h4 className="text-2xl font-bold font-">DEVIS #12345</h4>
                     <span className="text-red-600 font-bold ">EYFEL</span>
                 </div>

                 {/* Lignes du Devis */}
                 <div className="space-y-4 mb-8 text-sm md:text-base font-medium">
                     <div className="flex justify-between py-2 border-b border-gray-100">
                         <span className="text-gray-600">Pièces (Plaquettes)</span>
                         <span>45.00 €</span>
                     </div>
                     <div className="flex justify-between py-2 border-b border-gray-100">
                         <span className="text-gray-600">Main d'œuvre (1h)</span>
                         <span>60.00 €</span>
                     </div>
                     <div className="flex justify-between py-2 border-b border-gray-100 text-green-600 font-semibold">
                         <span>Diagnostic</span>
                         <span>OFFERT</span>
                     </div>
                 </div>

                 {/* Total et Badge */}
                 <div className="flex flex-col items-end space-y-4">
                     <div className="flex items-center space-x-4">
                         <span className="text-lg font-bold text-gray-700">TOTAL TTC</span>
                         <span className="text-3xl font-black ">105.00 €</span>
                     </div>
                     
                     {/* Badge Approuvé Animé */}
                     <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
                        className="bg-green-100 text-green-700 font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider"
                     >
                         Devis Approuvé
                     </motion.div>
                 </div>

                 {/* Effet de brillance au survol (Optionnel) */}
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}