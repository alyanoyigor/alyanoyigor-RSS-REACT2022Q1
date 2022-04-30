import React from 'react';
import styled from 'styled-components';
import { BasicInputProps } from '../../types/types';
import { ErrorMessage } from './ErrorMessage';
import { InputTitle } from './InputTitle';
import { styledField } from './styledField';

type InputProps = BasicInputProps & {
  inputData: { labelValue: string; inputValue?: string; inputId?: string; placeholder?: string }[];
  inputType?: string;
  dataTestId?: string;
  inputTitle?: string;
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type NewInputProps = {
  isReverse: boolean;
  isInvalid: boolean;
};

const NewInput = styled.div`
  display: flex;
  flex-direction: ${(props: NewInputProps) => (props.isReverse ? 'row-reverse' : 'column')};
  justify-content: flex-end;
  align-items: ${(props: NewInputProps) => (props.isReverse ? 'center' : 'flex-start')};

  & label {
    font-weight: 500;
  }

  & input {
    ${styledField}
    border-color: ${(props: NewInputProps) => (props.isInvalid ? '#d40e00' : '#ccc')}
  }

  & input[type='radio'],
  & input[type='checkbox'] {
    width: auto;
  }
`;

export const Input = ({
  inputName,
  register,
  inputData,
  errors,
  inputType,
  inputTitle,
  dataTestId,
}: InputProps) => {
  const reverseInputTypes = ['radio', 'checkbox'];
  return (
    <InputWrapper>
      {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
      {inputData.map((input) => {
        const id = input.inputId ? input.inputId : inputName;
        return (
          <NewInput
            isInvalid={Boolean(errors[inputName])}
            isReverse={reverseInputTypes.find((item) => item === inputType) ? true : false}
            key={Math.random()}
          >
            <label htmlFor={id}>{input.labelValue}</label>
            <input
              type={inputType}
              data-testid={dataTestId}
              placeholder={input.placeholder}
              value={input.inputValue}
              id={id}
              {...register(inputName)}
            />
          </NewInput>
        );
      })}
      <ErrorMessage error={errors[inputName]} />
    </InputWrapper>
  );
};

Input.defaultProps = {
  inputType: 'text',
};
