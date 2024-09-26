import React from 'react';

const Warning = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="bg-white border border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-lg w-full max-w-lg transition-transform transform hover:scale-105">
                <h4 className="font-bold text-xl mb-4">Приносим свои извинения!</h4>
                <p className="mb-3">
                    С искренней благодарностью за ваше терпение и понимание! Мы в OptiTradeHub глубоко ценим вашу поддержку в этот период развития нашего проекта. Хотя <b>наш сайт все еще находится в бета-версии</b>, ваша обратная связь и отзывы неоценимы для нас.
                </p>
                <p className="mb-3">
                    Мы стремимся к созданию уникального и удобного пространства для вас, наших пользователей. Ваше мнение помогает нам не только исправлять ошибки, но и делать наш сервис лучше каждый день.
                </p>
                <p className="mb-3">
                    Приносим искренние извинения за любые неудобства, с которыми вы могли столкнуться. Наша команда работает не покладая рук, чтобы создать для вас неповторимый опыт использования OptiTradeHub.
                </p>
                <p className="mb-4">
                    <b>Пожалуйста, имейте в виду, что данный функционал находится в разработке, и мы активно работаем над его реализацией.</b>
                </p>
                <p className="mb-4">
                    Еще раз, большое спасибо за ваше терпение, понимание и поддержку!
                </p>
                <hr className="border-yellow-300 mb-4"/>
                <p className="mb-0">
                    <a href="#" className="text-yellow-700 font-semibold hover:underline">Напишите нам</a> и сообщите об ошибке!
                </p>
            </div>
        </div>
    );
};

export default Warning;
