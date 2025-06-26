import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import "./HeroSection.css";

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.ru;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Background Pattern */}
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? "animate-fade-in" : ""}`}>
            <h1 className="hero-title">
              {t.heroTitle || "Цифровое правительство"}
              <span className="title-accent"> {t.heroKazakhstan || "Казахстана"}</span>
            </h1>
            <p className="hero-subtitle">
              {t.heroSubtitle ||
                "Инновационные решения для эффективного государственного управления и качественного обслуживания граждан"}
            </p>

            <div className="hero-buttons">
              <a href="#products" className="btn btn-primary btn-lg">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {t.heroButton1 || "Наши продукты"}
              </a>
              <a href="#instructions" className="btn btn-secondary btn-lg">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t.heroButton2 || "Инструкции"}
              </a>
            </div>
          </div>

          <div
            className={`hero-visual ${isVisible ? "animate-slide-in-right" : ""}`}
          >
            <div className="hero-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="card-title">E-Government Portal</div>
              </div>
              <div className="card-content">
                <div className="service-item">
                  <div className="service-icon primary">
                    <svg
                      width="24"
                      height="24"
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
                  <div className="service-details">
                    <h4>{t.heroService1Title || "Государственные услуги"}</h4>
                    <p>{t.heroService1Desc || "Быстро и удобно"}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon success">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="service-details">
                    <h4>{t.heroService2Title || "Мобильные приложения"}</h4>
                    <p>{t.heroService2Desc || "Доступ 24/7"}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon warning">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="service-details">
                    <h4>{t.heroService3Title || "Аналитика и отчеты"}</h4>
                    <p>{t.heroService3Desc || "Данные в реальном времени"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">{t.heroStatServices || "Государственных услуг"}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5M+</div>
              <div className="stat-label">{t.heroStatUsers || "Активных пользователей"}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">{t.heroStatUptime || "Время доступности"}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">{t.heroStatSupport || "Поддержка"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
