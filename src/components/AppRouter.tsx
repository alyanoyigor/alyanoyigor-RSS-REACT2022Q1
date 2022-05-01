import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { CreateMovie } from '../pages/CreateMovie';
import { NotFound } from '../pages/NotFound';
import { MovieCard } from '../pages/MovieCard';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/*" element={<About />} />
      <Route path="/create-movie/*" element={<CreateMovie />} />
      <Route path="/movie/:id" element={<MovieCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
