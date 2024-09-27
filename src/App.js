// src/App.js
import React from 'react';
import AppRouter from './components/AppRouter';
import { useUserStore } from './store/UserStore';
import Header from './components/Header';
import Footer from './components/Footer';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');


  body {
      font-family: "Roboto", sans-serif;
  }
`;

const App = () => {
  const { user } = useUserStore();

  return (
    <div>
      <GlobalStyle />
      <Header/>
      <AppRouter />
      <Footer/>
    </div>
  );
};

export default App;
