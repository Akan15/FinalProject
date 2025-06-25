import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import './NewsSection.css';

const newsItems = [
  {
    key: 'news1',
    url: 'https://egov.kz/cms/ru/news/answers_questions',
  },
  {
    key: 'news2',
    url: 'https://egov.kz/cms/ru/news/digital_pet_passports',
  },
  {
    key: 'news3',
    url: 'https://egov.kz/cms/ru/news/Service_available',
  },
  {
    key: 'news4',
    url: 'https://egov.kz/cms/ru/news/foreign_diploma2',
  },
  {
    key: 'news5',
    url: 'https://egov.kz/cms/ru/news/notifying_problem1',
  },
  {
    key: 'news6',
    url: 'https://egov.kz/cms/ru/news/driving_license',
  },
  {
    key: 'news7',
    url: 'https://egov.kz/cms/ru/news/Custody_service_egov',
  },
  {
    key: 'news8',
    url: 'https://egov.kz/cms/ru/news/073_y_medical',
  },
  {
    key: 'news9',
    url: 'https://egov.kz/cms/ru/news/natfund_det',
  },
];

const NewsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const tRu = translations['ru'];

  return (
    <section className="news-section section">
      <div className="container">
        <h2 className="section-title">{t.newsTitle || tRu.newsTitle || 'Новости'}</h2>
        <ul className="news-list">
          {newsItems.map((item, idx) => (
            <li key={idx} className="news-item">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                {t[item.key] || tRu[item.key]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsSection; 