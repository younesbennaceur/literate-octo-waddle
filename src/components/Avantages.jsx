import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Droplets, Disc, ArrowRight } from 'lucide-react';

// Image placeholder (Mains mécanicien / Radiateur)
const OFFER_IMAGE_URL = "https://images.unsplash.com/photo-1623190823521-2e2d6325514f?q=80&w=2071&auto=format&fit=crop";

// --- ANIMATIONS ---
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerList = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardPop = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 } 
  }
};

export default function Avantages() {
  return (
    <section className="w-full bg-white overflow-hidden font-sans">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* --- PARTIE GAUCHE : IMAGE PLEINE HAUTEUR --- */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
           <motion.div 
             initial={{ scale: 1.1 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 1.5 }}
             className="absolute inset-0"
           >
             <img 
               src={OFFER_IMAGE_URL} 
               alt="Entretien moteur Eyfel Car" 
               className="w-full h-full object-cover"
             />
             {/* Overlay léger pour un rendu premium */}
             <div className="absolute inset-0 bg-black/10"></div>
           </motion.div>
        </div>


        {/* --- PARTIE DROITE : CONTENU --- */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerList}
            className="max-w-xl"
          >
            
            {/* Header avec Icône Cadeau Animée */}
            <motion.div variants={fadeInRight} className="flex items-center space-x-2 text-[#B91C1C] mb-4 font-bold tracking-wider text-xs uppercase">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Gift size={18} />
              </motion.div>
              <span>Vos Avantages Exclusifs</span>
            </motion.div>

            {/* Titre */}
            <motion.h2 variants={fadeInRight} className="text-4xl md:text-5xl font-black font-oswald text-gray-900 mb-6 leading-tight">
              Des cadeaux offerts sur <br/> vos prestations
            </motion.h2>

            {/* Description */}
            <motion.p variants={fadeInRight} className="text-gray-500 text-lg mb-10 leading-relaxed">
              Parce que chez EYFEL, nous aimons faire plaisir à nos clients, profitez de cadeaux sur une sélection de services d'entretien.
            </motion.p>

            {/* --- LISTE DES OFFRES (CARTES) --- */}
            <div className="space-y-6 mb-10">
              
              {/* Carte 1 : Vidange */}
              <motion.div 
                variants={cardPop}
                whileHover={{ scale: 1.02, backgroundColor: "#FEF2F2" }} // Rouge très pâle au survol
                className="flex items-start p-6 bg-[#FAF5F5] rounded-2xl border border-transparent hover:border-red-100 transition-all cursor-default"
              >
                <div className="bg-white p-3 rounded-xl text-[#B91C1C] shadow-sm mr-5">
                  <Droplets size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg font-oswald">Vidange</h4>
                  <p className="text-gray-500 text-sm mt-1">Cadeau offert pour toute vidange effectuée</p>
                </div>
              </motion.div>

              {/* Carte 2 : Plaquettes */}
              <motion.div 
                variants={cardPop}
                whileHover={{ scale: 1.02, backgroundColor: "#FEF2F2" }}
                className="flex items-start p-6 bg-[#FAF5F5] rounded-2xl border border-transparent hover:border-red-100 transition-all cursor-default"
              >
                <div className="bg-white p-3 rounded-xl text-[#B91C1C] shadow-sm mr-5">
                  <Disc size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg font-oswald">Plaquettes & Disques</h4>
                  <p className="text-gray-500 text-sm mt-1">Surprise automobile pour le changement de vos freins</p>
                </div>
              </motion.div>

            </div>

            {/* Bouton CTA */}
            <motion.button 
              variants={fadeInRight}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-900/20 flex items-center gap-2 transition-all"
            >
              <span>Découvrir toutes les offres</span>
              <ArrowRight size={20} />
            </motion.button>

          </motion.div>
        </div>

      </div>
    </section>
  );
}