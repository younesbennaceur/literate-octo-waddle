import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Phone, User, MapPin } from 'lucide-react';

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulation d'envoi
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header de Section --- */}
        <div className="text-center mb-12">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold  text-gray-900 mb-4"
          >
            Contactez Nous
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            De l'entretien courant aux réparations complexes, nous prenons soin de votre véhicule avec le plus grand professionnalisme.
          </motion.p>
        </div>

        {/* --- CARTE FORMULAIRE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 bg-white"
        >
          
          {/* En-tête de la carte (Partie Noire) */}
          <div className="bg-[#111111] p-8 md:p-10 text-white flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <Mail className="text-red-600 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold  mb-1">Contactez Nous</h3>
              <p className="text-gray-400 text-sm">Service disponible 24h/24 et 7j/7</p>
            </div>
          </div>

          {/* Corps du Formulaire (Partie Blanche) */}
          <div className="p-8 md:p-12">
            {formStatus === 'success' ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Grille Nom / Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Nom" 
                    placeholder="Ex: Vince" 
                    icon={User} 
                  />
                  <InputField 
                    label="Prenom" 
                    placeholder="Ex: DUPONT" 
                    icon={User} 
                  />
                </div>

                {/* Grille Tel / Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Numero telephone" 
                    placeholder="Ex: 06 12 34 56 78" 
                    type="tel"
                    icon={Phone} 
                  />
                  <InputField 
                    label="Address email" 
                    placeholder="Ex: vincedupont@emple.com" 
                    type="email"
                    icon={Mail} 
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <textarea 
                      rows="4"
                      placeholder="Ex: J'ai un bruit étrange au niveau du moteur..."
                      className="w-full bg-gray-100 border-none rounded-2xl p-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </motion.div>
                </div>

                {/* Bouton Submit */}
                <div className="flex justify-center pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-red-900/20 flex items-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                       <span className="flex items-center gap-2">Envoi en cours...</span>
                    ) : (
                       <>
                         <span>Contactez Nous</span>
                         <Send size={18} />
                       </>
                    )}
                  </motion.button>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

// --- SOUS-COMPOSANTS ---

// Champ de saisie réutilisable avec animation
function InputField({ label, placeholder, type = "text", icon: Icon }) {
  return (
    <div className="space-y-2 group">
      <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
        {label}
      </label>
      <motion.div 
        whileFocus={{ scale: 1.02 }}
        className="relative"
      >
        <input 
          type={type} 
          placeholder={placeholder}
          className="w-full bg-gray-100 border-none rounded-xl py-4 px-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:bg-white transition-all outline-none"
        />
        {/* Petit indicateur visuel au focus */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-focus-within:border-red-100 pointer-events-none transition-colors"></div>
      </motion.div>
    </div>
  );
}

// Message de succès après envoi
function SuccessMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center space-y-4"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
        <CheckCircle size={40} />
      </div>
      <h3 className="text-2xl font-bold  text-gray-900">Message Envoyé !</h3>
      <p className="text-gray-500 max-w-md">
        Merci de nous avoir contactés. Notre équipe technique reviendra vers vous sous 24h avec une solution adaptée.
      </p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        onClick={() => window.location.reload()}
        className="mt-6 text-red-600 font-bold hover:underline"
      >
        Envoyer un autre message
      </motion.button>
    </motion.div>
  );
}