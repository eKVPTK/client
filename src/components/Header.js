import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  CREATE_DEVICE_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ABOUT_ROUTE,
} from '../utils/consts';
import { useUserStore } from '../store/UserStore';
import anime from 'animejs';

const Header = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate(SHOP_ROUTE);
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
    <header ref={headerRef} className="bg-white border-b border-gray-200 shadow-sm py-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Ссылки вместо логотипа */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-6">
          <NavLink to={SHOP_ROUTE} className="text-gray-700 hover:text-blue-600">
            Главная
          </NavLink>
          <NavLink to={ABOUT_ROUTE} className="text-gray-700 hover:text-blue-600">
            О нас
          </NavLink>
          {user.isAuth && (
            <NavLink to={BASKET_ROUTE} className="text-gray-700 hover:text-blue-600">
              Корзина
            </NavLink>
          )}
          {user.isAuth && user.role === 'SUPPLIER' && (
            <NavLink to={CREATE_DEVICE_ROUTE} className="text-gray-700 hover:text-blue-600">
              Создать товар
            </NavLink>
          )}
          {user.isAuth && user.role === 'ADMIN' && (
            <NavLink to={ADMIN_ROUTE} className="text-gray-700 hover:text-blue-600">
              Панель Администратора
            </NavLink>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {!user.isAuth ? (
            <>
              <NavLink to={LOGIN_ROUTE} className="text-gray-700 hover:text-blue-600">
                Вход
              </NavLink>
              <NavLink to={REGISTRATION_ROUTE} className="text-gray-700 hover:text-blue-600">
                Регистрация
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
                <span className="text-white text-xl">
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </span>
              </div>

              <div className="text-gray-700">
                <p className="font-semibold">{user.username}</p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
