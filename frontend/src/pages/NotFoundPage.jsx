import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>{t.notFound.title}</h2>
        <p>{t.notFound.message}</p>
        <Link to="/" className="home-button">
          {t.notFound.homeButton}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 