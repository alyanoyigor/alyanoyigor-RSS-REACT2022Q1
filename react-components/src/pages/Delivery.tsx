import React, { ChangeEvent, RefObject } from 'react';
import { FormLocation } from '../components/DeliveryForm/FormLocation';
import { FormPersonalInfo } from '../components/DeliveryForm/FormPersonalInfo';
import { FormPromotions } from '../components/DeliveryForm/FormPromotions';
import { SubmitBtn } from '../components/DeliveryForm/SubmitBtn';
import { DeliveryCard } from '../interfaces';
import ReactIcon from '../assets/logo192.png';
import styled from 'styled-components';
import { FormCardsList } from '../components/DeliveryForm/FormCardsList';

const Form = styled.form`
  padding: 2rem;
  background-color: rgb(112, 204, 231);
  border-radius: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 500px) {
    padding: 0.5rem;
  }
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
  isDisabledSubmitBtn: boolean;
  cardsState: DeliveryCard[];
  validityInputs: ValidityInput;
  errorMessages: ErrorMessageInput;
};

const INITIAL_STATE: FormState = {
  isDisabledSubmitBtn: true,
  cardsState: [],
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

export class Delivery extends React.Component<Record<string, unknown>, FormState> {
  form: RefObject<HTMLFormElement>;
  fullNameInput: RefObject<HTMLInputElement>;
  birthdayInput: RefObject<HTMLInputElement>;
  fileInput: RefObject<HTMLInputElement>;
  countrySelect: RefObject<HTMLSelectElement>;
  citySelect: RefObject<HTMLSelectElement>;
  zipCodeInput: RefObject<HTMLInputElement>;
  checkboxPrivacy: RefObject<HTMLInputElement>;
  genderRadioInput: RefObject<HTMLInputElement>;

  constructor(props: Record<string, unknown>) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.form = React.createRef();
    this.fullNameInput = React.createRef();
    this.birthdayInput = React.createRef();
    this.fileInput = React.createRef();
    this.countrySelect = React.createRef();
    this.citySelect = React.createRef();
    this.zipCodeInput = React.createRef();
    this.checkboxPrivacy = React.createRef();
    this.genderRadioInput = React.createRef();

    this.state = { ...INITIAL_STATE };
  }

  async handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      await this.validateAllInputs();
      if (!Object.values(this.state.validityInputs).every(Boolean)) {
        this.setState((prevState) => ({ ...prevState, isDisabledSubmitBtn: true }));
        return;
      }
      await this.addCardToState();
      this.resetInputValues();
    } catch (e) {
      console.log(e);
    }
  }

  resetInputValues() {
    this.form.current?.reset();
    this.setState((prevState) => ({ ...INITIAL_STATE, cardsState: prevState.cardsState }));
  }

  async addCardToState() {
    this.setState((prevState: FormState) => {
      if (
        this.fullNameInput.current &&
        this.birthdayInput.current &&
        this.genderRadioInput.current &&
        this.countrySelect.current &&
        this.citySelect.current &&
        this.zipCodeInput.current
      ) {
        const cardState: DeliveryCard = {
          fullName: this.fullNameInput.current.value,
          birthday: new Date(this.birthdayInput.current.value),
          srcImg: this.fileInput.current?.files?.length
            ? URL.createObjectURL(this.fileInput.current.files[0])
            : ReactIcon,
          gender: this.genderRadioInput.current.value,
          country: this.countrySelect.current.value,
          city: this.citySelect.current.value,
          zipCode: this.zipCodeInput.current?.value,
        };
        return { ...prevState, cardsState: [cardState, ...prevState.cardsState] };
      }
    });
  }

  async validateAllInputs() {
    try {
      await this.validateBirthdayInput();
      await this.validateFullNameInput();
      await this.validateFileInput();
      await this.validateSelectElements();
      await this.validateZipCodeInput();
      await this.validateCheckboxPrivacy();
    } catch (e) {
      console.log(e);
    }
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
    const fullNameInput = this.fullNameInput.current?.value;
    const isValidLength = /^.{1,20}$/.test(fullNameInput ? fullNameInput : '');
    const isValidLetters = /^[a-zA-Z]+$/.test(fullNameInput ? fullNameInput.replace(/ /g, '') : '');
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
    const acceptExts = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
    if (fileInput && fileInput[0] && !acceptExts.some((ext) => ext === fileInput[0].type)) {
      this.setNewValueToState(
        'isValidFileInput',
        'fileInputErrorMessage',
        false,
        'Image must be in png, jpeg or gif format'
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

  onChangeForm() {
    this.setState((prevState) => ({ ...prevState, isDisabledSubmitBtn: false }));
  }

  render() {
    return (
      <div>
        <h1>Delivery Form</h1>
        <Form onSubmit={this.handleSubmit} onChange={this.onChangeForm} ref={this.form}>
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
            genderRadioInput={this.genderRadioInput}
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
          <SubmitBtn isDisabled={this.state.isDisabledSubmitBtn}>
            Submit{' '}
            {!this.state.isDisabledSubmitBtn &&
            Object.values(this.state.validityInputs).every(Boolean)
              ? '✔️'
              : '❌'}
          </SubmitBtn>
        </Form>
        <FormCardsList cardsList={this.state.cardsState} />
      </div>
    );
  }
}
