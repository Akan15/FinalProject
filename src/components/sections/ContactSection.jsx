import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import { submitFeedback } from "../../services/feedbackService";
import "./ContactSection.css";

const ContactSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    iin: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (only letters)
    if (!/^[а-яА-Яa-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = t.nameError;
    }

    // Phone validation (Kazakhstan format)
    if (!/^(\+7|8)[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = t.phoneError;
    }

    // IIN validation (12 digits)
    if (!/^[0-9]{12}$/.test(formData.iin)) {
      newErrors.iin = t.iinError;
    }

    // Message validation (max 300 characters)
    if (formData.message.length > 300) {
      newErrors.message = t.messageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitFeedback(formData);
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", iin: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section id="contact" className="contact-section section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="contact-background">
        <div className="gradient-overlay"></div>
        <div className="contact-patterns">
          <div className="pattern pattern-1"></div>
          <div className="pattern pattern-2"></div>
          <div className="pattern pattern-3"></div>
        </div>
      </div>

      <div className="container">
        <div className={`contact-header ${isVisible ? "animate-fade-in" : ""}`}>
          <h2 className="section-title">
            {t.contactTitle || "Обратная связь"}
          </h2>
          <p className="section-subtitle">
            {t.contactSubtitle ||
              "Свяжитесь с нами для получения поддержки или отправки предложений"}
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div
            className={`contact-info ${isVisible ? "animate-slide-in-left" : ""}`}
          >
            <div className="info-card">
              <div className="info-header">
                <div className="info-icon">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3>{t.contactInfoTitle}</h3>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>{t.phoneTitle}</h4>
                    <p>{t.phoneValue}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>{t.emailTitle}</h4>
                    <p>{t.emailValue}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>{t.workingHoursTitle}</h4>
                    <p>{t.workingHoursValue}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h4>{t.addressTitle}</h4>
                    <p>{t.addressValue}</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>{t.socialTitle}</h4>
                <div className="social-buttons">
                  <a
                    href="https://t.me/egovkz_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn telegram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </a>
                  <a
                    href="https://www.instagram.com/nitec_kz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`contact-form-container ${isVisible ? "animate-slide-in-right" : ""}`}
          >
            <div className="form-card">
              <div className="form-header" style={{display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', textAlign: 'left', marginBottom: 'var(--space-4xl)', padding: '20px 0'}}>
                <div className="form-icon" style={{margin: 0}}>
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{margin: 0}}>{t.sendMessageTitle}</h3>
                  <p style={{margin: 0}}>{t.contactSubtitle}</p>
                </div>
              </div>

        <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">{t.nameLabel}</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
                        className={errors.name ? "error" : ""}
                        placeholder={t.namePlaceholder || t.nameLabel}
              required
            />
                    </div>
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t.phoneLabel}</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
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
                      </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
                        className={errors.phone ? "error" : ""}
              placeholder={t.phonePlaceholder}
              required
            />
                    </div>
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>
          </div>

          <div className="form-group">
            <label htmlFor="iin">{t.iinLabel}</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
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
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    </div>
            <input
              type="text"
              id="iin"
              name="iin"
              value={formData.iin}
              onChange={handleChange}
                      className={errors.iin ? "error" : ""}
                      placeholder={t.iinPlaceholder || t.iinLabel}
                      maxLength="12"
              required
            />
                  </div>
                  {errors.iin && (
                    <span className="error-message">{errors.iin}</span>
                  )}
          </div>

          <div className="form-group">
                  <label htmlFor="message">
                    {t.messageLabel}
                  </label>
                  <div className="textarea-wrapper">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
                      className={errors.message ? "error" : ""}
                      placeholder={t.messagePlaceholder || t.messageLabel}
              rows="4"
                      maxLength="300"
                    />
                    <div className="char-count">
                      <span
                        className={
                          formData.message.length > 250 ? "warning" : ""
                        }
                      >
                        {formData.message.length}/300
                      </span>
                    </div>
                  </div>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      {t.submitting}
                    </>
                  ) : (
                    <>
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      {t.sendMessageButton}
                    </>
                  )}
          </button>

                {submitStatus === "success" && (
                  <div className="success-message">
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
                    {t.successMessage}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="error-message-container">
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {t.errorMessage}
                  </div>
          )}
        </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
