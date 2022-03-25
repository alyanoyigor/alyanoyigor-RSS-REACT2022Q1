import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us/*" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
