import React, { RefObject } from 'react';
import { FormBlock } from './FormBlock';
import { Input } from './Input';
import { InputContainer } from './InputContainer';
import { SelectCity } from './SelectCity';
import { SelectCountry } from './SelectCountry';

interface FormLocationProps {
  countrySelect: RefObject<HTMLSelectElement>;
  countrySelectErrorMessage: string;
  isValidCountrySelect: boolean;
  citySelect: RefObject<HTMLSelectElement>;
  citySelectErrorMessage: string;
  isValidCitySelect: boolean;
  zipCodeInput: RefObject<HTMLInputElement>;
  zipCodeInputErrorMessage: string;
  isValidInputZipCode: boolean;
}

export class FormLocation extends React.Component<FormLocationProps, { countryId: number | null }> {
  constructor(props: FormLocationProps) {
    super(props);
    this.state = { countryId: null };
  }

  changeCountry(countryId: number) {
    this.setState((prevState) => ({ ...prevState, countryId }));
  }

  render() {
    return (
      <FormBlock title="Location Info">
        <InputContainer
          errorMessage={this.props.countrySelectErrorMessage}
          errorTestId="countryError"
          isValid={this.props.isValidCountrySelect}
          maxWidth={10}
          labelText="Country"
        >
          <SelectCountry
            onSelectCountryChange={this.changeCountry.bind(this)}
            countrySelect={this.props.countrySelect}
          />
        </InputContainer>
        <InputContainer
          errorMessage={this.props.citySelectErrorMessage}
          errorTestId="cityError"
          isValid={this.props.isValidCitySelect}
          maxWidth={10}
          labelText="City"
        >
          <SelectCity countryId={this.state.countryId} citySelect={this.props.citySelect} />
        </InputContainer>
        <Input
          errorMessage={this.props.zipCodeInputErrorMessage}
          isValid={this.props.isValidInputZipCode}
          inputRef={this.props.zipCodeInput}
          errorTestId="zipCodeError"
          maxWidth={20}
          labelText="Zip code"
          inputTestId="zipCodeInput"
          inputType="number"
          inputPlaceholder="#####"
        />
      </FormBlock>
    );
  }
}
