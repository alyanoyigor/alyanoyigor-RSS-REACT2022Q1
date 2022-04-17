import React, { RefObject } from 'react';
import styled from 'styled-components';
import { Checkbox } from './Checkbox';

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  margin-bottom: 32px;
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
      <Checkbox
        checkboxPrivacy={checkboxPrivacy}
        isValid={isValidCheckboxPrivacy}
        errorMessage={checkboxPrivacyErrorMessage}
        labelValue="I agree to privacy policy"
        testId="checkboxPrivacy"
      />
      <Checkbox isValid={true} labelValue="I wish to be notified of promotions" />
    </CheckboxWrapper>
  );
};
