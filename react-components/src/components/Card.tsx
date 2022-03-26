import React from 'react';
import styled from 'styled-components';
import { ReactComponent as EyeIcon } from '../assets/svg/eye.svg';
import { ReactComponent as LikeIcon } from '../assets/svg/like.svg';
import { ReactComponent as BookmarkIcon } from '../assets/svg/bookmark.svg';
import { CardProps } from '../interfaces';
import { convertLongNum } from '../utils';

const MOVIE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 16rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const MovieImage = styled.img`
  max-width: 16rem;
  width: 100%;
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

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const CarDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.8);
`;

const CardTextWrapper = styled.div`
  padding: 1rem;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  & span {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.8rem;
  }
`;

const GenreWrapper = styled.span`
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #2596be, #66b6d2, #fff);
  border-image-slice: 1;
  padding: 0.2rem;
  text-transform: uppercase;
  border-radius: 10px;
  font-size: 0.6rem;
  color: #134b5f;
`;

const Genres = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

const Genre: React.FC<Record<string, unknown>> = ({ children }) => {
  return <GenreWrapper>{children}</GenreWrapper>;
};

const CustomButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Card = (props: CardProps) => {
  const month = new Date(props.release_date).toLocaleString('en-US', { month: 'long' }).slice(0, 3);
  const day = new Date(props.release_date).toLocaleString('en-US', { day: '2-digit' });
  const year = new Date(props.release_date).getFullYear();

  return (
    <CardWrapper>
      <ImageWrapper>
        <MovieImage src={MOVIE_IMAGE_URL + props.poster_path} alt={props.title} />
        <RatedWrapper>
          <RatedText>{props.vote_average}</RatedText>
        </RatedWrapper>
      </ImageWrapper>
      <CardTextWrapper>
        <CardTitle>{props.title}</CardTitle>
        <CarDate>
          {month} {day}, {year}
        </CarDate>
        <Genres>
          {props.genres.map((genre) => (
            <Genre key={genre.id}>{genre.name}</Genre>
          ))}
        </Genres>
        <ButtonsWrapper>
          <div>
            <CustomButton>
              <LikeIcon fill="#c71306" width="1.2rem" height="1.2rem" />
            </CustomButton>
            <CustomButton>
              <BookmarkIcon fill="#134b5f" width="1.25rem" height="1.25rem" />
            </CustomButton>
          </div>
          <ViewContainer>
            <EyeIcon fill="rgba(0, 0, 0, 0.4)" width="1rem" height="1rem" />
            <span>{convertLongNum(props.popularity)}</span>
          </ViewContainer>
        </ButtonsWrapper>
      </CardTextWrapper>
    </CardWrapper>
  );
};
