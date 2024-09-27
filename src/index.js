// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserStoreProvider } from './store/UserStore';
import { DeviceStoreProvider } from './store/DeviceStore';
import './input.css'
import "./i18n"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <UserStoreProvider>
    <DeviceStoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeviceStoreProvider>
  </UserStoreProvider>
  </React.StrictMode>
);
