import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {Link} from 'react-router-dom';

const FAQSection = () => {
  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "சோல்மேட் ஸ்கெட்ச் எவ்வளவு துல்லியமாக இருக்கும்?",
      answer: "ஜோதிட ஒத்திசைவு மற்றும் உள்ளுணர்வு அடிப்படையில் உருவாக்கப்படும் இந்த ஸ்கெட்ச், பலருக்கும் மிகத் தனிப்பட்ட மற்றும் துல்லியமானதாக இருக்கும்."
    },
    {
      question: "என் தனிப்பட்ட விவரங்கள் ரகசியமாக பாதுகாக்கப்படுமா?",
      answer: "ஆம். 100% ரகசியத்தன்மை எங்களின் உறுதி. உங்கள் தனிப்பட்ட விவரங்களும் ஸ்கெட்சும் எப்போதும் பாதுகாப்பாகவும் ரகசியமாகவும் வைத்திருக்கும்."
    },
    {
      question: "நான் என் ஸ்கெட்சை எவ்வாறு பெறுவேன்?",
      answer: "ஆர்டர் செய்த 24–48 மணிநேரங்களுக்குள், உங்கள் ஸ்கெட்ச் மற்றும் ரீடிங் உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சல் முகவரிக்கு நேரடியாக அனுப்பப்படும்."
    },
    {
      question: "நான் திருப்தி அடையவில்லை என்றால் என்ன?",
      answer: "நாங்கள் திருப்தி உத்தரவாதத்தை வழங்குகிறோம். ரீடிங் உங்களுடன் ஒத்துப்போகவில்லை என்றால், முழுமையான மதிப்பாய்விற்காக எங்கள் ஆதரவு குழுவை தயவுசெய்து தொடர்பு கொள்ளுங்கள்."
    },
    {
      question: "என் சோல்மேட் பற்றி மேலும் விவரங்களை பெற முடியுமா?",
      answer: "ஆம், கூடுதல் விவரங்களுக்காக Wealth Report மற்றும் விரிவான Personality Reading போன்ற add-ons கிடைக்கின்றன. இவை உங்கள் சோல்மேட்டின் தன்மைகளையும், உங்கள் எதிர்காலப் பயணத்தையும் தெளிவாக புரிய உதவும்."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#FDF2F2] py-25 px-4 font-serif">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl text-[#5D3A3A] mb-16 text-center font-medium">
          அடிக்கடி கேட்கப்படும் கேள்விகள்
        </h2>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-red-100 last:border-0 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-[#D64F63] transition-colors group"
              >
                <span className={`text-xl font-medium ${openIndex === index ? 'text-[#D64F63]' : 'text-[#5D3A3A]'}`}>
                  {faq.question}
                </span>
                <div className="text-gray-400 group-hover:text-[#D64F63]">
                  {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>

              {/* Dropdown Content */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[#8B7373] text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-2">
          <Link
            href="/policy" 
            className="text-[#8B7373] hover:text-[#D64F63] underline text-lg transition-colors"
          >
            கொள்கை & ஆதரவு
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FAQSection;
