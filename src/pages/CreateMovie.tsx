import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form } from '../components/FormComponents/Form';
import { FormCard } from '../components/FormComponents/FormCard';
import { ListWrapper } from '../components/MovieCards/ListWrapper';
import AppContext from '../store/context';
import MakeMoviePoster from '../assets/makeMoviePoster.jpg';

const FormCardList = styled(ListWrapper)`
  margin-top: 32px;
`;

const MakeMovieImg = styled.img`
  max-width: 450px;
  transform: rotate(-15deg);
  z-index: -1;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export const CreateMovie = () => {
  const ctx = useContext(AppContext);
  return (
    <div>
      <FormWrapper>
        <MakeMovieImg src={MakeMoviePoster} alt="Make movie poster" />
        <Form context={ctx} />
      </FormWrapper>
      <FormCardList>
        {ctx.appState.formCards.map((card) => (
          <FormCard key={Math.random()} {...card} />
        ))}
      </FormCardList>
    </div>
  );
};
