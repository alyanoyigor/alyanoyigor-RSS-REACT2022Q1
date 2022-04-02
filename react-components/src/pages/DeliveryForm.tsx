import React, { ChangeEvent, RefObject } from 'react';
import styled from 'styled-components';
import { FormLocation } from '../components/DeliveryForm/FormLocation';
import { FormPersonalInfo } from '../components/DeliveryForm/FormPersonalInfo';
import { FormPromotions } from '../components/DeliveryForm/FormPromotions';
import { SubmitBtn } from '../components/DeliveryForm/SubmitBtn';

const Form = styled.form`
  padding: 2rem;
  background-color: rgb(112, 204, 231);
  border-radius: 1rem;
`;

type ValidityInput = {
  isValidBirthdayInput: boolean;
  isValidFullNameInput: boolean;
  isValidFileInput: boolean;
  isValidCountrySelect: boolean;
  isValidCitySelect: boolean;
  isValidInputZipCode: boolean;
  isValidCheckboxPrivacy: boolean;
};

type ErrorMessageInput = {
  birthdayInputErrorMessage: string;
  fullNameInputErrorMessage: string;
  fileInputErrorMessage: string;
  countrySelectErrorMessage: string;
  citySelectErrorMessage: string;
  zipCodeInputErrorMessage: string;
  checkboxPrivacyErrorMessage: string;
};

type FormState = {
  validityInputs: ValidityInput;
  errorMessages: ErrorMessageInput;
};

export class DeliveryForm extends React.Component<Record<string, unknown>, FormState> {
  form: RefObject<HTMLFormElement>;
  fullNameInput: RefObject<HTMLInputElement>;
  birthdayInput: RefObject<HTMLInputElement>;
  fileInput: RefObject<HTMLInputElement>;
  countrySelect: RefObject<HTMLSelectElement>;
  citySelect: RefObject<HTMLSelectElement>;
  zipCodeInput: RefObject<HTMLInputElement>;
  checkboxPrivacy: RefObject<HTMLInputElement>;

  constructor(props: Record<string, unknown>) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
    this.fullNameInput = React.createRef();
    this.birthdayInput = React.createRef();
    this.fileInput = React.createRef();
    this.countrySelect = React.createRef();
    this.citySelect = React.createRef();
    this.zipCodeInput = React.createRef();
    this.checkboxPrivacy = React.createRef();

    this.state = {
      validityInputs: {
        isValidBirthdayInput: true,
        isValidFullNameInput: true,
        isValidFileInput: true,
        isValidCountrySelect: true,
        isValidCitySelect: true,
        isValidInputZipCode: true,
        isValidCheckboxPrivacy: true,
      },
      errorMessages: {
        birthdayInputErrorMessage: '',
        fullNameInputErrorMessage: '',
        fileInputErrorMessage: '',
        countrySelectErrorMessage: '',
        citySelectErrorMessage: '',
        zipCodeInputErrorMessage: '',
        checkboxPrivacyErrorMessage: '',
      },
    };
  }

  async handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    await this.validateBirthdayInput();
    await this.validateFullNameInput();
    await this.validateFileInput();
    await this.validateSelectElements();
    await this.validateZipCodeInput();
    await this.validateCheckboxPrivacy();
    if (!Object.values(this.state.validityInputs).every(Boolean)) {
      return;
    }
    alert('Все четко!');
  }

  async validateBirthdayInput() {
    const inputBirthdayValue = this.birthdayInput.current?.value;
    if (inputBirthdayValue?.length === 0) {
      this.setNewValueToState(
        'isValidBirthdayInput',
        'birthdayInputErrorMessage',
        false,
        'This field is required'
      );
      return;
    }
    if (this.calculateAge(inputBirthdayValue) < 18) {
      this.setNewValueToState(
        'isValidBirthdayInput',
        'birthdayInputErrorMessage',
        false,
        'Sorry, but you must be over 18 years old'
      );
      return;
    }

    this.setNewValueToState('isValidBirthdayInput', 'birthdayInputErrorMessage', true, '');
  }

  async validateFullNameInput() {
    const fullNameInput = this.fullNameInput.current;
    const isValidLength = /^.{1,20}$/.test(fullNameInput ? fullNameInput.value : '');
    const isValidLetters = /^[a-zA-Z]+$/.test(fullNameInput ? fullNameInput.value : '');
    if (!isValidLength) {
      this.setNewValueToState(
        'isValidFullNameInput',
        'fullNameInputErrorMessage',
        false,
        'Full name must be from 1 to 20 symbols'
      );
      return;
    }
    if (!isValidLetters) {
      this.setNewValueToState(
        'isValidFullNameInput',
        'fullNameInputErrorMessage',
        false,
        'Full name must contain only alphabet English letters'
      );
      return;
    }
    this.setNewValueToState('isValidFullNameInput', 'fullNameInputErrorMessage', true, '');
  }

  async validateFileInput() {
    const fileInput = this.fileInput.current?.files;
    if (fileInput && fileInput[0] && fileInput[0].type !== 'image/jpeg') {
      this.setNewValueToState(
        'isValidFileInput',
        'fileInputErrorMessage',
        false,
        'Image must be png or jpeg format'
      );
      return;
    }

    this.setNewValueToState('isValidFileInput', 'fileInputErrorMessage', true, '');
  }

  async validateSelectElements() {
    const countrySelect = this.countrySelect.current?.value;
    const citySelect = this.citySelect.current?.value;

    if (countrySelect?.length === 0) {
      this.setNewValueToState(
        'isValidCountrySelect',
        'countrySelectErrorMessage',
        false,
        'This field is required'
      );
      return;
    }
    this.setNewValueToState('isValidCountrySelect', 'countrySelectErrorMessage', true, '');

    if (citySelect?.length === 0) {
      this.setNewValueToState(
        'isValidCitySelect',
        'citySelectErrorMessage',
        false,
        'This field is required'
      );
      return;
    }
    this.setNewValueToState('isValidCitySelect', 'citySelectErrorMessage', true, '');
  }

  async validateZipCodeInput() {
    const zipCodeInput = this.zipCodeInput.current?.value;
    const isValidLength = /\b\d{5}\b/g.test(zipCodeInput ? zipCodeInput : '');

    if (zipCodeInput?.length === 0) {
      this.setNewValueToState(
        'isValidInputZipCode',
        'zipCodeInputErrorMessage',
        false,
        'This field is required'
      );
      return;
    }

    if (zipCodeInput && zipCodeInput[0] === '-') {
      this.setNewValueToState(
        'isValidInputZipCode',
        'zipCodeInputErrorMessage',
        false,
        "Number can't be negative"
      );
      return;
    }

    if (!isValidLength) {
      this.setNewValueToState(
        'isValidInputZipCode',
        'zipCodeInputErrorMessage',
        false,
        'Number must be 5 digits'
      );
      return;
    }
    this.setNewValueToState('isValidInputZipCode', 'zipCodeInputErrorMessage', true, '');
  }

  async validateCheckboxPrivacy() {
    const checkboxPrivacy = this.checkboxPrivacy.current?.checked;
    console.log(checkboxPrivacy);
    if (!checkboxPrivacy) {
      this.setNewValueToState(
        'isValidCheckboxPrivacy',
        'checkboxPrivacyErrorMessage',
        false,
        'This field is required'
      );
      return;
    }
    this.setNewValueToState('isValidCheckboxPrivacy', 'checkboxPrivacyErrorMessage', true, '');
  }

  setNewValueToState(
    validity: keyof ValidityInput,
    errorMessage: keyof ErrorMessageInput,
    isValid: boolean,
    errorMessageValue: string
  ) {
    this.setState((prevState) => {
      const validityInputs = Object.assign(prevState.validityInputs);
      validityInputs[validity] = isValid;
      const errorMessages = Object.assign(prevState.errorMessages);
      errorMessages[errorMessage] = errorMessageValue;
      return {
        ...prevState,
        validityInputs,
        errorMessages,
      };
    });
  }

  calculateAge(birthday: string | undefined) {
    if (birthday) {
      const ageDifMs = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return 0;
  }

  render() {
    return (
      <div>
        <h1>Delivery Form</h1>
        <Form onSubmit={this.handleSubmit} ref={this.form}>
          <FormPersonalInfo
            birthdayInput={this.birthdayInput}
            birthdayInputErrorMessage={this.state.errorMessages.birthdayInputErrorMessage}
            isValidInputBirthday={this.state.validityInputs.isValidBirthdayInput}
            fullNameInput={this.fullNameInput}
            fullNameInputErrorMessage={this.state.errorMessages.fullNameInputErrorMessage}
            isValidInputFullName={this.state.validityInputs.isValidFullNameInput}
            fileInput={this.fileInput}
            fileInputErrorMessage={this.state.errorMessages.fileInputErrorMessage}
            isValidInputFile={this.state.validityInputs.isValidFileInput}
          />
          <FormLocation
            countrySelect={this.countrySelect}
            countrySelectErrorMessage={this.state.errorMessages.countrySelectErrorMessage}
            isValidCountrySelect={this.state.validityInputs.isValidCountrySelect}
            citySelect={this.citySelect}
            citySelectErrorMessage={this.state.errorMessages.citySelectErrorMessage}
            isValidCitySelect={this.state.validityInputs.isValidCitySelect}
            zipCodeInput={this.zipCodeInput}
            zipCodeInputErrorMessage={this.state.errorMessages.zipCodeInputErrorMessage}
            isValidInputZipCode={this.state.validityInputs.isValidInputZipCode}
          />
          <FormPromotions
            checkboxPrivacy={this.checkboxPrivacy}
            isValidCheckboxPrivacy={this.state.validityInputs.isValidCheckboxPrivacy}
            checkboxPrivacyErrorMessage={this.state.errorMessages.checkboxPrivacyErrorMessage}
          />
          <SubmitBtn>Submit</SubmitBtn>
        </Form>
      </div>
    );
  }
}
