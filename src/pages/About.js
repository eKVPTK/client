import React from "react";
import Teams from '../assets/images/IMG_4994.jpg';
import { FaHandshake, FaLock, FaStar, FaCheckCircle } from 'react-icons/fa';

const About = () => {
    return (
       
        
<div className="about-container" style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '40px' }}>
        <h3 style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center', color: '#333', fontSize: '2rem' }}>
            Добро пожаловать на страницу о нас!
        </h3>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', textAlign: 'justify', color: '#555' }}>
            Enactus Карагандинского Высшего Политехнического Колледжа (КВПТК) - это вдохновляющая команда молодых и амбициозных предпринимателей, которые объединяют свои усилия для создания позитивных изменений в обществе через инновационные предпринимательские проекты.
        </p>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', textAlign: 'justify', color: '#555' }}>
            Наша миссия заключается в поддержке и развитии малого и среднего бизнеса, предоставляя им доступ к качественным продуктам и услугам. Мы стремимся к построению долгосрочных партнерских отношений с нашими клиентами, основанных на взаимном доверии, надежности и профессионализме.
        </p>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', textAlign: 'justify', color: '#555' }}>
            Присоединяйтесь к нам в нашем увлекательном путешествии к созданию позитивных изменений и процветанию бизнеса! Свяжитесь с нами прямо сейчас, чтобы узнать больше о том, как мы можем помочь вашему бизнесу достичь новых высот!
        </p>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <img style={{ marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }} width={600} src={Teams} alt="Команда Enactus" />
        </div>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', textAlign: 'justify', color: '#555' }}>
            Наша основная цель - создать безопасное и прозрачное торговое пространство, где каждый предприниматель может торговать без страха перед мошенничеством. Мы стремимся к тому, чтобы каждая операция была не только успешной, но и абсолютно чистой и открытой для проверки. Основные задачи, стоящие перед нашей командой:
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#555' }}>
                <FaHandshake style={{ color: '#007bff', marginRight: '10px', fontSize: '18px', minWidth: '18px', minHeight: '18px' }} />
                Построение надёжных отношений между компанией поставщика и закупщика.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#555' }}>
                <FaLock style={{ color: '#007bff', marginRight: '10px', fontSize: '18px', minWidth: '18px', minHeight: '18px' }} />
                Поддержание конфиденциальности и безопасности данных.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#555' }}>
                <FaStar style={{ color: '#007bff', marginRight: '10px', fontSize: '18px', minWidth: '18px', minHeight: '18px' }} />
                Улучшение функционала сайта с помощью отзывов пользователей.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#555' }}>
                <FaCheckCircle style={{ color: '#007bff', marginRight: '10px', fontSize: '18px', minWidth: '18px', minHeight: '18px' }} />
                Обеспечение высоких стандартов безопасности и прозрачности.
            </li>
        </ul>
    </div>
</div>

    );
}

export default About;
