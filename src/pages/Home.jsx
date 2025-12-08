import React from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/Aboutus'
import Services from '../components/Services'
import Transparence from '../components/Devis' // Assumant que c'est le composant Transparence
import ContactUs from '../components/ContactUs'
import Testimonials from '../components/Avis'
import FAQ from '../components/Faqs'

// Note: J'ai ajouté les IDs correspondants aux liens de ta navbar
export default function Home() {
  return (
    <div className="bg-gray-50">
      
        {/* Section Accueil (Haut de page) */}
        <section id="home">
            <Hero/>
        </section>

        {/* Section À Propos */}
        <section id="about">
            <AboutUs/>
        </section>

        {/* Section Services */}
        <section id="services">
            <Services/>
        </section>

        {/* Section Engagement / Transparence */}
        <section id="transparence">
            <Transparence/>
        </section>
        
        {/* Section FAQ */}
        <section id="faq">
            <FAQ/>
        </section>
     
        {/* Section Avis */}
        <section id="avis">
            <Testimonials/>
        </section>
        
        {/* Section Contact */}
        <section id="contact">
            <ContactUs/>
        </section>

    </div>
  )
}