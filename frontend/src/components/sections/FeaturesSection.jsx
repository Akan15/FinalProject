import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const { language, t } = useLanguage();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/features")
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setFeatures(data) : setFeatures([]))
      .catch(() => setFeatures([]));
  }, []);

  const getTitle = (feature) => {
    if (language === "kz") return feature.TitleKZ || feature.title_kz;
    if (language === "en") return feature.TitleEN || feature.title_en;
    return feature.TitleRU || feature.title_ru;
  };

  // Защита: features всегда массив
  const safeFeatures = Array.isArray(features) ? features : [];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="features-title">{t.featuresSection.title}</h2>
        <ul className="features-list">
          {safeFeatures.map((feature, idx) => (
            <li className="feature-item" key={feature.id || feature._id || idx}>
              <span className="feature-icon">✔️</span>
              <span className="feature-text">{getTitle(feature)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection; 