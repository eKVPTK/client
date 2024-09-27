// Warning.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Warning = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="bg-white border border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-lg w-full max-w-lg transition-transform transform hover:scale-105">
                <h4 className="font-bold text-xl mb-4">{t('Приносим свои извинения!')}</h4>
                <p className="mb-3">
                    {t('С искренней благодарностью за ваше терпение и понимание! Мы в OptiTradeHub глубоко ценим вашу поддержку в этот период развития нашего проекта. Хотя наш сайт все еще находится в бета-версии, ваша обратная связь и отзывы неоценимы для нас.')}
                </p>
                <p className="mb-3">
                    {t('Мы стремимся к созданию уникального и удобного пространства для вас, наших пользователей. Ваше мнение помогает нам не только исправлять ошибки, но и делать наш сервис лучше каждый день.')}
                </p>
                <p className="mb-3">
                    {t('Приносим искренние извинения за любые неудобства, с которыми вы могли столкнуться. Наша команда работает не покладая рук, чтобы создать для вас неповторимый опыт использования OptiTradeHub.')}
                </p>
                <p className="mb-4">
                    <b>{t('Пожалуйста, имейте в виду, что данный функционал находится в разработке, и мы активно работаем над его реализацией.')}</b>
                </p>
                <p>{t('Еще раз, большое спасибо за ваше терпение, понимание и поддержку!')}</p>
                {/* <p className="mt-4 text-center">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400">
                        {t('Напишите нам и сообщите об ошибке!')}
                    </button>
                </p> */}
            </div>
        </div>
    );
};

export default Warning;
