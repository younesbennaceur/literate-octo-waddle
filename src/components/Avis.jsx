import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle } from 'lucide-react';

// Données fictives des avis (basées sur des vrais avis de garage)
const reviews = [
  {
    id: 1,
    name: "Thomas D.",
    car: "Audi A3",
    date: "Il y a 2 jours",
    rating: 5,
    text: "Service impeccable ! Je suis venu pour une distribution sur mon Audi, le devis était clair et 30% moins cher qu'en concession. Véhicule rendu lavé. Je recommande les yeux fermés."
  },
  {
    id: 2,
    name: "Sarah M.",
    car: "Peugeot 208",
    date: "Il y a 1 semaine",
    rating: 5,
    text: "Équipe très professionnelle et honnête. Ils m'ont montré les pièces changées (ce que peu de garages font). Le dépannage a été rapide malgré l'heure tardive. Merci à l'équipe Eyfel !"
  },
  {
    id: 3,
    name: "Karim B.",
    car: "Volkswagen Golf",
    date: "Il y a 2 semaines",
    rating: 5,
    text: "Enfin un garage de confiance dans le secteur. Accueil chaleureux, pas de forcing sur les réparations et respect des délais. La garantie pièces et main d'œuvre est rassurante."
  }
];

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Testimonials() {
  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-16 bg-[#111111] text-white font-sans overflow-hidden relative">
      
      {/* Élément de décoration d'arrière-plan (Glow rouge) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-4"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-300">Noté <span className="text-white font-bold">4.9/5</span> sur Google</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-oswald"
          >
            Ce que disent nos <span className="text-[#B91C1C]">clients</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            La satisfaction de nos clients est notre meilleure publicité. Découvrez les retours de ceux qui nous ont fait confiance.
          </motion.p>
        </div>

        {/* --- GRILLE DES AVIS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 shadow-xl relative group hover:border-red-900/50 transition-colors duration-300"
            >
              {/* Icône Guillemet décorative */}
              <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 group-hover:text-red-900/20 transition-colors duration-300" />

              {/* Étoiles */}
              <div className="flex space-x-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Texte Avis */}
              <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>

              {/* Footer de la carte (Auteur) */}
              <div className="flex items-center space-x-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold font-oswald shadow-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                    <span>Propriétaire de {review.car}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              
              {/* Badge vérifié */}
              <div className="absolute bottom-8 right-8 text-green-500/50 group-hover:text-green-500 transition-colors" title="Avis Vérifié">
                <CheckCircle size={18} />
              </div>

            </motion.div>
          ))}
        </motion.div>

       

      </div>
    </section>
  );
}