import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  CREATE_DEVICE_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ABOUT_ROUTE,
  NOTIFICATION,
  CONTACTS
} from '../utils/consts';
import { useUserStore } from '../store/UserStore';
import anime from 'animejs';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { user, logout } = useUserStore();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(SHOP_ROUTE);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    anime({
      targets: headerRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      easing: 'easeOutBack',
    });
  }, []);

  return (
    <header ref={headerRef} className="bg-white border-b border-gray-200 shadow-sm py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Иконка бургер-меню для мобильных устройств */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Ссылки для настольных устройств */}
        <div className="hidden md:flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-6">
          <NavLink to={SHOP_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
            {t('Главная')}
          </NavLink>
          <NavLink to={NOTIFICATION} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
            {t('Уведомления')}
          </NavLink>
          <NavLink to={CONTACTS} className="text-gray-600 hover:text-orange-500 transition">
            {t('contacts')} 
          </NavLink>
          <NavLink to={ABOUT_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
            {t('О нас')}
          </NavLink>
          {user.isAuth && (
            <NavLink to={BASKET_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
              {t('Корзина')}
            </NavLink>
          )}
          {user.isAuth && user.role === 'SUPPLIER' && (
            <NavLink to={CREATE_DEVICE_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
              {t('Создать товар')}
            </NavLink>
          )}
          {user.isAuth && user.role === 'ADMIN' && (
            <NavLink to={ADMIN_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
              {t('Панель Администратора')}
            </NavLink>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Меню языков */}
          <div className="flex items-center space-x-4">
            <button onClick={() => changeLanguage('ru')} className="text-gray-700 hover:text-blue-600 text-sm md:text-base">
              RU
            </button>
            <button onClick={() => changeLanguage('kz')} className="text-gray-700 hover:text-blue-600 text-sm md:text-base">
              KZ
            </button>
            <button onClick={() => changeLanguage('en')} className="text-gray-700 hover:text-blue-600 text-sm md:text-base">
              EN
            </button>
          </div>

          {!user.isAuth ? (
            <>
              <NavLink to={LOGIN_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
                {t('Вход')}
              </NavLink>
              <NavLink to={REGISTRATION_ROUTE} className="text-gray-700 hover:text-blue-600 text-sm md:text-base pl-4">
                {t('Регистрация')}
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center">
                <span className="text-white text-lg">{user.username ? user.username[0].toUpperCase() : 'U'}</span>
              </div>
              <div className="text-gray-700 text-sm md:text-base">
                <p className="font-semibold">{user.username}</p>
                <button onClick={handleLogout} className="text-blue-600 hover:underline text-xs md:text-sm">
                  {t('Выйти')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное бургер-меню */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <NavLink
            to={SHOP_ROUTE}
            className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
            onClick={toggleMenu}
          >
            {t('Главная')}
          </NavLink>
          <NavLink
            to={NOTIFICATION}
            className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
            onClick={toggleMenu}
          >
            {t('Уведомления')}
          </NavLink>
          <NavLink
            to={ABOUT_ROUTE}
            className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
            onClick={toggleMenu}
          >
            {t('О нас')}
          </NavLink>
          <NavLink to={CONTACTS} className="block text-gray-700 hover:text-blue-600 text-sm pl-4">
            {t('contacts')} 
          </NavLink>
          {user.isAuth && (
            <NavLink
              to={BASKET_ROUTE}
              className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
              onClick={toggleMenu}
            >
              {t('Корзина')}
            </NavLink>
          )}
          {user.isAuth && user.role === 'SUPPLIER' && (
            <NavLink
              to={CREATE_DEVICE_ROUTE}
              className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
              onClick={toggleMenu}
            >
              {t('Создать товар')}
            </NavLink>
          )}
          {user.isAuth && user.role === 'ADMIN' && (
            <NavLink
              to={ADMIN_ROUTE}
              className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
              onClick={toggleMenu}
            >
              {t('Панель Администратора')}
            </NavLink>
          )}
          {!user.isAuth ? (
            <>
              <NavLink
                to={LOGIN_ROUTE}
                className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
                onClick={toggleMenu}
              >
                {t('Вход')}
              </NavLink>
              <NavLink
                to={REGISTRATION_ROUTE}
                className="block text-gray-700 hover:text-blue-600 text-sm pl-4"
                onClick={toggleMenu}
              >
                {t('Регистрация')}
              </NavLink>
            </>
          ) : (
            <div className="text-gray-700 text-sm pl-4">
              <p className="font-semibold">{user.username}</p>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-blue-600 hover:underline text-xs"
              >
                {t('Выйти')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
