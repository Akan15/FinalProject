import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import './TeamSection.css';

const TeamSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const teamMembers = [
    {
      name: 'Bektembai Turebekovich Kosunov',
      position: t.team.positions.director,
      department: t.team.departments.mgov
    },
    {
      name: 'Ospanova Nazerke Nurbolatkyzy',
      position: t.team.positions.projectManager,
      department: t.team.departments.mgov
    },
    {
      name: 'Userbayeva Lazzat Serikzy',
      position: t.team.positions.projectManager,
      department: t.team.departments.mgov
    },
    {
      name: 'Alpysbai Aslanbek Yerlanuly',
      position: t.team.positions.middleDeveloper,
      department: t.team.departments.mgov
    },
    {
      name: 'Zhumakaev Timur Kairovich',
      position: t.team.positions.middleDeveloper,
      department: t.team.departments.mgov
    },
    {
      name: 'Kasimov Alisher Bakhytovich',
      position: t.team.positions.seniorAnalyst,
      department: t.team.departments.mgov
    },
    {
      name: 'Kanat Amina Yerlankyzy',
      position: t.team.positions.developer,
      department: t.team.departments.mgov
    },
    {
      name: 'Maysakanov Abylai Almazuli',
      position: t.team.positions.projectManager,
      department: t.team.departments.mgov
    },
    {
      name: 'Adlet Birzhanovich Zhantasov',
      position: t.team.positions.seniorIOSDeveloper,
      department: t.team.departments.mgov
    },
    {
      name: 'Omir Ermakhan',
      position: t.team.positions.seniorAndroidDeveloper,
      department: t.team.departments.mgov
    },
    {
      name: 'Amrin Zhakhat Zhanatovich',
      position: t.team.positions.analyst,
      department: t.team.departments.mgov
    },
    {
      name: 'Serik Zhannur Muratkyzy',
      position: t.team.positions.manager,
      department: t.team.departments.mgov
    },
    {
      name: 'Dulat Berkin',
      position: t.team.positions.seniorDesigner,
      department: t.team.departments.mgov
    },
    {
      name: 'Kuchikov Isa Gabdyganievich',
      position: t.team.positions.middleAnalyst,
      department: t.team.departments.mgov
    },
    {
      name: 'Zhumataev Elkhan Kuanyshevich',
      position: t.team.positions.developer,
      department: t.team.departments.mgov
    },
    {
      name: 'Samarbai Maldir Serikzy',
      position: t.team.positions.seniorManager,
      department: t.team.departments.mgov
    },
    {
      name: 'Asaybuldaev Ibragim Nartaevich',
      position: t.team.positions.middleIOSDeveloper,
      department: t.team.departments.mgov
    },
    {
      name: 'Akhmadaliev Iskandar Eraliuly',
      position: t.team.positions.qaEngineer,
      department: t.team.departments.mgov
    },
    {
      name: 'Abai Madievich Tusipbayev',
      position: t.team.positions.manager,
      department: t.team.departments.mgov
    },
    {
      name: 'Zakirov Rishat Khamzaevich',
      position: t.team.positions.manager,
      department: t.team.departments.mgov
    }
  ];

  return (
    <section id="team" className="team-section">
      <div className="container">
        <h2>{t.team.title}</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-card-content">
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
                <p className="department">{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 