import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import "./Footer.css";

// Import social media logos
import telegramLogo from "../../assets/images/telegram-svgrepo-com.svg";
import telegramBotLogo from "../../assets/images/telegram-svgrepo-com.svg";
import instagramLogo from "../../assets/images/instagram-1-svgrepo-com.svg";
import facebookLogo from "../../assets/images/facebook-logo.svg";
import youtubeLogo from "../../assets/images/youtube-svgrepo-com.svg";
import mailLogo from "../../assets/images/mail-svgrepo-com.svg";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const quickLinks = [
    { name: t.about || "О департаменте", href: "#about" },
    { name: t.products || "Приложения", href: "#products" },
    { name: t.instructions || "Инструкции", href: "#instructions" },
    { name: t.faq || "FAQ", href: "#faq" },
    { name: t.contact || "Обратная связь", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: t.footer?.telegramChannel || "Telegram Канал",
      logo: telegramLogo,
      url: "https://t.me/+yTPUJitjI_w3NjFi",
      className: "telegram",
      description: "Последние новости и обновления",
    },
    {
      name: "Instagram",
      logo: instagramLogo,
      url: "https://www.instagram.com/nitec_kz",
      className: "instagram",
      description: "Следите за нашими обновлениями",
    },
    {
      name: "Facebook",
      logo: facebookLogo,
      url: "https://www.facebook.com/nitec.kz",
      className: "facebook",
      description: "Присоединяйтесь к сообществу",
    },
    {
      name: "YouTube",
      logo: youtubeLogo,
      url: "https://www.youtube.com/@nitec_kz",
      className: "youtube",
      description: "Видео-инструкции и гайды",
    },
    {
      name: "Email",
      logo: mailLogo,
      href: "mailto:nitec@nitec.kz",
      className: "email",
      description: "nitec@nitec.kz",
    },
  ];

  const appDownloads = [
    {
      name: "eGov Mobile",
      platforms: [
        {
          name: "App Store",
          url: "https://apps.apple.com/kz/app/egov-mobile/id1476128386",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
          ),
        },
        {
          name: "Google Play",
          url: "https://play.google.com/store/search?q=egov+mobile",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "eGov Business",
      platforms: [
        {
          name: "App Store",
          url: "https://apps.apple.com/kz/app/egov-business/id1597880144",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
          ),
        },
        {
          name: "Google Play",
          url: "https://play.google.com/store/search?q=egov+business",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
          ),
        },
      ],
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* Background Elements */}
      <div className="footer-background">
        <div className="footer-gradient"></div>
        <div className="footer-patterns">
          <div className="footer-pattern pattern-1"></div>
          <div className="footer-pattern pattern-2"></div>
          <div className="footer-pattern pattern-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="footer-main">
          {/* About Section */}
          <div className="footer-section about-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg
                  width="40"
                  height="40"
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
              <div className="logo-text">
                <h3>{t.footer?.logoTitle || "mGov"}</h3>
                <p>{t.footer?.logoSubtitle || "Mobile Government"}</p>
              </div>
            </div>
            <p className="about-text">
              {t.footer?.aboutText ||
                "mGov — это мобильное приложение, которое предоставляет возможность получения государственных услуг и других сервисов через мобильный телефон в Казахстане."}
            </p>
            <div className="stats-mini">
              <div className="stat-mini">
                <span className="stat-number">5M+</span>
                <span className="stat-label">{t.footer?.users || "Пользователей"}</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">150+</span>
                <span className="stat-label">{t.footer?.services || "Услуг"}</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">{t.footer?.uptime || "Доступность"}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h4>{t.footer?.quickLinks || "Быстрые ссылки"}</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Apps Download */}
          <div className="footer-section apps-section">
            <h4>{t.footer?.downloadApps || "Скачать приложения"}</h4>
            <div className="apps-list">
              {appDownloads.map((app, index) => (
                <div key={index} className="app-group">
                  <h5>{app.name}</h5>
                  <div className="platform-buttons">
                    {app.platforms.map((platform, platformIndex) => (
                      <a
                        key={platformIndex}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-btn"
                      >
                        {platform.icon}
                        <span>{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="footer-section social-section">
            <h4>{t.footer?.contactTitle || "Связаться с нами"}</h4>
            <div className="contact-info">
              <div className="contact-item">
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
                <span>+7 (7172) 701 999</span>
              </div>
              <div className="contact-item">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>nitec@nitec.kz</span>
              </div>
            </div>

            <div className="social-links">
              <h5>{t.footer?.socialTitle || "Социальные сети"}</h5>
              <div className="social-grid">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url || link.href}
                    target={link.url ? "_blank" : undefined}
                    rel={link.url ? "noopener noreferrer" : undefined}
                    className={`social-link ${link.className}`}
                    title={link.description}
                  >
                    <img
                      src={link.logo}
                      alt={link.name}
                      className="social-icon"
                    />
                    <div className="social-content">
                      <span className="social-name">{link.name}</span>
                      <span className="social-desc">{t.footer?.[link.className+"Desc"] || link.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          className="scroll-to-top"
          onClick={handleScrollToTop}
          aria-label="Прокрутить наверх"
        >
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>{t.footer?.copyright || "© 2025 mGov Kazakhstan. Все права защищены."}</p>
              <p className="project-info">
                {t.footer?.rights || "Студенческий проект, июнь 2025"}
              </p>
            </div> 
            <div className="footer-links-bottom">
              <a href="#privacy" className="footer-link-bottom">
                {t.footer?.privacy || "Политика конфиденциальности"}
              </a>
              <a href="#terms" className="footer-link-bottom">
                {t.footer?.terms || "Условия использования"}
              </a>
              <a href="#accessibility" className="footer-link-bottom">
                {t.footer?.accessibility || "Доступность"}
              </a>
            </div>
          </div>
          <div className="footer-organization">
            <p className="organization-info">
              {t.footer?.contactCenter || "Контакт-центр АО «НИТ»: +7 (7172) 701 999"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
