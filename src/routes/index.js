import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Basket from '../pages/Basket';
import Shop from '../pages/Shop';
import CreateDevice from '../pages/CreateDevice';
import { Component } from 'react';
import { ADMIN_CHAT, ADMIN_ROUTE, BASKET_ROUTE, CREATE_DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, USER_CHAT } from '../utils/consts';
import DevicePage from '../pages/DevicePage';
import UserChat from '../pages/UserChat';
import AdminChat from '../pages/AdminChat';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  },
  {
    path: CREATE_DEVICE_ROUTE,
    Component: CreateDevice
  },
  {
    path: USER_CHAT,
    Component: UserChat
  },
  {
    path: ADMIN_CHAT,
    Component: AdminChat
  }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: '/product/:id',
    Component: DevicePage
  },
];
