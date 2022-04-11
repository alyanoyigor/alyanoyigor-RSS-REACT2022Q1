import React from 'react';
import { MOVIE_COMPANIES_URL, MOVIE_POSTER_BG_URL, MOVIE_POSTER_URL } from '../../urls';
import { convertDate, convertTime } from '../../utils';
import DefaultImg from '../../assets/oops-404.jpg';
import styled from 'styled-components';
import { CloseBtn } from '../CloseBtn';
import { DetailedMovieData } from '../../interfaces';

const ImageWrapper = styled.div`
  max-width: 350px;
  min-width: 250px;
  & img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    min-width: 0px;
    width: 100%;
    height: 150px;
    & img {
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  gap: 3rem;
  color: #fff;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  max-width: 1170px;
  width: 80%;
  z-index: 100;
  background-size: cover;
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.8) 100%),
    url(${(props: { bg: string | null }) => (props.bg ? MOVIE_POSTER_BG_URL + props.bg : null)});
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 1rem;

  @media (max-width: 768px) {
    height: 80%;
    gap: 1rem;
    align-content: center;
    flex-wrap: wrap;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    right: 0;
    bottom: 0;
  }
`;

const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  & span {
    font-weight: 400;
    font-size: 0.9em;
    color: #c4c4c4;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-wrap: wrap;

  & span + span {
    padding-left: 20px;
    position: relative;
    top: 0;
    left: 0;
  }

  & span + span::before {
    content: '•';
    width: 100%;
    font-size: 1.1em;
    height: 100%;
    position: absolute;
    top: 0;
    left: 7px;
    display: inline-flex;
    align-content: center;
    align-items: center;
    z-index: -1;
  }
`;

const ProductionCompanies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  & span {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    background-color: #fff;
    border-radius: 0.5rem;
  }
  & span img {
    width: 64px;
  }
`;

const OverviewBlock = styled.div`
  & h2 {
    margin-bottom: 0.5rem;
  }
  & p {
    margin-top: 0;
  }
`;

type ModalOverlayProps = {
  movieData: DetailedMovieData;
  onConfirm: () => void;
};

export const ModalOverlay = ({ movieData, onConfirm }: ModalOverlayProps) => {
  const convertedDate = convertDate(movieData.release_date, { month: '2-digit' });
  const posterPath = movieData.poster_path ? MOVIE_POSTER_URL + movieData.poster_path : DefaultImg;
  const movieGenres = movieData.genres.length
    ? movieData.genres.map((genre) => genre.name).join(', ')
    : null;
  return (
    <Modal bg={movieData.backdrop_path}>
      <CloseBtn onClick={onConfirm} />
      <ImageWrapper>
        <img src={posterPath} alt={movieData.title} />
      </ImageWrapper>
      <div>
        <div>
          <Title>
            {movieData.title} <span>({convertedDate.year})</span>
          </Title>
          <MovieDetails>
            <span>
              {convertedDate.day}/{convertedDate.month}/{convertedDate.year}
            </span>
            <span>{movieGenres}</span>
            <span>{convertTime(movieData.runtime)}</span>
          </MovieDetails>
        </div>
        <OverviewBlock>
          <h2>Overview</h2>
          <p>{movieData.overview}</p>
        </OverviewBlock>
        <ProductionCompanies>
          {movieData.production_companies.map((company) =>
            company.logo_path ? (
              <span key={company.id}>
                <img src={MOVIE_COMPANIES_URL + company.logo_path} alt={company.name} />
              </span>
            ) : null
          )}
        </ProductionCompanies>
      </div>
    </Modal>
  );
};
