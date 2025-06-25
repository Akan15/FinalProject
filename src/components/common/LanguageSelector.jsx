import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageSelector.css';

export const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
      <button
        className={`lang-btn ${language === 'kz' ? 'active' : ''}`}
        onClick={() => changeLanguage('kz')}
      >
        KZ
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}; 