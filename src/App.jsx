import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';




// ✅ ScrollToTop reste ici
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTop />
    
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        
        

       
      </Routes>

      <Footer />


    

    
    </div>
  );
}

export default App;