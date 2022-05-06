import React from 'react';
import { AppRouter } from './components/AppRouter';
import { Header } from './components/Header';
import { Main } from './components/Main';

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <AppRouter />
      </Main>
    </>
  );
};

export default App;
