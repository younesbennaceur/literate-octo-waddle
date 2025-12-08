import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star, Wrench, CheckCircle2 } from 'lucide-react';

// Image placeholder
const MECHANIC_IMAGE_URL = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop";

// --- ANIMATIONS CONFIG ---

// Apparition fluide vers le haut
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom Easing (Apple style)
  }
};

// Effet de rebond pour les cartes (Pop In)
const springPop = {
  hidden: { scale: 0, opacity: 0, y: 50 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20,
      delay: 0.5 
    } 
  }
};

// Animation de flottement continu (Lévitation)
// On utilise une fonction pour varier les délais et éviter que tout bouge en même temps
const floatingAnimation = (duration) => ({
  y: [-10, 10],
  transition: {
    duration: duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
});

export default function Hero() {
  return (
    <section className="w-full pt-24  px-4 md:px-8 lg:px-16 bg-gray-50 min-h-screen flex items-center overflow-hidden">
      
      {/* Conteneur Principal "Carte" */}
      <div className="max-w-7xl mx-auto bg-white rounded-[50px] p-8 md:p-12 lg:p-16 shadow-xl shadow-gray-200/50 relative">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- COLONNE GAUCHE --- */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 relative z-10"
          >
            {/* Badge Notification */}
            <motion.div 
              variants={fadeInUp} 
              transition={{ delay: 0.1 }}
              className="w-fit"
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 text-sm font-semibold px-4 py-2 rounded-full border border-red-100">
                <span className="relative flex ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full  bg-red-600"></span>
                </span>
                <span>Garage de confiance ouvert 24h/7j</span>
              </div>
            </motion.div>

            {/* Titre Principal */}
            <div className="overflow-hidden">
              <motion.h1 
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
              >
                Votre partenaire <br className="hidden lg:block"/>
                de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">automobile confiance.</span>
              </motion.h1>
            </div>

            {/* Sous-titre */}
            <motion.p 
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-sm text-gray-500 max-w-lg leading-relaxed"
            >
              EYFEL est bien plus qu'un simple garage. Nous allions expertise technique et transparence totale pour l'entretien de votre véhicule.
            </motion.p>

            {/* Boutons */}
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-700 text-white font-bold py-4 px-8 rounded-2xl flex items-center space-x-2 shadow-lg shadow-red-700/30 hover:shadow-xl hover:shadow-red-700/40 transition-all"
              >
                <span>Prendre Rendez-vous</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all"
              >
                Dépannage Urgence
              </motion.button>
            </motion.div>

            {/* Checkmarks */}
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
              className="flex  gap-3 pt-4"
            >
              {['Devis Transparent', 'Expertise Technique', 'Intervention Rapide'].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                  
                  <span className='text-sm'>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>


          {/* --- COLONNE DROITE (Image & Widgets) --- */}
          <div className="relative h-[400px] lg:h-[400px] flex items-center justify-center lg:justify-end select-none">
             
            {/* Image Principale */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative w-full h-full max-w-[500px]"
            >
                <div className="w-full h-full rounded-[40px] overflow-hidden relative z-0 shadow-2xl shadow-gray-300">
                     <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        src={MECHANIC_IMAGE_URL} 
                        alt="Mécanicien" 
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                     <div className="absolute bottom-10 left-8 text-white z-10 pointer-events-none">
                         <h3 className="text-2xl font-bold font-oswald mb-1">L'équipe EYFEL</h3>
                         <p className="text-sm opacity-80 font-light">Passionnés par l'automobile depuis 2010</p>
                     </div>
                </div>

                {/* --- CARTES FLOTTANTES INTERACTIVES --- */}

                {/* 1. Carte Garantie (Floating & Drag) */}
                <motion.div 
                    variants={springPop}
                    initial="hidden"
                    animate="visible"
                    className="absolute -top-6 -left-4 lg:-left-12 z-20 cursor-grab active:cursor-grabbing"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Revient au centre après drag
                    dragElastic={0.2}
                >
                    <motion.div 
                        animate={floatingAnimation(4)} // Flotte toutes les 4s
                        className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white flex items-center space-x-4 pr-8"
                    >
                        <div className="bg-red-50 p-3 rounded-2xl text-red-600 shadow-inner">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">Garantie</h4>
                            <p className="text-xs text-gray-500 font-medium">Pièces & Main d'œuvre</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. Carte Avis (Floating & Drag) */}
                <motion.div 
                    variants={springPop}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.7 }} // Délai différent
                    className="absolute top-10 -right-4 lg:-right-8 z-20 cursor-grab active:cursor-grabbing"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                >
                    <motion.div 
                        animate={floatingAnimation(5.5)} // Flotte toutes les 5.5s
                        className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white text-center min-w-[160px]"
                    >
                        <div className="flex space-x-1 text-red-500 justify-center mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                        </div>
                        <h4 className="font-extrabold text-3xl text-gray-900 leading-none">4.9<span className="text-lg text-gray-400">/5</span></h4>
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 mt-1 font-bold">+500 Clients</p>
                    </motion.div>
                </motion.div>

                {/* 3. Carte Équipement (Floating & Drag) */}
                 <motion.div 
                    variants={springPop}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.9 }} // Délai différent
                    className="absolute bottom-12 -right-2 lg:-right-12 z-20 cursor-grab active:cursor-grabbing"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                >
                    <motion.div 
                        animate={floatingAnimation(4.5)} // Flotte toutes les 4.5s
                        className="bg-white/95 backdrop-blur-sm py-4 px-6 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white flex items-center space-x-3"
                    >
                        <div className="bg-gray-900 text-white p-2 rounded-full">
                           <Wrench size={18} />
                        </div>
                        <span className="font-bold text-gray-900 text-sm">Équipement Pro</span>
                    </motion.div>
                </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}