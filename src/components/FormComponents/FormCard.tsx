import styled from 'styled-components';
import { FormCardData } from '../../types/types';
import { CardWrapper } from '../MovieCards/CardWrapper';
import DefaultPoster from '../../assets/defaultPoster.jpg';
import { convertDate } from '../../utils/utils';

const Poster = styled.img`
  height: 300px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const DateText = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
`;

const Container = styled.div`
  padding: 16px;
`;

const StyledText = styled.p`
  margin-bottom: 2px;
  margin-top: 4px;
  margin-right: 4px;
  &:not(:last-child) {
    margin-top: 8px;
  }
  font-size: 14px;
  display: inline-block;
  padding: 4px;
  border-radius: 4px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #b4b4b4;
`;

export const FormCard = ({ title, poster, releaseDate, budget, country, city }: FormCardData) => {
  const src = poster[0] ? URL.createObjectURL(poster[0]) : DefaultPoster;
  const date = convertDate(releaseDate, { month: 'short' });
  return (
    <CardWrapper>
      <Poster src={src} />
      <Container>
        <Title>{title}</Title>
        <DateText>
          {date.month} {date.day}, {date.year}
        </DateText>
        <StyledText>💲{budget}</StyledText>
        <StyledText>📍{country}</StyledText>
        <StyledText>🏙️{city}</StyledText>
      </Container>
    </CardWrapper>
  );
};
