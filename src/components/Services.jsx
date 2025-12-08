import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ShieldAlert, Car, Truck, Check } from 'lucide-react';

// Données des services (Texte exact de l'image)
const servicesData = [
  {
    id: 1,
    title: "Mécanique Générale",
    description: "Entretien complet, diagnostic précis et réparations toutes marques.",
    points: ["Diagnostic électronique", "Révision constructeur", "Freinage et suspension"],
    icon: Wrench,
    image: "/1.png" // Image mécanique
  },
  {
    id: 2,
    title: "Pare-Brise",
    description: "Remplacement et réparation d'impacts. Franchise offerte.",
    points: ["Remplacement express", "Calibrage caméra ADAS", "Franchise offerte"],
    icon: ShieldAlert,
    image: "/2.png" // Image pare-brise
  },
  {
    id: 3,
    title: "Carrosserie & Peinture",
    description: "Remise à neuf de votre véhicule. Débosselage et peinture.",
    points: ["Débosselage sans peinture", "Raccord peinture", "Lustrage complet"],
    icon: Car,
    image: "/3.png" // Image carrosserie
  },
  {
    id: 4,
    title: "Dépannage 24/7",
    description: "Assistance rapide sur toute la région. Remorquage.",
    points: ["Disponibilité 24h/24", "Intervention rapide", "Tarifs transparents"],
    icon: Truck,
    image: "/4.png" // Image dépanneuse
  }
];

// Animation Variants
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

export default function Services() {
  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header de Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-oswald text-gray-900 mb-6"
          >
            Nos Services Experts
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            De l'entretien courant aux réparations complexes, nous prenons soin de votre véhicule avec le plus grand professionnalisme.
          </motion.p>
        </div>

        {/* --- Grille des Services --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10 }} // Effet levitation au survol
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Header avec Icône Flottante */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-white p-2.5 rounded-xl shadow-md text-red-600">
                  <service.icon size={24} strokeWidth={2} />
                </div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay léger au survol */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold font-oswald text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed border-b border-gray-100 pb-4">
                  {service.description}
                </p>

                {/* Liste à puces */}
                <ul className="space-y-3">
                  {service.points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      {/* Point rouge personnalisé */}
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span className="text-sm text-gray-600 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}