import React from 'react';
import styled from 'styled-components';
import { GenreData } from '../../types/types';
import { CardTextSection } from './CardTextSection';
import { PosterImage } from '../PosterImage';

const CardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 256px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  box-shadow: 5px 5px 10px 5px rgba(15, 60, 76, 0.15);
  cursor: pointer;

  @media screen and (max-width: 880px) {
    max-width: 192px;
  }

  @media screen and (max-width: 488px) {
    max-width: 100%;
  }
`;

export type CardProps = {
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  vote_average: number;
  genres: GenreData[];
  className: string;
  cardId: number;
};

export class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <CardWrapper
        className={this.props.className}
        data-cardid={this.props.cardId}
        data-testid="card-item"
      >
        <PosterImage
          poster_path={this.props.poster_path}
          title={this.props.title}
          vote_average={this.props.vote_average}
        />
        <CardTextSection
          popularity={this.props.popularity}
          title={this.props.title}
          genres={this.props.genres}
          release_date={this.props.release_date}
        />
      </CardWrapper>
    );
  }
}
