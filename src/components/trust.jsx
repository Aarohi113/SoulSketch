import React from 'react';
import { CheckCircle2 } from 'lucide-react';



const TrustSection = () => {
  const trustPoints = [
    "1,00,000க்கும் மேற்பட்ட ஸ்கெட்ச்கள் வழங்கப்பட்டுள்ளன",
    "வாடிக்கையாளர்களிடமிருந்து சராசரி 4.8 / 5 மதிப்பீடு",
    "அனுபவமிக்க மனோதத்துவ நிபுணர்கள் & ஜோதிடர்கள்",
    "100% திருப்தி உறுதி — இல்லையெனில் பணம் திருப்பி"
  ];
  

  return (
    <div className="w-full bg-[#f4c6cdff] py-16 px-4 font-serif py-25">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl text-[#5D3A3A] font-medium italic">
           ஏன் எங்களை நம்ப வேண்டும்?
          </h2>
          
          <ul className="space-y-5">
            {trustPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-4 text-[#5D3A3A] text-xl">
                <CheckCircle2 className="text-[#D64F63] flex-shrink-0" size={28} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#8B7373] text-lg mt-8">
            முழுமையான பாதுகாப்பும் ரகசியத்தன்மையும் உறுதி. உங்கள் நம்பிக்கையே எங்களின் முக்கியத்துவம்.
          </p>
        </div>

        {/* Right Side: Image with Badge */}
        <div className="flex-1 relative flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            {/* Main Circle Image */}
            <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src="/thirdImg.png" // Yahan apni image lagayein
                alt="Happy Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustSection;