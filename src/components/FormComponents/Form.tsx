import { ChangeEvent, useReducer, useState } from 'react';
import styled from 'styled-components';
import { DeliveryCard, UpdateFormState } from '../../types/types';
import { formReducer, FORM_INITIAL_STATE } from './formReducer';
import { LocationInputs } from './LocationInputs';
import { PersonalInfoInputs } from './PersonalInfoInputs';
import { PromotionCheckboxes } from './PromotionCheckboxes';
import DefaultUserImgURL from '../../assets/defaultUserImg.png';
import { SubmitBtn } from './SubmitBtn';

const FormWrapper = styled.form`
  padding: 32px;
  background-color: rgb(112, 204, 231);
  border-radius: 16px;
  margin-bottom: 32px;

  @media (max-width: 500px) {
    padding: 8px;
  }
`;

type FormProps = {
  onSubmitForm: (card: DeliveryCard) => void;
};

export const Form = ({ onSubmitForm }: FormProps) => {
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, FORM_INITIAL_STATE);

  const showInputsErrorMessage = () => {
    dispatchFormState({ type: 'VALIDATE_FULLNAME_INPUT' });
    dispatchFormState({ type: 'VALIDATE_BIRTHDAY_INPUT' });
    dispatchFormState({ type: 'VALIDATE_FILE_INPUT' });
    dispatchFormState({ type: 'VALIDATE_ZIPCODE_INPUT' });
    dispatchFormState({ type: 'VALIDATE_COUNTRY_SELECT' });
    dispatchFormState({ type: 'VALIDATE_CITY_SELECT' });
    dispatchFormState({ type: 'VALIDATE_CHECKBOX_PRIVACY' });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    showInputsErrorMessage();
    if (Object.values(formState).every((input) => input.isValid === true)) {
      const card: DeliveryCard = {
        fullName: formState.fullNameInput.value,
        birthday: new Date(formState.birthdayInput.value),
        srcImg: formState.fileInput.file
          ? URL.createObjectURL(formState.fileInput.file)
          : DefaultUserImgURL,
        gender: formState.genderInput.value,
        country: formState.selectCountry.value,
        city: formState.selectCity.value,
        zipCode: formState.zipCodeInput.value,
      };
      onSubmitForm(card);
      dispatchFormState({ type: 'RESET_INPUTS' });
    }
    setIsDisabledSubmitBtn(true);
  };

  const updateFormState = (state: UpdateFormState) => {
    switch (state.type) {
      case 'SET_FILE_INPUT':
        if (state.file) dispatchFormState({ type: state.type, file: state.file });
        break;
      case 'SET_CHECKBOX_PRIVACY':
        if (state.isChecked !== undefined)
          dispatchFormState({ type: state.type, isChecked: state.isChecked });
        break;
      case 'SET_CHECKBOX_PROMOTION':
        if (state.isChecked !== undefined)
          dispatchFormState({ type: state.type, isChecked: state.isChecked });
        break;
      default:
        if (state.value !== undefined) dispatchFormState({ type: state.type, value: state.value });
        break;
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} onChange={() => setIsDisabledSubmitBtn(false)}>
      <PersonalInfoInputs
        updateFormState={updateFormState}
        fullNameInputState={formState.fullNameInput}
        birthdayInputState={formState.birthdayInput}
        fileInputState={formState.fileInput}
        genderInputState={formState.genderInput}
      />
      <LocationInputs
        updateFormState={updateFormState}
        zipCodeInputState={formState.zipCodeInput}
        countrySelectState={formState.selectCountry}
        citySelectState={formState.selectCity}
      />
      <PromotionCheckboxes
        updateFormState={updateFormState}
        checkboxPrivacyState={formState.checkboxPrivacy}
        checkboxPromotionState={formState.checkboxPromotion}
      />
      <SubmitBtn isDisabled={isDisabledSubmitBtn}>Submit</SubmitBtn>
    </FormWrapper>
  );
};
