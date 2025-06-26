import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import { LanguageSelector } from "./LanguageSelector";
import logo from "../../assets/images/egov-m-logo-1.png";
import "./Header.css";

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="NITEC Logo" />
          </div>
          <div className="header-spacer" />
          <button
            className={`mobile-menu-button ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <button className="mobile-menu-close" onClick={toggleMenu} aria-label="Закрыть меню">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

<nav className={`nav ${isMenuOpen ? "active" : ""}`}>
  <button
    className="mobile-menu-close"
    onClick={toggleMenu}
    aria-label="Закрыть меню"
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>

  {/* Меню-пункты */}
  <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.about}</a>
  <a href="#products" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.products}</a>
  <a href="#instructions" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.instructions}</a>
  <a href="#faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.faq}</a>
  <a href="#top-services" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.topServices?.title}</a>
  <a href="#news" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.news}</a>

  <div className="mobile-language-selector">
    <LanguageSelector />
  </div>
</nav>

          <div className="desktop-language-selector">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
