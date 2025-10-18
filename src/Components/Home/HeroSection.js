import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content animate-fade-in-up">
        <h1>
          احصل على <span className="highlight">أفضل الاشتراكات</span>
          <br />
          بأقل الأسعار
        </h1>
        <p className="hero-description">
          نوفر لك حسابات Netflix, Shahid, Disney+ وغيرها
          <br />
          بجودة عالية وأسعار مناسبة للجميع
        </p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary btn-large">
            تصفح المنتجات
          </Link>
          <a
            href="https://wa.me/966551200896"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-large"
          >
            تواصل معنا
          </a>
        </div>
        <div className="hero-features">
          <div className="hero-feature">
            <span className="feature-icon">✓</span>
            <span>توصيل فوري</span>
          </div>
          <div className="hero-feature">
            <span className="feature-icon">✓</span>
            <span>ضمان 100%</span>
          </div>
          <div className="hero-feature">
            <span className="feature-icon">✓</span>
            <span>دعم 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
