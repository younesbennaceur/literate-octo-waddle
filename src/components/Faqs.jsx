import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';


// --- DONNÉES DES QUESTIONS ---
const faqs = [
  {
    id: 1,
    question: "La garantie constructeur est-elle préservée chez EYFEL ?",
    answer: "Absolument. Conformément à la réglementation européenne, nous suivons scrupuleusement le cahier des charges des constructeurs. Votre garantie reste donc 100% valide, même pour un véhicule neuf."
  },
  {
    id: 2,
    question: "Proposez-vous des véhicules de courtoisie ?",
    answer: "Oui, nous savons qu'il est difficile de se passer de voiture. Nous mettons à votre disposition des véhicules de prêt récents pendant la durée des réparations (selon disponibilité, pensez à réserver)."
  },
  {
    id: 3,
    question: "Puis-je payer mes réparations en plusieurs fois ?",
    answer: "Tout à fait. Nous proposons des facilités de paiement en 3x ou 4x sans frais par carte bancaire pour vous permettre de gérer votre budget sereinement."
  },
  {
    id: 4,
    question: "Comment fonctionne le service de dépannage ?",
    answer: "Notre service d'astreinte est disponible 24h/24 et 7j/7. Appelez notre numéro d'urgence, nous intervenons généralement en moins de 45 minutes sur le secteur Île-de-France pour remorquer votre véhicule à l'atelier."
  },
  {
    id: 5,
    question: "Les devis sont-ils payants ?",
    answer: "Non, chez EYFEL, la transparence est primordiale. Nous vous fournissons un devis détaillé et chiffré gratuitement avant toute intervention. Aucune réparation n'est lancée sans votre accord."
  }
];

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function FAQ() {
  // État pour savoir quelle question est ouverte (null = aucune)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-16 bg-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-[#B91C1C] font-bold tracking-wider text-sm uppercase mb-3"
          >
            <HelpCircle size={20} />
            <span>Questions Fréquentes</span>
          </motion.div>
          
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black  text-gray-900 mb-6"
          >
            Une question ? <br/> Nous avons la réponse.
          </motion.h2>
          
          <motion.p 
             initial="hidden"
             whileInView="visible"
             variants={fadeInUp}
             viewport={{ once: true }}
             className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            Retrouvez ici les réponses aux questions que nos clients nous posent le plus souvent.
          </motion.p>
        </div>

        {/* --- LISTE ACCORDÉON --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={faq.id} 
              faq={faq} 
              isOpen={activeIndex === index} 
              onClick={() => toggleFAQ(index)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- SOUS-COMPOSANT ACCORDÉON ---
function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'border-red-200 bg-red-50/30 shadow-lg shadow-red-100/50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Question (Header cliquable) */}
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold  transition-colors ${isOpen ? 'text-[#B91C1C]' : 'text-gray-900 group-hover:text-gray-700'}`}>
          {faq.question}
        </span>
        
        {/* Icône animée */}
        <div className={`p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-gray-500'}`}>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </motion.div>
        </div>
      </button>

      {/* Réponse (Contenu déroulant) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}