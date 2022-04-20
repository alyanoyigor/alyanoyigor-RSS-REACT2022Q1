type DefaultReducerState = {
  error: string;
  isValid: boolean;
};

type InputReducerState = {
  value: string;
} & DefaultReducerState;

type CheckboxReducerState = {
  isChecked: boolean;
} & DefaultReducerState;

type FileInputReducerState = {
  file: Blob | null;
} & DefaultReducerState;

type FormReducerState = {
  fullNameInput: InputReducerState;
  birthdayInput: InputReducerState;
  zipCodeInput: InputReducerState;
  selectCountry: InputReducerState;
  selectCity: InputReducerState;
  genderInput: InputReducerState;
  checkboxPrivacy: CheckboxReducerState;
  checkboxPromotion: CheckboxReducerState;
  fileInput: FileInputReducerState;
};

type FormReducerAction =
  | { type: 'RESET_INPUTS' }
  | { type: 'VALIDATE_FULLNAME_INPUT' }
  | { type: 'VALIDATE_BIRTHDAY_INPUT' }
  | { type: 'VALIDATE_FILE_INPUT' }
  | { type: 'VALIDATE_ZIPCODE_INPUT' }
  | { type: 'VALIDATE_COUNTRY_SELECT' }
  | { type: 'VALIDATE_CITY_SELECT' }
  | { type: 'VALIDATE_CHECKBOX_PRIVACY' }
  | { type: 'SET_FULLNAME_INPUT'; value: string }
  | { type: 'SET_BIRTHDAY_INPUT'; value: string }
  | { type: 'SET_ZIPCODE_INPUT'; value: string }
  | { type: 'SET_COUNTRY_SELECT'; value: string }
  | { type: 'SET_CHECKBOX_PRIVACY'; isChecked: boolean }
  | { type: 'SET_CHECKBOX_PROMOTION'; isChecked: boolean }
  | { type: 'SET_CITY_SELECT'; value: string }
  | { type: 'SET_GENDER_INPUT'; value: string }
  | { type: 'SET_FILE_INPUT'; file: File };

export const FORM_INITIAL_STATE = {
  fullNameInput: { value: '', error: '', isValid: false },
  birthdayInput: { value: '', error: '', isValid: false },
  zipCodeInput: { value: '', error: '', isValid: false },
  selectCountry: { value: '', error: '', isValid: false },
  selectCity: { value: '', error: '', isValid: false },
  fileInput: { file: null, error: '', isValid: true },
  checkboxPrivacy: { isChecked: false, error: '', isValid: false },
  checkboxPromotion: { isChecked: false, error: '', isValid: true },
  genderInput: { value: 'male', error: '', isValid: true },
};

export const formReducer = (
  state: FormReducerState,
  action: FormReducerAction
): FormReducerState => {
  let errorState = { isValid: true, error: '' };
  switch (action.type) {
    case 'SET_FULLNAME_INPUT':
      if (action.value.length < 3 || action.value.length > 20) {
        errorState.isValid = false;
      }
      if (!/^[A-Za-z&А-Яа-я ]*$/.test(action.value)) {
        errorState.isValid = false;
      }
      return {
        ...state,
        fullNameInput: { ...errorState, value: action.value },
      };
    case 'SET_GENDER_INPUT':
      return { ...state, genderInput: { ...errorState, value: action.value } };
    case 'SET_BIRTHDAY_INPUT':
      if (!action.value) {
        errorState = { isValid: false, error: 'This field is required' };
      }
      const ageDifms = Date.now() - new Date(action.value).getTime();
      const age = new Date(ageDifms);
      const calculateAge = Math.abs(age.getUTCFullYear() - 1970);
      if (calculateAge < 18) {
        errorState.isValid = false;
      }
      if (calculateAge > 70) {
        errorState.isValid = false;
      }
      return {
        ...state,
        birthdayInput: { ...errorState, value: action.value },
      };
    case 'SET_FILE_INPUT':
      const acceptExtensions = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
      if (!action.file) {
        return {
          ...state,
          fileInput: { ...errorState, file: action.file },
        };
      }
      if (!acceptExtensions.some((ext) => action.file && ext === action.file.type)) {
        errorState = { isValid: false, error: 'Image must be in png, jpeg or gif format' };
      }
      return {
        ...state,
        fileInput: { ...errorState, file: action.file },
      };
    case 'SET_ZIPCODE_INPUT':
      if (!/\b\d{5}\b/g.test(action.value)) {
        errorState.isValid = false;
      }
      if (action.value[0] === '-') {
        errorState.isValid = false;
      }
      return {
        ...state,
        zipCodeInput: { ...errorState, value: action.value },
      };
    case 'SET_COUNTRY_SELECT':
      if (!action.value) {
        errorState.isValid = false;
      }
      return {
        ...state,
        selectCountry: { ...errorState, value: action.value },
      };
    case 'SET_CITY_SELECT':
      if (!action.value) {
        errorState.isValid = false;
      }
      return {
        ...state,
        selectCity: { ...errorState, value: action.value },
      };
    case 'SET_CHECKBOX_PRIVACY':
      if (!action.isChecked) {
        errorState.isValid = false;
      }
      return {
        ...state,
        checkboxPrivacy: { ...errorState, isChecked: action.isChecked },
      };
    case 'SET_CHECKBOX_PROMOTION':
      return {
        ...state,
        checkboxPromotion: { ...errorState, isChecked: action.isChecked },
      };

    case 'VALIDATE_COUNTRY_SELECT':
      if (!state.selectCountry.value) {
        errorState = { isValid: false, error: 'This field is required' };
      }
      return {
        ...state,
        selectCountry: { ...errorState, value: state.selectCountry.value },
      };

    case 'VALIDATE_CITY_SELECT':
      if (!state.selectCity.value) {
        errorState = { isValid: false, error: 'This field is required' };
      }
      return {
        ...state,
        selectCity: { ...errorState, value: state.selectCity.value },
      };

    case 'VALIDATE_CHECKBOX_PRIVACY':
      if (!state.checkboxPrivacy.isChecked) {
        errorState = { isValid: false, error: 'This field is required' };
      }
      return {
        ...state,
        checkboxPrivacy: {
          ...errorState,
          isChecked: state.checkboxPrivacy.isChecked,
        },
      };

    case 'VALIDATE_FULLNAME_INPUT':
      const fullNameInputValue = state.fullNameInput.value;
      if (fullNameInputValue.length < 3 || fullNameInputValue.length > 20) {
        errorState = { isValid: false, error: 'This field must be from 3 to 20 letters' };
      }
      if (!/^[A-Za-z&А-Яа-я ]*$/.test(fullNameInputValue)) {
        errorState = { isValid: false, error: 'Please paste only letters' };
      }
      return {
        ...state,
        fullNameInput: { ...errorState, value: fullNameInputValue },
      };
    case 'VALIDATE_BIRTHDAY_INPUT':
      const birthdayInputValue = state.birthdayInput.value;
      if (!birthdayInputValue) {
        errorState = { isValid: false, error: 'This field is required' };
      }
      const ageDifMs = Date.now() - new Date(birthdayInputValue).getTime();
      const ageDate = new Date(ageDifMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (calculatedAge < 18) {
        errorState = { isValid: false, error: 'Sorry, but you must be older 18 or younger 70' };
      }
      if (calculatedAge > 70) {
        errorState = { isValid: false, error: 'Sorry, but you must be younger 70' };
      }
      return {
        ...state,
        birthdayInput: { ...errorState, value: birthdayInputValue },
      };

    case 'VALIDATE_ZIPCODE_INPUT':
      const zipCodeInputValue = state.zipCodeInput.value;
      const isValidLength = /\b\d{5}\b/g.test(zipCodeInputValue);
      if (!isValidLength) {
        errorState = { isValid: false, error: 'Number must be 5 digits' };
      }
      if (zipCodeInputValue[0] === '-') {
        errorState = { isValid: false, error: "Number can't be negative" };
      }
      return {
        ...state,
        zipCodeInput: { ...errorState, value: zipCodeInputValue },
      };

    case 'VALIDATE_FILE_INPUT':
      const fileInputState = state.fileInput.file;
      const acceptExts = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
      if (!fileInputState) {
        return {
          ...state,
          fileInput: { ...errorState, file: fileInputState },
        };
      }
      if (!acceptExts.some((ext) => fileInputState && ext === fileInputState.type)) {
        errorState = { isValid: false, error: 'Image must be in png, jpeg or gif format' };
      }
      return {
        ...state,
        fileInput: { ...errorState, file: fileInputState },
      };

    case 'RESET_INPUTS':
      return FORM_INITIAL_STATE;

    default:
      return FORM_INITIAL_STATE;
  }
};
