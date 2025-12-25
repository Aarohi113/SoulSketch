import React, { useState, useEffect } from 'react';
import './StickyFooter.css';
import { Link } from 'react-router-dom';

const StickyFooter = () => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sticky-footer-wrapper">
      <div className="footer-content">
        
        {/* Admin Link (Left Side pe Chota sa) */}
        <Link 
          to="/admin" 
          className="admin-link-minimal"
          style={{ textDecoration: 'none', color: '##ea6291ff', fontSize: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #ea6291ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ★
          </div>
          <span style={{ fontSize: '10px' }}>Admin</span>
        </Link>

        <div className="footer-left-section">
          <div className="offer-label">சலுகை முடியும் வரை:</div>
          <div className="price-container">
            <div className="timer-badge">
              {seconds > 0 ? formatTime(seconds) : "00:00"}
            </div>
            <span className="old-price-footer">₹998</span>
            <span className="current-price-footer">₹289</span>
          </div>
        </div>
          
        <div className="footer-right-section">
          <Link to="/Cart" className="w-full md:w-auto">
            <button className="footer-action-btn">
              எனது துணையை காணுங்கள்
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;