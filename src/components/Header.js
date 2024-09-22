import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CREATE_DEVICE_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, ABOUT_ROUTE } from '../utils/consts';
import { useUserStore } from '../store/UserStore';

const Header = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(SHOP_ROUTE);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3">
      <div className="container mx-auto flex justify-between items-center">

        <span className="text-3xl font-bold text-blue-600">OptiTradeHub</span>

        {/* Навигация */}
        <nav className="flex space-x-6">
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
        </nav>

        <div className="flex items-center space-x-4">
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
