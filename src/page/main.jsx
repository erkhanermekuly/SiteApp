import { useState } from 'react';
import '../App.css';
import translations from '../translations';

export default function Main() {
  const [activeTab, setActiveTab] = useState('game');
  const [selectedImage, setSelectedImage] = useState(null);
  const [language, setLanguage] = useState('ru');

  const t = translations[language];

  return (
    <div className="App">
      {/* Language Switcher */}
      <div className="language-switcher">
        <button 
          className={`lang-btn ${language === 'kk' ? 'active' : ''}`} 
          onClick={() => setLanguage('kk')}
        >
          ҚАЗ
        </button>
        <button 
          className={`lang-btn ${language === 'ru' ? 'active' : ''}`} 
          onClick={() => setLanguage('ru')}
        >
          РУС
        </button>
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
          onClick={() => setLanguage('en')}
        >
          ENG
        </button>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="Full size" className="modal-image" />
          </div>
        </div>
      )}

      {/* Header/Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-brand">
            <div className="logo-container">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="Логотип IQ Center URKER"
                className="hero-logo"
              />
            </div>
            <div className="hero-copy">
              <p className="organization-kicker">{t.organizationKicker}</p>
              <h1 className="hero-title">{t.heroTitle}</h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>
              <p className="organization-description">{t.organizationDescription}</p>
              <button
                className="cta-button"
                onClick={() => window.scrollTo({ top: document.querySelector('.products').offsetTop, behavior: 'smooth' })}
              >
                🚀 {t.discoverMore}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">{t.whatYouGet}</h2>
          
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              🎮 {t.mainProduct}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'bonus' ? 'active' : ''}`}
              onClick={() => setActiveTab('bonus')}
            >
              📚 {t.bonusComic}
            </button>
          </div>

          {/* Game Product */}
          {activeTab === 'game' && (
            <div className="product-section game-section">
              <div className="product-text">
                <h3>🎮 {t.gameTitle}</h3>
                <p>{t.gameDesc}</p>
                <ul className="features-list">
                  {t.gameFeatures.map((feature, index) => (
                    <li key={index}>✨ {feature.title}</li>
                  ))}
                </ul>
              </div>
              <div className="product-gallery">
                {[4, 5, 6].map((num) => (
                  <div key={num} className="gallery-item">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/${num}.jpg`} 
                      alt={`Card ${num}`} 
                      className="gallery-image" 
                      onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/${num}.jpg`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bonus Comic */}
          {activeTab === 'bonus' && (
            <div className="product-section bonus-section">
              <div className="product-text">
                <h3>📚 {t.comicTitle}</h3>
                <p>{t.comicDesc}</p>
                <ul className="features-list">
                  {t.comicFeatures.map((feature, index) => (
                    <li key={index}>✨ {feature.title}</li>
                  ))}
                </ul>
              </div>
              <div className="product-gallery">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="gallery-item">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/${num}.jpg`} 
                      alt={`Comic ${num}`} 
                      className="gallery-image" 
                      onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/${num}.jpg`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Game Rules Section */}
      <section className="game-rules">
        <div className="container">
          <h2 className="section-title">{t.gameRulesTitle}</h2>
          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-number">1</div>
              <h3>{t.rule1Title}</h3>
              <p>{t.rule1Desc}</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">2</div>
              <h3>{t.rule2Title}</h3>
              <p>{t.rule2Desc}</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">3</div>
              <h3>{t.rule3Title}</h3>
              <p>{t.rule3Desc}</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">4</div>
              <h3>{t.rule4Title}</h3>
              <p>{t.rule4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">{t.whyChooseUs}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>{t.designTitle}</h3>
              <p>{t.designDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>{t.qualityTitle}</h3>
              <p>{t.qualityDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>{t.funTitle}</h3>
              <p>{t.funDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>{t.bonusTitle}</h3>
              <p>{t.bonusDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>{t.readyTitle}</h2>
          <p>{t.readyDesc}</p>
          <button 
            className="cta-button primary"
            onClick={() => {
              const phoneNumber = '+77785608275';
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsappMessage)}`;
              if (whatsappUrl) {
                window.open(whatsappUrl, '_blank');
               }
            }}
          >
            {t.orderButton}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
}
