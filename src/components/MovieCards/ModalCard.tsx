import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { MOVIE_API_KEY } from '../../config';
import { DetailedMovieData } from '../../types/types';
import { Preloader } from '../Preloader';
import { ModalOverlay } from './ModalOverlay';

const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const Backdrop = ({ onConfirm }: { onConfirm: () => void }) => (
  <BackdropStyled onClick={onConfirm} />
);

type ModalCardProps = {
  cardId: string;
  onConfirm: () => void;
};

export const ModalCard = ({ cardId, onConfirm }: ModalCardProps) => {
  const [movieData, setMovieData] = useState<DetailedMovieData | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const getDetailMovieData = async () => {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${cardId}?api_key=${MOVIE_API_KEY}`
      );
      return movies.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    getDetailMovieData().then((movieData) => {
      setMovieData(movieData);
      setIsFetching(false);
    });
  }, []);

  if (isFetching || !movieData) {
    return <Preloader />;
  }
  const modalOverlay = document.getElementById('modal-overlay-root');
  const backdrop = document.getElementById('backdrop-root');

  return (
    <React.Fragment>
      {backdrop && ReactDOM.createPortal(<Backdrop onConfirm={onConfirm} />, backdrop)}
      {modalOverlay &&
        ReactDOM.createPortal(
          <ModalOverlay movieData={movieData} onConfirm={onConfirm} />,
          modalOverlay
        )}
    </React.Fragment>
  );
};
