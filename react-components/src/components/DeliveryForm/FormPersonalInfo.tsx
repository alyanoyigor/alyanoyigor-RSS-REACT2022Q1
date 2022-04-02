import React, { RefObject } from 'react';
import styled from 'styled-components';
import { StyledInput } from '../StyledInput';
import { FormBlock } from './FormBlock';
import { GenderInput } from './GenderInput';
import { InputControl } from './InputControl';

type FormProps = {
  birthdayInput: RefObject<HTMLInputElement>;
  birthdayInputErrorMessage: string;
  isValidInputBirthday: boolean;
  fullNameInput: RefObject<HTMLInputElement>;
  fullNameInputErrorMessage: string;
  isValidInputFullName: boolean;
  fileInput: RefObject<HTMLInputElement>;
  fileInputErrorMessage: string;
  isValidInputFile: boolean;
};

const FileInput = styled(StyledInput)`
  color: transparent !important;

  @media screen and (max-width: 768px) {
    color: #fff !important;
  }
`;

export class FormPersonalInfo extends React.Component<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    return (
      <FormBlock wrapContentWidth={910} title="Personal Info">
        <InputControl
          maxWidth={20}
          labelValue="Full Name"
          errorMessage={this.props.fullNameInputErrorMessage}
          isValid={this.props.isValidInputFullName}
        >
          <StyledInput type="text" placeholder="John Johnson" ref={this.props.fullNameInput} />
        </InputControl>
        <InputControl
          maxWidth={10.5}
          labelValue="Birthday date"
          errorMessage={this.props.birthdayInputErrorMessage}
          isValid={this.props.isValidInputBirthday}
        >
          <StyledInput type="date" ref={this.props.birthdayInput} />
        </InputControl>
        <InputControl
          maxWidth={8}
          labelValue="Profile picture"
          errorMessage={this.props.fileInputErrorMessage}
          isValid={this.props.isValidInputFile}
        >
          <FileInput type="file" ref={this.props.fileInput} />
        </InputControl>
        <GenderInput />
      </FormBlock>
    );
  }
}
