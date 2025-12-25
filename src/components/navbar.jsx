import React from 'react';
import './Navbar.css';
// Apni image ka path yahan dein
import logoImg from './assets/logo'; 

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <div className="logo-section">
          {/* Aapki image yahan render hogi */}
          <img src={logoImg} alt="Easy Astro Logo" className="navbar-logo-image" />
        </div>
      </div>
      {/* Background patterns ke liye overlay divs */}
      <div className="diagonal-pattern"></div>
      <div className="bottom-gradient-shade"></div>
    </nav>
  );
};

export default Navbar;