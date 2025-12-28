import React from 'react';

const LegalPage = () => {
  // Navigation items ka array
  const sections = [
    { title: "About Us", id: "about-us", desc: "Jump to about us.",content: `At EasyAstro, we believe the universe holds answers to questions your heart hasn’t dared to ask yet.
    We’re a team of passionate astrologers, intuitive artists, and energy readers helping people across India discover their soulmate, unlock wealth, and decode their life path — all through ancient wisdom delivered in modern ways.` },
    { title: "Privacy Policy", id: "privacy-policy", desc: "Jump to privacy policy.",content: `We respect your privacy. This policy explains how we collect, use, store, and protect your personal data.
    We collect your name, email, date of birth, time, and location solely to prepare your personalized astrology products.
    We do not share, sell, or rent your data to third parties.
    All data is stored securely and only authorized team members can access it.
    Payment processing is handled by secure third-party gateways; we do not store card information.` },
    { title: "Terms & Conditions", id: "terms-conditions", desc: "Jump to terms & conditions.",content: `These terms set the rules for using our website and buying our products.

All products are digital and delivered via email; no physical items are shipped unless stated otherwise.
By purchasing, you agree that our astrology readings and sketches are for entertainment and personal insight purposes only, not a substitute for professional, medical, or financial advice.
You must provide accurate birth details for accurate reports; incorrect details may affect results.
Unauthorized reproduction, resale, or redistribution of our products is prohibited.
Prices and promotions are subject to change without notice.` },
    { title: "Refund Policy", id: "refund-policy", desc: "Jump to refund policy.",content: `Our refund policy outlines when refunds are allowed.

Approved refunds will be credited into original payment method within 5-7 Days
As all products are digital and personalized, we generally do not offer refunds once the product has been delivered.
Refunds may be granted in cases of:
Duplicate payment
Non-delivery due to technical error
If you believe there’s an error with your order, contact us within 48 hours of delivery.` },
    { title: "Delivery Policy", id: "delivery-policy", desc: "Jump to delivery policy.",content: `How and when digital products are delivered.

Digital products are typically delivered within 24–48 hours of order placement.
Delivery is via the email address you provide at checkout — please ensure it’s correct.
Delays may occur during high-order periods; we will notify you if your order is delayed.` },
    { title: "Disclaimer", id: "disclaimer", desc: "Jump to disclaimer.",content: `Limitations of liability for our services and content.

Our astrology products are intended for entertainment and personal development purposes only.
We do not guarantee specific outcomes or results from using our products.
You are responsible for any decisions you make based on our readings or sketches.` },
    { title: "Cookie Policy", id: "cookie-policy", desc: "Jump to cookie policy.",content: `How we use cookies and similar technologies.

We use cookies to improve your browsing experience and analyze traffic.
Cookies help remember your preferences and personalize content.
You can disable cookies in your browser settings, but this may affect site functionality.` },
    { title: "Contact Policy", id: "contact-policy", desc: "Jump to contact policy.",content: `How to reach us for support.

For order questions, email no-reply@easyastro.in.
Support available Monday–Saturday, 10 AM–6 PM IST.
Average response time: 24–48 hours.` },
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
             <p className="whitespace-pre-line">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
