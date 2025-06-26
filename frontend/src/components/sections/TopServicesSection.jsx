import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './TopServicesSection.css';
import criminalQR from '../../assets/qr_code/Criminal.png';
import UAPF from '../../assets/qr_code/ENPF.png'
import birthCertificate from '../../assets/qr_code/child.png'
import pension from  '../../assets/qr_code/retire.png'
import F6 from '../../assets/qr_code/F6.png'
import legal from '../../assets/qr_code/Law.png'

const TopServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      title: t.topServices.services.criminalRecord,
      qrCode: criminalQR,
      icon: '📄'
    },
    {
      id: 2,
      title: t.topServices.services.UAPF,
      qrCode: pension,
      icon: '💳'
    },
    {
      id: 3,
      title: t.topServices.services.birthCertificates,
      qrCode: birthCertificate,
      icon: '🪪'
    },
    {
      id: 4,
      title: t.topServices.services.pensionCertificates,
      qrCode: UAPF,
      icon: '📑'
    },
    {
      id: 5,
      title: t.topServices.services.f6Certificate,
      qrCode: F6,
      icon: '🏠'
    },
    {
      id: 6,
      title: t.topServices.services.legalEntityCertificate,
      qrCode: legal,
      icon: '📄'
    }
  ];

  // Анимация появления карточек
  const [visibleCards, setVisibleCards] = useState([]);
  useEffect(() => {
    services.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, idx]);
      }, idx * 100 + 100);
    });
  }, []);

  return ( 
    <section id="top-services" className="top-services-section">
      <div className="container">
        <h2 className="section-title">{t.topServices.title}</h2>
        <p className="section-description">{t.topServices.description}</p>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`top-service-card${visibleCards.includes(idx) ? ' animate-slide-up' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-qr">
                <img 
                  src={service.qrCode} 
                  alt="QR code for service"
                  style={{ width: '100px', height: '100px', objectFit: 'contain', marginTop: '1rem' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopServicesSection;  