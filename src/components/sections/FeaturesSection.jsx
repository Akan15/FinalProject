import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const { t } = useLanguage();
  const features = t.featuresSection.features;
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="features-title">{t.featuresSection.title}</h2>
        <ul className="features-list"> {/* теперь двухколоночный grid */}
          {features.map((feature, idx) => (
            <li className="feature-item" key={idx}>
              <span className="feature-icon">✔️</span>
              <span className="feature-text">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection; 