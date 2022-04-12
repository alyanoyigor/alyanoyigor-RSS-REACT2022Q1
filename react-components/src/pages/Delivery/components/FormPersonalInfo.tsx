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
  genderRadioInput: RefObject<HTMLInputElement>;
};

export const FormPersonalInfo = ({
  fullNameInputErrorMessage,
  isValidInputFullName,
  fullNameInput,
  birthdayInputErrorMessage,
  isValidInputBirthday,
  birthdayInput,
  fileInputErrorMessage,
  isValidInputFile,
  fileInput,
  genderRadioInput,
}: FormPersonalInfoProps) => {
  return (
    <FormBlock wrapContentWidth={910} title="Personal Info">
      <InputFullName
        errorMessage={fullNameInputErrorMessage}
        isValid={isValidInputFullName}
        refInput={fullNameInput}
      />
      <InputBirthday
        errorMessage={birthdayInputErrorMessage}
        isValid={isValidInputBirthday}
        refInput={birthdayInput}
      />
      <InputFileImage
        errorMessage={fileInputErrorMessage}
        isValid={isValidInputFile}
        refInput={fileInput}
      />
      <GenderInput genderRadioInput={genderRadioInput} />
    </FormBlock>
  );
};
