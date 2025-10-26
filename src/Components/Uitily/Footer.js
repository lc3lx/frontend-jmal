import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* من نحن */}
          <div className="footer-section">
            <h3>من نحن</h3>
            <p>
              في متجر ستريم ستور نوفر لك البطاقات والاشتراكات والخدمات الرقمية
              بأعلى جودة ممكنة وبأقل سعر ممكن لأن رضاك يهمنا 💙
            </p>
            <div className="footer-social">
              <a
                href="https://wa.me/+966598486514"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="footer-section">
            <h3>روابط سريعة</h3>
            <Link to="/">الرئيسية</Link>
            <Link to="/products">المنتجات</Link>
            <Link to="/allcategory">الفئات</Link>
            <Link to="/user/allorders">طلباتي</Link>
          </div>

          {/* روابط مهمة */}
          <div className="footer-section">
            <h3>روابط مهمة</h3>
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">الشروط والأحكام</Link>
            <Link to="/refund">سياسة الاستبدال والإسترجاع</Link>
            <Link to="/contact">تواصل معنا</Link>
          </div>

          {/* تواصل معنا */}
          <div className="footer-section">
            <h3>تواصل معنا</h3>
            <div className="contact-info">
              <p>
                <i className="fas fa-phone"></i>
                <a
                  href="https://wa.me/+966598486514"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +966598486514
                </a>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@streemstoer.com">
                  support@streemstoer.com
                </a>
              </p>
              <p>
                <i className="fas fa-clock"></i>
                <span>متاح 24/7</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>الحقوق محفوظة © 2025 متجر ستريم ستور . جميع الحقوق محفوظة</p>
          <p className="footer-badge">
            <i className="fas fa-shield-alt"></i>
            موثوق في منصة الأعمال
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
