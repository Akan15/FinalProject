import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './TimelineSection.css';

const TimelineSection = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const timelineData = [
    {
      year: '2012',
      title: t.timeline.year2012.title,
      description: t.timeline.year2012.description
    },
    {
      year: '2013',
      title: t.timeline.year2013.title,
      description: t.timeline.year2013.description
    },
    {
      year: '2014',
      title: t.timeline.year2014.title,
      description: t.timeline.year2014.description
    },
    {
      year: '2015',
      title: t.timeline.year2015.title,
      description: t.timeline.year2015.description
    },
    {
      year: '2016',
      title: t.timeline.year2016.title,
      description: t.timeline.year2016.description
    },
    {
      year: '2017',
      title: t.timeline.year2017.title,
      description: t.timeline.year2017.description
    },
    {
      year: '2018',
      title: t.timeline.year2018.title,
      description: t.timeline.year2018.description
    },
    {
      year: '2019',
      title: t.timeline.year2019.title,
      description: t.timeline.year2019.description
    },
    {
      year: '2020',
      title: t.timeline.year2020.title,
      description: t.timeline.year2020.description
    },
    {
      year: '2021',
      title: t.timeline.year2021.title,
      description: t.timeline.year2021.description
    },
    {
      year: '2022',
      title: t.timeline.year2022.title,
      description: t.timeline.year2022.description
    },
    {
      year: '2023',
      title: t.timeline.year2023.title,
      description: t.timeline.year2023.description
    },
    {
      year: '2024',
      title: t.timeline.year2024.title,
      description: t.timeline.year2024.description
    }
  ];

  return (
    <section className="timeline-section">
      <div 
        className="timeline-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <h2>{t.timeline.title}</h2>
        <div className={`arrow ${isOpen ? 'open' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={`timeline-container ${isOpen ? 'open' : ''}`}>
        {timelineData.map((item, index) => (
          <div 
            key={item.year} 
            className="timeline-item"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection; 