import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { DeliveryForm } from '../pages/DeliveryForm';
import { NotFound } from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us/*" element={<About />} />
      <Route path="/delivery-form/*" element={<DeliveryForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
