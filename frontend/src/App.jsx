import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// Components
import HowItWorks from './components/howItWork';
import HeroSection from './components/HeroSection';
import AboutSketch from './components/aboutSketch';
import StickyFooter from './components/stickyfooter';
import PastWork from './components/pastWork';
import Benefit from './components/benefit';
import Testimonial from './components/testimonial';
import Trust from './components/trust';
import Faq from './components/FAQ';
import Cart from './components/Cart'
import AdminPanel from './components/AdminPanel';
import policy from './components/policy';
 // Naya Cart page import karein

// Home Page Component (Saare purane sections yahan rahenge)
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSketch />
      <HowItWorks />
      <PastWork />
      <Benefit />
      <Testimonial />
      <Trust />
      <Faq />
    </>
  );
};

function App() {
  const [seconds, setSeconds] = useState(574);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <Router>
      <div className="min-h-screen mesh-gradient text-[#3d1a21] selection:bg-pink-200 overflow-x-hidden">
        
        {/* Background Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-x-hidden">
          <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-[-5%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-500/5 blur-[80px] md:blur-[120px] rounded-full animate-pulse-glow"></div>
        </div>

        <div className="relative z-10">
          <Routes>
            {/* Main Landing Page */}
           <Route path="/" element={<Navigate to="/tamil" replace />} />
              {/* <Route path="/" element={<HomePage />} /> */}
             <Route path="/tamil" element={<HomePage />} />
            
            {/* Soulmate Cart Page */}
            {/* <Route path="/Cart" element={<Cart />} /> */}
           <Route path="/tamil-policy" element={<policy/>}/>
            <Route path="/tamil-cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>

        <StickyFooter />
      </div>
    </Router>
  );
}

export default App;

