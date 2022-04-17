import React, { RefObject } from 'react';
import { FormBlock } from './FormBlock';
import { GenderInput } from './GenderInput';
import { Input } from './Input';

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

export const FormPersonalInfo = (props: FormPersonalInfoProps) => {
  const {
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
  } = props;
  return (
    <FormBlock title="Personal Info">
      <Input
        labelText="Full Name"
        maxWidth={10}
        errorTestId="fullNameError"
        errorMessage={fullNameInputErrorMessage}
        isValid={isValidInputFullName}
        inputRef={fullNameInput}
        inputType="text"
        inputTestId="inputFullName"
        inputPlaceholder="John Johnson"
      />
      <Input
        labelText="Birthday date"
        maxWidth={10}
        errorTestId="dateError"
        errorMessage={birthdayInputErrorMessage}
        isValid={isValidInputBirthday}
        inputRef={birthdayInput}
        inputType="date"
        inputTestId="inputDate"
      />
      <Input
        labelText="Profile picture"
        maxWidth={8}
        errorTestId="fileError"
        errorMessage={fileInputErrorMessage}
        isValid={isValidInputFile}
        inputRef={fileInput}
        inputType="file"
        inputTestId="inputFile"
      />
      <GenderInput genderRadioInput={genderRadioInput} />
    </FormBlock>
  );
};
