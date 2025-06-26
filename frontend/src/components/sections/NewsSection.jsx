import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./NewsSection.css";

const API_URL = "https://finalproject-2-w7he.onrender.com";

const NewsSection = () => {
  const { language, t } = useLanguage();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://finalproject-2-w7he.onrender.com")
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(() => setNews([]));
  }, []);

  const getTitle = (item) => {
    if (language === "kz") return item.TitleKZ || item.title_kz;
    if (language === "en") return item.TitleEN || item.title_en;
    return item.TitleRU || item.title_ru;
  };

  return (
    <section className="news-section" id="news">
      <div className="container">
        <h2 className="news-title">{t.newsSection?.title || "Новости"}</h2>
        <ul className="news-list">
          {(news || []).map((item, idx) => {
            const url = item.Link || item.link;
            const content = (
              <>
                <span className="news-title-item">{getTitle(item)}</span>
              </>
            );
            return url ? (
              <li className="news-item" key={item.id || item._id || idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  className="news-link-box"
                >
                  {content}
                </a>
              </li>
            ) : (
              <li className="news-item" key={item.id || item._id || idx}>
                {content}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default NewsSection; 
