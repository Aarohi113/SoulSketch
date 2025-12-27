import React from 'react';
import { FileText, Sparkles, Inbox } from 'lucide-react';
import './HowItWorks.css';
import {Link} from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      step: "Step 1",
      icon: <FileText size={32} className="step-icon-svg" />,
      title: "விவரங்களை பகிரவும்",
      desc: "உங்கள் பெயர் மற்றும் பிறந்த தேதியை அளிக்கவும் ,இதன் மூலம் உங்கள் ஆன்மீக ஆற்றலுடன் இணைக்க முடியும்."
    },
    {
      step: "Step 2",
      icon: <Sparkles size={32} className="step-icon-svg" />,
      title: "எங்கள் கலைஞர்கள் தொடங்குகிறார்கள்",
      desc: "எங்கள் உள்ளுணர்வு கொண்ட கலைஞர்கள் மற்றும் ஜோதிடர்கள், உங்கள் சகஜ வாழ்க்கை துணையைப் பற்றிய விரிவான வரைபடத்தை உங்கள் энергியை பயன்படுத்தி கையால் வரைபடம் வரைகிறார்கள்."
    },
    {
      step: "Step 3",
      icon: <Inbox size={32} className="step-icon-svg" />,
      title: "உங்கள் வரைபடத்தை பெறுங்கள்",
      desc: "உங்கள் வரைபடமும் காதல் வாசிப்பும் 24–48 மணி நேரத்தில் தனிப்பட்ட முறையில், ஈமெயில் அல்லது வாட்ஸ்அப்பின் மூலம் உங்களுக்கு வழங்கப்படும்."
    }
  ];

  return (
    <section className="how-it-works-section px-4 py-12 md:py-24">
      <div className="hiw-container max-w-7xl mx-auto">
        <h2 className="hiw-main-title text-center text-3xl md:text-5xl font-bold mb-12 text-[#3d1a21]">
          இது எப்படி செயல்படுகிறது
        </h2>
        
        {/* Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */}
        <div className="hiw-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="hiw-card flex flex-col items-center text-center p-8 bg-white/60 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="step-badge bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs font-bold mb-4">
                {item.step}
              </span>
              <div className="icon-box-pink w-16 h-16 flex items-center justify-center bg-pink-50 rounded-2xl mb-6 text-pink-500">
                {item.icon}
              </div>
              <h3 className="hiw-card-title text-xl font-bold mb-4 text-[#3d1a21]">{item.title}</h3>
              <p className="hiw-card-desc text-gray-600 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="hiw-action-footer mt-16 text-center max-w-2xl mx-auto">
          <Link to="/tamil-cart" className="w-full md:w-auto">
          <button className="hiw-reveal-btn w-full md:w-auto bg-[#d64d6e] hover:bg-[#b03a55] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg mb-6 transition-transform active:scale-95">
            எனது துணையை இப்போது காணுங்கள்!
          </button>
          </Link>
          <p className="hiw-warning text-red-500 font-bold text-sm mb-4 animate-pulse">
            மிக குறைந்த இடங்கள் மட்டுமே மீதுள்ளது! சிறப்பு சலுகை முடிந்துகொள்ளும் முன் சீக்கிரம் பதிவு செய்யுங்கள்.
          </p>
          <p className="hiw-subtext text-gray-500 text-xs md:text-sm">
            தனிப்பட்டது, பாதுகாப்பானது, உங்கள் தேவைக்கேற்றது — சில நிமிடங்களில் தொடங்குங்கள்.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;