import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./ServicesSection.css";

export default function ServicesSection() {
  const { t } = useLanguage();
  const services = t.servicesSection.services;
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const cards = document.querySelectorAll(".service-card[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section">
      <div className="services-background">
        <div className="services-pattern"></div>
        <div className="services-gradient"></div>
      </div>

      <div className="container">
        <div className="services-header">
          <h2 className="section-title animate-fade-in">
            {t.servicesSection.title}
          </h2>
          <p className="section-subtitle animate-fade-in">
            {t.servicesSection.description}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${visibleCards.has(index) ? "animate-slide-up" : ""}`}
              data-index={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card-inner">
                <div className="service-header">
                  <div className="service-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.desc}</p>
                </div>

                <div className="service-footer">
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-link"
                    aria-label={`${t.servicesSection.linkText} для ${service.title}`}
                  >
                    <span>{t.servicesSection.linkText}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>

                <div className="service-overlay"></div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="services-footer">
          <div className="services-cta">
            <h3>Нужна помощь с интеграцией?</h3>
            <p>
              Наша команда поддержки готова помочь вам с настройкой и
              использованием сервисов
            </p>
            <button className="btn btn-primary btn-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12H16L14 15H10L8 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11V5.11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Связаться с поддержкой
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
