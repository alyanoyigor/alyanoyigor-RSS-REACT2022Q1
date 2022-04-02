import React from 'react';
import styled from 'styled-components';
import { FormCheckbox } from './FormCheckbox';

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-bottom: 2rem;
`;

export const FormPromotions = () => {
  return (
    <CheckboxWrapper>
      <FormCheckbox labelValue="I agree to privacy policy" required={true} />
      <FormCheckbox labelValue="I wish to be notified of promotions" required={false} />
    </CheckboxWrapper>
  );
};
