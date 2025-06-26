import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import "./FaqSection.css";

const FaqSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { language } = useLanguage();
  const t = translations[language];
  const answerRefs = useRef([]);
  const sectionRef = useRef(null);

  // FAQ Categories
  const categories = [
    { id: "all", name: t.faqAll || "Все вопросы", icon: "📋" },
    { id: "registration", name: t.faqRegistration || "Регистрация", icon: "👤" },
    { id: "documents", name: t.faqDocuments || "Документы", icon: "📄" },
    { id: "security", name: t.faqSecurity || "Безопасность", icon: "🔒" },
    { id: "technical", name: t.faqTechnical || "Технические", icon: "⚙️" },
  ];

  // Enhanced FAQ data with categories - memoized to prevent infinite loops
  const enhancedFaqs = useMemo(() => {
    const faqs = t.faqs || [];
    return faqs.map((faq, index) => {
      const categoryMap = {
        0: "registration",
        1: "documents",
        2: "security",
        3: "technical",
        4: "registration",
      };
      return {
        ...faq,
        category: categoryMap[index] || "technical",
        id: index,
        helpful: 50 + index * 10, // Stable helpful votes instead of random
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // Use language as stable dependency to prevent infinite loops

  useEffect(() => {
    let filtered = enhancedFaqs;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory, enhancedFaqs]);

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

  const handleFaqClick = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setExpandedFaq(null); // Close any open FAQ when searching
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setExpandedFaq(null);
    setSearchTerm(""); // Clear search when changing category
  };

  const clearSearch = () => {
    setSearchTerm("");
    setExpandedFaq(null);
  };

  return (
    <section id="faq" className="faq-section section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="faq-background">
        <div className="faq-gradient"></div>
        <div className="faq-patterns">
          <div className="faq-pattern pattern-1"></div>
          <div className="faq-pattern pattern-2"></div>
          <div className="faq-pattern pattern-3"></div>
        </div>
      </div>

      <div className="container">
        {/* Header */}
        <div className={`faq-header ${isVisible ? "animate-fade-in" : ""}`}>
          <div className="header-content">
            <div className="header-icon">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="header-text">
              <h2 className="section-title">
                {t.faqTitle || "Часто задаваемые вопросы"}
              </h2>
              <p className="section-subtitle">
                {t.faqSubtitle ||
                  "Найдите ответы на популярные вопросы о наших сервисах"}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="faq-search">
            <div className="search-wrapper">
              <div className="search-icon">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {searchTerm && (
              <div className="search-results-count">
                Найдено {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "результат" : "результатов"}
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div
          className={`faq-categories ${isVisible ? "animate-slide-in-up" : ""}`}
        >
          <div className="categories-wrapper">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">
                  {category.id === "all"
                    ? enhancedFaqs.length
                    : enhancedFaqs.filter((faq) => faq.category === category.id)
                        .length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className={`faq-content ${isVisible ? "animate-fade-in" : ""}`}>
          {filteredFaqs.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <svg
                  width="64"
                  height="64"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3>Ничего не найдено</h3>
              <p>
                Попробуйте изменить поисковый запрос или выберите другую
                категорию
              </p>
              {searchTerm && (
                <button className="reset-search-btn" onClick={clearSearch}>
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Сбросить поиск
                </button>
              )}
            </div>
          ) : (
            <div className="faq-list">
              {(filteredFaqs || []).map((faq, index) => (
                <div
                  key={faq.id}
                  className={`faq-item ${expandedFaq === index ? "expanded" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="faq-item-header">
                    <button
                      className="faq-question"
                      onClick={() => handleFaqClick(index)}
                      aria-expanded={expandedFaq === index}
                    >
                      <div className="question-content">
                        <div className="question-icon">
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
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="question-text">
                          <h3>{faq.question}</h3>
                          <div className="question-meta">
                            <span className="category-tag">
                              {
                                categories.find(
                                  (cat) => cat.id === faq.category,
                                )?.icon
                              }
                              {
                                categories.find(
                                  (cat) => cat.id === faq.category,
                                )?.name
                              }
                            </span>
                          </div>
                        </div>
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
                    </button>
                  </div>

                  <div
                    className="faq-answer-wrapper"
                    style={{
                      maxHeight:
                        expandedFaq === index
                          ? answerRefs.current[index]?.scrollHeight + "px"
                          : "0px",
                    }}
                  >
                    <div
                      className="faq-answer"
                      ref={(el) => (answerRefs.current[index] = el)}
                    >
                      <div className="answer-content">
                        <p>{faq.answer}</p>
                        <div className="answer-actions">
                          <div className="helpful-section">
                            <span className="helpful-label">{t.faqHelpfulLabel || "Был ли этот ответ полезен?"}</span>
                            <div className="helpful-buttons">
                              <button className="helpful-btn yes">
                                <svg
                                  width="16"
                                  height="16"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  />
                                </svg>
                                {t.faqYes || "Да"}
                              </button>
                              <button className="helpful-btn no">
                                <svg
                                  width="16"
                                  height="16"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                                  />
                                </svg>
                                {t.faqNo || "Нет"}
                              </button>
                            </div>
                          </div>
                          <div className="helpful-stats">
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="helpful-count">{faq.helpful} {t.faqHelpfulCount || "человек считают это полезным"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className={`faq-support ${isVisible ? "animate-fade-in" : ""}`}>
          <div className="support-card">
            <div className="support-icon">
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
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="support-content">
              <h3>{t.faqSupportTitle || "Не нашли ответ на свой вопрос?"}</h3>
              <p>{t.faqSupportDesc || "Наша служба поддержки готова помочь вам 24/7. Свяжитесь с нами любым удобным способом."}</p>
              <div className="support-actions">
                <a href="#contact" className="support-btn primary">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {t.faqSupportWrite || "Написать в поддержку"}
                </a>
                <a href="tel:+77172701999" className="support-btn secondary">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t.faqSupportCall || "Позвонить"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
