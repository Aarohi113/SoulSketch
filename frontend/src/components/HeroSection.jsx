import React from 'react';
import './HeroSection.css';
import logoImg from '../assets/logo.png'; 
import heroCoupleImg from '../assets/firstImg.png'; 
import { Users, Star, Clock, ShieldCheck } from 'lucide-react';
import {Link} from 'react-router-dom';

const HeroSection = () => {
    const stats = [
        { icon: Users, value: "100,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
        { icon: Star, value: "4.9/5", label: "சராசரி மதிப்பீடு" },
        { icon: Clock, value: "24 Hours", label: "ரகசியமாக வழங்கப்பட்டது" },
        { icon: ShieldCheck, value: "100%", label: "பாதுகாப்பான & ரகசியமான" },
    ];
    
  return (
    <div className="landing-page overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <nav className="navbar-custom px-4 md:px-10 py-4 flex justify-between items-center">
        <img src={logoImg} alt="Easy Astro" className="nav-logo h-10 md:h-14 object-contain" />
        <div className="nav-pattern-overlay"></div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <main className="hero-container flex flex-col md:flex-row items-center gap-10 px-6 py-10 md:py-20 max-w-7xl mx-auto">
        
        {/* Left Text Content */}
        <div className="hero-content w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
          <div className="trending-tag inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-6">
            <span className="sparkle">✦</span> டிரெண்டிங் • 1 லட்சம்+ திருப்தியடைந்த வாடிக்கையாளர்கள்
          </div>
          
          <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-[#3d1a21] leading-tight mb-6">
            நேரடிப் பொருள் <span className="highlight-text text-pink-500">ஆத்ம துணையின் முகம்</span> — இன்று முதல்.
          </h1>
          
          <p className="hero-description text-gray-700 text-lg md:text-lg mb-8 leading-relaxed  font-semibold">
            திறமைமிக்க ஜோதிடர்கள் மற்றும் உள்ஞான நிபுணர்களால் தேர்ந்தெடுக்கப்பட்டது.
            உங்களுக்காகவே உருவாக்கப்பட்ட தனிப்பட்ட, தனியுரிமை கொண்ட ஓவியம்
            24 மணி நேரத்திற்குள் பாதுகாப்பாக வழங்கப்படும்.
          </p>

          <div className="cta-group flex flex-col items-center md:items-start gap-4 mb-8">
            <Link to="/tamil-cart" className="w-full md:w-auto">
            <button className="btn-primary w-full md:w-auto bg-[#d64d6e] hover:bg-[#b03a55] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-pink-200">
              என் ஆத்ம துணை – இப்போது <span className="sparkle">✦</span>
            </button>
            </Link >
            <div className="security-tag text-xs text-gray-800 flex items-center gap-2 font-semibold">
              <span className="check-icon text-[25px]  ">🛡️</span> தனியுரிமை • பாதுகாப்பு • ஸ்பாம் இல்லை
            </div>
          </div>

          <p className="spots-left text-pink-700 font-bold text-lg mb-6 animate-pulse">
            இலவச விரிவான காதல் வாசிப்புக்கு இன்னும் 9 இடங்கள் மட்டுமே!
          </p>

          <div className="trust-badges grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] md:text-xs text-gray-800 font-medium">
            <span className="flex items-center gap-1 justify-center md:justify-start font-semibold">✅ பணம் திரும்பப் பெறும் உத்தரவாதம்</span>
            <span className="flex items-center gap-1 justify-center md:justify-start font-semibold">✅ பாதுகாப்பான கட்டணம் செலுத்தல்</span>
            <span className="flex items-center gap-1 justify-center md:justify-start font-semibold">✅ முடிவுகள் பகிரப்படாது</span>
          </div>
        </div>

        {/* --- RIGHT IMAGE SECTION --- */}
        <div className="hero-image-wrapper w-full md:w-1/2 order-1 md:order-2">
          <div className="image-card bg-white p-3 rounded-[30px] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src={heroCoupleImg} alt="Couple" className="main-couple-img rounded-[24px] w-full h-auto object-cover" />
          </div>
          <p className="sample-text text-center mt-6 text-lg text-gray-400 italic">மாதிரி படம் • உண்மையான ஓவியம் தனிப்பயனாக்கப்பட்டது</p>
        </div>
      </main>

      {/* --- TRUST BLOCKS SECTION --- */}
      <section className="relative w-full py-16 md:py-13 border-t border-pink-100" style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center group-hover:bg-pink-200 transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#f292a3]" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-serif text-[#3d1a21] font-bold">{stat.value}</h3>
                    <p className="text-gray-700 text-[16px] md:text-[14px] mt-1 md:mt-2 uppercase tracking-tight md:tracking-[0.1em] font-semibold leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
