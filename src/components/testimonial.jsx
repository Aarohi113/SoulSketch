import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import {Link} from 'react-router-dom';

const TestimonialSection = () => {
  const originalData = [
    { id: 1, name: "Meera J.", text: "முழுமையாக அதிசயமான ஓவியம். வழங்கப்பட்ட ஆன்மீக வாசிப்பு எனக் கூட தேடும் என்று நான் கூட நினைக்காத தெளிவை கொடுத்தது. மிகுந்த பரிந்துரை செய்கிறேன்!" },
    { id: 2, name: "Arjun P.", text: "வாடிக்கையாளர் சேவை சிறப்பாக இருந்தது மற்றும் வழங்கல் வேகமாக நடந்தது. வரைபடம் தானே ஒரு கலைப்பணி; அதை நான் எப்போதும் மதிப்பிடுவேன்." },
    { id: 3, name: "Isha V.", text: "இது வெறும் வரைபடம் அல்ல; இது ஒரு நம்பிக்கையின் துண்டு. வாசிப்பு மிகவும் நேர்மறை மற்றும் என் உணர்வுகளோடு பொருந்தியது. நன்றி!" },
    { id: 4, name: "Rahul S.", text: "தொடக்கத்தில் நான் சந்தேகப்பட்டிருந்தேன், ஆனால் வரைபடத்தில் உள்ள விவரங்கள் அதிசயமாக இருந்தது. இது மிகவும் தனிப்பட்டதாக உணரப்பட்டது." },
    { id: 5, name: "Ananya K.", text: "செல்வ அறிக்கை என் கண்களைத் திறந்தது. என் தடைகளை புரிந்துகொள்ள இது உதவியது. அருமையான அனுபவம்!" },
    { id: 6, name: "Sneha M.", text: "வரைபடத்திலிருந்து காதல் வாசிப்புவரை அனைத்தும் சரியானதாக இருந்தது. உண்மையில் ஒரு திறமையான கலைஞர்." }
  ];

  // Infinite loop ke liye hum data ko triple kar dete hain
  const testimonials = [...originalData, ...originalData, ...originalData];
  
  // Hum hamesha beech wale set se start karenge (index 6 se)
  const [currentIndex, setCurrentIndex] = useState(originalData.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Yeh function check karega ki hum boundary par toh nahi pahunche
  const handleTransitionEnd = () => {
    // Agar hum 3rd set ke shuruat mein hain, toh silent jump to 2nd set
    if (currentIndex >= originalData.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - originalData.length);
    }
    // Agar hum 1st set mein chale gaye hain, toh silent jump to 2nd set
    else if (currentIndex < originalData.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + originalData.length);
    }
  };

  // Transition wapas on karne ke liye
  useEffect(() => {
    if (!isTransitioning) {
      // Small delay taaki browser jump ko process kar le bina animation ke
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full bg-[white] py-5 px-4 font-serif  overflow-hidden">
      <h2 className="text-4xl md:text-5xl text-[#5D3A3A] mb-16 font-medium text-center">
       எங்கள் வாடிக்கையாளர்களின் அனுபவங்கள்
      </h2>

      <div className="relative max-w-7xl mx-auto flex items-center">
        
        {/* Navigation */}
        <button onClick={prevSlide} className="absolute left-0 md:-left-4 z-30 p-3 rounded-full bg-white shadow-xl hover:scale-110 transition-transform text-gray-400 border border-gray-100">
          <ChevronLeft size={24} />
        </button>

        <div className="w-full overflow-hidden px-2">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ 
              // Mobile: 100% per card, Desktop: 33.333% per card
              transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 100 : 33.333)}%)` 
            }}
          >
            {testimonials.map((item, index) => (
              <div key={index} className="min-w-full md:min-w-[33.333%] px-3 box-border">
                <div className="bg-[#f4c6cdff] p-8 rounded-2xl shadow-sm border border-red-50 h-[360px] flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#D64F63" color="#D64F63" />
                      ))}
                    </div>
                    <div className="border-l-2 border-[#D64F63] pl-4">
                      <p className="text-[#5D3A3A] text-lg italic leading-relaxed leading-6">
                        "{item.text}"
                      </p>
                    </div>
                  </div>
                  <div className="text-right mt-6">
                    <span className="text-[#D64F63] font-bold text-lg">— {item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextSlide} className="absolute right-0 md:-right-4 z-30 p-3 rounded-full bg-white shadow-xl hover:scale-110 transition-transform text-gray-400 border border-gray-100">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex flex-col items-center py-10">
        <Link to="/Cart" className="w-full md:w-auto">
        <button className="bg-[#D64F63] text-white text-xl font-bold py-4 px-12 rounded-full shadow-2xl hover:bg-[#b53d50] active:scale-95 transition-all">
         இப்போதே என் Soulmate-ஐ காணுங்கள்!
        </button>
        </Link>
        <p className="mt-4 text-[#D64F63] text-sm italic font-medium">
          சில இடங்கள் மட்டுமே மீதம்! சிறப்பு சலுகை முடிவதற்கு முன் விரைந்து செய்க.
        </p>
      </div>
    </div>
  );
};

export default TestimonialSection;
