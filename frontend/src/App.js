import React, { useState, useEffect } from 'react';
import './App.css';

const useApiData = (url) => {  /* загрузка данных */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'success') {
          setData(result.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const Header = () => (
  <header>
    <div className="header-container">
      <h1 className="header_title">Академия успеха</h1>
      <nav>
        <ul>
          <li><a href="/catalog">Каталог курсов</a></li>
          <li><a href="/catalog_tasks">Каталог задач</a></li>
          <li><a href="/reviews">Отзывы</a></li>
        </ul>
        <a href="/registration" className="registration">Войти</a>
      </nav>
    </div>
  </header>
);

const BundleCard = ({ title, description }) => ( /* заготовка для карточек с курсами */
  <article>
    <a href="/catalog">
      <h3 className="bundle_card">{title}</h3>
      <p>{description}</p>
    </a>
  </article>
);

const ReviewCard = ({ author, text, score }) => ( /* заготовка для отзывов */
  <article className="review_card">
    <h3>{author}</h3>
    <div>Набранный балл: {score}</div>
    <p>{text}</p>
  </article>
);

const Statistics = () => {
  const { data: stats, error } = useApiData('http://localhost:5000/api/statistics');
  
  const statItems = [
    { label: 'Свыше X учеников выбрали нашу школу', value: stats?.students },
    { label: 'Средний балл ученика - X', value: stats?.avg_score },
    { label: 'X+ победителей олимпиад', value: stats?.winners_count }
  ];
  if (error) return <li className="informatio_stat">Не удалось загрузить статистику</li>;
  return (
    <>
      {statItems.map((item, index) => (/* заменяем тут Х на value */
        <li key={index} className="informatio_stat"> 
          {item.label.replace('X', item.value)}
        </li>
      ))}
    </>
  );
};

const WhyUsSection = () => (
  <div className='whyUsFullSection'>
    <h2 className="whyUsTitle">Почему следует выбрать нас?</h2>
    <section className="whyUsSection">
      <p>
        Наша школа постоянно развивается, стараясь поддерживать высокий стандарт качества.<br />
        Преподаватели объясняют даже самые сложные темы простым языком, чтобы было понятно каждому.<br />
        Мы делаем упор на практику, а так же разбираем самые необычные задачи, чтобы на экзамене вы справились с любой задачей!
      </p>
      <img className="education" src="/img/education.jpg" alt="обучение" />
    </section>
  </div>
);

const Footer = () => (
  <footer>
    <p>Наши социальные сети</p>
    <ul className="socialLinks">
      <li>
        <a href="">
          <img src="/img/VK Logo.png" alt="ВКонтакте" className="socialIcon" />
        </a>
      </li>
      <li>
        <a href="https://t.me/MadeInHeaven">
          <img src="/img/telegram.png" alt="Телеграм" className="socialIcon" />
        </a>
      </li>
    </ul>
    <p>Онлайн школа "Академия Успеха" {new Date().getFullYear()} г. Все права защищены.</p> 
  </footer>
);

function App() { /* сборка  */
  const { data: bundles } = useApiData('http://localhost:5000/api/bundles');
  const { data: reviews } = useApiData('http://localhost:5000/api/reviews');
  
  return (
    <div className="App">
      <Header />
      <main>
        <h2>Направления подготовки на нашей платформе</h2>
        <section className="cardsWithBundles">
          {bundles?.map(bundle => (
            <BundleCard 
              key={bundle.id}
              title={bundle.title}
              description={bundle.description}
            />
          ))}
        </section>
        <section>
          <h2>Получайте знания, которые помогут вам поступить в топовый ВУЗ и освоить профессию мечты</h2>
          <ul className="informationAboutUs">
            <Statistics />
          </ul>
        </section>
        <WhyUsSection />
        <section>
          <h2>Отзывы наших учеников</h2>
          <div className="reviewsSection">
            {reviews?.map(review => (
              <ReviewCard 
                key={review.id}
                author={review.author}
                text={review.text}
                score = {review.avg_score}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;