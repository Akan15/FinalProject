import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import './StatisticsSection.css';

const StatisticsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const statistics = [
    {
      id: 'egov-mobile',
      value: '1 100 000+',
      label: t.statistics.egovMobileUsers,
      icon: '📱'
    },
    {
      id: 'egov-business',
      value: '71 000+',
      label: t.statistics.egovBusinessUsers,
      icon: '💼'
    },
    {
      id: 'notifications',
      value: '100 754 570+',
      label: t.statistics.notificationsSent,
      icon: '🔔'
    },
    {
      id: 'bmc-requests',
      value: '14 105 174+',
      label: t.statistics.bmcRequests,
      icon: '📊'
    },
    {
      id: 'sms-gateway',
      value: '1 157 834 120+',
      label: t.statistics.smsMessages,
      icon: '📨'
    },
    {
      id: 'digital-docs',
      value: '37+',
      label: t.statistics.digitalDocs,
      icon: '📄'
    },
    {
      id: 'gov-services',
      value: '1 086+',
      label: t.statistics.govServices,
      icon: '🏛️'
    },
    {
      id: 'surveys',
      value: '34+',
      label: t.statistics.surveys,
      icon: '📝'
    }
  ];

  return (
    <section id="statistics" className="statistics-section">
      <div className="container">
        <h2>{t.statistics.title}</h2>
        <p className="statistics-description">{t.statistics.description}</p>
        
        <div className="statistics-grid">
          {statistics.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="statistics-conclusion">{t.statistics.conclusion}</p>
      </div>
    </section>
  );
};

export default StatisticsSection; 