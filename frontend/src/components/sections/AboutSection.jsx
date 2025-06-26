import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import "./AboutSection.css";

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.ru;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <div className="container">
        <div className={`about-header ${isVisible ? "animate-fade-in" : ""}`}>
          <h2 className="section-title">{t.aboutTitle || "О департаменте"}</h2>
          <p className="section-subtitle">
            {t.aboutIntro ||
              "Мы создаем цифровое будущее государственного управления"}
          </p>
        </div>

        <div className="about-content">
          <div
            className={`about-text-section ${isVisible ? "animate-slide-in-left" : ""}`}
          >
            <div className="about-card">
              <div className="card-icon">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                  />
                </svg>
              </div>
              <div className="card-content">
                <h3>{t.aboutMissionTitle || "Наша миссия"}</h3>
                <p>
                  {t.aboutText1 ||
                    "Департамент информационных технологий занимается разработкой и внедрением современных цифровых решений для государственных органов Республики Казахстан."}
                </p>
              </div>
            </div>

            <div className="about-card">
              <div className="card-icon success">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="card-content">
                <h3>{t.aboutAchievementsTitle || "Наши достижения"}</h3>
                <p>
                  {t.aboutText2 ||
                    "Мы успешно внедрили множество проектов, которые значительно улучшили качество предоставления государственных услуг и повысили эффективность работы государственных органов."}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`about-features ${isVisible ? "animate-slide-in-right" : ""}`}
          >
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>{t.aboutFeatureInnovationTitle || "Инновации"}</h4>
                  <p>
                    {t.aboutFeatureInnovationDesc || "Применяем передовые технологии для создания эффективных решений"}
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>{t.aboutFeatureQualityTitle || "Качество"}</h4>
                  <p>
                    {t.aboutFeatureQualityDesc || "Высочайшие стандарты разработки и тестирования продуктов"}
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>{t.aboutFeatureSecurityTitle || "Безопасность"}</h4>
                  <p>
                    {t.aboutFeatureSecurityDesc || "Защита данных и кибербезопасность на международном уровне"}
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-number">04</div>
                <div className="feature-content">
                  <h4>{t.aboutFeatureAccessibilityTitle || "Доступность"}</h4>
                  <p>{t.aboutFeatureAccessibilityDesc || "Равный доступ к цифровым услугам для всех граждан"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`about-values ${isVisible ? "animate-fade-in" : ""}`}>
          <h3 className="values-title">{t.aboutValuesTitle || "Наши ценности"}</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4>{t.aboutValueEfficiencyTitle || "Эффективность"}</h4>
              <p>{t.aboutValueEfficiencyDesc || "Оптимизация процессов и максимальная продуктивность"}</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h4>{t.aboutValueTransparencyTitle || "Прозрачность"}</h4>
              <p>{t.aboutValueTransparencyDesc || "Открытость во всех процессах и решениях"}</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4>{t.aboutValueReliabilityTitle || "Надежность"}</h4>
              <p>{t.aboutValueReliabilityDesc || "Стабильная работа и высокое качество услуг"}</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>
              <h4>{t.aboutValueInnovationTitle || "Инновации"}</h4>
              <p>{t.aboutValueInnovationDesc || "Постоянное развитие и внедрение новых технологий"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="about-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};

export default AboutSection; 
