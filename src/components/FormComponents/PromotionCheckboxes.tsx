import React from 'react';
import styled from 'styled-components';
import { CheckboxState, UpdateFormState } from '../../types/types';
import { Checkbox } from './Checkbox';

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  margin-bottom: 32px;
`;

type FormPromotionsProps = {
  updateFormState: (state: UpdateFormState) => void;
  checkboxPrivacyState: CheckboxState;
  checkboxPromotionState: CheckboxState;
};

export const PromotionCheckboxes = ({
  updateFormState,
  checkboxPrivacyState,
  checkboxPromotionState,
}: FormPromotionsProps) => {
  return (
    <CheckboxWrapper>
      <Checkbox
        handleChange={(e) => {
          updateFormState({ type: 'SET_CHECKBOX_PRIVACY', isChecked: e.target.checked });
        }}
        checkboxState={checkboxPrivacyState}
        labelValue="I agree to privacy policy"
        testId="checkboxPrivacy"
      />
      <Checkbox
        handleChange={(e) =>
          updateFormState({ type: 'SET_CHECKBOX_PROMOTION', isChecked: e.target.checked })
        }
        checkboxState={checkboxPromotionState}
        labelValue="I wish to be notified of promotions"
      />
    </CheckboxWrapper>
  );
};
