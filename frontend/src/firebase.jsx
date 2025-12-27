import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 1. Ye import hona chahiye

const firebaseConfig = {
  apiKey: "AIzaSyBG08ARaureKLSD2nss3ZmiyKhGQ4QZJ7o", 
  authDomain: "soulsketch-db9de.firebaseapp.com",
  projectId: "soulsketch-db9de",
  storageBucket: "soulsketch-db9de.firebasestorage.app",
  messagingSenderId: "1034833747624",
  appId: "1:1034833747624:web:041cd441c73bbe92016c9d"
};

// 2. Firebase initialize karein
const app = initializeApp(firebaseConfig);

// 3. Firestore (db) ko initialize karke EXPORT karein
export const db = getFirestore(app);