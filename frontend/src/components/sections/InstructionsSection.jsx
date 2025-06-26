import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import "./InstructionsSection.css";

// Import PDF file
import instructionsPDF from "../../assets/pdfs/Instructuions.pdf";

const InstructionsSection = () => {
  const [expandedChecklist, setExpandedChecklist] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);

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

  const toggleChecklist = (index) => {
    setExpandedChecklist(expandedChecklist === index ? null : index);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = instructionsPDF;
    link.download = "Instructions.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openVideoModal = (videoId) => {
    setActiveVideo(videoId);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
  };

  return (
    <section
      id="instructions"
      className="instructions-section section"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="instructions-background">
        <div className="pattern-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>

      <div className="container">
        <div
          className={`instructions-header ${isVisible ? "animate-fade-in" : ""}`}
        >
          <h2 className="section-title">
            {t.instructionsTitle || "Инструкции"}
          </h2>
          <p className="section-subtitle">
            {t.instructionsSubtitle || "Подробные руководства и пошаговые инструкции для работы с нашими приложениями"}
          </p>
        </div>

        {/* Video Guides Section */}
        <div
          className={`video-guides ${isVisible ? "animate-slide-in-left" : ""}`}
        >
          <div className="section-header">
            <div className="header-icon">
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3>{t.videoGuidesTitle || "Видео-гайды"}</h3>
          </div>

          <div className="video-grid">
            <div
              className="video-card"
              onClick={() => openVideoModal("mobile")}
            >
              <div className="video-thumbnail">
                <div className="play-button">
                  <svg
                    width="64"
                    height="64"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="video-overlay">
                  <div className="video-duration">5:30</div>
                </div>
                <img
                  src="https://img.youtube.com/vi/3qegg4jU3sQ/maxresdefault.jpg"
                  alt="eGov Mobile Guide"
                />
              </div>
              <div className="video-content">
                <h4>{t.eGovMobileVideoTitle || "eGov Mobile"}</h4>
                <p>
                  {t.instructionsMobileGuide || "Пошаговое руководство по регистрации и использованию мобильного приложения"}
                </p>
                <div className="video-stats">
                  <span className="views">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    {t.instructionsViewsMobile || "15K просмотров"}
                  </span>
                  <span className="rating">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    4.8/5
                  </span>
                </div>
              </div>
            </div>

            <div
              className="video-card"
              onClick={() => openVideoModal("business")}
            >
              <div className="video-thumbnail">
                <div className="play-button">
                  <svg
                    width="64"
                    height="64"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="video-overlay">
                  <div className="video-duration">7:45</div>
                </div>
                <img
                  src="https://img.youtube.com/vi/Lbnkk3mIgPo/maxresdefault.jpg"
                  alt="eGov Business Guide"
                />
              </div>
              <div className="video-content">
                <h4>{t.eGovBusinessVideoTitle || "eGov Business"}</h4>
                <p>
                  {t.instructionsBusinessGuide || "Руководство по получению документов и работе с бизнес-функциями"}
                </p>
                <div className="video-stats">
                  <span className="views">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    {t.instructionsViewsBusiness || "12K просмотров"}
                  </span>
                  <span className="rating">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    4.9/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checklists Section */}
        <div
          className={`checklists-section ${isVisible ? "animate-slide-in-right" : ""}`}
        >
          <div className="section-header">
            <div className="header-icon">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3>{t.checklistsTitle || "Чек-листы"}</h3>
          </div>

          <div className="checklist-grid">
            <div className="checklist-card">
              <div
                className={`checklist-header ${expandedChecklist === 0 ? "expanded" : ""}`}
                onClick={() => toggleChecklist(0)}
                role="button"
                aria-expanded={expandedChecklist === 0}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleChecklist(0);
                  }
                }}
              >
                <div className="checklist-title">
                  <div className="checklist-icon">
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h4>
                    {t.registrationChecklistTitle || "Регистрация в системе"}
                  </h4>
                </div>
                <div className="toggle-button">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`checklist-content ${expandedChecklist === 0 ? "expanded" : ""}`}
              >
                <ul
                  className="checklist-steps"
                  role="region"
                  aria-label={t.registrationChecklistTitle}
                >
                  {(t.registrationSteps || []).map((step, index) => (
                    <li key={index} className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <span className="step-text">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="checklist-card">
              <div
                className={`checklist-header ${expandedChecklist === 1 ? "expanded" : ""}`}
                onClick={() => toggleChecklist(1)}
                role="button"
                aria-expanded={expandedChecklist === 1}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleChecklist(1);
                  }
                }}
              >
                <div className="checklist-title">
                  <div className="checklist-icon">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4>
                    {t.documentChecklistTitle ||
                      "Получение цифрового документа"}
                  </h4>
                </div>
                <div className="toggle-button">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`checklist-content ${expandedChecklist === 1 ? "expanded" : ""}`}
              >
                <ul
                  className="checklist-steps"
                  role="region"
                  aria-label={t.documentChecklistTitle}
                >
                  {(t.documentSteps || []).map((step, index) => (
                    <li key={index} className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <span className="step-text">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div
          className={`download-section ${isVisible ? "animate-fade-in" : ""}`}
        >
          <div className="download-card">
            <div className="download-icon">
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="download-content">
              <h3>{t.instructionsDownloadTitle || "Полное руководство пользователя"}</h3>
              <p>
                {t.instructionsDownloadDesc || "Загрузите подробные инструкции в формате PDF для работы в автономном режиме"}
              </p>
              <button onClick={handleDownload} className="download-button">
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t.downloadInstructions || "Скачать инструкции (PDF)"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoModal}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo === "mobile" ? "3qegg4jU3sQ" : "Lbnkk3mIgPo"}?autoplay=1`}
                title="Video Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InstructionsSection;
