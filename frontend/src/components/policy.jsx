import React from 'react';

const LegalPage = () => {
  // Navigation items ka array
  const sections = [
    { title: "About Us", id: "about-us", desc: "Jump to about us." },
    { title: "Privacy Policy", id: "privacy-policy", desc: "Jump to privacy policy." },
    { title: "Terms & Conditions", id: "terms-conditions", desc: "Jump to terms & conditions." },
    { title: "Refund Policy", id: "refund-policy", desc: "Jump to refund policy." },
    { title: "Delivery Policy", id: "delivery-policy", desc: "Jump to delivery policy." },
    { title: "Disclaimer", id: "disclaimer", desc: "Jump to disclaimer." },
    { title: "Cookie Policy", id: "cookie-policy", desc: "Jump to cookie policy." },
    { title: "Contact Policy", id: "contact-policy", desc: "Jump to contact policy." },
  ];

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F2] p-8 md:p-16 font-serif">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-100">
          Updated • 28/12/2025
        </span>
        <h1 className="text-5xl font-bold text-[#4A2C2C] mt-6 mb-4">EasyAstro Legal & About Us</h1>
        <p className="text-gray-600 text-lg">Learn about our story, our policies, and the terms for using our services.</p>
      </div>

      {/* Grid Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((item) => (
          <div 
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="bg-white/60 p-6 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white transition-all border border-transparent hover:border-pink-100 group shadow-sm"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2C]">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </div>
            <span className="text-2xl text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        ))}
      </div>

      {/* Content Sections (In par redirect hoga) */}
      <div className="max-w-6xl mx-auto mt-32 space-y-20 pb-20">
        {sections.map((item) => (
          <div key={item.id} id={item.id} className="pt-10 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-[#4A2C2C] mb-4">{item.title}</h2>
            <div className="text-gray-700 leading-relaxed bg-white p-8 rounded-2xl shadow-sm">
              <p>Yaha par aapka <strong>{item.title}</strong> ka detailed content aayega. 
              Aap is div ki ID ko use karke upar se scroll karke yaha aa sakte hain.</p>
              <p className="mt-4 text-sm text-gray-500 italic">Example text: Hamari services ko use karne ke liye dhanyawad...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
