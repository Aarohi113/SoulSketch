import React from 'react';
import { Waves, FileText, CircleDollarSign } from 'lucide-react';
import {Link} from 'react-router-dom';

const BenefitSection = () => {
  const benefits = [
    {
      icon: <Waves size={36} strokeWidth={1.5} />,
      title: "தனிப்பட்ட ஆன்மீக கைவரை ஓவியம்",
      description: "ஆன்மீக உள்ளுணர்வும் ஜோதிடத் துல்லியமும் இணைந்த, உங்கள் வாழ்க்கை துணையின் தனிப்பயன் படம்."
    },
    {
      icon: <FileText size={36} strokeWidth={1.5} />,
      title: "இலவச விரிவான காதல் வாசிப்பு",
      description: "போனஸாக, உங்கள் வாழ்க்கை துணையின் தன்மை, உறவு அமைப்பு, மற்றும் அவரை சந்திக்கும் நேரத்தையும் தெரிந்துகொள்ளுங்கள்.",
      subText: "9 இடங்கள் மட்டுமே உள்ளது!"
    },
    {
      icon: <CircleDollarSign size={36} strokeWidth={1.5} />,
      title: "விருப்பத் தேர்வு: தனிப்பயன் செல்வ அறிக்கை",
      description: "அட்ஒனாக, உங்கள் நிதி விதி, பண தடைகள், மற்றும் செல்வ வளத்திற்கு வழிகாட்டும் பிரபஞ்ச குறிப்புகளை அறியுங்கள்."
    }
  ];

  return (
    <div className="w-full bg-[#FDF2F2] py-6 px-4 font-serif flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl text-[#5D3A3A] mb-12 font-medium">
          நீங்கள் பெறுவது
        </h2>

        {/* Cards Container */}
        <div className="space-y-6 mb-12">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#FFF5F5] border border-red-50 p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              {/* Lucide Icons with matching color */}
              <div className="text-[#D64F63] flex-shrink-0 mt-1">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-semibold text-[#D64F63] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5D3A3A] text-lg leading-relaxed opacity-90">
                  {item.description}
                </p>
                {item.subText && (
                  <p className="mt-4 text-[#D64F63] font-bold text-sm tracking-widest">
                    {item.subText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section (New Added Part) */}
        <div className="flex flex-col items-center space-y-6">
          <p className="text-[#8B7373] text-xl font-medium">
            ஒவ்வொரு ஆர்டரும் 100% தனிப்பட்டதும் ரகசியமானதும் ஆகும்.
          </p>
          <Link to="/Cart" className="w-full md:w-auto">
          <button className="bg-[#D64F63] text-white text-xl font-bold py-4 px-12 rounded-full shadow-xl hover:bg-[#b53d50] active:scale-95 transition-all">
            என் Soulmate-ஐ இப்போதே வெளிப்படுத்துங்கள்!
          </button>
          </Link>
          <p className="text-[#D64F63] text-sm font-medium italic">
            சில இடங்கள் மட்டுமே! சலுகை முடிவதற்கு முன் விரைந்து செய்க.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BenefitSection;