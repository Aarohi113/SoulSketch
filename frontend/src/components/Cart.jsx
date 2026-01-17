import React, { useState } from 'react';
import { Heart, Mail, User, Phone, MapPin, Calendar, Users, CheckCircle2, ShieldCheck, Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react';
// 1. Firebase imports add karein
import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import heroCoupleImg from '../assets/firstImg.png'; 
import TestimonialSection from './testimonial';
import PastWork from './pastWork';

const Cart = () => {
  const mainProductOriginal = 1999;
  const mainProductDiscounted = 349;
  const upsellPrice = 99;

  const [upsells, setUpsells] = useState({ horoscope: false, wealth: false, ebook: false });
  const [formData, setFormData] = useState({
    fullname: '',
    emailaddress: '',
    phonenumber: '',
    dateofbirth: '',
    placeofbirth: '',
    gender: 'Select gender'
  });

  const upsellItems = [
    { id: 'horoscope', title: '2 ஆண்டு தனிப்பட்ட ஜாதக அறிக்கை', desc: "...", price: 99, oldPrice: 299 },
    { id: 'wealth', title: 'செல்வ அறிக்கை', desc: "...", price: 99, oldPrice: 299 },
    { id: 'ebook', title: 'வாழ்க்கைப் பாதை & தொழில் வழிகாட்டி eBook', desc: "...", price: 99, oldPrice: 249 }
  ];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleToggle = (key) => setUpsells(prev => ({ ...prev, [key]: !prev[key] }));

  const activeUpsellsCount = Object.values(upsells).filter(Boolean).length;
  const upsellTotal = activeUpsellsCount * upsellPrice;
  const finalTotal = mainProductDiscounted + upsellTotal;

  // --- Razorpay Payment Function ---
  const initiatePayment = (orderIdFromFirebase) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: finalTotal * 100, // Amount in paise
      currency: "INR",
      name: "Easy Astro",
      description: "Astrology Services",
      // Note: Razorpay Order ID generator ke liye backend chahiye hota hai
      // Abhi ke liye hum simple payment kar rahe hain
      handler: async function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        window.location.href = "/thank-you";
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

  // --- Create Order Logic (Fixed for Firebase) ---
  const handlePurchase = async () => {
    if (!formData.fullname || !formData.phonenumber || formData.gender === 'Select gender') {
      alert("Please fill all required fields!");
      return;
    }

    try {
      // 2. Direct Firebase mein data save karein (fetch ki zaroorat nahi)
      const docRef = await addDoc(collection(db, "orders"), {
        customerName: formData.fullname,
        email: formData.emailaddress,
        phone: formData.phonenumber,
        dob: formData.dateofbirth,
        pob: formData.placeofbirth,
        gender: formData.gender,
        selectedUpsells: upsells,
        totalAmount: finalTotal,
        paymentStatus: "pending", // Initially pending
        createdAt: serverTimestamp()
      });

      console.log("Document written with ID: ", docRef.id);
      
      // 3. Payment initiate karein
      initiatePayment(docRef.id);

    } catch (err) {
      console.error("Firebase Error: ", err);
      alert("Database error! Please check your connection or Firebase rules.");
    }
  };

  return (
    // ... baki pura UI code same rahega ...
    <div className="min-h-screen bg-[#FFF5F5] text-gray-800 p-4 md:p-8 pb-10 relative">
        {/* Render your UI as before */}
        {/* Button call remains handlePurchase */}
    </div>
  );
};
