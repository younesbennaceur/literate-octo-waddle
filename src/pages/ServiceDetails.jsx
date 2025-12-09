import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, ArrowLeft, Phone, Gift, Wrench, ShieldCheck, 
  Clock, Car, HelpCircle, FileText, ThumbsUp, ChevronDown 
} from 'lucide-react';

// --- BASE DE DONNÉES ENRICHIE (PLUS DE CONTENU) ---
const servicesData = {
  "mecanique-generale": {
    title: "Mécanique Générale",
    subtitle: "Expertise technique & Pièces d'origine",
    description: "Votre moteur mérite ce qu'il y a de mieux. Nous intervenons sur tous les organes vitaux de votre véhicule avec une transparence totale sur les prix.",
    image: "/mechanique.jpg", 
    icon: Wrench,
    // NOUVEAU : Arguments de vente
    benefits: [
      { title: "Garantie Constructeur", text: "Préservée à 100% grâce aux pièces d'origine." },
      { title: "Transparence Totale", text: "Les pièces usagées vous sont montrées." },
      { title: "Expertise Multimarque", text: "Techniciens formés sur toutes marques." }
    ],
    // NOUVEAU : Le processus
    process: [
      { step: "1", text: "Diagnostic complet & Devis gratuit" },
      { step: "2", text: "Validation & Réparation" },
      { step: "3", text: "Essai sur route & Restitution" }
    ],
    features: [
      "Diagnostic électronique valise constructeur",
      "Distribution, Embrayage, Joint de culasse",
      "Système de freinage et amortisseurs",
      "Utilisation exclusive de pièces d'origine ou équivalent"
    ],
    // NOUVEAU : FAQ Spécifique
    faqs: [
      { q: "Le diagnostic est-il payant ?", a: "Il est déduit du montant des réparations si vous effectuez les travaux chez nous." },
      { q: "Combien de temps dure une révision ?", a: "Comptez environ 1h30. Un espace d'attente Wi-Fi est à votre disposition." }
    ],
    offer: {
      title: "Révision à prix serré",
      price: "Dès 80€",
      subtext: "Prix selon modèle",
      badge: "Pièces Qualité Premium",
      description: "Pourquoi payer plus cher en concession ? Nous utilisons des pièces de qualité d'origine à prix négociés."
    }
  },
  "carrosserie-peinture": {
    title: "Carrosserie & Peinture",
    subtitle: "Redonnez à votre auto son éclat d'usine",
    description: "Rayures, chocs ou restauration complète ? Notre atelier carrosserie utilise les dernières technologies de peinture pour un résultat invisible.",
    image: "/Carrosserie.jpg",
    icon: Car,
    benefits: [
      { title: "Teinte Exacte", text: "Scanner spectro pour une couleur 100% identique." },
      { title: "Toutes Assurances", text: "Agréé par la majorité des compagnies." },
      { title: "Véhicule de Prêt", text: "GRATUIT pendant les travaux." }
    ],
    process: [
      { step: "1", text: "Expertise photo & Chiffrage" },
      { step: "2", text: "Redressage & Peinture en cabine" },
      { step: "3", text: "Lustrage & Finition" }
    ],
    features: [
      "Débosselage sans peinture (DSP)",
      "Raccord peinture invisible",
      "Redressage sur marbre laser",
      "Rénovation des optiques de phares"
    ],
    faqs: [
      { q: "La peinture va-t-elle tenir dans le temps ?", a: "Oui, nous utilisons des vernis céramiques haute durabilité garantis 5 ans." },
      { q: "Gérez-vous la franchise ?", a: "Oui, selon votre contrat, nous pouvons offrir tout ou partie de la franchise." }
    ],
    offer: {
      title: "Qualité Concession",
      price: "Sur Devis",
      subtext: "Expertise Haut de Gamme",
      badge: "Finitions Usine",
      description: "Nous travaillons avec les standards des plus grandes marques allemandes et françaises."
    }
  },
  "pare-brise": {
    title: "Pare-Brise & Vitrage",
    subtitle: "Votre sécurité et vos cadeaux, notre priorité",
    description: "Un impact ? Une fissure ? Ne prenez pas de risques. Nous remplaçons votre pare-brise dans la journée avec calibrage des caméras inclus.",
    image: "/brise.jpg",
    icon: ShieldCheck,
    benefits: [
      { title: "Zéro Démarche", text: "Nous gérons tout avec votre assurance." },
      { title: "Calibrage ADAS", text: "Recalibrage des caméras inclus." },
      { title: "Intervention Express", text: "Remplacement en moins de 2h." }
    ],
    process: [
      { step: "1", text: "Déclaration assurance (on s'en occupe)" },
      { step: "2", text: "Remplacement du vitrage" },
      { step: "3", text: "Remise des clés + CADEAU" }
    ],
    features: [
      "Remplacement tous véhicules",
      "Calibrage caméras ADAS inclus",
      "Nettoyage intérieur offert",
      "Gestion administrative assurance"
    ],
    faqs: [
      { q: "Est-ce compatible avec mon assurance ?", a: "Oui, nous sommes compatibles avec 100% des assurances (AXA, Macif, Allianz...)." },
      { q: "Dois-je avancer les frais ?", a: "Non, nous pratiquons la cession de créance. Vous ne payez rien (hors franchise éventuelle)." }
    ],
    offer: {
      title: "OFFRE EXCEPTIONNELLE",
      price: "0€",
      subtext: "Pour vous (si assuré)",
      badge: "Franchise OFFERTE",
      gift: "Cadeau Méca 150€",
      description: "En plus de la franchise offerte, repartez avec un bon d'achat mécanique d'une valeur de 150€ !"
    }
  },
  "depannage-24-7": {
    title: "Dépannage 24/7",
    subtitle: "Nous ne vous laissons jamais au bord de la route",
    description: "Panne, accident ou erreur de carburant ? Notre équipe d'astreinte intervient en moins de 45 minutes pour vous secourir.",
    image: "/Dépanneuse.jpg",
    icon: Clock,
    benefits: [
      { title: "Rapidité Éclair", text: "Intervention en moins de 45 min." },
      { title: "Prix Fixe", text: "Annoncé au téléphone avant le départ." },
      { title: "Tout Véhicule", text: "Moto, Auto, Utilitaire." }
    ],
    process: [
      { step: "1", text: "Appel & Diagnostic téléphone" },
      { step: "2", text: "Arrivée du dépanneur" },
      { step: "3", text: "Réparation sur place ou Remorquage" }
    ],
    features: [
      "Intervention rapide (< 45 min)",
      "Démarrage batterie",
      "Remorquage toutes distances",
      "Véhicule de remplacement"
    ],
    faqs: [
      { q: "Quels sont vos tarifs ?", a: "Les tarifs débutent à 90€ TTC en journée. Majoration soir/weekend. Devis immédiat par téléphone." },
      { q: "Pouvez-vous réparer sur place ?", a: "Oui pour les pannes simples (batterie, crevaison). Sinon, nous remorquons au garage." }
    ],
    offer: {
      title: "Assistance Immédiate",
      price: "Devis Gratuit",
      subtext: "Avant intervention",
      badge: "Dispo 24h/24",
      description: "Pas de surprise sur la facture. Le tarif vous est annoncé par téléphone avant le départ."
    }
  }
};

// Sous-composant pour l'accordéon FAQ simple
const SimpleAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left group">
        <span className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">{question}</span>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <p className="text-gray-500 pb-4 text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = servicesData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Service introuvable</h2>
          <Link to="/" className="text-red-600 hover:underline mt-4 block">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* --- HERO SECTION (Identique à ton code) --- */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#333'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <Link to="/" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors group">
            <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                 <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Retour aux services</span>
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-600 rounded-xl text-white shadow-lg shadow-red-900/20">
              <service.icon size={32} strokeWidth={1.5} />
            </div>
            <span className="text-red-500 font-bold tracking-wider uppercase text-xs md:text-sm bg-black/40 px-3 py-1 rounded-full border border-red-500/30 backdrop-blur-md">
              Service Expert Eyfel
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
            {service.title}
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light">{service.subtitle}</p>
        </div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* GAUCHE : Détails Enrichis */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* 1. Description (Ton code) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">Description du service</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
            </motion.div>

            {/* 2. Pourquoi Nous Choisir ? (NOUVEAU - Style simple) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
                   <div className="bg-red-50 w-10 h-10 rounded-full flex items-center justify-center text-red-600 mx-auto mb-3">
                      <ThumbsUp size={18} />
                   </div>
                   <h4 className="font-bold text-gray-900 text-sm mb-1">{benefit.title}</h4>
                   <p className="text-xs text-gray-500 leading-tight">{benefit.text}</p>
                </div>
              ))}
            </motion.div>

            {/* 3. Ce que nous incluons (Ton code) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Ce que nous incluons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="bg-red-50 p-1.5 rounded-full text-red-600 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                         <CheckCircle2 size={18} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Le Processus (NOUVEAU - Style simple) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">Comment ça se passe ?</h3>
               <div className="space-y-4">
                 {service.process.map((step, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {step.step}
                      </div>
                      
                      <span className="font-medium text-gray-700">{step.text}</span>
                   </div>
                 ))}
               </div>
            </motion.div>

            {/* 5. FAQ (NOUVEAU - Style simple) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <HelpCircle className="text-red-600" size={20}/> Questions Fréquentes
               </h3>
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  {service.faqs.map((faq, i) => (
                    <SimpleAccordion key={i} question={faq.q} answer={faq.a} />
                  ))}
               </div>
            </motion.div>

          </div>

          {/* DROITE : Offre Sticky (Ton code exact) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-[#111111] text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-600/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-900/10 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-lg shadow-red-900/40">
                    {service.offer.badge}
                  </div>
                  <h3 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wide">{service.offer.title}</h3>
                  <div className="flex items-baseline gap-2 mb-6 border-b border-white/10 pb-6">
                    <span className="text-5xl font-black text-white">{service.offer.price}</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{service.offer.subtext}</span>
                  </div>

                  {service.offer.gift && (
                    <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-500/30 p-4 rounded-2xl mb-6 flex items-center gap-4">
                      <div className="bg-red-600 p-2.5 rounded-xl shadow-inner text-white"><Gift size={24} /></div>
                      <div>
                        <span className="block text-red-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">Bonus Exclusif</span>
                        <span className="font-bold text-white text-sm leading-tight">{service.offer.gift}</span>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">{service.offer.description}</p>

                  <a href="tel:+33143886162" className="group w-full bg-white hover:bg-gray-100 text-[#111111] font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-white/10 active:scale-95">
                    <Phone size={20} className="text-red-600 group-hover:text-red-700 transition-colors" />
                    <span>Appeler pour Réserver</span>
                  </a>
                  <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">Devis gratuit & sans engagement</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}