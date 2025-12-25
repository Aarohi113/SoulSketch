import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Page = () => {
  // Yahan apni images ke path daalein
  const images = [
    "/1.png", 
    "/2.png",
    "/3.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic (Har 3 second mein change hoga)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-[#FDF2F2] flex flex-col items-center justify-center  p-6 font-serif">
      
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 mb-12">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-6 text-[#5D3A3A]">
          <h1 className="text-4xl md:text-5xl font-bold">முந்தைய பணிகள் / ஆதாரம்</h1>
          <p className="text-2xl leading-relaxed">
           நீங்கள் விதியால் இணைக்கப்பட்ட நபரின் நுணுக்கமான முக அம்சங்களை நேரில் காண்கிறீர்கள் என்று கற்பனை செய்யுங்கள்.
எங்கள் முந்தைய ஸ்கெட்ச்கள் தங்களின் துல்லியம், அழகு மற்றும் தனிப்பட்ட இணைப்பால் ஆயிரக்கணக்கான மக்களை ஆச்சரியப்படுத்தியுள்ளன.
          </p>
          <div className="space-y-2 italic opacity-80">
            <p className='text-xl text-gray-800'>உங்களுக்கே தனித்துவமான கைவரை கலை.</p>
            <p>ஜோதிடம் மற்றும் ஆன்மீக உள்ளுணர்வில் ஆழமாக வேரூன்றியது.</p>
          </div>
        </div>

        {/* Right Side: Image Slider */}
        <div className="flex-1 flex items-center justify-center relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute left-[-20px] z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
          >
            <span className="text-xl">←</span>
          </button>

          {/* Image Container */}
          <div className="w-full max-w-[400px] bg-white p-4 rounded-xl shadow-xl">
            <img 
              src={images[currentIndex]} 
              alt="Proof" 
              className="w-full h-auto rounded-lg transition-opacity duration-500"
            />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute right-[-20px] z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
          >
            <span className="text-xl">→</span>
          </button>
        </div>

      </div>

      {/* Bottom Button */}
      <Link to="/Cart" className="w-full md:w-auto">
      <button className="bg-[#D64F63] text-white text-xl font-bold py-4 mb-10 px-10 rounded-full shadow-lg hover:bg-[#b53d50] transition-transform hover:scale-105">
        என் Soulmate-ஐ இப்போது அறியுங்கள்
      </button>
      </Link>

    </div>
  );
};

export default Page;