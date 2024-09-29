import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import DevicePage from './pages/DevicePage';
import CreateDevice from './pages/CreateDevice';
import AdminChat from './pages/AdminChat';
import UserChat from './pages/UserChat';
import About from './pages/About';
import { Component } from 'react';
import Agreement from './components/Agreement';
import Notification from './pages/Notification';
import Contacts from './pages/Contacts';

export const authRoutes = [
  { path: '/admin', Component: Admin },
  { path: '/basket', Component: Basket },
  { path: '/create', Component: CreateDevice},
  { path: '/chat', Component: UserChat },
  { path: '/adminchat', Component: AdminChat },
];

export const publicRoutes = [
  { path: '/', Component: Shop },
  { path: '/login', Component: Auth },
  { path: '/register', Component: Auth },
  { path: '/device/:id', Component: DevicePage },
  { path: '/about', Component: About},
  { path: '/agreement', Component: Agreement},
  { path: '/notification', Component: Notification},
  { path: '/contacts', Component: Contacts}
];
