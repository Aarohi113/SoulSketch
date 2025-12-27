import React, { useState } from 'react';
import { Heart, Mail, User, Phone, MapPin, Calendar, Users, CheckCircle2, ShieldCheck, Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react';
import heroCoupleImg from '../assets/firstImg.png'; 
import TestimonialSection from './testimonial';
import PastWork from './pastWork';

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

  const handleToggle = (key) => setUpsells(prev => ({ ...prev, [key]: !prev[key] }));

  // Pricing Logic
  const activeUpsellsCount = Object.values(upsells).filter(Boolean).length;
  const upsellTotal = activeUpsellsCount * upsellPrice;
  const finalTotal = mainProductDiscounted + upsellTotal;

  // --- Razorpay Payment Function ---
  const initiatePayment = (orderIdFromBackend) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID", 
      amount: finalTotal * 100,
      currency: "INR",
      name: "Easy Astro",
      order_id: orderIdFromBackend,
      handler: async function (response) {
        try {
          const res = await fetch("/api/order/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();
          if (verifyData.success) {
            alert("Payment Verified! ❤️");
            window.location.href = "/thank-you"; 
          } else {
            alert("Payment Verification Failed!");
          }
        } catch (error) {
          console.error("Verification Error:", error);
        }
      },
      prefill: {
        name: formData.fullname,
        email: formData.emailaddress,
        contact: formData.phonenumber
      },
      theme: { color: "#D64D6E" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // --- Create Order Logic ---
  const handlePurchase = async () => {
    if (!formData.fullname || !formData.phonenumber || formData.gender === 'Select gender') {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullname,
          email: formData.emailaddress,
          phone: formData.phonenumber,
          dob: formData.dateofbirth,
          pob: formData.placeofbirth,
          gender: formData.gender,
          selectedUpsells: upsells,
          totalAmount: finalTotal
        })
      });

      const data = await res.json();
      if (data.orderId) {
        setOrderId(data.orderId);
        initiatePayment(data.orderId);
      } else {
        alert("Server Error: Order ID not generated.");
      }
    } catch (err) {
      console.error(err);
      alert("Order save failed! Check connection.");
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
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={heroCoupleImg} alt="Soulmate Sketch" className="w-24 h-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">சோல்மேட் ஸ்கெட்ச்</h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#D689A1]">₹{mainProductDiscounted}</span>
                <span className="text-gray-300 line-through">₹{mainProductOriginal}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-pink-50">
          <h3 className="text-xl font-bold text-center mb-8">💫 உங்கள் விவரங்கள்</h3>
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
              <label className="text-[11px] font-bold text-gray-500 uppercase">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D689A1]">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </section>

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

      <TestimonialSection />
      <PastWork />
    </div>
  );
};

export default Cart;