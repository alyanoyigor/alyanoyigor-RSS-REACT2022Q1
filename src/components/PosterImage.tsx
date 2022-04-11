import React from 'react';
import styled from 'styled-components';
import DefaultImg from '../assets/oops-404.jpg';
import { MOVIE_POSTER_URL } from '../urls';

const PosterWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const Image = styled.img`
  max-width: 16rem;
  width: 100%;

  @media screen and (max-width: 880px) {
    max-width: 12rem;
  }

  @media screen and (max-width: 488px) {
    object-fit: cover;
    height: 20rem;
    max-width: 100%;
    object-position: top;
  }
`;

const RatedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
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
  poster_path: string | null;
  vote_average: number;
  title: string;
};

export const PosterImage = ({ poster_path, vote_average, title }: Poster) => {
  let imgSrc = DefaultImg;
  if (poster_path) {
    imgSrc = MOVIE_POSTER_URL + poster_path;
  }
  return (
    <PosterWrapper>
      <Image src={imgSrc} alt={title} />
      <RatedWrapper>
        <RatedText>{vote_average}</RatedText>
      </RatedWrapper>
    </PosterWrapper>
  );
};
