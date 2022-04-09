import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Delivery } from '../pages/Delivery';
import { NotFound } from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us/*" element={<About />} />
      <Route path="/delivery-form/*" element={<Delivery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
