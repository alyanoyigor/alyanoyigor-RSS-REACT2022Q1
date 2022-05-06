import React from 'react';
import styled from 'styled-components';
import { Form } from '../components/FormComponents/Form';
import { FormCard } from '../components/FormComponents/FormCard';
import { ListWrapper } from '../components/MovieCards/ListWrapper';
import MakeMoviePoster from '../assets/makeMoviePoster.jpg';
import { useSelector } from 'react-redux';
import { State } from '../types/types';

const FormCardList = styled(ListWrapper)`
  margin-top: 32px;
`;

const MakeMovieImg = styled.img`
  width: 35%;
  height: 35%;
  transform: rotate(-15deg);
  z-index: -1;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const CreateMovie = () => {
  const formCards = useSelector((state: { appState: State }) => state.appState.formCards);
  return (
    <div>
      <FormWrapper>
        <MakeMovieImg src={MakeMoviePoster} alt="Make movie poster" />
        <Form />
      </FormWrapper>
      <FormCardList>
        {formCards.map((card) => (
          <FormCard key={Math.random()} {...card} />
        ))}
      </FormCardList>
    </div>
  );
};
