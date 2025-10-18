import React from "react";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const features = [
    {
      icon: "⚡",
      title: "خدمة عملاء فورية",
      description: "وتعامل راقي",
    },
    {
      icon: "💰",
      title: "ارخص الأسعار",
      description: "والعديد من طرق الدفع",
    },
    {
      icon: "✨",
      title: "منتجات بجودة عالية",
      description: "ومضمونة",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-horizontal">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
