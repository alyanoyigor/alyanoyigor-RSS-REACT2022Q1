import React from 'react';
import { InputState, UpdateFormState } from '../../types/types';
import { FormBlock } from './FormBlock';
import { GenderInput } from './GenderInput';
import { Input } from './Input';

type PersonalInfoInputsProps = {
  updateFormState: (state: UpdateFormState) => void;
  fullNameInputState: InputState;
  birthdayInputState: InputState;
  fileInputState: InputState;
  genderInputState: InputState;
};

export const PersonalInfoInputs = (props: PersonalInfoInputsProps) => {
  const { updateFormState, fullNameInputState, birthdayInputState, fileInputState } = props;

  return (
    <FormBlock title="Personal Info">
      <Input
        labelText="Full Name"
        errorTestId="fullNameError"
        handleInputChange={(e) =>
          updateFormState({ type: 'SET_FULLNAME_INPUT', value: e.target.value })
        }
        inputState={fullNameInputState}
        inputType="text"
        inputTestId="inputFullName"
        inputPlaceholder="John Johnson"
      />
      <Input
        labelText="Birthday date"
        errorTestId="dateError"
        handleInputChange={(e) =>
          updateFormState({ type: 'SET_BIRTHDAY_INPUT', value: e.target.value })
        }
        inputState={birthdayInputState}
        inputType="date"
        inputTestId="inputDate"
      />
      <Input
        labelText="Profile picture"
        errorTestId="fileError"
        handleInputChange={(e) => {
          if (e.target.files?.length)
            updateFormState({ type: 'SET_FILE_INPUT', file: e.target.files[0] });
        }}
        inputState={fileInputState}
        inputType="file"
        inputTestId="inputFile"
      />
      <GenderInput
        handleInputChange={(e) =>
          updateFormState({ type: 'SET_GENDER_INPUT', value: e.target.value })
        }
      />
    </FormBlock>
  );
};
