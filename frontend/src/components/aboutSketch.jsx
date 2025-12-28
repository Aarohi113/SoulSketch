import React from 'react';
import { CheckCircle2, Heart } from 'lucide-react';
import './AboutSketch.css';
// Image path ko apne project ke hisaab se update karein
import psychicImage from '../assets/secondImg.png'; 
import {Link} from 'react-router-dom';

const AboutSketch = () => {
  return (
    <section className="about-sketch-section ">
      <div className="about-container flex-container">
        
        {/* Left Content Area */}
        <div className="about-text-content">
          <div className="badge-wrapper">
             <span className="sparkle-badge">✦ தனிப்பட்டதும், தனியுரிமையானதும்</span>
          </div>
          
          <h2 className="about-title">
           அதற்காக உங்கள் மனம் ஏங்குகிறதா <span className="pink-gradient-text">சிறப்பு தொடர்பா?</span>
          </h2>
          
          <p className="about-description">
            உங்கள் விதியாளன் துணையின் ரகசியத்தை வெளிப்படுத்துங்கள் <strong>personalized soulmate sketch</strong> — 
            உங்கள் சக்தியை பிரபஞ்சத்துடன் ஒத்திசைக்கவும், உங்கள் வாழ்க்கையில் உண்மையான காதலை ஈர்க்கவும் உருவாக்கப்பட்டுள்ளது.
          </p>
          
          <p className="about-cta-text about-description font-bold italic">
            உங்கள் காதலான விதி காத்திருக்கிறது — நீங்கள் செய்ய வேண்டியது ஒரு “ஆம்” சொல்லுவது மட்டுமே.
          </p>

          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle2 className="check-icon-green" size={20} />
              <span>24 மணிநேரத்தில் தனியுரிமையுடன் பெறுங்கள்</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 className="check-icon-green" size={20} />
              <span>100% ரகசியம் — உங்கள் தகவல்கள் பாதுகாப்பாக இருக்கும்</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 className="check-icon-green" size={20} />
              <span>திறமையான முன்ஞானிகள் மற்றும் ஜோதிட நிபுணர்களால் உருவாக்கப்பட்டது</span>
            </div>
          </div>

          <div className="about-button-group">
          <Link to="/tamil-cart" className="w-full md:w-auto" >
          <button className="reveal-btn-large">எனது துணையை காணவும்!</button>
          </Link>
            <div className="happy-customers-badge">
               <Heart size={18} className="heart-icon" />
               <span>ஆயிரக்கணக்கான மகிழ்ச்சியான வாடிக்கையாளர்கள்</span>
            </div>
          </div>
          <p className="spots-warning">சில இடங்கள் மட்டுமே! சிறப்பு சலுகை முடிவுக்கு முன் சீக்கிரம் பதிவு செய்யுங்கள்.</p>
        </div>

        {/* Right Image Area */}
        <div className="about-image-wrapper">
          <div className="image-card-frame">
            <img src={psychicImage} alt="Psychic Artist" className="psychic-main-img" />
            <div className="sample-artwork-tag">
              சோதனை கலை • உங்கள் வரைபடம் உங்கள் தனிப்பட்டது
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSketch;
