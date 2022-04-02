import React, { RefObject } from 'react';
import styled from 'styled-components';
import { FormCheckbox } from './FormCheckbox';

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-bottom: 2rem;
`;

type FormPromotionsProps = {
  checkboxPrivacy: RefObject<HTMLInputElement>;
  isValidCheckboxPrivacy: boolean;
  checkboxPrivacyErrorMessage: string;
};

export const FormPromotions = ({
  checkboxPrivacy,
  isValidCheckboxPrivacy,
  checkboxPrivacyErrorMessage,
}: FormPromotionsProps) => {
  return (
    <CheckboxWrapper>
      <FormCheckbox
        checkboxPrivacy={checkboxPrivacy}
        isValid={isValidCheckboxPrivacy}
        errorMessage={checkboxPrivacyErrorMessage}
        labelValue="I agree to privacy policy"
      />
      <FormCheckbox isValid={true} labelValue="I wish to be notified of promotions" />
    </CheckboxWrapper>
  );
};
