import { useState } from 'react';
import '../App.css';

export default function Main() {
  const [activeTab, setActiveTab] = useState('game');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
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
          <h1 className="hero-title">✨ Карточная Игра ✨</h1>
          <p className="hero-subtitle">Погрузитесь в мир увлекательной игры с красивым дизайном и захватывающей историей</p>
          <button 
            className="cta-button"
            onClick={() => window.scrollTo({ top: document.querySelector('.products').offsetTop, behavior: 'smooth' })}
          >
            🚀 Узнать Больше
          </button>
        </div>
      </header>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Что Вы Получите</h2>
          
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              🎮 Основной Продукт
            </button>
            <button 
              className={`tab-btn ${activeTab === 'bonus' ? 'active' : ''}`}
              onClick={() => setActiveTab('bonus')}
            >
              📚 Бонус Комикс
            </button>
          </div>

          {/* Game Product */}
          {activeTab === 'game' && (
            <div className="product-section game-section">
              <div className="product-text">
                <h3>🎮 Карточная Игра</h3>
                <p>Это наш основной продукт! Красивая карточная игра с уникальным дизайном. Каждая карта - это произведение искусства, созданное профессиональными художниками.</p>
                <ul className="features-list">
                  <li>✨ Уникальный дизайн каждой карты</li>
                  <li>🎨 Качественная печать высочайшего уровня</li>
                  <li>🎯 Увлекательный и стратегический геймплей</li>
                  <li>👥 Идеально для игры с друзьями и семьей</li>
                </ul>
              </div>
              <div className="product-gallery">
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/4.jpg`} 
                    alt="Карточка 1" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/4.jpg`)}
                  />
                </div>
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/5.jpg`} 
                    alt="Карточка 2" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/5.jpg`)}
                  />
                </div>
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/6.jpg`} 
                    alt="Карточка 3" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/6.jpg`)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bonus Comic */}
          {activeTab === 'bonus' && (
            <div className="product-section bonus-section">
              <div className="product-text">
                <h3>📚 Бонус: Комикс-Книжка</h3>
                <p>Идет бонусом к основному продукту! Красивая книжка в формате комикса с увлекательной историей и яркими иллюстрациями. Отличное дополнение к игре!</p>
                <ul className="features-list">
                  <li>📖 Увлекательная история с неожиданными поворотами</li>
                  <li>🎨 Красивые и детальные иллюстрации</li>
                  <li>🎭 Уникальный художественный стиль</li>
                  <li>🎁 Идеальный бонус к основному продукту</li>
                </ul>
              </div>
              <div className="product-gallery">
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/1.jpg`} 
                    alt="Комикс 1" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/1.jpg`)}
                  />
                </div>
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/2.jpg`} 
                    alt="Комикс 2" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/2.jpg`)}
                  />
                </div>
                <div className="gallery-item">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/3.jpg`} 
                    alt="Комикс 3" 
                    className="gallery-image" 
                    onClick={() => setSelectedImage(`${process.env.PUBLIC_URL}/images/3.jpg`)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Почему Выбрать Нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Красивый Дизайн</h3>
              <p>Каждый элемент продумана до мелочей с учётом современных тенденций</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Премиум Качество</h3>
              <p>Высочайший уровень производства и материалов</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Веселье и Развлечение</h3>
              <p>Отличное времяпрепровождение для всей семьи</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Щедрые Бонусы</h3>
              <p>Получите комикс-книжку в подарок к основному продукту</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>🚀 Готовы Начать Приключение?</h2>
          <p>Заказ вашу копию уже сегодня и получите бонус комикс-книжку совершенно бесплатно!</p>
          <button className="cta-button">🛍️ Заказать Сейчас</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Карточная Игра. Все права защищены.</p>
      </footer>
    </div>
  );
}