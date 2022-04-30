import React from 'react';
import styled from 'styled-components';
import DefaultImg from '../assets/defaultPoster.jpg';
import { MOVIE_POSTER_URL } from '../urls/urls';

const PosterWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const Image = styled.img`
  width: 100%;

  @media screen and (max-width: 490px) {
    object-fit: cover;
    max-height: 320px;
    object-position: top;
  }
`;

const RatedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background: linear-gradient(to right bottom, #134b5f, #2596be, #66b6d2);
  position: absolute;
  bottom: -5%;
  right: 5%;
`;

const RatedText = styled.span`
  line-height: 100%;
  font-weight: 500;
  color: #fff;
`;

type Poster = {
  posterPath: string | null;
  voteAverage: number;
  title: string;
};

export const PosterImage = ({ posterPath, voteAverage, title }: Poster) => {
  let imgSrc = DefaultImg;
  if (posterPath) {
    imgSrc = MOVIE_POSTER_URL + posterPath;
  }
  return (
    <PosterWrapper>
      <Image data-testid="card-img" src={imgSrc} alt={title} />
      <RatedWrapper>
        <RatedText data-testid="card-rated-text">{voteAverage}</RatedText>
      </RatedWrapper>
    </PosterWrapper>
  );
};
