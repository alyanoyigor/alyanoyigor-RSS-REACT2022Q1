import React from 'react';
import { MOVIE_COMPANIES_URL, MOVIE_POSTER_BG_URL, MOVIE_POSTER_URL } from '../urls/urls';
import { convertDate, convertTime } from '../utils/utils';
import DefaultImg from '../assets/defaultPoster.jpg';
import styled from 'styled-components';
import { DetailedMovieData } from '../types/types';

const ImageWrapper = styled.div`
  max-width: 350px;
  min-width: 250px;
  & img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 16px;
  }

  @media (max-width: 768px) {
    min-width: 0px;
    width: 100%;
    height: 200px;
    & img {
      height: 100%;
      object-position: top;
      object-fit: cover;
    }
  }
`;

const Modal = styled.div`
  display: flex;
  gap: 48px;
  color: #fff;
  width: 100%;
  z-index: 100;
  background-size: cover;
  padding: 32px 16px 16px 16px;
  overflow: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.8) 100%),
    url(${(props: { bg: string | null }) => (props.bg ? MOVIE_POSTER_BG_URL + props.bg : null)});
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 16px;

  @media (max-width: 768px) {
    gap: 16px;
    align-content: flex-start;
    flex-wrap: wrap;
  }
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
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
  gap: 8px;
  & span {
    display: flex;
    align-items: center;
    padding: 4px;
    background-color: #fff;
    border-radius: 8px;
  }
  & span img {
    width: 64px;
  }
`;

const OverviewBlock = styled.div`
  & h2 {
    margin-bottom: 8px;
  }
  & p {
    margin-top: 0;
  }
`;

export const DetailedCard = ({ movieData }: { movieData: DetailedMovieData }) => {
  const convertedDate = movieData.release_date
    ? convertDate(movieData.release_date, { month: '2-digit' })
    : null;
  const date = convertedDate ? (
    <span data-testid="modal-card-date">
      {convertedDate.day}/{convertedDate.month}/{convertedDate.year}
    </span>
  ) : null;
  const posterPath = movieData.poster_path ? MOVIE_POSTER_URL + movieData.poster_path : DefaultImg;
  const movieGenres = movieData.genres.length ? (
    <span data-testid="modal-card-genres">
      {movieData.genres.map((genre) => genre.name).join(', ')}
    </span>
  ) : null;
  return (
    <Modal data-testid="modal-card" bg={movieData.backdrop_path}>
      <ImageWrapper>
        <img data-testid="modal-card-poster" src={posterPath} alt={movieData.title} />
      </ImageWrapper>
      <div>
        <div>
          <Title>
            {movieData.title} {convertedDate && <span>({convertedDate.year})</span>}
          </Title>
          <MovieDetails>
            {date}
            {movieGenres}
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
