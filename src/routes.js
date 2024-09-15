// src/routes.js
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import DevicePage from './pages/DevicePage';
import CreateDevice from './pages/CreateDevice';
import AdminChat from './pages/AdminChat';
import UserChat from './pages/UserChat';

// Маршруты для авторизованных пользователей
export const authRoutes = [
  { path: '/admin', Component: Admin },
  { path: '/basket', Component: Basket },
  { path: '/create', Component: CreateDevice},
  { path: '/chat', Component: UserChat },
  { path: '/adminchat', Component: AdminChat },
];

// Публичные маршруты
export const publicRoutes = [
  { path: '/', Component: Shop },
  { path: '/login', Component: Auth },
  { path: '/register', Component: Auth },
  { path: '/device/:id', Component: DevicePage }
];
