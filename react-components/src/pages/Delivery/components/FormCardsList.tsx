import React from 'react';
import styled from 'styled-components';
import { FormCard } from './FormCard';
import { DeliveryCard } from '../../../interfaces';

const FormCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type FormCardsListProps = {
  cardsList: DeliveryCard[];
};

export const FormCardsList = ({ cardsList }: FormCardsListProps) => {
  return (
    <FormCardWrapper>
      {cardsList.map((cardState) => (
        <FormCard key={Math.random()} data-testid="form-card" {...cardState} />
      ))}
    </FormCardWrapper>
  );
};
