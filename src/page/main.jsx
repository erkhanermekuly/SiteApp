import { useEffect, useState } from 'react';
import '../App.css';

const games = [
  { name: 'URKER GO', type: 'Зияткерлік үстел ойыны · Интеллектуальная настольная игра', image: '/images/go.png', path: '/games/urker-go', description: '«Үркермен елтану» картасымен Қазақстанды зерттеуге арналған оқу-әдістемелік кешен. Учебно-методический комплект для изучения Казахстана с картой «Үркермен елтану».', ready: true },
  { name: 'URKER MEMO', type: 'Есте сақтау ойыны · Игра на память', image: '/images/memo2.jpg', path: '/games/urker-memo', description: 'Қазақстан мұрасы бейнеленген карточкалар есте сақтау мен зейінді дамытады. Карточки с объектами наследия Казахстана развивают память и внимание.', ready: true },
  { name: 'Қауіпсіз ғаламтор', type: 'Цифрлық қауіпсіздік · Цифровая безопасность', image: '/images/qg2.jpeg', path: '/games/safe-internet', description: 'Интернетті қауіпсіз пайдалану дағдыларын қалыптастыратын интерактивті ойын. Интерактивная игра о правилах безопасного поведения в интернете.', ready: true },
  { name: 'Үркер дәптері', type: 'Оқу құралы · Учебное пособие', image: '/images/2.jpg', path: '/games/urker-workbook', description: 'Креативті ойлау мәдениетін дамытуға арналған тапсырмалар жүйесі. Система заданий для развития культуры креативного мышления.', ready: true },
];

const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>;

function tiltMove(event) {
  const element = event.currentTarget;
  const box = element.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  element.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
  element.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
  element.style.setProperty('--mx', `${x * 100}%`);
  element.style.setProperty('--my', `${y * 100}%`);
}

function tiltLeave(event) {
  event.currentTarget.style.setProperty('--rx', '0deg');
  event.currentTarget.style.setProperty('--ry', '0deg');
}

function Header({ navigate, dark = false }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem('urker-language') || 'kk');
  useEffect(() => { localStorage.setItem('urker-language', lang); document.documentElement.dataset.lang = lang; }, [lang]);
  const go = (path) => { setOpen(false); navigate(path); };
  return <header className={`site-header ${dark ? 'header-dark' : ''}`}><div className="nav-shell">
    <button className="brand" onClick={() => go('/')} aria-label="Басты бетке / На главную"><span className="brand-placeholder" aria-hidden="true">U</span><span><strong>Urker Baulu Mektebi</strong><small>Оқу-танымдық өнімдер · Учебно-познавательная продукция</small></span></button>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Открыть меню">☰</button>
    <nav className={open ? 'nav-open' : ''}><button onClick={() => go('/')}>{lang === 'kk' ? 'Басты бет' : 'Главная'}</button><button onClick={() => go('/games')}>{lang === 'kk' ? 'Өнімдер' : 'Продукция'}</button><div className="language-switch" role="group" aria-label="Тілді таңдау / Выбор языка"><button className={lang === 'kk' ? 'active' : ''} onClick={() => setLang('kk')}>ҚАЗ</button><button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>РУС</button></div><a className="nav-contact" href="https://www.instagram.com/urker_iq?igsh=MTl5ZHIxNGphNHBycA==" target="_blank" rel="noreferrer">Instagram</a></nav>
  </div></header>;
}

function Footer({ navigate }) {
  return <footer className="footer"><div className="footer-grid">
    <div><div className="footer-brand">Urker Baulu Mektebi</div><p>Балалардың зияткерлік әлеуетін дамытатын оқу-танымдық өнімдер. Учебно-познавательная продукция для развития интеллектуального потенциала детей.</p></div>
    <div><h4>Навигация</h4><button onClick={() => navigate('/')}>Главная</button><button onClick={() => navigate('/games')}>Все игры</button></div>
    <div><h4>Байланыс / Контакты</h4><a href="https://www.instagram.com/urker_iq?igsh=MTl5ZHIxNGphNHBycA==" target="_blank" rel="noreferrer">Instagram @urker_iq</a><span className="contact-person">А.Т. — Анар Тоқтаровна</span></div>
  </div><div className="footer-bottom"><span>© 2026 Urker Baulu Mektebi</span><span>Барлық құқықтар қорғалған · Все права защищены</span></div></footer>;
}

function GameCard({ game, navigate }) {
  if (!game.ready) return <article className="game-card coming-card"><div className="coming-visual"><span>{game.number}</span><small>URKER BAULU MEKTEBI</small></div><div className="card-body"><span className="soon-badge">В разработке</span><h3>{game.name}</h3><p>{game.type}</p></div></article>;
  return <article className="game-card featured-card" onMouseMove={tiltMove} onMouseLeave={tiltLeave} onClick={() => navigate(game.path)}><div className="depth-light"></div><div className="card-image"><img src={game.image} alt={`Настольная игра ${game.name}`} /><span className="available-badge">Доступна</span></div><div className="card-body"><p className="eyebrow">{game.type}</p><h3>{game.name}</h3><p>{game.description}</p><button>Подробнее <span>→</span></button></div></article>;
}

function GameSlider({ navigate }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % games.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);
  const game = games[active];
  const move = (direction) => setActive((active + direction + games.length) % games.length);
  return <section className="game-slider-section"><div className="slider-heading"><div><p className="overline">ИГРЫ И ПОСОБИЯ URKER BAULU MEKTEBI</p><h2>Выберите своё<br/>образовательное приключение</h2></div><div className="slider-count"><strong>0{active + 1}</strong><span>/ 0{games.length}</span></div></div>
    <div className="game-slider" onMouseMove={tiltMove} onMouseEnter={() => setPaused(true)} onMouseLeave={(event) => { setPaused(false); tiltLeave(event); }}>
      <div className="slider-glow" aria-hidden="true"></div><div className="slider-image-wrap" key={`image-${active}`}><img src={game.image} alt={game.name} /></div>
      <div className="slider-content" key={`copy-${active}`}><p>{game.type}</p><h3>{game.name}</h3><div className="slider-line"></div><p>{game.description}</p><button onClick={() => navigate(game.path)}>Открыть страницу <span>↗</span></button></div>
      <div className="slider-controls"><button onClick={() => move(-1)} aria-label="Предыдущая игра">←</button><div className="slider-dots">{games.map((item, index) => <button key={item.name} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Показать ${item.name}`}></button>)}</div><button onClick={() => move(1)} aria-label="Следующая игра">→</button></div>
    </div>
  </section>;
}

function Home({ navigate }) {
  return <><div className="hero-wrap"><Header navigate={navigate} dark /><main className="home-hero"><div className="hero-copy">
    <p className="overline">URKER BAULU MEKTEBI</p><h1><span className="lang-kk">Баулу арқылы <em>тұлға қалыптастыру</em></span><span className="lang-ru">Развитие личности <em>через обучение</em></span></h1><p className="lang-kk">«Urker baulu mektebi» – баулу арқылы тұлға қалыптастыратын, балалардың зияткерлік әлеуетін дамытатын авторлық үстел ойындары мен білім беру материалдарын әзірлейтін шығармашылық орта.</p><p className="lang-ru">«Urker baulu mektebi» — это творческое пространство, разрабатывающее авторские настольные игры и образовательные материалы, направленные на воспитание личности через обучение и развитие интеллектуального потенциала детей.</p>
    <div className="hero-actions"><button className="primary-btn" onClick={() => navigate('/games')}><span className="lang-kk">Өнімдерді көру</span><span className="lang-ru">Смотреть продукцию</span> <span>→</span></button></div>
    <div className="hero-facts"><div><strong>3+</strong><span>Возраст игроков</span></div><div><strong>4</strong><span>Игры в коллекции</span></div><div><strong>KZ</strong><span>Создано в Казахстане</span></div></div>
  </div><div className="hero-product" onMouseMove={tiltMove} onMouseLeave={tiltLeave}><div className="depth-light"></div><div className="image-frame"><img src="/images/go.png" alt="URKER GO оқу-әдістемелік кешені" /></div><div className="floating-note"><b>Бірінші өнім · Первый продукт</b><span>URKER GO</span></div></div></main></div>
  <section className="intro"><p className="overline gold">АХМЕТ БАЙТҰРСЫНҰЛЫ</p><h2>«Баулу – баланы өмірге, еңбекке, білімге және адамгершілікке іс арқылы тәрбиелеу»</h2><p>«Баулу мектепте балалар “баулу” түрде үйретіледі...»<br/>А. Байтұрсынұлы, «Баулу мектебі» мақаласынан</p><div className="series-note"><strong>«Urker baulu mektebi» — оқу-танымдық өнімдер сериясы.</strong><span>«Urker baulu mektebi» — серия учебно-познавательной продукции.</span></div></section>
  <GameSlider navigate={navigate} />
  <section className="games-preview"><div className="section-heading"><div><p className="overline gold">КОЛЛЕКЦИЯ URKER BAULU MEKTEBI</p><h2>Наши познавательные игры</h2></div><button onClick={() => navigate('/games')}>Все игры →</button></div><div className="games-grid">{games.map((game) => <GameCard key={game.name} game={game} navigate={navigate} />)}</div></section>
  <section className="values"><div><Icon>◇</Icon><h3>Развивает мышление</h3><p>Игровые механики тренируют память, внимание и логику.</p></div><div><Icon>⌁</Icon><h3>Знакомит с культурой</h3><p>Образы Казахстана становятся близкими и понятными детям.</p></div><div><Icon>✓</Icon><h3>Создано с заботой</h3><p>Понятные правила, качественные материалы и семейный формат.</p></div></section><Footer navigate={navigate} /></>;
}

function Games({ navigate }) { return <><Header navigate={navigate} /><main className="listing"><p className="overline gold">URKER BAULU MEKTEBI</p><h1>Оқу-танымдық өнімдер</h1><p className="lead">Учебно-познавательная продукция: авторские настольные игры и образовательные материалы для всестороннего развития детей.</p><div className="games-grid">{games.map((game) => <GameCard key={game.name} game={game} navigate={navigate} />)}</div></main><Footer navigate={navigate} /></>; }

function Memo({ navigate }) {
  const [modal, setModal] = useState(false);
  useEffect(() => { document.title = 'Urker Memo | Urker Baulu Mektebi'; }, []);
  return <><Header navigate={navigate} /><main><section className="product-hero"><div className="breadcrumbs"><button onClick={() => navigate('/')}>Главная</button><span>/</span><button onClick={() => navigate('/games')}>Игры</button><span>/</span><b>Urker Memo</b></div><div className="product-layout">
    <div className="product-photo"><img src="/images/memo2.jpg" alt="Urker Memo: коробка игры" onClick={() => setModal(true)} /><button onClick={() => setModal(true)}>⌕ Увеличить изображение</button></div>
    <div className="product-info"><p className="overline gold">ЕСТЕ САҚТАУ ОЙЫНЫ · ИГРА НА ПАМЯТЬ</p><h1>URKER MEMO</h1><p className="description bilingual-copy"><span>«URKER MEMO» ойыны балалардың есте сақтау қабілетін, зейінін, байқағыштығын және танымдық белсенділігін дамытуға бағытталған. Ойын жиынтығы Қазақстанның тарихи, мәдени және табиғи мұра нысандары бейнеленген, классикалық Memory (Memo) ойыны қағидаты бойынша әзірленген карточкалардан тұрады.</span><span>Игра «URKER MEMO» направлена на развитие памяти, внимания, наблюдательности и познавательной активности детей. Игровой комплект состоит из карточек, созданных по принципу классической игры Memory (Memo), с изображениями объектов исторического, культурного и природного наследия Казахстана.</span></p><div className="spec-row"><div><Icon>♟</Icon><b>1–4</b><span>игрока</span></div><div><Icon>◷</Icon><b>10–15</b><span>минут</span></div><div><Icon>☆</Icon><b>3+</b><span>возраст</span></div></div><a className="primary-btn inline" href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20об%20игре%20Urker%20Memo" target="_blank" rel="noreferrer">Узнать о наличии <span>→</span></a></div>
  </div></section>
  <section className="development"><div><p className="overline gold">ПОЛЬЗА ИГРЫ</p><h2>Что развивает Urker Memo</h2></div><div className="benefit-grid"><article><b>01</b><h3>Память</h3><p>Ребёнок запоминает расположение карточек и учится удерживать информацию.</p></article><article><b>02</b><h3>Внимание</h3><p>Поиск пар тренирует концентрацию и наблюдательность.</p></article><article><b>03</b><h3>Логику</h3><p>Каждый ход помогает сравнивать, анализировать и принимать решение.</p></article><article><b>04</b><h3>Кругозор</h3><p>Иллюстрации знакомят с предметами и символами казахской культуры.</p></article></div></section>
  <section className="rules-section"><div className="rules-copy"><p className="overline gold">КАК ИГРАТЬ</p><h2>Простые правила</h2><ol><li><span>1</span><p><b>Подготовьте карточки</b>Перемешайте 48 карточек и разложите их изображением вниз.</p></li><li><span>2</span><p><b>Открывайте пары</b>Каждый игрок по очереди открывает две карточки.</p></li><li><span>3</span><p><b>Собирайте совпадения</b>Одинаковые карточки игрок забирает себе, разные — переворачивает обратно.</p></li><li><span>4</span><p><b>Определите победителя</b>Побеждает тот, кто собрал больше всего пар.</p></li></ol></div><div className="rules-photo"><img src="/images/memo.jpg" alt="Все стороны упаковки Urker Memo" /></div></section>
  <section className="inside"><p className="overline gold">КОМПЛЕКТАЦИЯ</p><h2>Внутри коробки</h2><div><strong>48</strong><span>карточек</span><i></i><strong>24</strong><span>пары</span><i></i><strong>1</strong><span>инструкция</span></div></section>
  <section className="product-cta"><p className="overline">ДЛЯ ДОМА И ОБРАЗОВАТЕЛЬНЫХ ЦЕНТРОВ</p><h2>Открывайте Казахстан<br/>вместе с детьми</h2><a href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20заказать%20Urker%20Memo" target="_blank" rel="noreferrer">Связаться с нами →</a></section></main>
  {modal && <div className="modal" onClick={() => setModal(false)}><button aria-label="Закрыть">×</button><img src="/images/memo2.jpg" alt="Urker Memo крупным планом" /></div>}<Footer navigate={navigate} /></>;
}

function UrkerGo({ navigate }) {
  const [modal, setModal] = useState(null);
  useEffect(() => { document.title = 'Urker Go | Urker Baulu Mektebi'; }, []);
  const openImage = (src) => setModal(src);
  return <><Header navigate={navigate} /><main className="go-page">
    <section className="product-hero go-hero"><div className="breadcrumbs"><button onClick={() => navigate('/')}>Главная</button><span>/</span><button onClick={() => navigate('/games')}>Игры</button><span>/</span><b>Urker Go</b></div><div className="product-layout">
      <div className="product-photo go-main-photo"><img src="/images/4.jpg" alt="Коробка интеллектуальной игры Urker Go" onClick={() => openImage('/images/4.jpg')} /><button onClick={() => openImage('/images/4.jpg')}>⌕ Увеличить изображение</button></div>
      <div className="product-info"><p className="overline gold">ОҚУ-ӘДІСТЕМЕЛІК КЕШЕН · УЧЕБНО-МЕТОДИЧЕСКИЙ КОМПЛЕКТ</p><h1>URKER GO</h1><p className="description bilingual-copy"><span>«Үркермен елтану» картасымен бірге ұсынылатын «URKER GO» зияткерлік үстел ойыны оқу-әдістемелік кешені білім беру үдерісін ұйымдастырудың заманауи талаптарына сәйкес келеді және білім алушылардың әмбебап оқу құзыреттерін, зерттеушілік дағдыларын, функционалдық сауаттылығын қалыптастыруға, сондай-ақ азаматтық жауапкершілігін, патриоттық сезімін және Қазақстан Республикасының тарихи, мәдени әрі табиғи мұрасына құрметпен қарауын тәрбиелеуге бағытталған. Кешеннің мазмұны білім алушылардың зияткерлік қабілеттерін жан-жақты дамытуға мүмкіндік беретін, өзара логикалық байланыста құрылған ойын және танымдық материалдар жүйесінен тұрады.</span><span>Учебно-методический комплект «Интеллектуальная настольная игра URKER GO» с картой «Үркермен елтану» соответствует современным требованиям к организации образовательного процесса и ориентирован на формирование универсальных учебных компетенций, исследовательских навыков, функциональной грамотности, а также воспитание гражданственности, патриотизма и уважительного отношения к историческому, культурному и природному наследию Республики Казахстан. Содержание комплекта представляет собой логически выстроенную систему игровых и познавательных материалов, обеспечивающих комплексное развитие интеллектуальных способностей обучающихся.</span></p><div className="spec-row go-specs"><div><Icon>☆</Icon><b>9+</b><span>возраст</span></div><div><Icon>▦</Icon><b>4</b><span>темы</span></div><div><Icon>⌖</Icon><b>20</b><span>регионов</span></div></div><a className="primary-btn inline" href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20об%20игре%20Urker%20Go" target="_blank" rel="noreferrer">Узнать о наличии <span>→</span></a></div>
    </div></section>
    <section className="go-purpose"><div className="go-purpose-heading"><p className="overline gold">СОДЕРЖАНИЕ ИГРЫ</p><h2>Четыре направления знаний</h2><p>Задания объединяют ключевые сведения о стране и помогают увидеть Казахстан как единое историческое, культурное и природное пространство.</p></div><div className="topic-grid"><article><span>01</span><h3>Первые в Казахстане</h3><p>Достижения государства, науки, культуры, спорта и государственности.</p></article><article><span>02</span><h3>Известные личности</h3><p>Учёные, писатели, государственные деятели, представители культуры и спорта.</p></article><article><span>03</span><h3>Культурное наследие</h3><p>Достопримечательности, памятники истории и архитектуры страны.</p></article><article><span>04</span><h3>Природа Казахстана</h3><p>Заповедники, национальные парки, биоразнообразие и экологическая культура.</p></article></div></section>
    <section className="go-gallery"><div className="section-heading"><div><p className="overline gold">ИГРОВОЙ КОМПЛЕКТ</p><h2>Всё для познавательной игры</h2></div><p>Нажмите на фотографию, чтобы рассмотреть детали.</p></div><div className="go-gallery-grid"><button onClick={() => openImage('/images/5.jpg')}><img src="/images/5.jpg" alt="Игровое поле Urker Go" /><span>Игровое поле</span></button><button onClick={() => openImage('/images/6.jpg')}><img src="/images/6.jpg" alt="Комплектация Urker Go" /><span>Полная комплектация</span></button></div></section>
    <section className="development"><div><p className="overline gold">ОБРАЗОВАТЕЛЬНЫЙ ПОТЕНЦИАЛ</p><h2>Знания, которые работают</h2></div><div className="benefit-grid"><article><b>01</b><h3>Функциональная грамотность</h3><p>Работа с вопросами развивает читательскую и информационную грамотность.</p></article><article><b>02</b><h3>Критическое мышление</h3><p>Игроки анализируют, сравнивают и выбирают обоснованные ответы.</p></article><article><b>03</b><h3>Коммуникация</h3><p>Командный формат учит сотрудничеству и аргументации.</p></article><article><b>04</b><h3>Исследовательский интерес</h3><p>Игра мотивирует глубже изучать историю, географию и культуру страны.</p></article></div></section>
    <section className="go-method"><div><p className="overline gold">ДЛЯ ПЕДАГОГОВ</p><h2>Готовый ресурс для образовательного процесса</h2><p>Комплект можно использовать на уроках истории и географии Казахстана, во внеурочной работе, на предметных неделях, интеллектуальных турнирах и в школьных библиотеках.</p><ul><li>Индивидуальная, групповая и командная работа</li><li>Проектные и исследовательские задания</li><li>Начальное, основное и дополнительное образование</li></ul></div><aside><strong>«Үркермен елтану»</strong><p>Познавательная карта охватывает 17 областей и 3 города республиканского значения, объединяя инфографику и иллюстративные материалы.</p></aside></section>
    <section className="product-cta"><p className="overline">ОБУЧЕНИЕ ЧЕРЕЗ ИГРУ</p><h2>Исследуйте Казахстан<br/>вместе с Urker Go</h2><a href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20заказать%20Urker%20Go" target="_blank" rel="noreferrer">Связаться с нами →</a></section>
  </main>{modal && <div className="modal" onClick={() => setModal(null)}><button aria-label="Закрыть">×</button><img src={modal} alt="Urker Go крупным планом" /></div>}<Footer navigate={navigate} /></>;
}

function UrkerWorkbook({ navigate }) {
  const [modal, setModal] = useState(null);
  useEffect(() => { document.title = 'Үркер дәптері | Urker Baulu Mektebi'; }, []);
  return <><Header navigate={navigate} /><main className="workbook-page">
    <section className="product-hero workbook-hero"><div className="breadcrumbs"><button onClick={() => navigate('/')}>Главная</button><span>/</span><button onClick={() => navigate('/games')}>Игры и пособия</button><span>/</span><b>Үркер Тетрадь</b></div><div className="product-layout">
      <div className="product-photo workbook-photo"><img src="/images/2.jpg" alt="Пособие Үркер Тетрадь" onClick={() => setModal('/images/2.jpg')} /><button onClick={() => setModal('/images/2.jpg')}>⌕ Увеличить изображение</button></div>
      <div className="product-info"><p className="overline gold">ОҚУ ҚҰРАЛЫ · УЧЕБНОЕ ПОСОБИЕ</p><h1>Үркер дәптері</h1><p className="description bilingual-copy"><span>«Үркер дәптері» – креативті ойлау мәдениетін дамытуға бағытталған тапсырмалар жүйесін қамтитын оқу құралы. Құралдың құрамына «Үркер дәптерімен» жұмыс жүргізуге арналған педагогтерге арналған әдістемелік ұсынымдар енгізілген.</span><span>Пособие «Тетрадь Үркера» содержит систему заданий, направленных на развитие культуры креативного мышления, с методическими рекомендациями для педагогов, работающих с «Тетрадью Үркер».</span></p><div className="spec-row workbook-specs"><div><Icon>✎</Icon><b>1 класс</b><span>уровень</span></div><div><Icon>◫</Icon><b>Часть 1</b><span>пособие</span></div><div><Icon>◎</Icon><b>Педагогу</b><span>методика</span></div></div><a className="primary-btn inline" href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20о%20пособии%20Үркер%20Тетрадь" target="_blank" rel="noreferrer">Узнать о пособии <span>→</span></a></div>
    </div></section>
    <section className="workbook-approach"><div className="workbook-heading"><p className="overline gold">МЕТОДИЧЕСКИЙ ПОДХОД</p><h2>Учиться думать,<br/>а не повторять</h2><p>Каждая тема начинается с осмысления ключевого слова. Через диалог, сравнение и творческие упражнения ребёнок приходит к собственному пониманию и учится аргументировать мнение.</p></div><div className="exercise-list"><article><span>01</span><div><h3>Игровые задания</h3><p>Поддерживают интерес и активное включение в учебный процесс.</p></div></article><article><span>02</span><div><h3>Сравнение и моделирование</h3><p>Помогают находить связи, различия и создавать новые решения.</p></div></article><article><span>03</span><div><h3>Рассуждение и вопросы</h3><p>Развивают речь, любознательность и самостоятельную позицию.</p></div></article><article><span>04</span><div><h3>Работа с образами</h3><p>Тренирует воображение, ассоциативное и понятийное мышление.</p></div></article></div></section>
    <section className="workbook-gallery"><div className="workbook-gallery-copy"><p className="overline gold">ВНУТРИ ПОСОБИЯ</p><h2>Знания в понятной визуальной форме</h2><p>Иллюстрации, карты, QR-материалы и короткие информационные блоки помогают ребёнку самостоятельно исследовать тему и сохранять интерес к обучению.</p><button onClick={() => setModal('/images/1.jpg')}>Рассмотреть страницу →</button></div><button className="workbook-image-button" onClick={() => setModal('/images/1.jpg')}><img src="/images/1.jpg" alt="Разворот образовательного пособия Үркер" /></button></section>
    <section className="development workbook-benefits"><div><p className="overline gold">ОБРАЗОВАТЕЛЬНЫЙ РЕЗУЛЬТАТ</p><h2>Комплексное развитие ребёнка</h2></div><div className="benefit-grid"><article><b>01</b><h3>Креативное мышление</h3><p>Умение видеть несколько решений, создавать идеи и проявлять инициативу.</p></article><article><b>02</b><h3>Критическое мышление</h3><p>Навыки анализа информации, сравнения и обоснованного вывода.</p></article><article><b>03</b><h3>Функциональная грамотность</h3><p>Практическое применение знаний и осмысленная работа с информацией.</p></article><article><b>04</b><h3>Коммуникация</h3><p>Развитие речевой активности, диалога и сотрудничества.</p></article></div></section>
    <section className="workbook-values"><div><p className="overline gold">ЦЕННОСТИ</p><h2>Интеллект и характер</h2><p>Материалы пособия соотносятся с направлениями программы «Адал азамат — біртұтас тәрбие» и поддерживают не только учебное, но и личностное развитие школьника.</p></div><ul><li>Стремление к знаниям</li><li>Трудолюбие</li><li>Ответственность</li><li>Справедливость</li><li>Патриотизм</li><li>Созидательность</li></ul></section>
    <section className="go-method workbook-method"><div><p className="overline gold">ПОДДЕРЖКА УЧИТЕЛЯ</p><h2>Методические рекомендации для педагогов</h2><p>В комплект входят пояснения по организации занятий, технологии «ключевого слова», диалоговому обучению, оцениванию результатов и развитию умения рассуждать, прогнозировать и задавать вопросы.</p><ul><li>Для уроков и внеурочных занятий</li><li>Готовые рекомендации по заданиям</li><li>Поддержка интерактивного диалога</li><li>Соответствие программе 1 класса</li></ul></div><aside><strong>Практический формат</strong><p>Структура пособия помогает педагогу выстраивать последовательные занятия и адаптировать задания под темп и особенности класса.</p></aside></section>
    <section className="product-cta workbook-cta"><p className="overline">ТВОРЧЕСКОЕ МЫШЛЕНИЕ С ПЕРВОГО КЛАССА</p><h2>Помогите ребёнку<br/>мыслить самостоятельно</h2><a href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20заказать%20пособие%20Үркер%20Тетрадь" target="_blank" rel="noreferrer">Связаться с нами →</a></section>
  </main>{modal && <div className="modal" onClick={() => setModal(null)}><button aria-label="Закрыть">×</button><img src={modal} alt="Пособие Үркер крупным планом" /></div>}<Footer navigate={navigate} /></>;
}

function SafeInternet({ navigate }) {
  const [modal, setModal] = useState(null);
  useEffect(() => { document.title = 'Қауіпсіз ғаламтор | Urker Baulu Mektebi'; }, []);
  return <><Header navigate={navigate} /><main className="safe-page">
    <section className="product-hero safe-hero"><div className="breadcrumbs"><button onClick={() => navigate('/')}>Главная</button><span>/</span><button onClick={() => navigate('/games')}>Игры</button><span>/</span><b>Қауіпсіз ғаламтор</b></div><div className="product-layout">
      <div className="product-photo safe-photo"><img src="/images/qg2.jpeg" alt="Интеллектуальная настольная игра Қауіпсіз ғаламтор" onClick={() => setModal('/images/qg2.jpeg')} /><button onClick={() => setModal('/images/qg2.jpeg')}>⌕ Увеличить изображение</button></div>
      <div className="product-info"><p className="overline safe-overline">ИНТЕРАКТИВТІ ОЙЫН · ИНТЕРАКТИВНАЯ ИГРА</p><h1>Қауіпсіз ғаламтор</h1><p className="description bilingual-copy"><span>«Қауіпсіз ғаламтор» ойыны мазмұны білім алушылардың интернет желісін қауіпсіз пайдалану қағидалары туралы түсініктерін қалыптастыруға бағытталған интерактивті ойын тапсырмалары жүйесінен тұрады. Ойын барысында цифрлық кеңістікте балалар кездесуі мүмкін шынайы өмірлік жағдаяттар үлгіленіп, олардың қауіпсіз мінез-құлық дағдылары мен дұрыс әрекет ету алгоритмдерін қалыптастыруға мүмкіндік береді.</span><span>Содержание игры «Безопасный интернет» представляет собой систему интерактивных игровых заданий, направленных на формирование у обучающихся представлений о правилах безопасного использования сети Интернет. Игровые ситуации моделируют реальные жизненные ситуации, с которыми могут столкнуться дети в цифровом пространстве, и помогают вырабатывать алгоритмы безопасного поведения.</span></p><div className="spec-row safe-specs"><div><Icon>☆</Icon><b>7–10</b><span>возраст</span></div><div><Icon>⌁</Icon><b>Офлайн</b><span>формат</span></div><div><Icon>✓</Icon><b>Командно</b><span>обучение</span></div></div><a className="primary-btn inline safe-button" href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20об%20игре%20Қауіпсіз%20ғаламтор" target="_blank" rel="noreferrer">Узнать о наличии <span>→</span></a></div>
    </div></section>
    <section className="safe-topics"><div className="safe-title"><p className="overline">ЧЕМУ УЧИТ ИГРА</p><h2>Пять правил уверенного поведения в сети</h2></div><div className="safe-topic-grid"><article><span>01</span><h3>Защита личных данных</h3><p>Какие сведения нельзя сообщать незнакомцам и публиковать открыто.</p></article><article><span>02</span><h3>Безопасное общение</h3><p>Как вести себя в социальных сетях, чатах и мессенджерах.</p></article><article><span>03</span><h3>Распознавание угроз</h3><p>Как заметить подозрительное сообщение, ссылку или просьбу.</p></article><article><span>04</span><h3>Цифровой этикет</h3><p>Почему в интернете важны уважение, честность и ответственность.</p></article><article><span>05</span><h3>Безопасное решение</h3><p>Когда нужно остановиться и обратиться за помощью ко взрослому.</p></article></div></section>
    <section className="safe-gallery"><button onClick={() => setModal('/images/qg.jpeg')}><img src="/images/qg.jpeg" alt="Игровое поле и методические материалы Қауіпсіз ғаламтор" /></button><div><p className="overline safe-overline">ОБУЧЕНИЕ ЧЕРЕЗ СИТУАЦИИ</p><h2>Обсудить. Понять. Применить.</h2><p>Задания построены вокруг жизненных примеров. Ребёнок не просто запоминает правило, а учится оценивать ситуацию, прогнозировать последствия и выбирать ответственное действие.</p><ul><li>Интерактивные игровые задания</li><li>Обсуждение и рефлексия после хода</li><li>Индивидуальная, групповая и командная работа</li><li>Доступные визуальные материалы</li></ul><button className="text-link" onClick={() => setModal('/images/qg.jpeg')}>Рассмотреть комплект →</button></div></section>
    <section className="safe-results"><div><p className="overline">ОБРАЗОВАТЕЛЬНЫЙ ПОТЕНЦИАЛ</p><h2>Навыки для цифрового мира</h2><p>Пособие помогает интегрировать цифровую грамотность и информационную безопасность в учебную и воспитательную деятельность.</p></div><div className="safe-result-list"><article><b>Цифровая грамотность</b><span>Ответственная работа с устройствами и информацией</span></article><article><b>Критическое мышление</b><span>Анализ рисков и проверка цифровых ситуаций</span></article><article><b>Коммуникация</b><span>Умение обсуждать проблему и аргументировать решение</span></article><article><b>Самостоятельность</b><span>Осознанный выбор безопасного алгоритма действий</span></article></div></section>
    <section className="go-method safe-method"><div><p className="overline safe-overline">ДЛЯ ПЕДАГОГОВ И ПСИХОЛОГОВ</p><h2>Практический инструмент профилактической работы</h2><p>Игра подходит для уроков, классных часов, факультативных занятий и внеурочной деятельности. Методическое сопровождение помогает организовать обсуждение, командную работу и рефлексию.</p><ul><li>Начальное образование</li><li>Дополнительное образование</li><li>Школьные психологи</li><li>Профилактические мероприятия</li></ul></div><aside><strong>«Адал азамат»</strong><p>Содержание поддерживает ценности ответственности, уважения, честности, взаимопомощи и осознанного отношения к цифровым технологиям.</p></aside></section>
    <section className="product-cta safe-cta"><p className="overline">БЕЗОПАСНОСТЬ НАЧИНАЕТСЯ СО ЗНАНИЙ</p><h2>Подготовьте ребёнка<br/>к цифровому миру</h2><a href="https://wa.me/77785608275?text=Здравствуйте!%20Хочу%20заказать%20игру%20Қауіпсіз%20ғаламтор" target="_blank" rel="noreferrer">Связаться с нами →</a></section>
  </main>{modal && <div className="modal" onClick={() => setModal(null)}><button aria-label="Закрыть">×</button><img src={modal} alt="Қауіпсіз ғаламтор крупным планом" /></div>}<Footer navigate={navigate} /></>;
}

export default function Main() {
  const cleanPath = () => window.location.pathname.replace(/\/$/, '') || '/';
  const [path, setPath] = useState(cleanPath());
  useEffect(() => { const pop = () => setPath(cleanPath()); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop); }, []);
  useEffect(() => {
    if (path === '/') document.title = 'Urker Baulu Mektebi — познавательные игры для детей';
    if (path === '/games') document.title = 'Познавательные игры | Urker Baulu Mektebi';
  }, [path]);
  const navigate = (to) => { window.history.pushState({}, '', to); setPath(to); window.scrollTo(0, 0); };
  if (path === '/games/urker-memo') return <Memo navigate={navigate} />;
  if (path === '/games/urker-go') return <UrkerGo navigate={navigate} />;
  if (path === '/games/urker-workbook') return <UrkerWorkbook navigate={navigate} />;
  if (path === '/games/safe-internet') return <SafeInternet navigate={navigate} />;
  if (path === '/games') return <Games navigate={navigate} />;
  return <Home navigate={navigate} />;
}
