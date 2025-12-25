import React, { useState } from 'react';
import { Heart, Mail, User, Phone, MapPin, Calendar, Users, CheckCircle2, ShieldCheck, Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react';
import heroCoupleImg from '../assets/firstImg.png'; 
import TestimonialSection from './testimonial';
import PastWork from './pastWork';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Cart = () => {
  const mainProductOriginal = 1999;
  const mainProductDiscounted = 349;
  const upsellPrice = 99;

  // States
  const [upsells, setUpsells] = useState({ horoscope: false, wealth: false, ebook: false });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    emailaddress: '',
    phonenumber: '',
    dateofbirth: '',
    placeofbirth: '',
    gender: 'Select gender'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [openDetail, setOpenDetail] = useState(null);
  const toggleDetail = (key) => setOpenDetail(openDetail === key ? null : key);
  const handleToggle = (key) => setUpsells(prev => ({ ...prev, [key]: !prev[key] }));

  // Pricing Logic
  const activeUpsellsCount = Object.values(upsells).filter(Boolean).length;
  const upsellTotal = activeUpsellsCount * upsellPrice;
  const finalTotal = mainProductDiscounted + upsellTotal;
  const finalSubtotal = mainProductOriginal + upsellTotal;
  const discountAmount = mainProductOriginal - mainProductDiscounted;

  // --- Main Purchase Logic ---
  const handlePurchase = async () => {
    if (!formData.fullname || !formData.phonenumber || formData.gender === 'Select gender') {
      alert("Please fill all required fields! 💝");
      return;
    }

    try {
      // 1. Save to Firebase
      const docRef = await addDoc(collection(db, "orders"), {
        customerName: formData.fullname,
        email: formData.emailaddress,
        phone: formData.phonenumber,
        dob: formData.dateofbirth,
        pob: formData.placeofbirth,
        gender: formData.gender,
        selectedUpsells: upsells,
        totalAmount: finalTotal,
        status: "Awaiting Payment",
        createdAt: serverTimestamp()
      });
      
      setOrderId(docRef.id);
      // 2. Open Payment Modal
      setShowPaymentModal(true); 

    } catch (error) {
      console.error("Firebase Error: ", error);
      alert("Order save nahi ho paya. Connectivity check karein.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-gray-800 p-4 md:p-8 pb-10 relative">
      <header className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 mb-2 font-bold text-[#D689A1]">
          <div className="w-8 h-8 bg-[#D689A1] text-white rounded-full flex items-center justify-center text-xs">★</div>
          EASY ASTRO
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#D689A1]">உங்கள் காதல் கார்ட்</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* 1. Main Product Card */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={heroCoupleImg} alt="Soulmate Sketch" className="w-24 h-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">சோல்மேட் ஸ்கெட்ச்</h2>
              <p className="text-gray-400 text-sm mb-4">விரிவான முக ஸ்கெட்ச் மற்றும் தனிப்பட்ட பண்பியல் அறிக்கை</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#D689A1]">₹{mainProductDiscounted}</span>
                <span className="text-gray-300 line-through">₹{mainProductOriginal}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. User Details Form */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-pink-50">
           <h3 className="text-xl font-bold text-center mb-8 flex items-center justify-center gap-2">💫 உங்கள் விவரங்கள்</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name *', name: 'fullname', type: 'text', icon: <User size={14}/> },
                { label: 'Email Address *', name: 'emailaddress', type: 'email', icon: <Mail size={14}/> },
                { label: 'Phone Number *', name: 'phonenumber', type: 'tel', icon: <Phone size={14}/> },
                { label: 'Date of Birth *', name: 'dateofbirth', type: 'date', icon: <Calendar size={14}/> },
                { label: 'Place of Birth *', name: 'placeofbirth', type: 'text', icon: <MapPin size={14}/> }
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
                    <span className="text-[#D689A1]">{field.icon}</span> {field.label}
                  </label>
                  <input 
                    type={field.type} 
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D689A1]" 
                  />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
                  <Users size={14} className="text-[#D689A1]"/> Gender *
                </label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D689A1]">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
           </div>
        </section>

        {/* 3. Add-ons Section */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 space-y-6">
          <h3 className="font-bold text-[#D689A1]">உங்கள் பயணத்தை மேம்படுத்துங்கள்</h3>
          {[
            { id: 'horoscope', title: '2-Year Personal Horoscope', desc: "Future roadmap of your life." },
            { id: 'wealth', title: 'Wealth Report', desc: "Financial destiny analysis." },
            { id: 'ebook', title: 'Career Guidance eBook', desc: "Success alignment chart." }
          ].map((item) => (
            <div key={item.id} className="flex gap-4 items-start border-b border-pink-50 pb-4 last:border-0">
              <div 
                onClick={() => handleToggle(item.id)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer ${upsells[item.id] ? 'bg-[#D689A1] border-[#D689A1]' : 'border-gray-200'}`}
              >
                {upsells[item.id] && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>{item.title}</span>
                  <span>₹{upsellPrice}</span>
                </div>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 4. Total & Button */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-gray-700">Total Amount</span>
            <span className="text-3xl font-black text-[#D64D6E]">₹{finalTotal}</span>
          </div>
          <button onClick={handlePurchase} className="w-full bg-[#D64D6E] hover:bg-[#b03a55] text-white py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
            <Sparkles size={20} /> கொள்முதல் முடிக்கவும்
          </button>
        </section>
      </main>

      {/* --- PAYMENT MODAL POPUP --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPaymentModal(false)} className="absolute right-6 top-6 text-white/80 hover:text-white">
              <X size={24} />
            </button>
            
            <div className="bg-[#D64D6E] p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-1">பாதுகாப்பான செக்அவுட்</h3>
              <p className="text-pink-100 text-xs">உங்கள் ஸ்கெட்ச் பெறும் இறுதி கட்டம்</p>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <span className="text-gray-500">செலுத்த வேண்டிய தொகை</span>
                <span className="text-2xl font-black text-[#D64D6E]">₹{finalTotal}</span>
              </div>

              {[
                { name: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/128/6124/6124998.png' },
                { name: 'PhonePe', icon: 'https://cdn-icons-png.flaticon.com/128/825/825454.png' },
                { name: 'Paytm / UPI', icon: 'https://cdn-icons-png.flaticon.com/128/11413/11413158.png' }
              ].map((method) => (
                <button 
                  key={method.name}
                  onClick={() => alert(`Redirecting to ${method.name}...`)}
                  className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
                    <span className="font-bold text-gray-700">{method.name}</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-[#D64D6E]"></div>
                </button>
              ))}

              <p className="text-[10px] text-gray-400 text-center mt-6 flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> 100% பாதுகாப்பான SSL குறியாக்கப்பட்ட கட்டணம்
              </p>
            </div>
          </div>
        </div>
      )}

      <TestimonialSection />
      <PastWork />
    </div>
  );
};

export default Cart;