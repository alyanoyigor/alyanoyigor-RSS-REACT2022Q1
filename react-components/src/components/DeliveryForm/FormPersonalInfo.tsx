import React, { RefObject } from 'react';
import { FormBlock } from './FormBlock';
import { GenderInput } from './GenderInput';
import { InputBirthday } from './InputBirthday';
import { InputFullName } from './InputFullName';
import { InputFileImage } from './InputFileImage';

type FormPersonalInfoProps = {
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

export const FormPersonalInfo = (props: FormPersonalInfoProps) => {
  return (
    <FormBlock wrapContentWidth={910} title="Personal Info">
      <InputFullName
        errorMessage={props.fullNameInputErrorMessage}
        isValid={props.isValidInputFullName}
        refInput={props.fullNameInput}
      />
      <InputBirthday
        errorMessage={props.birthdayInputErrorMessage}
        isValid={props.isValidInputBirthday}
        refInput={props.birthdayInput}
      />
      <InputFileImage
        errorMessage={props.fileInputErrorMessage}
        isValid={props.isValidInputFile}
        refInput={props.fileInput}
      />
      <GenderInput />
    </FormBlock>
  );
};
