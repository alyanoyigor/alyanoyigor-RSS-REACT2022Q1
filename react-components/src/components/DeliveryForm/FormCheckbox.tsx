import React from 'react';
import styled from 'styled-components';

type FormCheckboxProps = {
  labelValue: string;
  required: boolean;
};

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin: 0.5rem;
`;

export const FormCheckbox = ({ labelValue, required }: FormCheckboxProps) => {
  return (
    <CheckboxWrapper>
      <label>
        <Checkbox type="checkbox" required={required} />
        {labelValue}
      </label>
    </CheckboxWrapper>
  );
};
